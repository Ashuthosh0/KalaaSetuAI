const express = require('express');
const { body } = require('express-validator');
const {
  getAllApplications,
  getApplication,
  approveApplication,
  rejectApplication,
  getStats
} = require('../controllers/moderatorController');
const { protect, authorize, requireVerification } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const rejectValidation = [
  body('reason')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Rejection reason must be between 10 and 500 characters')
];

// Apply middleware to all routes
router.use(protect);
router.use(authorize('moderator'));
router.use(requireVerification);

// Routes
router.get('/applications', getAllApplications);
router.get('/applications/:id', getApplication);
router.post('/applications/:id/approve', approveApplication);
router.post('/applications/:id/reject', rejectValidation, rejectApplication);
router.get('/stats', getStats);

module.exports = router;