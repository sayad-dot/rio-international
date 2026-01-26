import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Search, Filter, Mail, Phone, Calendar, 
  User, DollarSign, Package, Eye
} from 'lucide-react';
import { adminApi } from '../../services/api/adminApi';
import DataTable from '../../components/admin/DataTable';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

const AdminCustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Fetch customers
  const { data: customersData, isLoading } = useQuery({
    queryKey: ['admin-customers'],
    queryFn: () => adminApi.getAllCustomers(),
  });

  const customers = customersData?.data || [];

  const handleViewDetails = async (customer) => {
    try {
      const response = await adminApi.getCustomerById(customer.id);
      setSelectedCustomer(response.data);
      setShowDetailsModal(true);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to fetch customer details');
    }
  };

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const columns = [
    { 
      key: 'customer', 
      label: 'Customer',
      render: (customer) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-lg">
              {customer.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{customer.name}</div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {customer.email}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (customer) => (
        customer.phone ? (
          <div className="flex items-center gap-1 text-gray-700">
            <Phone className="h-4 w-4" />
            {customer.phone}
          </div>
        ) : (
          <span className="text-gray-400">Not provided</span>
        )
      )
    },
    {
      key: 'bookings',
      label: 'Bookings',
      render: (customer) => (
        <div className="flex items-center gap-1 text-gray-900 font-semibold">
          <Package className="h-4 w-4" />
          {customer._count?.bookings || 0}
        </div>
      )
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      render: (customer) => {
        const total = customer.bookings?.reduce((sum, booking) => {
          return sum + (booking.totalAmount || 0);
        }, 0) || 0;
        
        return (
          <div className="flex items-center gap-1 text-gray-900 font-semibold">
            <DollarSign className="h-4 w-4" />
            ${total.toLocaleString()}
          </div>
        );
      }
    },
    {
      key: 'joinedAt',
      label: 'Joined',
      render: (customer) => (
        <div className="text-sm text-gray-600">
          {new Date(customer.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      render: (customer) => (
        <Badge variant={customer.role === 'ADMIN' || customer.role === 'SUPER_ADMIN' ? 'error' : 'default'}>
          {customer.role}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (customer) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleViewDetails(customer)}
          leftIcon={<Eye className="h-4 w-4" />}
        >
          View
        </Button>
      )
    }
  ];

  // Stats
  const stats = {
    total: customers.length,
    totalBookings: customers.reduce((sum, c) => sum + (c._count?.bookings || 0), 0),
    totalRevenue: customers.reduce((sum, customer) => {
      const customerTotal = customer.bookings?.reduce((s, b) => s + (b.totalAmount || 0), 0) || 0;
      return sum + customerTotal;
    }, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customers Directory</h1>
        <p className="text-gray-600 mt-1">View and manage customer information</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Package className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <Input
          placeholder="Search customers by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="h-5 w-5 text-gray-400" />}
        />
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <DataTable
          columns={columns}
          data={filteredCustomers}
          isLoading={isLoading}
          emptyMessage="No customers found"
        />
      </div>

      {/* Customer Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedCustomer(null);
        }}
        title="Customer Details"
        size="xl"
      >
        {selectedCustomer && (
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">
                    {selectedCustomer.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedCustomer.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {selectedCustomer.email}
                    </div>
                    {selectedCustomer.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {selectedCustomer.phone}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking History */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Booking History ({selectedCustomer.bookings?.length || 0})
              </h4>
              
              {selectedCustomer.bookings && selectedCustomer.bookings.length > 0 ? (
                <div className="space-y-3">
                  {selectedCustomer.bookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">
                            {booking.tour?.title || 'Tour Deleted'}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {booking.tour?.destination || ''}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(booking.bookingDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {booking.numberOfPeople} people
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            ${booking.totalAmount.toLocaleString()}
                          </div>
                          <Badge 
                            variant={
                              booking.bookingStatus === 'CONFIRMED' ? 'success' :
                              booking.bookingStatus === 'PENDING' ? 'warning' :
                              booking.bookingStatus === 'CANCELLED' ? 'error' : 'default'
                            }
                            className="mt-2"
                          >
                            {booking.bookingStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No bookings yet
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminCustomersPage;
