import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HotelDetails from './pages/HotelDetails';
import BookingPage from './pages/BookingPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <strong>Hotel Booking</strong>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/booking/:hotelId/:roomType" element={<BookingPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <div className="container text-center">
            <p className="mb-0">&copy; 2025 Hotel Booking App. All rights reserved.</p>
            <p className="mb-0">Built with React, Express, and MongoDB</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
