# Hotel Booking Web Application

A full-stack hotel booking application built with React, Node.js, Express, and MongoDB.

## Features

### Implemented Features
- **Landing Page**: Browse all available hotels with search functionality
- **Hotel Details Page**: View detailed information about hotels and available rooms
- **Booking Form**: Complete booking with validation (check-in/out dates, guest count)
- **Admin Dashboard**: View all bookings, statistics, and manage reservations
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **Single Page Application**: Smooth navigation with React Router
- **API Integration**: RESTful API with Express and MongoDB

### Key Highlights
- Form validation with error messages
- Date validation (no past dates, check-out after check-in)
- Email validation
- Guest capacity validation
- Real-time price calculation
- Dummy data fallback when MongoDB is not connected
- Professional UI with Bootstrap styling

## Tech Stack

**Frontend:**
- React 18
- React Router DOM 6
- Bootstrap 5
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS

## Project Structure

```
hotel-web-app/
├── client/                     # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.js       # Home page with hotel listings
│   │   │   ├── HotelDetails.js      # Hotel details and rooms
│   │   │   ├── BookingPage.js       # Booking form
│   │   │   └── AdminPage.js         # Admin dashboard
│   │   ├── services/
│   │   │   └── api.js               # API service layer
│   │   ├── App.js                   # Main app component
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/                     # Express backend
│   ├── models/
│   │   ├── Hotel.js                 # Hotel schema
│   │   └── Booking.js               # Booking schema
│   ├── routes/
│   │   ├── hotels.js                # Hotel routes
│   │   └── bookings.js              # Booking routes
│   └── server.js                    # Express server
├── .env                        # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Step 1: Install Dependencies

**Install backend dependencies:**
```bash
npm install
```

**Install frontend dependencies:**
```bash
cd client
npm install
cd ..
```

Or use the combined command:
```bash
npm run install-all
```

### Step 2: Configure Environment Variables

Edit the `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotel-booking
```

**For MongoDB Atlas:**
Replace with your connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel-booking
```

### Step 3: Start the Application

**Option 1: Run both frontend and backend together (Recommended)**
```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run client
```

### Step 4: Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **API Health Check:** http://localhost:5000/api/health

## Usage

### Without MongoDB (Dummy Data Mode)

The application works perfectly without MongoDB by using in-memory dummy data:
- 6 pre-configured hotels with rooms
- Bookings stored in memory (resets on server restart)

### With MongoDB

To use MongoDB:

1. **Install MongoDB locally** or **create a MongoDB Atlas account**

2. **Update .env file** with your connection string

3. **Start the server** - it will automatically connect to MongoDB

4. **Optional: Seed the database** with hotel data using the dummy data from the API routes

### API Endpoints

**Hotels:**
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel by ID
- `POST /api/hotels` - Create new hotel (admin)

**Bookings:**
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/:id` - Delete booking

## Features Walkthrough

### 1. Landing Page
- View all available hotels
- Search hotels by city
- See hotel ratings, prices, and images
- Click "Book Now" to view hotel details

### 2. Hotel Details Page
- View comprehensive hotel information
- See all available rooms with prices
- Check room amenities and capacity
- Click "Book This Room" to start booking

### 3. Booking Form
- Enter personal information (name, email)
- Select check-in and check-out dates
- Specify number of guests
- View automatic price calculation
- Form validation with helpful error messages
- Confirmation message on successful booking

### 4. Admin Dashboard
- View all bookings in a table
- See statistics (total bookings, revenue, guests)
- Delete bookings
- No authentication required (as per requirements)

## Validation Rules

- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Check-in Date**: Required, cannot be in the past
- **Check-out Date**: Required, must be after check-in date
- **Number of Guests**: Required, minimum 1, cannot exceed room capacity

## Dummy Hotels Data

The application includes 6 pre-configured hotels:
1. Grand Plaza Hotel (New York) - $250/night
2. Seaside Resort (Miami) - $180/night
3. Mountain Lodge (Denver) - $150/night
4. Downtown Inn (Chicago) - $120/night
5. Golden Gate Hotel (San Francisco) - $200/night
6. Desert Oasis (Phoenix) - $140/night

## Future Enhancements

Potential improvements for production:
- User authentication and authorization
- Admin authentication
- Payment gateway integration
- Email confirmation for bookings
- Room availability tracking
- Image upload functionality
- Advanced search filters
- Booking modification and cancellation
- User profile and booking history
- Reviews and ratings system

## Troubleshooting

**Port already in use:**
- Change the PORT in `.env` file
- Kill the process using the port

**MongoDB connection error:**
- Verify MongoDB is running (if local)
- Check connection string in `.env`
- The app will fallback to dummy data if connection fails

**Frontend not connecting to backend:**
- Verify backend is running on port 5000
- Check `proxy` setting in `client/package.json`

## Credits

Built as an intern task demonstration project showcasing:
- HTML, CSS, JavaScript
- React with React Router
- Node.js and Express
- MongoDB with Mongoose
- RESTful API design
- Form validation
- Responsive design

## License

This project is for educational and demonstration purposes.
