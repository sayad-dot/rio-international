import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Search, Plus, Edit, Trash2, Mail, Shield, 
  User, Calendar, Activity, Lock, UserCog
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { adminApi } from '../../services/api/adminApi';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';

const AdminEmployeesPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    role: 'ADMIN',
    password: ''
  });

  // Check if user is SUPER_ADMIN
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  // Fetch employees (admin and super_admin users)
  const { data: employeesData, isLoading } = useQuery({
    queryKey: ['admin-employees'],
    queryFn: () => adminApi.getAllCustomers(), // Will need to filter for admin roles
    enabled: isSuperAdmin,
  });

  const allUsers = employeesData?.data || [];
  const employees = allUsers.filter(u => u.role === 'ADMIN' || u.role === 'SUPER_ADMIN');

  // Create employee mutation (register new admin)
  const createEmployeeMutation = useMutation({
    mutationFn: async (data) => {
      // Call admin register endpoint
      const response = await fetch('http://localhost:5000/api/auth/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create employee');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-employees']);
      alert('Employee created successfully!');
      handleCloseModal();
    },
    onError: (error) => {
      alert(error.message || 'Failed to create employee');
    },
  });

  // Update employee role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }) => {
      // This would need a backend endpoint to update user role
      // For now, we'll show an alert
      throw new Error('Role update endpoint not implemented yet');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-employees']);
      alert('Employee role updated!');
    },
    onError: (error) => {
      alert(error.message || 'Failed to update role');
    },
  });

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone || '',
      employeeId: employee.employeeId || '',
      role: employee.role,
      password: ''
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      employeeId: '',
      role: 'ADMIN',
      password: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!editingEmployee) {
      // Create new employee
      createEmployeeMutation.mutate(formData);
    } else {
      // Update employee (role change)
      updateRoleMutation.mutate({
        userId: editingEmployee.id,
        role: formData.role
      });
    }
  };

  // Filter employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const columns = [
    { 
      key: 'employee', 
      label: 'Employee',
      render: (employee) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-lg">
              {employee.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{employee.name}</div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {employee.email}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'employeeId',
      label: 'Employee ID',
      render: (employee) => (
        employee.employeeId ? (
          <div className="font-mono text-sm text-gray-700">
            {employee.employeeId}
          </div>
        ) : (
          <span className="text-gray-400">N/A</span>
        )
      )
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (employee) => (
        employee.phone || <span className="text-gray-400">Not provided</span>
      )
    },
    {
      key: 'role',
      label: 'Role',
      render: (employee) => (
        <Badge variant={employee.role === 'SUPER_ADMIN' ? 'error' : 'warning'}>
          <Shield className="h-3 w-3 mr-1" />
          {employee.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
        </Badge>
      )
    },
    {
      key: 'joinedAt',
      label: 'Joined',
      render: (employee) => (
        <div className="text-sm text-gray-600">
          {new Date(employee.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (employee) => (
        <div className="flex items-center gap-2">
          {employee.id !== user?.id && (
            <button
              onClick={() => handleEdit(employee)}
              className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit Role"
            >
              <Edit className="h-4 w-4 text-blue-600" />
            </button>
          )}
          {employee.id === user?.id && (
            <span className="text-xs text-gray-500">(You)</span>
          )}
        </div>
      )
    }
  ];

  // Access denied for non-super admins
  if (!isSuperAdmin) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-4">
            <Lock className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">
            Only Super Admins can access employee management.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600 mt-1">Manage admin staff and permissions</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          leftIcon={<Plus className="h-5 w-5" />}
        >
          Add Employee
        </Button>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900">{employees.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <UserCog className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Admins</p>
              <p className="text-3xl font-bold text-gray-900">
                {employees.filter(e => e.role === 'ADMIN').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Super Admins</p>
              <p className="text-3xl font-bold text-gray-900">
                {employees.filter(e => e.role === 'SUPER_ADMIN').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <Input
          placeholder="Search employees by name, email, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="h-5 w-5 text-gray-400" />}
        />
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <DataTable
          columns={columns}
          data={filteredEmployees}
          isLoading={isLoading}
          emptyMessage="No employees found"
        />
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="John Doe"
                required
                disabled={editingEmployee}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john@example.com"
                leftIcon={<Mail className="h-4 w-4" />}
                required
                disabled={editingEmployee}
              />
            </div>

            {!editingEmployee && (
              <>
                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1234567890"
                  />
                </div>

                {/* Employee ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID *
                  </label>
                  <Input
                    value={formData.employeeId}
                    onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                    placeholder="EMP-001"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: EMP-XXX (e.g., EMP-001, EMP-123)
                  </p>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Minimum 8 characters"
                    required
                    minLength={8}
                  />
                </div>
              </>
            )}

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {formData.role === 'ADMIN' 
                  ? 'Can manage bookings, tours, visa, and reviews'
                  : 'Full access including employee management'}
              </p>
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
              loading={createEmployeeMutation.isPending || updateRoleMutation.isPending}
            >
              {editingEmployee ? 'Update Role' : 'Create Employee'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminEmployeesPage;
