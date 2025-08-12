import { useState } from 'react';
import { AlertTriangle, Power, RefreshCw, Database, Clock, Save, ArrowRight } from 'lucide-react';

export default function AdminMaintenance() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [scheduledMaintenance, setScheduledMaintenance] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    'We are currently performing scheduled maintenance. Please check back soon.'
  );
  const [maintenanceDate, setMaintenanceDate] = useState('');
  const [maintenanceTime, setMaintenanceTime] = useState('');
  const [maintenanceDuration, setMaintenanceDuration] = useState('60');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const toggleMaintenanceMode = () => {
    setIsConfirmModalOpen(true);
  };

  const confirmToggleMaintenance = () => {
    setMaintenanceMode(!maintenanceMode);
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Maintenance Mode</h1>
        <p className="text-gray-400 mt-1">Control system maintenance and downtime</p>
      </div>

      {/* Current Status */}
      <div className={`p-6 rounded-xl mb-8 ${maintenanceMode ? 'bg-red-500/20 border border-red-500/50' : 'bg-green-500/20 border border-green-500/50'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-full ${maintenanceMode ? 'bg-red-500/30' : 'bg-green-500/30'}`}>
            <Power className={`h-6 w-6 ${maintenanceMode ? 'text-red-500' : 'text-green-500'}`} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">System Status</h2>
            <p className={`${maintenanceMode ? 'text-red-400' : 'text-green-400'}`}>
              {maintenanceMode ? 'Maintenance Mode Active' : 'System Online'}
            </p>
          </div>
        </div>
        <p className="text-gray-300">
          {maintenanceMode
            ? 'The system is currently in maintenance mode. Users will see a maintenance message when they try to access the site.'
            : 'The system is currently online and accessible to all users.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Maintenance Controls */}
        <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-6">Maintenance Controls</h2>

          <div className="space-y-6">
            {/* Toggle Maintenance Mode */}
            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-medium text-white">Maintenance Mode</h3>
                  <p className="text-sm text-gray-400">Enable or disable maintenance mode</p>
                </div>
                <button
                  onClick={toggleMaintenanceMode}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    maintenanceMode
                      ? 'bg-green-500 text-black hover:bg-green-600'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  } transition-colors`}
                >
                  {maintenanceMode ? 'Disable' : 'Enable'}
                </button>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Maintenance Message
                </label>
                <textarea
                  value={maintenanceMessage}
                  onChange={(e) => setMaintenanceMessage(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Schedule Maintenance */}
            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-medium text-white">Schedule Maintenance</h3>
                  <p className="text-sm text-gray-400">Plan maintenance for a future date and time</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={scheduledMaintenance}
                    onChange={() => setScheduledMaintenance(!scheduledMaintenance)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              {scheduledMaintenance && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={maintenanceDate}
                      onChange={(e) => setMaintenanceDate(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      value={maintenanceTime}
                      onChange={(e) => setMaintenanceTime(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={maintenanceDuration}
                      onChange={(e) => setMaintenanceDuration(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button className="w-full px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                      <Clock size={18} />
                      Schedule Maintenance
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Backup Controls */}
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="font-medium text-white mb-4">Database Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="px-4 py-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2">
                  <Database size={18} />
                  Create Backup
                </button>
                <button className="px-4 py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors flex items-center justify-center gap-2">
                  <RefreshCw size={18} />
                  Restore Backup
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance History */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-6">Maintenance History</h2>
          <div className="space-y-4">
            {[
              { date: '2023-08-15', duration: '45 minutes', type: 'Scheduled' },
              { date: '2023-07-22', duration: '30 minutes', type: 'Emergency' },
              { date: '2023-06-10', duration: '60 minutes', type: 'Scheduled' },
              { date: '2023-05-05', duration: '15 minutes', type: 'Emergency' }
            ].map((item, index) => (
              <div key={index} className="p-3 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium">{item.date}</p>
                    <p className="text-sm text-gray-400">Duration: {item.duration}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.type === 'Scheduled' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-green-500 hover:text-green-400 transition-colors flex items-center justify-center gap-1 text-sm">
            View All History <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <h3 className="text-xl font-bold text-white">Confirm Action</h3>
            </div>
            <p className="text-gray-300 mb-6">
              {maintenanceMode 
                ? "Are you sure you want to disable maintenance mode? This will make the system accessible to all users."
                : "Are you sure you want to enable maintenance mode? This will make the system inaccessible to users."}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmToggleMaintenance}
                className={`px-4 py-2 rounded-lg font-medium ${
                  maintenanceMode
                    ? 'bg-green-500 text-black hover:bg-green-600'
                    : 'bg-red-500 text-white hover:bg-red-600'
                } transition-colors`}
              >
                {maintenanceMode ? 'Disable' : 'Enable'} Maintenance Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}