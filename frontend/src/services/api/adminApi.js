import axios from '../../lib/axios';

export const adminApi = {
  // Dashboard Stats
  getDashboardStats: async (dateRange = '30days') => {
    const { data } = await axios.get('/api/admin/dashboard/stats', {
      params: { dateRange }
    });
    return data.data;
  },

  getBookingTrends: async () => {
    const { data } = await axios.get('/api/admin/dashboard/booking-trends');
    return data.data;
  },

  getPopularDestinations: async () => {
    const { data } = await axios.get('/api/admin/dashboard/popular-destinations');
    return data.data;
  },

  // Booking Management
  getAllBookings: async (params = {}) => {
    const { data } = await axios.get('/api/admin/bookings', { params });
    return data.data;
  },

  getBookingById: async (id) => {
    const { data } = await axios.get(`/api/admin/bookings/${id}`);
    return data.data;
  },

  updateBookingStatus: async (id, status) => {
    const { data } = await axios.patch(`/api/admin/bookings/${id}/status`, { status });
    return data.data;
  },

  updatePaymentStatus: async (id, paymentStatus) => {
    const { data } = await axios.patch(`/api/admin/bookings/${id}/payment-status`, { paymentStatus });
    return data.data;
  },

  exportBookings: async (params = {}) => {
    const { data } = await axios.get('/api/admin/bookings/export', {
      params,
      responseType: 'blob'
    });
    return data;
  },

  // Tour Management
  getAllTours: async (params = {}) => {
    const { data } = await axios.get('/api/admin/tours', { params });
    return data.data;
  },

  getTourById: async (id) => {
    const { data } = await axios.get(`/api/admin/tours/${id}`);
    return data.data;
  },

  createTour: async (tourData) => {
    const { data } = await axios.post('/api/admin/tours', tourData);
    return data.data;
  },

  updateTour: async (id, tourData) => {
    const { data } = await axios.put(`/api/admin/tours/${id}`, tourData);
    return data.data;
  },

  deleteTour: async (id) => {
    const { data } = await axios.delete(`/api/admin/tours/${id}`);
    return data.data;
  },

  toggleTourStatus: async (id) => {
    const { data } = await axios.patch(`/api/admin/tours/${id}/toggle-active`);
    return data.data;
  },

  toggleTourFeatured: async (id) => {
    const { data } = await axios.patch(`/api/admin/tours/${id}/toggle-featured`);
    return data.data;
  },

  // Visa Management
  getAllVisa: async (params = {}) => {
    const { data } = await axios.get('/api/admin/visa', { params });
    return data.data;
  },

  getVisaById: async (id) => {
    const { data } = await axios.get(`/api/admin/visa/${id}`);
    return data.data;
  },

  createVisa: async (visaData) => {
    const { data } = await axios.post('/api/admin/visa', visaData);
    return data.data;
  },

  updateVisa: async (id, visaData) => {
    const { data } = await axios.put(`/api/admin/visa/${id}`, visaData);
    return data.data;
  },

  deleteVisa: async (id) => {
    const { data } = await axios.delete(`/api/admin/visa/${id}`);
    return data.data;
  },

  toggleVisaPopular: async (id) => {
    const { data } = await axios.patch(`/api/admin/visa/${id}/toggle-popular`);
    return data.data;
  },

  // Review Management
  getAllReviews: async (params = {}) => {
    const { data } = await axios.get('/api/admin/reviews', { params });
    return data.data;
  },

  approveReview: async (id) => {
    const { data } = await axios.patch(`/api/admin/reviews/${id}/approve`);
    return data.data;
  },

  rejectReview: async (id, reason) => {
    const { data } = await axios.patch(`/api/admin/reviews/${id}/reject`, { reason });
    return data.data;
  },

  deleteReview: async (id) => {
    const { data } = await axios.delete(`/api/admin/reviews/${id}`);
    return data.data;
  },

  // Customer Management
  getAllCustomers: async (params = {}) => {
    const { data } = await axios.get('/api/admin/customers', { params });
    return data.data;
  },

  getCustomerById: async (id) => {
    const { data } = await axios.get(`/api/admin/customers/${id}`);
    return data.data;
  },
};
