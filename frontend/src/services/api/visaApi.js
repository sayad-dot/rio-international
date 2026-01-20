import axios from '../../lib/axios';

export const visaApi = {
    getAllPackages: async (params) => {
        const response = await axios.get('/visa', { params });
        return response.data;
    },

    getPackageBySlug: async (slug) => {
        const response = await axios.get(`/visa/${slug}`);
        return response.data;
    }
};
