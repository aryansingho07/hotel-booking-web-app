const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL || '*'
    : 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('MongoDB connection error:', error.message);
    console.log('Running with dummy data...');
  }
};

connectDB();

const hotelRoutes = require('./routes/hotels');
const bookingRoutes = require('./routes/bookings');

app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
