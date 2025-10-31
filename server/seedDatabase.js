const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hotel = require('./models/Hotel');

dotenv.config();

const hotelData = [
  {
    name: 'Grand Plaza Hotel',
    city: 'New York',
    pricePerNight: 250,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500',
    description: 'Luxury hotel in the heart of Manhattan with stunning city views.',
    rating: 4.5,
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa'],
    address: '123 Main St, New York, NY',
    phone: '+1-555-0101',
    rooms: [
      { roomType: 'Standard Room', price: 250, available: true, capacity: 2, amenities: ['WiFi', 'TV', 'Air Conditioning'] },
      { roomType: 'Deluxe Suite', price: 400, available: true, capacity: 4, amenities: ['WiFi', 'TV', 'Kitchen', 'Balcony'] },
      { roomType: 'Presidential Suite', price: 800, available: true, capacity: 6, amenities: ['WiFi', 'TV', 'Kitchen', 'Jacuzzi', 'City View'] }
    ]
  },
  {
    name: 'Seaside Resort',
    city: 'Miami',
    pricePerNight: 180,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500',
    description: 'Beautiful beachfront resort with private beach access.',
    rating: 4.7,
    amenities: ['WiFi', 'Beach Access', 'Pool', 'Restaurant', 'Water Sports'],
    address: '456 Ocean Drive, Miami, FL',
    phone: '+1-555-0202',
    rooms: [
      { roomType: 'Ocean View Room', price: 180, available: true, capacity: 2, amenities: ['WiFi', 'TV', 'Balcony'] },
      { roomType: 'Beach Villa', price: 350, available: true, capacity: 4, amenities: ['WiFi', 'TV', 'Kitchen', 'Private Beach'] }
    ]
  },
  {
    name: 'Mountain Lodge',
    city: 'Denver',
    pricePerNight: 150,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500',
    description: 'Cozy mountain retreat perfect for nature lovers.',
    rating: 4.3,
    amenities: ['WiFi', 'Fireplace', 'Hiking Trails', 'Restaurant'],
    address: '789 Mountain Rd, Denver, CO',
    phone: '+1-555-0303',
    rooms: [
      { roomType: 'Cabin Room', price: 150, available: true, capacity: 2, amenities: ['WiFi', 'Fireplace', 'Mountain View'] },
      { roomType: 'Family Suite', price: 280, available: true, capacity: 5, amenities: ['WiFi', 'Fireplace', 'Kitchen', 'Mountain View'] }
    ]
  },
  {
    name: 'Downtown Inn',
    city: 'Chicago',
    pricePerNight: 120,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500',
    description: 'Modern hotel in downtown Chicago, close to all attractions.',
    rating: 4.0,
    amenities: ['WiFi', 'Gym', 'Business Center', 'Parking'],
    address: '321 State St, Chicago, IL',
    phone: '+1-555-0404',
    rooms: [
      { roomType: 'Standard Room', price: 120, available: true, capacity: 2, amenities: ['WiFi', 'TV'] },
      { roomType: 'Business Suite', price: 220, available: true, capacity: 3, amenities: ['WiFi', 'TV', 'Desk', 'Meeting Room Access'] }
    ]
  },
  {
    name: 'Golden Gate Hotel',
    city: 'San Francisco',
    pricePerNight: 200,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=500',
    description: 'Historic hotel with Victorian charm near Golden Gate Bridge.',
    rating: 4.6,
    amenities: ['WiFi', 'Restaurant', 'Rooftop Bar', 'Concierge'],
    address: '555 Market St, San Francisco, CA',
    phone: '+1-555-0505',
    rooms: [
      { roomType: 'Classic Room', price: 200, available: true, capacity: 2, amenities: ['WiFi', 'TV', 'Victorian Decor'] },
      { roomType: 'Bay View Suite', price: 380, available: true, capacity: 4, amenities: ['WiFi', 'TV', 'Bay View', 'Living Room'] }
    ]
  },
  {
    name: 'Desert Oasis',
    city: 'Phoenix',
    pricePerNight: 140,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500',
    description: 'Luxurious desert resort with stunning pool and spa facilities.',
    rating: 4.4,
    amenities: ['WiFi', 'Pool', 'Spa', 'Golf Course', 'Restaurant'],
    address: '888 Desert Rd, Phoenix, AZ',
    phone: '+1-555-0606',
    rooms: [
      { roomType: 'Desert View Room', price: 140, available: true, capacity: 2, amenities: ['WiFi', 'TV', 'Patio'] },
      { roomType: 'Casita Suite', price: 300, available: true, capacity: 4, amenities: ['WiFi', 'TV', 'Kitchen', 'Private Pool'] }
    ]
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas successfully!');

    console.log('\nClearing existing hotels...');
    await Hotel.deleteMany({});
    console.log('Cleared existing hotel data');

    console.log('\nInserting hotel data...');
    const insertedHotels = await Hotel.insertMany(hotelData);
    console.log(`Successfully inserted ${insertedHotels.length} hotels`);

    console.log('\nHotels in database:');
    insertedHotels.forEach((hotel, index) => {
      console.log(`${index + 1}. ${hotel.name} - ${hotel.city} - $${hotel.pricePerNight}/night - ${hotel.rooms.length} rooms`);
    });

    console.log('\nDatabase seeding completed successfully!');
    console.log('You can now start your server with: npm run dev');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
