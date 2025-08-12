import { Link, Outlet, useLocation } from 'react-router-dom';
import { UserCircle, CreditCard, Notebook, FileText, LayoutDashboard, Menu, Settings } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

function UserLayout({ user }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', path: '/user', icon: LayoutDashboard },
    { name: 'Profile', path: '/user/profile', icon: UserCircle },
    { name: 'Transactions', path: '/user/transactions', icon: CreditCard },
    { name: 'Plans', path: '/user/plans', icon: FileText },
    { name: 'Notes', path: '/user/notes', icon: Notebook },
    { name: 'Setting', path: '/user/setting', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-[#0F172A]">
        <div className="text-green-400 font-semibold text-lg">{user.name}</div>
        <button
          className="text-gray-300 focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 w-64 z-40 transform bg-[#0F172A] border-r border-gray-800 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* User Info */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-green-400">{user.name}</h3>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-green-500 text-gray-900'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                  onClick={() => setSidebarOpen(false)} // close on mobile nav click
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Plan Info */}
          <div className="p-4 border-t border-gray-800">
            <div className="bg-[#1E293B] p-3 rounded-lg">
              <p className="text-sm font-medium text-green-500">{user.currentPlan} Plan</p>
              <p className="text-xs text-gray-400">Expires: {user.planExpiry}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml p-4 md:p-8">
        <Outlet />
      </div>
    </div>
  );
}

UserLayout.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profilePic: PropTypes.string.isRequired,
    currentPlan: PropTypes.string.isRequired,
    planExpiry: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserLayout;
