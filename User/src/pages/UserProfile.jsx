import { useState } from 'react';
import PropTypes from 'prop-types';
import { Camera, Mail, Phone, MapPin, Calendar } from 'lucide-react';

function UserProfile({ user }) {
  const [profileImage, setProfileImage] = useState(user.profilePic);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from to-green-700"></div>

        {/* Profile Section */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative -mt-16">
              <img
                src={profileImage}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-green-700 shadow-lg"
              />
              <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer">
                <Camera className="w-5 h-5 text-green-600" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-green-600">{user.name}</h1>
              <p className="text-gray-500">{user.currentPlan} Plan Member</p>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-green-500">Email</p>
                <p className="font-medium text-gray-300">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-green-500">Phone</p>
                <p className="font-medium text-gray-300">+91 9531760624</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-green-500">Location</p>
                <p className="font-medium text-gray-300">West Bengal, India</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-green-500">Joined</p>
                <p className="font-medium text-gray-300">{user.joinedDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="border-t border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-green-600 mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-300">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <button className="px-4 py-2 bg-green-100 text-blue-600 rounded-lg text-sm font-medium">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-300">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates about your account activity</p>
              </div>
              <button className="px-4 py-2 bg-green-100 text-blue-600 rounded-lg text-sm font-medium">
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profilePic: PropTypes.string.isRequired,
    currentPlan: PropTypes.string.isRequired,
    joinedDate: PropTypes.string.isRequired
  }).isRequired
};

export default UserProfile;