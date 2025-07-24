const mongoose = require('mongoose');

const clientRequirementSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  compensation: {
    type: Number,
    required: [true, 'Compensation is required'],
    min: [0, 'Compensation cannot be negative']
  },
  compensationType: {
    type: String,
    enum: ['fixed', 'hourly', 'negotiable'],
    default: 'fixed'
  },
  category: {
    type: String,
    enum: ['music', 'dance', 'yoga', 'crafts'],
    required: [true, 'Category is required']
  },
  requirements: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['active', 'closed', 'paused'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ClientRequirement', clientRequirementSchema);