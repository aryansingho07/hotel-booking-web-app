# Hotel Booking Web Application

A full-stack hotel booking application built with React, Node.js, Express, and MongoDB Atlas.

## Features

### Core Features
- Landing page with hotel listings and search functionality
- Hotel details page with room information
- Booking form with comprehensive validation
- Admin dashboard for managing bookings
- Responsive design with Bootstrap 5
- Single Page Application with React Router
- RESTful API with MongoDB Atlas integration

### Validation
- Date validation (no past dates, check-out after check-in)
- Email format validation
- Guest capacity validation
- Real-time price calculation
- Server-side and client-side validation

## Tech Stack

**Frontend**
- React 18
- React Router DOM 6
- Bootstrap 5
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB Atlas with Mongoose
- CORS & Body Parser

## Project Structure

```
hotel-web-app/
├── client/                   # React frontend
│   ├── public/
│   └── src/
│       ├── pages/           # Landing, Details, Booking, Admin pages
│       ├── services/        # API integration
│       ├── App.js
│       └── index.js
├── server/                  # Express backend
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints
│   ├── seedDatabase.js     # Database seeding script
│   └── server.js
├── .env                    # Environment variables
├── .gitignore
└── package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Install backend dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

Or install all at once:
```bash
npm run install-all
```

### Environment Variables

The `.env` file is configured with MongoDB Atlas connection:
```env
PORT=5000
MONGODB_URI=mongodb+srv://aryan:Terabaap95203@mongocluster.btn0uq7.mongodb.net/hotel-booking
```

### Database Seeding

Populate MongoDB with sample hotel data:
```bash
npm run seed
```

This will insert 6 hotels into your MongoDB Atlas database.

## Running the Application

### Start both frontend and backend:
```bash
npm run dev
```

### Start separately:

Backend only:
```bash
npm run server
```

Frontend only:
```bash
npm run client
```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## API Endpoints

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get single hotel
- `POST /api/hotels` - Create new hotel

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/:id` - Delete booking

## Database Schema

### Hotel Schema
```javascript
{
  name: String,
  city: String,
  pricePerNight: Number,
  image: String,
  description: String,
  rating: Number,
  amenities: [String],
  address: String,
  phone: String,
  rooms: [{
    roomType: String,
    price: Number,
    available: Boolean,
    capacity: Number,
    amenities: [String]
  }]
}
```

### Booking Schema
```javascript
{
  hotelId: ObjectId,
  hotelName: String,
  roomType: String,
  userName: String,
  userEmail: String,
  checkInDate: Date,
  checkOutDate: Date,
  numberOfGuests: Number,
  totalPrice: Number,
  status: String
}
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run both frontend and backend |
| `npm run server` | Run backend only |
| `npm run client` | Run frontend only |
| `npm run seed` | Populate database with hotels |
| `npm run install-all` | Install all dependencies |

## Sample Hotels

The database includes 6 pre-configured hotels:
1. Grand Plaza Hotel - New York - $250/night
2. Seaside Resort - Miami - $180/night
3. Mountain Lodge - Denver - $150/night
4. Downtown Inn - Chicago - $120/night
5. Golden Gate Hotel - San Francisco - $200/night
6. Desert Oasis - Phoenix - $140/night

## Application Flow

1. **Browse Hotels**: Users view hotels on the landing page with search
2. **View Details**: Click on a hotel to see rooms and amenities
3. **Book Room**: Select a room and fill out the booking form
4. **Confirmation**: Booking is saved to MongoDB and confirmed
5. **Admin View**: View all bookings in the admin dashboard

## Validation Rules

| Field | Rules |
|-------|-------|
| Name | Required, minimum 2 characters |
| Email | Required, valid email format |
| Check-in | Required, cannot be in past |
| Check-out | Required, must be after check-in |
| Guests | Required, minimum 1, max = room capacity |

## MongoDB Atlas

The application is connected to MongoDB Atlas cloud database:
- Database: `hotel-booking`
- Collections: `hotels`, `bookings`
- Connection string configured in `.env`

To re-seed the database at any time:
```bash
npm run seed
```

## Development Notes

### Data Fallback
If MongoDB connection fails, the application falls back to in-memory dummy data to ensure functionality.

### Security
- `.env` file is in `.gitignore`
- Input validation on both client and server
- MongoDB injection protection via Mongoose

## Troubleshooting

**MongoDB Connection Error**
- Verify internet connection
- Check MongoDB Atlas cluster status
- Ensure IP is whitelisted in MongoDB Atlas
- Verify connection string in `.env`

**Port Already in Use**
- Change PORT in `.env` file
- Kill process using the port

**No Hotels Displayed**
- Run `npm run seed` to populate database
- Check server logs for connection status

## Production Deployment

For production deployment:
1. Set environment variables in hosting platform
2. Build React app: `cd client && npm run build`
3. Deploy backend to Heroku/Railway/Render
4. Deploy frontend to Vercel/Netlify
5. Update CORS settings for production URLs

## License

This project is for educational and demonstration purposes.

## Author

Built as an intern task demonstration showcasing full-stack development skills with React, Express, and MongoDB.
