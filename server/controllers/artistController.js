const ArtistApplication = require('../models/ArtistApplication');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const path = require('path');

// @desc    Submit artist application
// @route   POST /api/artist/apply
// @access  Private (Artist only)
exports.submitApplication = async (req, res) => {
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

    // Check if user already has an application
    const existingApplication = await ArtistApplication.findOne({ user: req.user.id });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted an application'
      });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Certificate file is required'
      });
    }

    // Parse application data from form
    const applicationData = JSON.parse(req.body.applicationData);
    const { gender, address, category, experience, introduction } = applicationData;

    // Create application
    const application = await ArtistApplication.create({
      user: req.user.id,
      gender,
      address,
      category,
      experience,
      introduction,
      certificateUrl: req.file.path
    });

    // Populate user data
    await application.populate('user', 'firstName lastName email phone');

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during application submission'
    });
  }
};

// @desc    Get artist application status
// @route   GET /api/artist/application-status
// @access  Private (Artist only)
exports.getApplicationStatus = async (req, res) => {
  try {
    const application = await ArtistApplication.findOne({ user: req.user.id })
      .populate('user', 'firstName lastName email phone')
      .populate('reviewedBy', 'firstName lastName');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'No application found'
      });
    }

    res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    console.error('Get application status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching application status'
    });
  }
};

// @desc    Update artist application
// @route   PUT /api/artist/application
// @access  Private (Artist only)
exports.updateApplication = async (req, res) => {
  try {
    let application = await ArtistApplication.findOne({ user: req.user.id });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'No application found'
      });
    }

    // Only allow updates if application is rejected or pending
    if (application.status === 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update approved application'
      });
    }

    // Parse application data
    const applicationData = JSON.parse(req.body.applicationData);
    const { gender, address, category, experience, introduction } = applicationData;

    // Update fields
    application.gender = gender;
    application.address = address;
    application.category = category;
    application.experience = experience;
    application.introduction = introduction;

    // Update certificate if new file uploaded
    if (req.file) {
      application.certificateUrl = req.file.path;
    }

    // Reset status to pending if it was rejected
    if (application.status === 'rejected') {
      application.status = 'pending';
      application.rejectionReason = undefined;
      application.reviewedBy = undefined;
      application.reviewedAt = undefined;
    }

    await application.save();
    await application.populate('user', 'firstName lastName email phone');

    res.status(200).json({
      success: true,
      message: 'Application updated successfully',
      application
    });
  } catch (error) {
    console.error('Application update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during application update'
    });
  }
};