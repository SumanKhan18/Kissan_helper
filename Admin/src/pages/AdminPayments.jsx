import { useState } from 'react';
import { Search, Filter, Download, Eye, ChevronLeft, ChevronRight, CreditCard, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Sample payment data
const PAYMENTS = [
  { 
    id: 'TXN123456',
    customerName: 'Rajesh Kumar',
    customerEmail: 'rajesh@example.com',
    amount: 9999,
    date: '2023-09-15',
    status: 'successful',
    plan: 'Premium',
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'TXN123457',
    customerName: 'Anita Singh',
    customerEmail: 'anita@example.com',
    amount: 4999,
    date: '2023-09-12',
    status: 'successful',
    plan: 'Basic',
    paymentMethod: 'UPI'
  },
  { 
    id: 'TXN123458',
    customerName: 'Suresh Patel',
    customerEmail: 'suresh@example.com',
    amount: 19999,
    date: '2023-09-10',
    status: 'successful',
    plan: 'Enterprise',
    paymentMethod: 'Bank Transfer'
  },
  { 
    id: 'TXN123459',
    customerName: 'Priya Sharma',
    customerEmail: 'priya@example.com',
    amount: 9999,
    date: '2023-09-08',
    status: 'failed',
    plan: 'Premium',
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'TXN123460',
    customerName: 'Vikram Reddy',
    customerEmail: 'vikram@example.com',
    amount: 4999,
    date: '2023-09-05',
    status: 'pending',
    plan: 'Basic',
    paymentMethod: 'UPI'
  },
  { 
    id: 'TXN123461',
    customerName: 'Meena Kumari',
    customerEmail: 'meena@example.com',
    amount: 4999,
    date: '2023-09-03',
    status: 'successful',
    plan: 'Basic',
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'TXN123462',
    customerName: 'Arjun Nair',
    customerEmail: 'arjun@example.com',
    amount: 9999,
    date: '2023-09-01',
    status: 'successful',
    plan: 'Premium',
    paymentMethod: 'Bank Transfer'
  },
];

export default function AdminPayments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const itemsPerPage = 5;

  // Filter payments based on search term and filters
  const filteredPayments = PAYMENTS.filter(payment => {
    const matchesSearch = 
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    const matchesPlan = selectedPlan === 'all' || payment.plan === selectedPlan;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle view payment
  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setIsViewModalOpen(true);
  };

  // Format amount
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Status badge component
  const StatusBadge = () => {
    let bgColor = '';
    let textColor = '';
    let icon = null;
    
    switch (status) {
      case 'successful':
        bgColor = 'bg-green-500/20';
        textColor = 'text-green-500';
        icon = <CheckCircle size={14} className="mr-1" />;
        break;
      case 'failed':
        bgColor = 'bg-red-500/20';
        textColor = 'text-red-500';
        icon = <XCircle size={14} className="mr-1" />;
        break;
      case 'pending':
        bgColor = 'bg-yellow-500/20';
        textColor = 'text-yellow-500';
        icon = <AlertCircle size={14} className="mr-1" />;
        break;
      default:
        bgColor = 'bg-gray-500/20';
        textColor = 'text-gray-400';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} flex items-center`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-gray-400 mt-1">Manage and track all payment transactions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
          <Download size={18} />
          Export Payments
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
                placeholder="Search by name, email, or transaction ID..."
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
                <option value="successful">Successful</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="w-40">
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
              >
                <option value="all">All Plans</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors">
              <Filter size={18} />
              <span className="hidden md:inline">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Transaction ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Plan</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {paginatedPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-800/50">
                  <td className="px-4 py-3 font-mono text-sm text-gray-300">{payment.id}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-white">{payment.customerName}</p>
                      <p className="text-sm text-gray-400">{payment.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-white">{formatAmount(payment.amount)}</td>
                  <td className="px-4 py-3 text-gray-300">{payment.date}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={payment.status} />
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.plan === 'Premium' 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : payment.plan === 'Enterprise' 
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {payment.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={() => handleViewPayment(payment)}
                      className="p-1 text-gray-400 hover:text-white"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 bg-gray-800 border-t border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of {filteredPayments.length} payments
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

      {/* View Payment Modal */}
      {isViewModalOpen && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Payment Details</h3>
                <p className="text-gray-400 text-sm mt-1">Transaction ID: {selectedPayment.id}</p>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                &times;
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-400">Status</span>
                <StatusBadge status={selectedPayment.status} />
              </div>
              
              <div className="p-3 bg-gray-800 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Amount</span>
                  <span className="text-xl font-bold text-white">{formatAmount(selectedPayment.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Plan</span>
                  <span className="text-white">{selectedPayment.plan}</span>
                </div>
              </div>
              
              <div className="p-3 bg-gray-800 rounded-lg">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Customer Information</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name</span>
                    <span className="text-white">{selectedPayment.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email</span>
                    <span className="text-white">{selectedPayment.customerEmail}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-800 rounded-lg">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Payment Information</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date</span>
                    <span className="text-white">{selectedPayment.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Method</span>
                    <div className="flex items-center">
                      <CreditCard size={16} className="text-gray-400 mr-1" />
                      <span className="text-white">{selectedPayment.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
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
    </div>
  );
}