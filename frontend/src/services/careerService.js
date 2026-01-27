import api from '../lib/axios';

export const careerService = {
  // Get all active jobs
  async getJobs() {
    const response = await api.get('/jobs');
    return response.data;
  },

  // Get single job by ID
  async getJobById(id) {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  // Apply for a job
  async applyForJob(jobId, applicationData) {
    const response = await api.post(`/jobs/${jobId}/apply`, applicationData);
    return response.data;
  }
};

export const adminCareerService = {
  // Get all jobs (admin)
  async getAllJobs() {
    const response = await api.get('/admin/jobs');
    return response.data;
  },

  // Create new job
  async createJob(jobData) {
    const response = await api.post('/admin/jobs', jobData);
    return response.data;
  },

  // Update job
  async updateJob(id, jobData) {
    const response = await api.put(`/admin/jobs/${id}`, jobData);
    return response.data;
  },

  // Delete job
  async deleteJob(id) {
    const response = await api.delete(`/admin/jobs/${id}`);
    return response.data;
  },

  // Get all applications
  async getAllApplications(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/admin/applications?${params}`);
    return response.data;
  },

  // Get single application
  async getApplicationById(id) {
    const response = await api.get(`/admin/applications/${id}`);
    return response.data;
  },

  // Update application status
  async updateApplicationStatus(id, statusData) {
    const response = await api.patch(`/admin/applications/${id}`, statusData);
    return response.data;
  }
};
