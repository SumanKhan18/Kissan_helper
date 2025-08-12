import { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { format } from 'date-fns';

function UserTransactions({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock transactions data
  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 5000,
      description: 'Payment received from John',
      date: new Date(2024, 2, 15),
      category: 'Payment',
      status: 'completed'
    },
    {
      id: 2,
      type: 'debit',
      amount: 2500,
      description: 'Monthly subscription',
      date: new Date(2024, 2, 14),
      category: 'Subscription',
      status: 'completed'
    },
    {
      id: 3,
      type: 'credit',
      amount: 3000,
      description: 'Refund processed',
      date: new Date(2024, 2, 13),
      category: 'Refund',
      status: 'completed'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-500">Transactions</h1>
        <p className="text-gray-500">Manage and track your financial activities</p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900"
          >
            <option value="all">All Types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-gray-100 rounded-lg hover:bg-green-700">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-gray-100 rounded-lg hover:bg-green-700">
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-gray-900 rounded-lg shadow-sm border border-white ">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 border rounded-lg">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {transaction.type === 'credit' ? (
                          <ArrowUpRight className="w-5 h-5 text-green-500" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-300">
                          {transaction.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-800 text-green-600">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(transaction.date, 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

UserTransactions.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired
};

export default UserTransactions;