const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomType: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  capacity: {
    type: Number,
    required: true
  },
  amenities: [String]
});

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pricePerNight: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  amenities: [String],
  rooms: [roomSchema],
  address: String,
  phone: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Hotel', hotelSchema);
