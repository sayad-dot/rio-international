import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Search, Filter, Check, X, Trash2, Star, 
  User, Calendar, MessageSquare, ThumbsUp
} from 'lucide-react';
import { adminApi } from '../../services/api/adminApi';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

const AdminReviewsPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch reviews
  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: () => adminApi.getAllReviews(),
  });

  const reviews = reviewsData?.data || [];

  // Approve review mutation
  const approveReviewMutation = useMutation({
    mutationFn: (id) => adminApi.approveReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-reviews']);
      alert('Review approved successfully!');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to approve review');
    },
  });

  // Reject review mutation
  const rejectReviewMutation = useMutation({
    mutationFn: (id) => adminApi.rejectReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-reviews']);
      alert('Review rejected successfully!');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to reject review');
    },
  });

  // Delete review mutation
  const deleteReviewMutation = useMutation({
    mutationFn: (id) => adminApi.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-reviews']);
      alert('Review deleted successfully!');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to delete review');
    },
  });

  const handleApprove = (review) => {
    if (window.confirm(`Approve review from ${review.user?.name || 'User'}?`)) {
      approveReviewMutation.mutate(review.id);
    }
  };

  const handleReject = (review) => {
    if (window.confirm(`Reject review from ${review.user?.name || 'User'}?`)) {
      rejectReviewMutation.mutate(review.id);
    }
  };

  const handleDelete = (review) => {
    if (window.confirm(`Permanently delete this review?`)) {
      deleteReviewMutation.mutate(review.id);
    }
  };

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.tour?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'approved' && review.isApproved) ||
      (statusFilter === 'pending' && !review.isApproved);
    
    return matchesSearch && matchesStatus;
  });

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const columns = [
    { 
      key: 'user', 
      label: 'Reviewer',
      render: (review) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">
              {review.user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">
              {review.user?.name || 'Unknown User'}
            </div>
            <div className="text-sm text-gray-500">
              {review.user?.email || 'No email'}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'tour',
      label: 'Tour',
      render: (review) => (
        <div>
          <div className="font-medium text-gray-900">
            {review.tour?.title || 'Tour Deleted'}
          </div>
          <div className="text-sm text-gray-500">
            {review.tour?.destination || ''}
          </div>
        </div>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (review) => (
        <div>
          {renderStars(review.rating)}
          <div className="text-sm text-gray-600 mt-1">
            {review.rating}/5
          </div>
        </div>
      )
    },
    {
      key: 'comment',
      label: 'Review',
      render: (review) => (
        <div className="max-w-md">
          <p className="text-gray-700 line-clamp-2">
            {review.comment}
          </p>
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (review) => (
        <div className="text-sm text-gray-600">
          {new Date(review.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (review) => (
        <Badge variant={review.isApproved ? 'success' : 'warning'}>
          {review.isApproved ? 'Approved' : 'Pending'}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (review) => (
        <div className="flex items-center gap-2">
          {!review.isApproved && (
            <button
              onClick={() => handleApprove(review)}
              className="p-2 hover:bg-green-50 rounded-lg transition-colors group"
              title="Approve"
            >
              <Check className="h-4 w-4 text-green-600" />
            </button>
          )}
          {review.isApproved && (
            <button
              onClick={() => handleReject(review)}
              className="p-2 hover:bg-orange-50 rounded-lg transition-colors"
              title="Reject"
            >
              <X className="h-4 w-4 text-orange-600" />
            </button>
          )}
          <button
            onClick={() => handleDelete(review)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>
        </div>
      )
    }
  ];

  // Stats
  const stats = {
    total: reviews.length,
    approved: reviews.filter(r => r.isApproved).length,
    pending: reviews.filter(r => !r.isApproved).length,
    avgRating: reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reviews Moderation</h1>
        <p className="text-gray-600 mt-1">Review and moderate customer feedback</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Reviews</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Approved</p>
              <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <ThumbsUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Filter className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Rating</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.avgRating}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search reviews..."
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
            <option value="all">All Reviews</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <DataTable
          columns={columns}
          data={filteredReviews}
          isLoading={isLoading}
          emptyMessage="No reviews found"
        />
      </div>
    </div>
  );
};

export default AdminReviewsPage;
