import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getHotelById } from '../services/api';

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHotelDetails();
  }, [id]);

  const fetchHotelDetails = async () => {
    try {
      setLoading(true);
      const data = await getHotelById(id);
      setHotel(data);
      setError(null);
    } catch (err) {
      setError('Failed to load hotel details. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = (roomType) => {
    navigate(`/booking/${id}/${encodeURIComponent(roomType)}`);
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

  if (error || !hotel) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error || 'Hotel not found'}
        </div>
        <Link to="/" className="btn btn-primary">Back to Hotels</Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Back Button */}
      <div className="mb-4">
        <Link to="/" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left"></i> Back to Hotels
        </Link>
      </div>

      {/* Hotel Header */}
      <div className="row mb-4">
        <div className="col-lg-8">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="img-fluid rounded shadow"
            style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x500?text=Hotel+Image';
            }}
          />
        </div>
        <div className="col-lg-4">
          <h1 className="mb-3">{hotel.name}</h1>
          <p className="text-muted fs-5">
            <i className="bi bi-geo-alt-fill"></i> {hotel.city}
          </p>
          {hotel.rating && (
            <div className="rating fs-4 mb-3">
              {'★'.repeat(Math.floor(hotel.rating))}
              {'☆'.repeat(5 - Math.floor(hotel.rating))}
              <span className="ms-2 text-muted fs-6">({hotel.rating})</span>
            </div>
          )}
          <div className="card bg-light mb-3">
            <div className="card-body">
              <h3 className="text-primary mb-0">${hotel.pricePerNight}</h3>
              <small className="text-muted">Starting price per night</small>
            </div>
          </div>
          {hotel.address && (
            <p><strong>Address:</strong> {hotel.address}</p>
          )}
          {hotel.phone && (
            <p><strong>Phone:</strong> {hotel.phone}</p>
          )}
        </div>
      </div>

      {/* Hotel Description */}
      <div className="row mb-4">
        <div className="col-12">
          <h3>About This Hotel</h3>
          <p className="lead">{hotel.description}</p>
        </div>
      </div>

      {/* Amenities */}
      {hotel.amenities && hotel.amenities.length > 0 && (
        <div className="row mb-4">
          <div className="col-12">
            <h3>Amenities</h3>
            <div className="row">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="col-md-4 col-sm-6 mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Available Rooms */}
      <div className="row">
        <div className="col-12">
          <h3 className="mb-4">Available Rooms</h3>
          {hotel.rooms && hotel.rooms.length > 0 ? (
            <div className="row g-4">
              {hotel.rooms.map((room, index) => (
                <div key={index} className="col-md-6">
                  <div className="card room-card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{room.roomType}</h5>
                      <div className="mb-3">
                        <span className="badge bg-info me-2">
                          Capacity: {room.capacity} guests
                        </span>
                        <span className={`badge ${room.available ? 'bg-success' : 'bg-danger'}`}>
                          {room.available ? 'Available' : 'Not Available'}
                        </span>
                      </div>
                      {room.amenities && room.amenities.length > 0 && (
                        <div className="mb-3">
                          <strong>Room Amenities:</strong>
                          <ul className="list-unstyled mt-2">
                            {room.amenities.map((amenity, idx) => (
                              <li key={idx}>
                                <i className="bi bi-check text-success me-2"></i>
                                {amenity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h4 className="text-primary mb-0">${room.price}</h4>
                          <small className="text-muted">per night</small>
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleBookRoom(room.roomType)}
                          disabled={!room.available}
                        >
                          {room.available ? 'Book This Room' : 'Unavailable'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No rooms available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
