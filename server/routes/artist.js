const express = require('express');
const { body } = require('express-validator');
const {
  submitApplication,
  getApplicationStatus,
  updateApplication
} = require('../controllers/artistController');
const { protect, authorize, requireVerification } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// Validation rules
const applicationValidation = [
  body('applicationData')
    .custom((value) => {
      try {
        const data = JSON.parse(value);
        
        // Validate required fields
        if (!data.gender || !['male', 'female', 'other'].includes(data.gender)) {
          throw new Error('Valid gender is required');
        }
        
        if (!data.address || !data.address.street || !data.address.city || 
            !data.address.state || !data.address.pincode) {
          throw new Error('Complete address is required');
        }
        
        if (!data.address.pincode.match(/^[0-9]{6}$/)) {
          throw new Error('Pincode must be 6 digits');
        }
        
        if (!data.category || !['music', 'dance', 'yoga', 'crafts'].includes(data.category)) {
          throw new Error('Valid art category is required');
        }
        
        if (!data.experience || data.experience < 0 || data.experience > 50) {
          throw new Error('Experience must be between 0 and 50 years');
        }
        
        if (data.introduction && data.introduction.length > 500) {
          throw new Error('Introduction cannot exceed 500 characters');
        }
        
        return true;
      } catch (error) {
        throw new Error('Invalid application data: ' + error.message);
      }
    })
];

// Apply middleware to all routes
router.use(protect);
router.use(authorize('artist'));
router.use(requireVerification);

// Routes
router.post('/apply', 
  upload.single('certificate'), 
  handleUploadError,
  applicationValidation, 
  submitApplication
);

router.get('/application-status', getApplicationStatus);

router.put('/application', 
  upload.single('certificate'), 
  handleUploadError,
  applicationValidation, 
  updateApplication
);

module.exports = router;