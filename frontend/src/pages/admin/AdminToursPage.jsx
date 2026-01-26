import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, EyeOff, 
  Star, MapPin, Calendar, DollarSign, Users, Image as ImageIcon,
  X, Save, Upload
} from 'lucide-react';
import { adminApi } from '../../services/api/adminApi';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';

const AdminToursPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    destination: '',
    duration: '',
    price: '',
    maxGroupSize: '',
    difficulty: 'MODERATE',
    images: [],
    highlights: [],
    included: [],
    excluded: []
  });

  // Fetch tours
  const { data: toursData, isLoading } = useQuery({
    queryKey: ['admin-tours'],
    queryFn: () => adminApi.getAllTours(),
  });

  const tours = toursData?.data || [];

  // Toggle tour status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: (id) => adminApi.toggleTourStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-tours']);
      alert('Tour status updated successfully!');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to update tour status');
    },
  });

  // Toggle featured mutation
  const toggleFeaturedMutation = useMutation({
    mutationFn: (id) => adminApi.toggleTourFeatured(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-tours']);
      alert('Tour featured status updated!');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to update featured status');
    },
  });

  // Delete tour mutation
  const deleteTourMutation = useMutation({
    mutationFn: (id) => adminApi.deleteTour(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-tours']);
      alert('Tour deleted successfully!');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to delete tour');
    },
  });

  // Create/Update tour mutation
  const saveTourMutation = useMutation({
    mutationFn: (data) => {
      if (editingTour) {
        return adminApi.updateTour(editingTour.id, data);
      }
      return adminApi.createTour(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-tours']);
      alert(editingTour ? 'Tour updated successfully!' : 'Tour created successfully!');
      handleCloseModal();
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to save tour');
    },
  });

  const handleEdit = (tour) => {
    setEditingTour(tour);
    setFormData({
      title: tour.title,
      description: tour.description,
      destination: tour.destination,
      duration: tour.duration.toString(),
      price: tour.price.toString(),
      maxGroupSize: tour.maxGroupSize.toString(),
      difficulty: tour.difficulty,
      images: tour.images || [],
      highlights: tour.highlights || [],
      included: tour.included || [],
      excluded: tour.excluded || []
    });
    setShowModal(true);
  };

  const handleDelete = (tour) => {
    if (window.confirm(`Are you sure you want to delete "${tour.title}"?`)) {
      deleteTourMutation.mutate(tour.id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTour(null);
    setFormData({
      title: '',
      description: '',
      destination: '',
      duration: '',
      price: '',
      maxGroupSize: '',
      difficulty: 'MODERATE',
      images: [],
      highlights: [],
      included: [],
      excluded: []
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const tourData = {
      ...formData,
      duration: parseInt(formData.duration),
      price: parseFloat(formData.price),
      maxGroupSize: parseInt(formData.maxGroupSize),
    };
    
    saveTourMutation.mutate(tourData);
  };

  const handleArrayInput = (field, value) => {
    const items = value.split('\n').filter(item => item.trim());
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  // Filter tours
  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && tour.isActive) ||
                         (statusFilter === 'inactive' && !tour.isActive);
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { 
      key: 'title', 
      label: 'Tour',
      render: (tour) => (
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
            {tour.images?.[0] ? (
              <img 
                src={tour.images[0]} 
                alt={tour.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{tour.title}</div>
            <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {tour.destination}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'duration',
      label: 'Duration',
      render: (tour) => (
        <div className="flex items-center gap-1 text-gray-700">
          <Calendar className="h-4 w-4" />
          {tour.duration} days
        </div>
      )
    },
    {
      key: 'price',
      label: 'Price',
      render: (tour) => (
        <div className="flex items-center gap-1 text-gray-900 font-semibold">
          <DollarSign className="h-4 w-4" />
          ${tour.price.toLocaleString()}
        </div>
      )
    },
    {
      key: 'maxGroupSize',
      label: 'Group Size',
      render: (tour) => (
        <div className="flex items-center gap-1 text-gray-700">
          <Users className="h-4 w-4" />
          {tour.maxGroupSize}
        </div>
      )
    },
    {
      key: 'difficulty',
      label: 'Difficulty',
      render: (tour) => {
        const colors = {
          EASY: 'success',
          MODERATE: 'warning',
          CHALLENGING: 'error'
        };
        return <Badge variant={colors[tour.difficulty]}>{tour.difficulty}</Badge>;
      }
    },
    {
      key: 'status',
      label: 'Status',
      render: (tour) => (
        <div className="flex flex-col gap-1">
          <Badge variant={tour.isActive ? 'success' : 'default'}>
            {tour.isActive ? 'Active' : 'Inactive'}
          </Badge>
          {tour.isFeatured && (
            <Badge variant="warning" className="text-xs">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (tour) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleStatusMutation.mutate(tour.id)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={tour.isActive ? 'Deactivate' : 'Activate'}
          >
            {tour.isActive ? (
              <EyeOff className="h-4 w-4 text-gray-600" />
            ) : (
              <Eye className="h-4 w-4 text-gray-600" />
            )}
          </button>
          <button
            onClick={() => toggleFeaturedMutation.mutate(tour.id)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={tour.isFeatured ? 'Remove from featured' : 'Mark as featured'}
          >
            <Star className={`h-4 w-4 ${tour.isFeatured ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} />
          </button>
          <button
            onClick={() => handleEdit(tour)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit className="h-4 w-4 text-blue-600" />
          </button>
          <button
            onClick={() => handleDelete(tour)}
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
          <h1 className="text-3xl font-bold text-gray-900">Tours Management</h1>
          <p className="text-gray-600 mt-1">Manage tour packages and destinations</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          leftIcon={<Plus className="h-5 w-5" />}
        >
          Add New Tour
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search tours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-5 w-5 text-gray-400" />}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Tours Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <DataTable
          columns={columns}
          data={filteredTours}
          isLoading={isLoading}
          emptyMessage="No tours found"
        />
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingTour ? 'Edit Tour' : 'Create New Tour'}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tour Title *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Magical Dubai Experience"
                required
              />
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination *
              </label>
              <Input
                value={formData.destination}
                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                placeholder="e.g., Dubai, UAE"
                leftIcon={<MapPin className="h-4 w-4" />}
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (days) *
              </label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 7"
                leftIcon={<Calendar className="h-4 w-4" />}
                required
                min="1"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (USD) *
              </label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="e.g., 1500"
                leftIcon={<DollarSign className="h-4 w-4" />}
                required
                min="0"
                step="0.01"
              />
            </div>

            {/* Max Group Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Group Size *
              </label>
              <Input
                type="number"
                value={formData.maxGroupSize}
                onChange={(e) => setFormData(prev => ({ ...prev, maxGroupSize: e.target.value }))}
                placeholder="e.g., 15"
                leftIcon={<Users className="h-4 w-4" />}
                required
                min="1"
              />
            </div>

            {/* Difficulty */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level *
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="EASY">Easy</option>
                <option value="MODERATE">Moderate</option>
                <option value="CHALLENGING">Challenging</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Detailed tour description..."
                required
              />
            </div>

            {/* Highlights */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Highlights (one per line)
              </label>
              <textarea
                value={formData.highlights.join('\n')}
                onChange={(e) => handleArrayInput('highlights', e.target.value)}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Burj Khalifa visit&#10;Desert safari&#10;Dubai Marina cruise"
              />
            </div>

            {/* Included */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Included (one per line)
              </label>
              <textarea
                value={formData.included.join('\n')}
                onChange={(e) => handleArrayInput('included', e.target.value)}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Hotel accommodation&#10;Meals&#10;Transfers"
              />
            </div>

            {/* Excluded */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excluded (one per line)
              </label>
              <textarea
                value={formData.excluded.join('\n')}
                onChange={(e) => handleArrayInput('excluded', e.target.value)}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Flights&#10;Personal expenses&#10;Travel insurance"
              />
            </div>

            {/* Images */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URLs (one per line)
              </label>
              <textarea
                value={formData.images.join('\n')}
                onChange={(e) => handleArrayInput('images', e.target.value)}
                rows="2"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
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
              loading={saveTourMutation.isPending}
              leftIcon={<Save className="h-4 w-4" />}
            >
              {editingTour ? 'Update Tour' : 'Create Tour'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminToursPage;
