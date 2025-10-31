import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllHotels } from '../services/api';

function LandingPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const data = await getAllHotels();
      setHotels(data);
      setError(null);
    } catch (err) {
      setError('Failed to load hotels. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.city.toLowerCase().includes(searchCity.toLowerCase())
  );

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
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">Find Your Perfect Stay</h1>
          <p className="lead mb-4">Discover amazing hotels around the world</p>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search by city..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hotels List */}
      <div className="container mb-5">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row mb-4">
          <div className="col">
            <h2>Available Hotels</h2>
            <p className="text-muted">
              {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        <div className="row g-4">
          {filteredHotels.length === 0 ? (
            <div className="col-12 text-center py-5">
              <h3 className="text-muted">No hotels found</h3>
              <p>Try searching for a different city</p>
            </div>
          ) : (
            filteredHotels.map((hotel) => (
              <div key={hotel._id} className="col-md-6 col-lg-4">
                <div className="card hotel-card h-100">
                  <img
                    src={hotel.image}
                    className="card-img-top hotel-image"
                    alt={hotel.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/500x250?text=Hotel+Image';
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{hotel.name}</h5>
                    <p className="card-text text-muted">
                      <i className="bi bi-geo-alt"></i> {hotel.city}
                    </p>
                    {hotel.rating && (
                      <div className="rating mb-2">
                        {'★'.repeat(Math.floor(hotel.rating))}
                        {'☆'.repeat(5 - Math.floor(hotel.rating))}
                        <span className="ms-2 text-muted">({hotel.rating})</span>
                      </div>
                    )}
                    <p className="card-text flex-grow-1">
                      {hotel.description?.substring(0, 100)}
                      {hotel.description?.length > 100 ? '...' : ''}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <div>
                        <h4 className="text-primary mb-0">
                          ${hotel.pricePerNight}
                        </h4>
                        <small className="text-muted">per night</small>
                      </div>
                      <Link
                        to={`/hotel/${hotel._id}`}
                        className="btn btn-primary"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
