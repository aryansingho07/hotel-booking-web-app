const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// In-memory storage for dummy bookings
let dummyBookings = [];

// GET all bookings (for admin page)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('hotelId');

    if (bookings.length > 0) {
      res.json(bookings);
    } else {
      // Return dummy bookings if database is empty
      res.json(dummyBookings);
    }
  } catch (error) {
    // If database connection fails, return dummy bookings
    console.log('Using dummy bookings:', error.message);
    res.json(dummyBookings);
  }
});

// GET single booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      res.json(booking);
    } else {
      const dummyBooking = dummyBookings.find(b => b._id === req.params.id);
      if (dummyBooking) {
        res.json(dummyBooking);
      } else {
        res.status(404).json({ message: 'Booking not found' });
      }
    }
  } catch (error) {
    const dummyBooking = dummyBookings.find(b => b._id === req.params.id);
    if (dummyBooking) {
      res.json(dummyBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  }
});

// POST - Create new booking
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const { hotelId, hotelName, roomType, userName, userEmail, checkInDate, checkOutDate, numberOfGuests, totalPrice } = req.body;

    if (!hotelId || !hotelName || !roomType || !userName || !userEmail || !checkInDate || !checkOutDate || !numberOfGuests || !totalPrice) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      return res.status(400).json({ message: 'Check-in date cannot be in the past' });
    }

    if (checkOut <= checkIn) {
      return res.status(400).json({ message: 'Check-out date must be after check-in date' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate number of guests
    if (numberOfGuests < 1) {
      return res.status(400).json({ message: 'Number of guests must be at least 1' });
    }

    try {
      // Try to save to database
      const booking = new Booking(req.body);
      const savedBooking = await booking.save();
      res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });
    } catch (dbError) {
      // If database fails, save to dummy storage
      const dummyBooking = {
        _id: Date.now().toString(),
        ...req.body,
        createdAt: new Date(),
        status: 'confirmed'
      };
      dummyBookings.push(dummyBooking);
      res.status(201).json({ message: 'Booking created successfully (dummy mode)', booking: dummyBooking });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE booking by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    if (deletedBooking) {
      res.json({ message: 'Booking deleted successfully' });
    } else {
      // Try deleting from dummy bookings
      const index = dummyBookings.findIndex(b => b._id === req.params.id);
      if (index !== -1) {
        dummyBookings.splice(index, 1);
        res.json({ message: 'Booking deleted successfully' });
      } else {
        res.status(404).json({ message: 'Booking not found' });
      }
    }
  } catch (error) {
    const index = dummyBookings.findIndex(b => b._id === req.params.id);
    if (index !== -1) {
      dummyBookings.splice(index, 1);
      res.json({ message: 'Booking deleted successfully' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  }
});

module.exports = router;
