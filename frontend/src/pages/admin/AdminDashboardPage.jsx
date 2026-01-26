import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, Package, DollarSign, Star, MapPin, 
  ArrowUpRight, Eye
} from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { adminApi } from '../../services/api/adminApi';

const AdminDashboardPage = () => {
  const [dateRange, setDateRange] = useState('30days');

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-dashboard-stats', dateRange],
    queryFn: () => adminApi.getDashboardStats(dateRange),
  });

  // Fetch booking trends
  const { data: trends } = useQuery({
    queryKey: ['admin-booking-trends'],
    queryFn: () => adminApi.getBookingTrends(),
  });

  // Fetch popular destinations
  const { data: destinations } = useQuery({
    queryKey: ['admin-popular-destinations'],
    queryFn: () => adminApi.getPopularDestinations(),
  });

  const recentBookings = stats?.recentBookings || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Bookings"
          value={stats?.totalBookings || 0}
          icon={Package}
          trend="up"
          trendValue="+12.5%"
          color="blue"
          loading={statsLoading}
        />
        <StatsCard
          title="Total Revenue"
          value={`BDT ${(stats?.totalRevenue || 0).toLocaleString()}`}
          icon={DollarSign}
          trend="up"
          trendValue="+8.3%"
          color="green"
          loading={statsLoading}
        />
        <StatsCard
          title="Total Customers"
          value={stats?.totalCustomers || 0}
          icon={Users}
          trend="up"
          trendValue="+5.2%"
          color="purple"
          loading={statsLoading}
        />
        <StatsCard
          title="Pending Reviews"
          value={stats?.pendingReviews || 0}
          icon={Star}
          trend="down"
          trendValue="-2.1%"
          color="orange"
          loading={statsLoading}
        />
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Trends */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Booking Trends</h2>
            <p className="text-sm text-gray-500 mt-1">Monthly bookings overview</p>
          </div>
          <div className="space-y-3">
            {trends?.map((trend, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-semibold text-gray-900">{trend.month}</p>
                  <p className="text-sm text-gray-500">{trend.count} bookings</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">BDT {trend.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Popular Destinations */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Popular Destinations</h2>
            <p className="text-sm text-gray-500 mt-1">Top booking destinations</p>
          </div>
          <div className="space-y-4">
            {destinations?.map((dest, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-900">{dest.location}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(dest.count / destinations[0].count) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{dest.count}</p>
                  <p className="text-xs text-gray-500">bookings</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
            <p className="text-sm text-gray-500 mt-1">Latest customer bookings</p>
          </div>
          <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                  Package
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                        {booking.customerName?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{booking.customerName}</p>
                        <p className="text-sm text-gray-500">{booking.customerEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{booking.packageName}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{new Date(booking.travelDate).toLocaleDateString()}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-gray-900">BDT {booking.totalAmount.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={booking.status === 'CONFIRMED' ? 'success' : booking.status === 'PENDING' ? 'warning' : 'default'}>
                      {booking.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
