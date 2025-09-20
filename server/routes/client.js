const express = require('express');
const { body } = require('express-validator');
const {
  createRequirement,
  getClientRequirements,
  getClientHires,
  hireArtist
} = require('../controllers/clientController');
const { protect, authorize, requireVerification } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const requirementValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage('Description must be between 20 and 1000 characters'),
  body('role')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Role must be between 2 and 50 characters'),
  body('location')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Location must be between 2 and 50 characters'),
  body('compensation')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Compensation must be a positive number'),
  body('compensationType')
    .isIn(['fixed', 'hourly', 'negotiable'])
    .withMessage('Invalid compensation type'),
  body('category')
    .isIn(['music', 'dance', 'yoga', 'crafts'])
    .withMessage('Invalid category')
];

// Apply middleware to all routes
router.use(protect);
router.use(authorize('client'));
router.use(requireVerification);

// Routes
router.post('/requirements', requirementValidation, createRequirement);
router.get('/requirements', getClientRequirements);
router.get('/hires', getClientHires);
router.post('/hire/:artistId', hireArtist);

module.exports = router;