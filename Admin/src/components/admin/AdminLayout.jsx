import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Settings,
  AlertTriangle,
  LogOut,
  Home,
  Menu,
  UserCircle,
  X,
  Plane as Plant, // This alias is fine if you want to call it "Plant"
} from 'lucide-react';


export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const navItems = [
    {
      path: 'profile',
      icon: (
        <div className="w-11 h-11 ml-17 rounded-full bg-gray-700 flex items-center justify-center">
          <UserCircle size={35} />
        </div>
      ),
    },
    { path: '/layout', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/layout/users', icon: <Users size={20} />, label: 'Users' },
    { path: '/layout/policies', icon: <FileText size={20} />, label: 'Policies' },
    { path: '/layout/broadcast', icon: <Plant size={20} />, label: 'Broadcast' },
    { path: '/layout/shipment', icon: <Plant size={20} />, label: 'Shipment' },
    { path: '/layout/payments', icon: <CreditCard size={20} />, label: 'Payments' },
    { path: '/layout/settings', icon: <Settings size={20} />, label: 'Settings' },
    { path: '/layout/maintenance', icon: <AlertTriangle size={20} />, label: 'Maintenance Mode' },
    { path: '/portal-9508', icon: <Home size={20} />, label: 'Home' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-gray-800 text-white"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-800">
            <Plant className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold text-white">Admin Panel</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/layout'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                        ? 'bg-green-500 text-black font-medium'
                        : 'text-gray-300 hover:bg-gray-800'
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <main className="min-h-screen p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
