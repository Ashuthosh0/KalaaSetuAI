const ArtistApplication = require('../models/ArtistApplication');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc    Get all artist applications
// @route   GET /api/moderator/applications
// @access  Private (Moderator only)
exports.getAllApplications = async (req, res) => {
  try {
    const { status, category, page = 1, limit = 10 } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get applications with pagination
    const applications = await ArtistApplication.find(filter)
      .populate('user', 'firstName lastName email phone')
      .populate('reviewedBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await ArtistApplication.countDocuments(filter);

    res.status(200).json({
      success: true,
      applications,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching applications'
    });
  }
};

// @desc    Get single application
// @route   GET /api/moderator/applications/:id
// @access  Private (Moderator only)
exports.getApplication = async (req, res) => {
  try {
    const application = await ArtistApplication.findById(req.params.id)
      .populate('user', 'firstName lastName email phone')
      .populate('reviewedBy', 'firstName lastName');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching application'
    });
  }
};

// @desc    Approve artist application
// @route   POST /api/moderator/applications/:id/approve
// @access  Private (Moderator only)
exports.approveApplication = async (req, res) => {
  try {
    const application = await ArtistApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending applications can be approved'
      });
    }

    // Update application status
    application.status = 'approved';
    application.reviewedBy = req.user.id;
    application.reviewedAt = new Date();
    application.rejectionReason = undefined;

    await application.save();

    // Update user's hasCompletedApplication status
    await User.findByIdAndUpdate(application.user, {
      hasCompletedApplication: true
    });

    await application.populate('user', 'firstName lastName email phone');
    await application.populate('reviewedBy', 'firstName lastName');

    res.status(200).json({
      success: true,
      message: 'Application approved successfully',
      application
    });
  } catch (error) {
    console.error('Approve application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while approving application'
    });
  }
};

// @desc    Reject artist application
// @route   POST /api/moderator/applications/:id/reject
// @access  Private (Moderator only)
exports.rejectApplication = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { reason } = req.body;

    const application = await ArtistApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending applications can be rejected'
      });
    }

    // Update application status
    application.status = 'rejected';
    application.rejectionReason = reason;
    application.reviewedBy = req.user.id;
    application.reviewedAt = new Date();

    await application.save();
    await application.populate('user', 'firstName lastName email phone');
    await application.populate('reviewedBy', 'firstName lastName');

    res.status(200).json({
      success: true,
      message: 'Application rejected successfully',
      application
    });
  } catch (error) {
    console.error('Reject application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while rejecting application'
    });
  }
};

// @desc    Get application statistics
// @route   GET /api/moderator/stats
// @access  Private (Moderator only)
exports.getStats = async (req, res) => {
  try {
    const stats = await ArtistApplication.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Format stats
    const formattedStats = {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
      formattedStats.total += stat.count;
    });

    // Get category breakdown
    const categoryStats = await ArtistApplication.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: formattedStats,
      categoryStats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
};