import axios from '../../lib/axios';

export const tourApi = {
    getAllTours: async (params) => {
        const response = await axios.get('/tours', { params });
        return response.data;
    },

    getFeaturedTours: async () => {
        const response = await axios.get('/tours/featured');
        return response.data;
    },

    getTourBySlug: async (slug) => {
        const response = await axios.get(`/tours/slug/${slug}`);
        return response.data;
    },

    getTourById: async (id) => {
        const response = await axios.get(`/tours/${id}`);
        return response.data;
    }
};
