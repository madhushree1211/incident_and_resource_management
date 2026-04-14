const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Resource name is required'],
      trim: true,
      maxlength: 120
    },
    type: {
      type: String,
      required: [true, 'Resource type is required'],
      enum: ['classroom', 'lab', 'equipment', 'vehicle', 'other'],
      default: 'other'
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: 120
    },
    capacity: {
      type: Number,
      min: 0,
      default: 0
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500
    },
    amenities: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ['active', 'maintenance', 'inactive'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Resource', resourceSchema);
