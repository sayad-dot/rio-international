import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Eye, Download, Filter, Calendar, DollarSign,
  CheckCircle, XCircle, Clock, AlertCircle
} from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { adminApi } from '../../services/api/adminApi';

const AdminBookingsPage = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    status: 'all',
    paymentStatus: 'all',
    dateFrom: '',
    dateTo: '',
  });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Fetch bookings
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings', filters],
    queryFn: () => adminApi.getAllBookings(filters),
  });

  // Update booking status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => adminApi.updateBookingStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-bookings']);
      alert('Booking status updated successfully');
    },
    onError: () => {
      alert('Failed to update booking status');
    },
  });

  // Update payment status mutation
  const updatePaymentMutation = useMutation({
    mutationFn: ({ id, paymentStatus }) => adminApi.updatePaymentStatus(id, paymentStatus),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-bookings']);
      alert('Payment status updated successfully');
    },
    onError: () => {
      alert('Failed to update payment status');
    },
  });

  // Export bookings
  const handleExport = async () => {
    try {
      const blob = await adminApi.exportBookings(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bookings-${new Date().toISOString()}.csv`;
      a.click();
      alert('Bookings exported successfully');
    } catch (error) {
      alert('Failed to export bookings');
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const getStatusBadge = (status) => {
    const variants = {
      PENDING: 'warning',
      CONFIRMED: 'success',
      CANCELLED: 'error',
      COMPLETED: 'default',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const getPaymentBadge = (status) => {
    const variants = {
      PENDING: 'warning',
      PARTIAL: 'info',
      PAID: 'success',
      REFUNDED: 'error',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const columns = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      render: (value) => <span className="font-mono text-xs">#{value}</span>,
    },
    {
      key: 'customerName',
      label: 'Customer',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{row.customerEmail}</p>
        </div>
      ),
    },
    {
      key: 'packageName',
      label: 'Package',
      sortable: true,
    },
    {
      key: 'travelDate',
      label: 'Travel Date',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'totalAmount',
      label: 'Amount',
      sortable: true,
      render: (value) => <span className="font-semibold">BDT {value.toLocaleString()}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: getStatusBadge,
    },
    {
      key: 'paymentStatus',
      label: 'Payment',
      sortable: true,
      render: getPaymentBadge,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleViewDetails(row)}
        >
          <Eye className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-500 mt-1">Manage and track all customer bookings</p>
        </div>
        <Button onClick={handleExport} className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Booking Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Status
            </label>
            <select
              value={filters.paymentStatus}
              onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Payments</option>
              <option value="PENDING">Pending</option>
              <option value="PARTIAL">Partial</option>
              <option value="PAID">Paid</option>
              <option value="REFUNDED">Refunded</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date From
            </label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date To
            </label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Bookings Table */}
      <DataTable
        columns={columns}
        data={bookings || []}
        loading={isLoading}
        searchable={true}
        pagination={true}
        onRowClick={handleViewDetails}
        emptyMessage="No bookings found"
      />

      {/* Booking Details Modal */}
      {selectedBooking && (
        <Modal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          title="Booking Details"
          size="lg"
        >
          <div className="space-y-6">
            {/* Customer Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Customer Information</h3>
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="font-medium">{selectedBooking.customerName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium">{selectedBooking.customerEmail}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium">{selectedBooking.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Travelers</p>
                  <p className="font-medium">{selectedBooking.numberOfTravelers} persons</p>
                </div>
              </div>
            </div>

            {/* Package Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Package Details</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">{selectedBooking.packageName}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedBooking.travelDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    BDT {selectedBooking.totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Status Updates */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Update Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Booking Status</label>
                  <select
                    value={selectedBooking.status}
                    onChange={(e) => updateStatusMutation.mutate({ 
                      id: selectedBooking.id, 
                      status: e.target.value 
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Payment Status</label>
                  <select
                    value={selectedBooking.paymentStatus}
                    onChange={(e) => updatePaymentMutation.mutate({ 
                      id: selectedBooking.id, 
                      paymentStatus: e.target.value 
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PARTIAL">Partial</option>
                    <option value="PAID">Paid</option>
                    <option value="REFUNDED">Refunded</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {selectedBooking.specialRequests && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Special Requests</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{selectedBooking.specialRequests}</p>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminBookingsPage;
