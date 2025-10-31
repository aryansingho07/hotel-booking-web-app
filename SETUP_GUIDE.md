# Quick Setup Guide

Follow these steps to get the hotel booking app running on your machine:

## Step-by-Step Setup

### 1. Install Backend Dependencies
```bash
npm install
```

This installs: express, mongoose, cors, dotenv, body-parser, nodemon, concurrently

### 2. Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

This installs: react, react-dom, react-router-dom, react-scripts, bootstrap, axios

### 3. Configure MongoDB (Optional)

**Option A: Use Dummy Data (No Setup Required)**
- The app works out of the box with dummy data
- Just skip to step 4!

**Option B: Use MongoDB**

**For Local MongoDB:**
1. Install MongoDB Community Edition
2. Start MongoDB service
3. The `.env` file is already configured for local MongoDB

**For MongoDB Atlas (Cloud):**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier available)
3. Get your connection string
4. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/hotel-booking
   ```

### 4. Start the Application

**Run both frontend and backend together:**
```bash
npm run dev
```

This will:
- Start the backend server on http://localhost:5000
- Start the React app on http://localhost:3000
- Automatically open your browser

**Or run separately:**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
cd client
npm start
```

### 5. Access the Application

Open your browser and go to:
- **Main App:** http://localhost:3000
- **Admin Page:** http://localhost:3000/admin

## Testing the Features

### Test the Landing Page
1. View all 6 hotels
2. Try searching by city (e.g., "New York", "Miami")
3. Click on any hotel card to view details

### Test Hotel Details
1. View hotel information and amenities
2. See available rooms
3. Click "Book This Room" on any room

### Test Booking Form
1. Fill in your name and email
2. Select check-in and check-out dates
3. Choose number of guests
4. Watch the price calculate automatically
5. Submit the booking

### Test Admin Dashboard
1. Navigate to http://localhost:3000/admin
2. View all bookings
3. See statistics
4. Try deleting a booking

## Verifying Everything Works

### Backend Check
Visit http://localhost:5000/api/health
You should see: `{"status":"Server is running","timestamp":"..."}`

### Frontend Check
Visit http://localhost:3000
You should see the landing page with 6 hotels

### MongoDB Check (if using MongoDB)
Look at the server console:
- Success: "MongoDB connected successfully"
- Failure: "MongoDB connection error" (will use dummy data)

## Common Issues & Solutions

### Issue: "Port 5000 is already in use"
**Solution:** Change PORT in `.env` to 5001 or another available port

### Issue: "Port 3000 is already in use"
**Solution:**
- Kill the process using port 3000
- Or React will ask if you want to use a different port (type 'Y')

### Issue: MongoDB connection fails
**Solution:**
- Don't worry! App automatically uses dummy data
- Check your MONGODB_URI in `.env`
- Verify MongoDB is running (if local)

### Issue: Cannot find module errors
**Solution:** Make sure you ran `npm install` in both root and client directories

### Issue: Blank page in browser
**Solution:**
- Check browser console for errors
- Verify backend is running on port 5000
- Clear browser cache and refresh

## Available Scripts

From the root directory:

- `npm run dev` - Run both frontend and backend
- `npm run server` - Run backend only
- `npm run client` - Run frontend only
- `npm start` - Run backend only
- `npm run install-all` - Install all dependencies

From the client directory:

- `npm start` - Run React development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Project Demo Checklist

Use this checklist to demo your project:

- [ ] Landing page loads with 6 hotels
- [ ] Search functionality works
- [ ] Clicking hotel shows details page
- [ ] Hotel details shows rooms
- [ ] Booking form validates input
- [ ] Dates cannot be in the past
- [ ] Check-out must be after check-in
- [ ] Email validation works
- [ ] Price calculates correctly
- [ ] Booking submits successfully
- [ ] Success message appears
- [ ] Admin page shows bookings
- [ ] Statistics display correctly
- [ ] Delete booking works
- [ ] App is responsive on mobile

## Next Steps

After basic setup:

1. **Test all features** using the checklist above
2. **Try connecting MongoDB** if you want persistent data
3. **Customize the hotels** by modifying `server/routes/hotels.js`
4. **Style adjustments** in `client/src/index.css`
5. **Add more features** from the Future Enhancements section in README

## Need Help?

Check the main README.md for:
- Detailed API documentation
- Project structure explanation
- Validation rules
- Troubleshooting guide

Good luck with your project! 🚀
