const mongoose = require('mongoose');

const artistApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Gender is required']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^[0-9]{6}$/, 'Pincode must be 6 digits']
    }
  },
  category: {
    type: String,
    enum: ['music', 'dance', 'yoga', 'crafts'],
    required: [true, 'Art category is required']
  },
  experience: {
    type: Number,
    required: [true, 'Years of experience is required'],
    min: [0, 'Experience cannot be negative'],
    max: [50, 'Experience cannot exceed 50 years']
  },
  introduction: {
    type: String,
    maxlength: [500, 'Introduction cannot exceed 500 characters'],
    trim: true
  },
  certificateUrl: {
    type: String,
    required: [true, 'Certificate upload is required']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rejectionReason: {
    type: String,
    trim: true
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Update user's hasCompletedApplication when application is created
artistApplicationSchema.post('save', async function() {
  if (this.isNew) {
    await mongoose.model('User').findByIdAndUpdate(this.user, {
      hasCompletedApplication: true
    });
  }
});

module.exports = mongoose.model('ArtistApplication', artistApplicationSchema);