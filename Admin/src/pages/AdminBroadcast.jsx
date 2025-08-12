import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Users, Clock, AlertTriangle, CheckCircle, X } from 'lucide-react';

export default function AdminBroadcast() {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [priority, setPriority] = useState('normal');
  const [showSuccess, setShowSuccess] = useState(false);
  const [recentBroadcasts, setRecentBroadcasts] = useState([
    {
      id: 1,
      title: "System Maintenance",
      message: "The system will be under maintenance tonight from 2 AM to 4 AM.",
      audience: "all",
      priority: "high",
      timestamp: "2024-03-20T14:30:00",
      deliveredTo: 1250
    },
    {
      id: 2,
      title: "New Feature Alert",
      message: "Check out our new crop analysis tool!",
      audience: "premium",
      priority: "normal",
      timestamp: "2024-03-19T11:15:00",
      deliveredTo: 850
    }
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add the new broadcast to the list
    const newBroadcast = {
      id: Date.now(),
      title,
      message,
      audience: selectedAudience,
      priority,
      timestamp: new Date().toISOString(),
      deliveredTo: Math.floor(Math.random() * 1000) + 500 // Simulated delivery count
    };
    
    setRecentBroadcasts([newBroadcast, ...recentBroadcasts]);
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    // Reset form
    setMessage('');
    setTitle('');
    setSelectedAudience('all');
    setPriority('normal');
  };

  return (
    <div className="text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Broadcast Messages</h1>
        <p className="text-gray-400 mt-1">Send announcements to your users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Broadcast Form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-xl border border-gray-800 p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Message Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  placeholder="Enter broadcast title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Message Content
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  placeholder="Type your broadcast message..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Target Audience
                  </label>
                  <select
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="all">All Users</option>
                    <option value="premium">Premium Users</option>
                    <option value="free">Free Users</option>
                    <option value="inactive">Inactive Users</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Broadcast
                </button>
              </div>
            </form>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-4 right-4 bg-green-500 text-black px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Broadcast sent successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats and Info */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-4">Broadcast Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-300">Total Recipients</span>
                </div>
                <span className="text-white font-medium">2,547</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span className="text-gray-300">Avg. Read Time</span>
                </div>
                <span className="text-white font-medium">2.5 mins</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-300">Failed Deliveries</span>
                </div>
                <span className="text-white font-medium">12</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Broadcasts</h3>
            <div className="space-y-4">
              {recentBroadcasts.map((broadcast) => (
                <div
                  key={broadcast.id}
                  className="p-4 bg-gray-800 rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-white">{broadcast.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      broadcast.priority === 'high'
                        ? 'bg-red-500/20 text-red-500'
                        : broadcast.priority === 'urgent'
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-blue-500/20 text-blue-500'
                    }`}>
                      {broadcast.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{broadcast.message}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Delivered to {broadcast.deliveredTo} users</span>
                    <span>{new Date(broadcast.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}