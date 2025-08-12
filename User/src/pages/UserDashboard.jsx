import PropTypes from 'prop-types';
import { Activity, TrendingUp, Users,  IndianRupee  } from 'lucide-react';

function UserDashboard({ user }) {
  const stats = [
    {
      name: 'Total Transactions',
      value: '₹0',
      change: '0%',
      icon: Activity,
      trend: 'up'
    },
    {
      name: 'Active Notes',
      value: '0',
      change: '0%',
      icon: TrendingUp,
      trend: 'up'
    },
    {
      name: 'Shared Files',
      value: '0',
      change: '+8.2%',
      icon: Users,
      trend: 'up'
    },
    {
      name: 'Monthly Spending',
      value: '₹0',
      change: '0%',
      icon: IndianRupee,
      trend: 'down'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-500">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-500">Here's what's happening with your account.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-300">{stat.value}</h3>
              <p className="text-gray-500 text-sm">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-green-500 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">New transaction recorded</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">View</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

UserDashboard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default UserDashboard;