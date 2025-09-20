const ClientRequirement = require('../models/ClientRequirement');
const HireRecord = require('../models/HireRecord');
const { validationResult } = require('express-validator');

// @desc    Create a new requirement
// @route   POST /api/client/requirements
// @access  Private (Client only)
exports.createRequirement = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, description, role, location, compensation, compensationType, category, requirements } = req.body;

    const requirement = await ClientRequirement.create({
      client: req.user.id,
      title,
      description,
      role,
      location,
      compensation,
      compensationType,
      category,
      requirements: requirements || []
    });

    await requirement.populate('client', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Requirement posted successfully',
      requirement
    });
  } catch (error) {
    console.error('Create requirement error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating requirement'
    });
  }
};

// @desc    Get all requirements by client
// @route   GET /api/client/requirements
// @access  Private (Client only)
exports.getClientRequirements = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const filter = { client: req.user.id };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const requirements = await ClientRequirement.find(filter)
      .populate('client', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ClientRequirement.countDocuments(filter);

    res.status(200).json({
      success: true,
      requirements,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get client requirements error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching requirements'
    });
  }
};

// @desc    Get all hires by client
// @route   GET /api/client/hires
// @access  Private (Client only)
exports.getClientHires = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const filter = { client: req.user.id };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const hires = await HireRecord.find(filter)
      .populate('client', 'firstName lastName email')
      .populate('artist', 'firstName lastName email phone')
      .populate('requirement', 'title category')
      .sort({ hiredAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await HireRecord.countDocuments(filter);

    res.status(200).json({
      success: true,
      hires,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get client hires error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching hires'
    });
  }
};

// @desc    Create hire record
// @route   POST /api/client/hire/:artistId
// @access  Private (Client only)
exports.hireArtist = async (req, res) => {
  try {
    const { artistId } = req.params;
    const { requirementId, notes } = req.body;

    // Check if hire already exists
    const existingHire = await HireRecord.findOne({
      client: req.user.id,
      artist: artistId
    });

    if (existingHire) {
      return res.status(400).json({
        success: false,
        message: 'You have already hired this artist'
      });
    }

    const hire = await HireRecord.create({
      client: req.user.id,
      artist: artistId,
      requirement: requirementId,
      notes
    });

    await hire.populate('artist', 'firstName lastName email phone');
    await hire.populate('requirement', 'title category');

    res.status(201).json({
      success: true,
      message: 'Artist hired successfully',
      hire
    });
  } catch (error) {
    console.error('Hire artist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while hiring artist'
    });
  }
};