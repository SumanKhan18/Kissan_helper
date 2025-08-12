import { useState } from 'react';
import { Search, Filter, MoreVertical, Edit, Trash2, UserPlus, Download, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample user data
const USERS = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'Farmer', status: 'active', location: 'Punjab', joinDate: '2023-05-12', subscription: 'Premium' },
  { id: 2, name: 'Anita Singh', email: 'anita@example.com', role: 'Farmer', status: 'active', location: 'Haryana', joinDate: '2023-06-18', subscription: 'Basic' },
  { id: 3, name: 'Suresh Patel', email: 'suresh@example.com', role: 'Farmer', status: 'inactive', location: 'Gujarat', joinDate: '2023-04-05', subscription: 'Enterprise' },
  { id: 4, name: 'Priya Sharma', email: 'priya@example.com', role: 'Admin', status: 'active', location: 'Delhi', joinDate: '2023-01-20', subscription: 'Premium' },
  { id: 5, name: 'Vikram Reddy', email: 'vikram@example.com', role: 'Farmer', status: 'active', location: 'Telangana', joinDate: '2023-07-30', subscription: 'Basic' },
  { id: 6, name: 'Meena Kumari', email: 'meena@example.com', role: 'Farmer', status: 'pending', location: 'Bihar', joinDate: '2023-08-15', subscription: 'Basic' },
  { id: 7, name: 'Arjun Nair', email: 'arjun@example.com', role: 'Farmer', status: 'active', location: 'Kerala', joinDate: '2023-03-22', subscription: 'Premium' },
  { id: 8, name: 'Deepak Verma', email: 'deepak@example.com', role: 'Support', status: 'active', location: 'Uttar Pradesh', joinDate: '2023-02-10', subscription: 'Enterprise' },
];

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const itemsPerPage = 5;

  // Filter users based on search term and filters
  const filteredUsers = USERS.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle user selection
  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Handle bulk selection
  const toggleAllSelection = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map(user => user.id));
    }
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = '';
    let textColor = '';
    
    switch (status) {
      case 'active':
        bgColor = 'bg-green-500/20';
        textColor = 'text-green-500';
        break;
      case 'inactive':
        bgColor = 'bg-gray-500/20';
        textColor = 'text-gray-400';
        break;
      case 'pending':
        bgColor = 'bg-yellow-500/20';
        textColor = 'text-yellow-500';
        break;
      default:
        bgColor = 'bg-gray-500/20';
        textColor = 'text-gray-400';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-gray-400 mt-1">Manage user accounts and permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-600 transition-colors">
          <UserPlus size={18} />
          Add User
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-40">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="w-40">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
              >
                <option value="all">All Roles</option>
                <option value="Farmer">Farmer</option>
                <option value="Admin">Admin</option>
                <option value="Support">Support</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors">
              <Filter size={18} />
              <span className="hidden md:inline">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Selected actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-800 flex justify-between items-center">
          <p className="text-white">{selectedUsers.length} users selected</p>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Export Selected
            </button>
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-3 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                      onChange={toggleAllSelection}
                      className="rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">User</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Role</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Location</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Join Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Subscription</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-800/50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{user.role}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-300">{user.location}</td>
                  <td className="px-4 py-3 text-gray-300">{user.joinDate}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.subscription === 'Premium' 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : user.subscription === 'Enterprise' 
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.subscription}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedUsers([user.id]);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="relative">
                        <button className="p-1 text-gray-400 hover:text-white">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 bg-gray-800 border-t border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1 
                  ? 'text-gray-600 cursor-not-allowed' 
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === page
                    ? 'bg-green-500 text-black'
                    : 'text-gray-400 hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages 
                  ? 'text-gray-600 cursor-not-allowed' 
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Export button */}
      <div className="mt-6 flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
          <Download size={18} />
          Export All Users
        </button>
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete {selectedUsers.length === 1 ? 'this user' : 'these users'}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In a real app, you would delete the users here
                  setSelectedUsers([]);
                  setIsDeleteModalOpen(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Edit User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  defaultValue={editingUser.name}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={editingUser.email}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                <select
                  defaultValue={editingUser.role}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                >
                  <option value="Farmer">Farmer</option>
                  <option value="Admin">Admin</option>
                  <option value="Support">Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                <select
                  defaultValue={editingUser.status}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In a real app, you would update the user here
                  setIsEditModalOpen(false);
                }}
                className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}