import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBookings, deleteBooking } from '../services/api';

function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getAllBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError('Failed to load bookings. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(id);
        setDeleteSuccess('Booking deleted successfully');
        // Refresh bookings list
        fetchBookings();
        // Clear success message after 3 seconds
        setTimeout(() => setDeleteSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete booking');
        console.error(err);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
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

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h2>Admin Dashboard</h2>
          <p className="text-muted">Manage all hotel bookings</p>
        </div>
        <div className="col-md-6 text-end">
          <Link to="/" className="btn btn-outline-primary">
            Back to Home
          </Link>
        </div>
      </div>

      {/* Success Message */}
      {deleteSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {deleteSuccess}
          <button
            type="button"
            className="btn-close"
            onClick={() => setDeleteSuccess('')}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Total Bookings</h5>
              <h2 className="mb-0">{bookings.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Total Revenue</h5>
              <h2 className="mb-0">
                ${bookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0).toLocaleString()}
              </h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Total Guests</h5>
              <h2 className="mb-0">
                {bookings.reduce((sum, booking) => sum + (booking.numberOfGuests || 0), 0)}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="card admin-table">
        <div className="card-body">
          <h5 className="card-title mb-4">All Bookings</h5>

          {bookings.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">No bookings yet</h4>
              <p>Bookings will appear here once customers make reservations</p>
              <Link to="/" className="btn btn-primary">
                Browse Hotels
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Guest Name</th>
                    <th>Email</th>
                    <th>Hotel</th>
                    <th>Room Type</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Nights</th>
                    <th>Guests</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>
                        <small className="text-muted">
                          {booking._id.substring(0, 8)}...
                        </small>
                      </td>
                      <td>{booking.userName}</td>
                      <td>{booking.userEmail}</td>
                      <td>{booking.hotelName}</td>
                      <td>{booking.roomType}</td>
                      <td>{formatDate(booking.checkInDate)}</td>
                      <td>{formatDate(booking.checkOutDate)}</td>
                      <td>{calculateNights(booking.checkInDate, booking.checkOutDate)}</td>
                      <td>{booking.numberOfGuests}</td>
                      <td>
                        <strong>${booking.totalPrice}</strong>
                      </td>
                      <td>
                        <span className={`badge ${
                          booking.status === 'confirmed' ? 'bg-success' :
                          booking.status === 'pending' ? 'bg-warning' :
                          'bg-danger'
                        }`}>
                          {booking.status || 'confirmed'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(booking._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4">
        <div className="alert alert-info" role="alert">
          <strong>Note:</strong> This is a basic admin dashboard. In a production environment,
          you would add authentication and more advanced features like editing bookings,
          filtering, sorting, and exporting data.
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
