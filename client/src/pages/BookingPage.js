import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getHotelById, createBooking } from '../services/api';

function BookingPage() {
  const { hotelId, roomType } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchHotelAndRoom();
  }, [hotelId, roomType]);

  const fetchHotelAndRoom = async () => {
    try {
      setLoading(true);
      const hotelData = await getHotelById(hotelId);
      setHotel(hotelData);

      const decodedRoomType = decodeURIComponent(roomType);
      const foundRoom = hotelData.rooms?.find(r => r.roomType === decodedRoomType);
      setRoom(foundRoom);

      if (!foundRoom) {
        setError('Room not found');
      }
    } catch (err) {
      setError('Failed to load hotel details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.userName.trim()) {
      errors.userName = 'Name is required';
    } else if (formData.userName.trim().length < 2) {
      errors.userName = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.userEmail.trim()) {
      errors.userEmail = 'Email is required';
    } else if (!emailRegex.test(formData.userEmail)) {
      errors.userEmail = 'Invalid email format';
    }

    // Check-in date validation
    if (!formData.checkInDate) {
      errors.checkInDate = 'Check-in date is required';
    } else {
      const checkIn = new Date(formData.checkInDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (checkIn < today) {
        errors.checkInDate = 'Check-in date cannot be in the past';
      }
    }

    // Check-out date validation
    if (!formData.checkOutDate) {
      errors.checkOutDate = 'Check-out date is required';
    } else if (formData.checkInDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      if (checkOut <= checkIn) {
        errors.checkOutDate = 'Check-out date must be after check-in date';
      }
    }

    // Number of guests validation
    if (!formData.numberOfGuests || formData.numberOfGuests < 1) {
      errors.numberOfGuests = 'At least 1 guest is required';
    } else if (room && formData.numberOfGuests > room.capacity) {
      errors.numberOfGuests = `This room can accommodate maximum ${room.capacity} guests`;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateTotalPrice = () => {
    if (!formData.checkInDate || !formData.checkOutDate || !room) return 0;

    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    return nights > 0 ? nights * room.price : 0;
  };

  const calculateNights = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;

    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    return nights > 0 ? nights : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const bookingData = {
        hotelId: hotel._id,
        hotelName: hotel.name,
        roomType: room.roomType,
        userName: formData.userName.trim(),
        userEmail: formData.userEmail.trim(),
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        numberOfGuests: parseInt(formData.numberOfGuests),
        totalPrice: calculateTotalPrice()
      };

      await createBooking(bookingData);
      setSuccess(true);

      // Redirect to home page after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !hotel) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/" className="btn btn-primary">Back to Hotels</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container mt-5">
        <div className="alert alert-success text-center" role="alert">
          <h4 className="alert-heading">Booking Confirmed!</h4>
          <p>Your booking has been successfully created. You will be redirected to the home page shortly.</p>
          <hr />
          <p className="mb-0">Thank you for choosing {hotel.name}!</p>
        </div>
      </div>
    );
  }

  const totalPrice = calculateTotalPrice();
  const nights = calculateNights();

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Back Button */}
          <div className="mb-4">
            <Link to={`/hotel/${hotelId}`} className="btn btn-outline-secondary">
              <i className="bi bi-arrow-left"></i> Back to Hotel Details
            </Link>
          </div>

          <div className="booking-form">
            <h2 className="mb-4">Complete Your Booking</h2>

            {/* Hotel & Room Info */}
            <div className="card mb-4 bg-light">
              <div className="card-body">
                <h5 className="card-title">{hotel.name}</h5>
                <p className="card-text mb-2">
                  <strong>Room:</strong> {room.roomType}
                </p>
                <p className="card-text mb-2">
                  <strong>Price:</strong> ${room.price} per night
                </p>
                <p className="card-text mb-0">
                  <strong>Capacity:</strong> Up to {room.capacity} guests
                </p>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {/* Booking Form */}
            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <h5 className="mb-3">Personal Information</h5>

              <div className="mb-3">
                <label htmlFor="userName" className="form-label">Full Name *</label>
                <input
                  type="text"
                  className={`form-control ${formErrors.userName ? 'is-invalid' : ''}`}
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
                {formErrors.userName && (
                  <div className="invalid-feedback">{formErrors.userName}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="userEmail" className="form-label">Email Address *</label>
                <input
                  type="email"
                  className={`form-control ${formErrors.userEmail ? 'is-invalid' : ''}`}
                  id="userEmail"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
                {formErrors.userEmail && (
                  <div className="invalid-feedback">{formErrors.userEmail}</div>
                )}
              </div>

              {/* Booking Details */}
              <h5 className="mb-3">Booking Details</h5>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="checkInDate" className="form-label">Check-in Date *</label>
                  <input
                    type="date"
                    className={`form-control ${formErrors.checkInDate ? 'is-invalid' : ''}`}
                    id="checkInDate"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {formErrors.checkInDate && (
                    <div className="invalid-feedback">{formErrors.checkInDate}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="checkOutDate" className="form-label">Check-out Date *</label>
                  <input
                    type="date"
                    className={`form-control ${formErrors.checkOutDate ? 'is-invalid' : ''}`}
                    id="checkOutDate"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleInputChange}
                    min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                  />
                  {formErrors.checkOutDate && (
                    <div className="invalid-feedback">{formErrors.checkOutDate}</div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="numberOfGuests" className="form-label">Number of Guests *</label>
                <input
                  type="number"
                  className={`form-control ${formErrors.numberOfGuests ? 'is-invalid' : ''}`}
                  id="numberOfGuests"
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleInputChange}
                  min="1"
                  max={room.capacity}
                />
                {formErrors.numberOfGuests && (
                  <div className="invalid-feedback">{formErrors.numberOfGuests}</div>
                )}
                <div className="form-text">Maximum capacity: {room.capacity} guests</div>
              </div>

              {/* Price Summary */}
              {nights > 0 && (
                <div className="card mb-4 bg-light">
                  <div className="card-body">
                    <h5 className="card-title">Price Summary</h5>
                    <div className="d-flex justify-content-between mb-2">
                      <span>${room.price} × {nights} night{nights !== 1 ? 's' : ''}</span>
                      <span>${totalPrice}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <strong>Total Price:</strong>
                      <strong className="text-primary fs-4">${totalPrice}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
