import { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, ChevronLeft, ChevronRight, Calendar, Building2, Users, FileText } from 'lucide-react';

// Sample policy data
const POLICIES = [
  { 
    id: 1, 
    title: 'PM-KISAN Scheme', 
    description: 'Direct income support to farmers for agricultural expenses',
    category: 'subsidy',
    eligibility: 'Small and marginal farmers with cultivable land',
    benefits: '₹6,000 per year in three equal installments',
    deadline: '2023-12-31',
    status: 'active'
  },
  { 
    id: 2, 
    title: 'Kisan Credit Card', 
    description: 'Easy access to credit for agricultural needs',
    category: 'loan',
    eligibility: 'All farmers, including tenant farmers',
    benefits: 'Credit limit based on land holding and crop pattern',
    deadline: '2024-03-15',
    status: 'active'
  },
  { 
    id: 3, 
    title: 'Pradhan Mantri Fasal Bima Yojana', 
    description: 'Crop insurance scheme for farmers',
    category: 'insurance',
    eligibility: 'Farmers growing notified crops',
    benefits: 'Insurance coverage for crop loss due to natural calamities',
    deadline: '2023-11-30',
    status: 'active'
  },
  { 
    id: 4, 
    title: 'Soil Health Card Scheme', 
    description: 'Provides information on soil health to farmers',
    category: 'support',
    eligibility: 'All farmers',
    benefits: 'Soil health assessment and recommendations',
    deadline: '2024-02-28',
    status: 'inactive'
  },
  { 
    id: 5, 
    title: 'National Mission for Sustainable Agriculture', 
    description: 'Promotes sustainable farming practices',
    category: 'support',
    eligibility: 'Farmers willing to adopt sustainable practices',
    benefits: 'Financial assistance for sustainable farming techniques',
    deadline: '2024-01-15',
    status: 'draft'
  },
];

export default function AdminPolicies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const itemsPerPage = 5;

  // Filter policies based on search term and filters
  const filteredPolicies = POLICIES.filter(policy => {
    const matchesSearch = 
      policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || policy.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || policy.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPolicies.length / itemsPerPage);
  const paginatedPolicies = filteredPolicies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle view policy
  const handleViewPolicy = (policy) => {
    setSelectedPolicy(policy);
    setIsViewModalOpen(true);
  };

  // Handle edit policy
  const handleEditPolicy = (policy) => {
    setSelectedPolicy(policy);
    setIsEditModalOpen(true);
  };

  // Handle delete policy
  const handleDeletePolicy = (policy) => {
    setSelectedPolicy(policy);
    setIsDeleteModalOpen(true);
  };

  // Category icon component
  const CategoryIcon = ({category}) => {
    switch (category) {
      case 'subsidy':
        return <Building2 size={18} className="text-green-500" />;
      case 'loan':
        return <FileText size={18} className="text-blue-500" />;
      case 'insurance':
        return <Users size={18} className="text-purple-500" />;
      case 'support':
        return <Calendar size={18} className="text-yellow-500" />;
      default:
        return <FileText size={18} className="text-gray-500" />;
    }
  };

  // Status badge component
  const StatusBadge = () => {
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
      case 'draft':
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
          <h1 className="text-3xl font-bold">Government Policies</h1>
          <p className="text-gray-400 mt-1">Manage agricultural policies and schemes</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-600 transition-colors"
        >
          <Plus size={18} />
          Add Policy
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
                placeholder="Search policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-40">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
              >
                <option value="all">All Categories</option>
                <option value="subsidy">Subsidies</option>
                <option value="loan">Loans</option>
                <option value="insurance">Insurance</option>
                <option value="support">Support</option>
              </select>
            </div>
            <div className="w-40">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors">
              <Filter size={18} />
              <span className="hidden md:inline">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Policies Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Policy</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Deadline</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {paginatedPolicies.map((policy) => (
                <tr key={policy.id} className="hover:bg-gray-800/50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-white">{policy.title}</p>
                      <p className="text-sm text-gray-400 truncate max-w-xs">{policy.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <CategoryIcon category={policy.category} />
                      <span className="text-gray-300 capitalize">{policy.category}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={policy.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-300">{policy.deadline}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleViewPolicy(policy)}
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditPolicy(policy)}
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeletePolicy(policy)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
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
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPolicies.length)} of {filteredPolicies.length} policies
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

      {/* View Policy Modal */}
      {isViewModalOpen && selectedPolicy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedPolicy.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <CategoryIcon category={selectedPolicy.category} />
                  <span className="text-gray-300 capitalize">{selectedPolicy.category}</span>
                  <StatusBadge status={selectedPolicy.status} />
                </div>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                &times;
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Description</h4>
                <p className="text-white">{selectedPolicy.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Eligibility</h4>
                  <p className="text-white">{selectedPolicy.eligibility}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Benefits</h4>
                  <p className="text-white">{selectedPolicy.benefits}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Deadline</h4>
                <p className="text-white">{selectedPolicy.deadline}</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleEditPolicy(selectedPolicy);
                }}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Policy Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-white">
                {isAddModalOpen ? 'Add New Policy' : 'Edit Policy'}
              </h3>
              <button
                onClick={() => isAddModalOpen ? setIsAddModalOpen(false) : setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                &times;
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  defaultValue={selectedPolicy?.title || ''}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  defaultValue={selectedPolicy?.description || ''}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                  <select
                    defaultValue={selectedPolicy?.category || 'subsidy'}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="subsidy">Subsidy</option>
                    <option value="loan">Loan</option>
                    <option value="insurance">Insurance</option>
                    <option value="support">Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <select
                    defaultValue={selectedPolicy?.status || 'draft'}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Eligibility</label>
                <textarea
                  defaultValue={selectedPolicy?.eligibility || ''}
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Benefits</label>
                <textarea
                  defaultValue={selectedPolicy?.benefits || ''}
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Deadline</label>
                <input
                  type="date"
                  defaultValue={selectedPolicy?.deadline || ''}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </form>
            
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => isAddModalOpen ? setIsAddModalOpen(false) : setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In a real app, you would save the policy here
                  isAddModalOpen ? setIsAddModalOpen(false) : setIsEditModalOpen(false);
                }}
                className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors"
              >
                {isAddModalOpen ? 'Add Policy' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedPolicy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete the policy ? This action cannot be undone.
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
                  // In a real app, you would delete the policy here
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
    </div>
  );
}