import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';

// Sample data for charts
const userActivityData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 600 },
  { name: 'Apr', users: 800 },
  { name: 'May', users: 700 },
  { name: 'Jun', users: 900 },
  { name: 'Jul', users: 1000 },
];

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 8000 },
  { name: 'May', revenue: 7000 },
  { name: 'Jun', revenue: 9000 },
  { name: 'Jul', revenue: 10000 },
];

const planDistributionData = [
  { name: 'Basic', value: 400 },
  { name: 'Premium', value: 300 },
  { name: 'Enterprise', value: 150 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    // For now, we'll use mock data
    setStats({
      totalUsers: 0,
      activeUsers: 0,
      totalRevenue: 0,
      monthlyRevenue: 0
    });
  }, []);

  const StatCard = ({ title, value, icon, change, isPositive }) => (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-white ">{value}</h3>
        </div>
        <div className="p-3 bg-gray-800 rounded-lg">
          {icon}
        </div>
      </div>
      {change && (
        <div className="flex items-center gap-1">
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {change}
          </span>
          <span className="text-gray-400 text-sm">vs last month</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400 mt-">Welcome to the Kissan Helper admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers.toLocaleString()} 
          icon={<Users className="w-6 h-6 text-blue-500" />}
          change="12.5%"
          isPositive={true}
        />
        <StatCard 
          title="Active Users" 
          value={stats.activeUsers.toLocaleString()} 
          icon={<Users className="w-6 h-6 text-green-500" />}
          change="8.2%"
          isPositive={true}
        />
        <StatCard 
          title="Total Revenue" 
          value={`₹${stats.totalRevenue.toLocaleString()}`} 
          icon={<CreditCard className="w-6 h-6 text-purple-500" />}
          change="15.3%"
          isPositive={true}
        />
        <StatCard 
          title="Monthly Revenue" 
          value={`₹${stats.monthlyRevenue.toLocaleString()}`} 
          icon={<TrendingUp className="w-6 h-6 text-yellow-500" />}
          change="2.8%"
          isPositive={false}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-6">User Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#F9FAFB' }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Legend />
              <Bar dataKey="users" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-6">Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#F9FAFB' }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plan Distribution */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-6">Plan Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={planDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {planDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#F9FAFB' }}
                labelStyle={{ color: '#F9FAFB' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-800">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-white font-medium">New user registered</p>
                  <p className="text-gray-400 text-sm">User ID: #12345{item}</p>
                  <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 text-green-500 hover:text-green-400 transition-colors">
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
}