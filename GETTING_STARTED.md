# Getting Started - Hotel Booking App

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
cd client
npm install
cd ..
```

### Step 2: Start the Application
```bash
npm run dev
```

### Step 3: Open Your Browser
Go to: **http://localhost:3000**

That's it! The app is running with dummy data. 🎉

---

## 📋 What You'll See

When you open http://localhost:3000, you'll see:

1. **Navigation Bar** at the top
2. **Hero Section** with search functionality
3. **6 Hotel Cards** with images and details
4. **Footer** at the bottom

---

## 🎯 Try These Actions

### Test the Booking Flow
1. Click "Book Now" on any hotel
2. Choose a room and click "Book This Room"
3. Fill in the form:
   - Name: John Doe
   - Email: john@example.com
   - Check-in: Tomorrow's date
   - Check-out: 3 days later
   - Guests: 2
4. Click "Confirm Booking"
5. See success message

### Test the Admin Page
1. Click "Admin" in the navigation
2. View your booking in the table
3. See statistics update
4. Try deleting the booking

### Test Search
1. Go back to home page
2. Type "New York" in search bar
3. See filtered results

---

## 📁 Files You Created

```
hotel-web-app/
├── Backend Files
│   ├── server/server.js          ✅ Express server
│   ├── server/models/Hotel.js    ✅ Hotel database schema
│   ├── server/models/Booking.js  ✅ Booking database schema
│   ├── server/routes/hotels.js   ✅ Hotel API endpoints
│   └── server/routes/bookings.js ✅ Booking API endpoints
│
├── Frontend Files
│   ├── client/src/App.js                ✅ Main React component
│   ├── client/src/pages/LandingPage.js  ✅ Home page
│   ├── client/src/pages/HotelDetails.js ✅ Hotel details
│   ├── client/src/pages/BookingPage.js  ✅ Booking form
│   ├── client/src/pages/AdminPage.js    ✅ Admin dashboard
│   └── client/src/services/api.js       ✅ API service
│
├── Configuration Files
│   ├── package.json              ✅ Backend dependencies
│   ├── client/package.json       ✅ Frontend dependencies
│   ├── .env                      ✅ Environment variables
│   └── .gitignore               ✅ Git ignore rules
│
└── Documentation
    ├── README.md                 ✅ Complete documentation
    ├── SETUP_GUIDE.md           ✅ Setup instructions
    ├── PROJECT_OVERVIEW.md       ✅ Feature overview
    └── GETTING_STARTED.md        ✅ This file
```

---

## ✨ Features Checklist

### Landing Page ✅
- [x] Shows list of hotels
- [x] Hotel cards with name, city, price, image
- [x] "Book Now" button
- [x] Search by city
- [x] Rating display

### Hotel Details Page ✅
- [x] Full hotel details
- [x] List of available rooms
- [x] Room amenities
- [x] "Book This Room" button

### Booking Form ✅
- [x] Check-in date picker
- [x] Check-out date picker
- [x] Number of guests selector
- [x] Name and email fields
- [x] Form validation
- [x] Price calculation

### MongoDB Integration ✅
- [x] Hotel schema
- [x] Booking schema
- [x] CRUD operations
- [x] Dummy data fallback

### Admin Page ✅
- [x] View all bookings
- [x] Table format
- [x] Statistics display
- [x] Delete bookings

---

## 🔍 Testing Validation

Try these to see validation in action:

### Email Validation
- Try: "invalidemail" → Error
- Try: "test@example" → Error
- Try: "test@example.com" → ✅ Valid

### Date Validation
- Try: Yesterday's date → Error
- Try: Check-out before check-in → Error
- Try: Valid future dates → ✅ Valid

### Guest Validation
- Try: 0 guests → Error
- Try: More than room capacity → Error
- Try: 1-4 guests (within limits) → ✅ Valid

---

## 🗄️ MongoDB Setup (Optional)

Currently using **dummy data** (no setup needed).

To use MongoDB:

### Option 1: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB: `mongod`
3. App will auto-connect

### Option 2: MongoDB Atlas (Cloud)
1. Create account: https://www.mongodb.com/cloud/atlas
2. Create cluster (free tier)
3. Get connection string
4. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/hotel-booking
   ```
5. Restart server

---

## 🛠️ Available Commands

### Development
```bash
npm run dev          # Run frontend + backend together
npm run server       # Run backend only (port 5000)
npm run client       # Run frontend only (port 3000)
```

### Installation
```bash
npm install          # Install backend dependencies
npm run install-all  # Install both backend & frontend
```

### Production
```bash
cd client
npm run build        # Build React app for production
```

---

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Admin Page**: http://localhost:3000/admin
- **Health Check**: http://localhost:5000/api/health

---

## 📊 API Endpoints

### Hotels
- `GET /api/hotels` - All hotels
- `GET /api/hotels/:id` - Single hotel

### Bookings
- `GET /api/bookings` - All bookings
- `POST /api/bookings` - Create booking
- `DELETE /api/bookings/:id` - Delete booking

---

## ❓ Troubleshooting

### "Port already in use"
- Change PORT in `.env` to 5001
- Or kill the process

### "Cannot GET /"
- Make sure frontend is running on port 3000
- Backend should be on port 5000

### "Network Error"
- Check if backend is running
- Verify port 5000 is accessible

### "Blank page"
- Open browser console (F12)
- Check for JavaScript errors
- Try clearing cache

---

## 📝 For Your Demo/Presentation

### Talk About:
1. **Tech Stack**: React, Express, MongoDB, Bootstrap
2. **Features**: All 5 requirements implemented
3. **Validation**: Show form validation examples
4. **Responsive**: Resize browser to show mobile view
5. **API**: Explain REST API architecture
6. **Database**: Show MongoDB schema design

### Show:
1. Landing page with hotels
2. Click through to details
3. Complete a booking
4. Show admin dashboard
5. Demonstrate search
6. Test validation

### Mention:
- SPA architecture with React Router
- Form validation (client & server)
- Responsive design
- RESTful API
- MongoDB integration
- Error handling

---

## 🎯 Project Meets All Requirements

| Requirement | Status | Location |
|------------|--------|----------|
| Landing Page | ✅ | `LandingPage.js` |
| Hotel Details | ✅ | `HotelDetails.js` |
| Booking Form | ✅ | `BookingPage.js` |
| MongoDB Storage | ✅ | `models/` + `routes/` |
| Admin Page | ✅ | `AdminPage.js` (Bonus!) |

---

## 🚀 Next Steps

1. ✅ Install dependencies
2. ✅ Run the app
3. ✅ Test all features
4. 📹 Record demo video (2-3 mins)
5. 📤 Push to GitHub
6. 📧 Submit

---

## 📦 Submission Checklist

- [ ] Code works without errors
- [ ] All features functional
- [ ] README.md included
- [ ] Git repository created
- [ ] Demo video recorded (or prepared to demo live)
- [ ] Tested on different screen sizes

---

## 🎉 You're All Set!

Your hotel booking app is ready to go. Run `npm run dev` and start testing!

For detailed documentation, see:
- **README.md** - Complete project documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- **PROJECT_OVERVIEW.md** - Feature walkthrough

Good luck with your submission! 🚀
