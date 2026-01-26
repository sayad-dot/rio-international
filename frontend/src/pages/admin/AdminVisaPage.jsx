import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus, Search, Edit, Trash2, Star, Globe, 
  Clock, DollarSign, FileText, X, Save, CheckCircle
} from 'lucide-react';
import { adminApi } from '../../services/api/adminApi';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';

const AdminVisaPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingVisa, setEditingVisa] = useState(null);
  const [formData, setFormData] = useState({
    country: '',
    visaType: 'TOURIST',
    processingTime: '',
    validityPeriod: '',
    price: '',
    description: '',
    requirements: [],
    features: []
  });

  // Fetch visa packages
  const { data: visaData, isLoading } = useQuery({
    queryKey: ['admin-visa'],
    queryFn: () => adminApi.getAllVisa(),
  });

  const visaPackages = visaData?.data || [];

  // Toggle popular mutation
  const togglePopularMutation = useMutation({
    mutationFn: (id) => adminApi.toggleVisaPopular(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-visa']);
      alert('Visa popular status updated!');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to update popular status');
    },
  });

  // Delete visa mutation
  const deleteVisaMutation = useMutation({
    mutationFn: (id) => adminApi.deleteVisa(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-visa']);
      alert('Visa package deleted successfully!');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to delete visa package');
    },
  });

  // Create/Update visa mutation
  const saveVisaMutation = useMutation({
    mutationFn: (data) => {
      if (editingVisa) {
        return adminApi.updateVisa(editingVisa.id, data);
      }
      return adminApi.createVisa(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-visa']);
      alert(editingVisa ? 'Visa package updated!' : 'Visa package created!');
      handleCloseModal();
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to save visa package');
    },
  });

  const handleEdit = (visa) => {
    setEditingVisa(visa);
    setFormData({
      country: visa.country,
      visaType: visa.visaType,
      processingTime: visa.processingTime,
      validityPeriod: visa.validityPeriod,
      price: visa.price.toString(),
      description: visa.description,
      requirements: visa.requirements || [],
      features: visa.features || []
    });
    setShowModal(true);
  };

  const handleDelete = (visa) => {
    if (window.confirm(`Delete "${visa.country} ${visa.visaType}" visa package?`)) {
      deleteVisaMutation.mutate(visa.id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingVisa(null);
    setFormData({
      country: '',
      visaType: 'TOURIST',
      processingTime: '',
      validityPeriod: '',
      price: '',
      description: '',
      requirements: [],
      features: []
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const visaData = {
      ...formData,
      price: parseFloat(formData.price),
    };
    
    saveVisaMutation.mutate(visaData);
  };

  const handleArrayInput = (field, value) => {
    const items = value.split('\n').filter(item => item.trim());
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  // Filter visa packages
  const filteredVisaPackages = visaPackages.filter(visa => {
    const matchesSearch = visa.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || visa.visaType === typeFilter;
    return matchesSearch && matchesType;
  });

  const columns = [
    { 
      key: 'country', 
      label: 'Country',
      render: (visa) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{visa.country}</div>
            <div className="text-sm text-gray-500">{visa.visaType} Visa</div>
          </div>
        </div>
      )
    },
    {
      key: 'processingTime',
      label: 'Processing Time',
      render: (visa) => (
        <div className="flex items-center gap-1 text-gray-700">
          <Clock className="h-4 w-4" />
          {visa.processingTime}
        </div>
      )
    },
    {
      key: 'validityPeriod',
      label: 'Validity',
      render: (visa) => (
        <div className="text-gray-700">{visa.validityPeriod}</div>
      )
    },
    {
      key: 'price',
      label: 'Price',
      render: (visa) => (
        <div className="flex items-center gap-1 text-gray-900 font-semibold">
          <DollarSign className="h-4 w-4" />
          ${visa.price.toLocaleString()}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (visa) => (
        visa.isPopular && (
          <Badge variant="warning" className="text-xs">
            <Star className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        )
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (visa) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => togglePopularMutation.mutate(visa.id)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={visa.isPopular ? 'Remove from popular' : 'Mark as popular'}
          >
            <Star className={`h-4 w-4 ${visa.isPopular ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} />
          </button>
          <button
            onClick={() => handleEdit(visa)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit className="h-4 w-4 text-blue-600" />
          </button>
          <button
            onClick={() => handleDelete(visa)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visa Packages</h1>
          <p className="text-gray-600 mt-1">Manage visa services and processing</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          leftIcon={<Plus className="h-5 w-5" />}
        >
          Add Visa Package
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search by country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-5 w-5 text-gray-400" />}
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="TOURIST">Tourist</option>
            <option value="BUSINESS">Business</option>
            <option value="TRANSIT">Transit</option>
            <option value="WORK">Work</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
      </div>

      {/* Visa Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <DataTable
          columns={columns}
          data={filteredVisaPackages}
          isLoading={isLoading}
          emptyMessage="No visa packages found"
        />
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingVisa ? 'Edit Visa Package' : 'Create Visa Package'}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <Input
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                placeholder="e.g., United Arab Emirates"
                leftIcon={<Globe className="h-4 w-4" />}
                required
              />
            </div>

            {/* Visa Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visa Type *
              </label>
              <select
                value={formData.visaType}
                onChange={(e) => setFormData(prev => ({ ...prev, visaType: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="TOURIST">Tourist</option>
                <option value="BUSINESS">Business</option>
                <option value="TRANSIT">Transit</option>
                <option value="WORK">Work</option>
                <option value="STUDENT">Student</option>
              </select>
            </div>

            {/* Processing Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Processing Time *
              </label>
              <Input
                value={formData.processingTime}
                onChange={(e) => setFormData(prev => ({ ...prev, processingTime: e.target.value }))}
                placeholder="e.g., 3-5 business days"
                leftIcon={<Clock className="h-4 w-4" />}
                required
              />
            </div>

            {/* Validity Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Validity Period *
              </label>
              <Input
                value={formData.validityPeriod}
                onChange={(e) => setFormData(prev => ({ ...prev, validityPeriod: e.target.value }))}
                placeholder="e.g., 90 days"
                required
              />
            </div>

            {/* Price */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (USD) *
              </label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="e.g., 350"
                leftIcon={<DollarSign className="h-4 w-4" />}
                required
                min="0"
                step="0.01"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Detailed visa package description..."
                required
              />
            </div>

            {/* Requirements */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirements (one per line)
              </label>
              <textarea
                value={formData.requirements.join('\n')}
                onChange={(e) => handleArrayInput('requirements', e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Valid passport&#10;Passport-size photos&#10;Proof of accommodation&#10;Travel insurance"
              />
            </div>

            {/* Features */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features (one per line)
              </label>
              <textarea
                value={formData.features.join('\n')}
                onChange={(e) => handleArrayInput('features', e.target.value)}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Fast processing&#10;No embassy visit&#10;Online application"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={saveVisaMutation.isPending}
              leftIcon={<Save className="h-4 w-4" />}
            >
              {editingVisa ? 'Update Package' : 'Create Package'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminVisaPage;
