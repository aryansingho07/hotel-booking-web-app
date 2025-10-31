import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Hotel API
export const getAllHotels = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hotels`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

export const getHotelById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hotels/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hotel:', error);
    throw error;
  }
};

// Booking API
export const getAllBookings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const deleteBooking = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};
