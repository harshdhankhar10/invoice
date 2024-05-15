import React, { useState, useEffect } from 'react';
import SideNavBar from '../SideNavBar';
import { app } from '../../Firebase/Firebase'; 

const Profile = () => {
  const [ipv4Address, setIpv4Address] = useState('');
  const [ipv6Address, setIpv6Address] = useState('');

  useEffect(() => {
    // Fetch IPv4 and IPv6 addresses using ipify API
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIpv4Address(data.ip))
      .catch(error => console.error('Error fetching IPv4 address:', error));

    fetch('https://api64.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIpv6Address(data.ip))
      .catch(error => console.error('Error fetching IPv6 address:', error));
  }, []);

  return (
    <div className="flex h-screen bg-gray-200">
      <SideNavBar />
      <div className="flex-grow p-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Profile</h1>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">IP Addresses</h2>
                <div className="flex gap-3 items-center">
                  <span className="text-gray-600">IPv4:</span>
                  <span className="text-gray-800">{ipv4Address}</span>
                </div>
                <div className="flex justify-between items-center mt-2 gap-3">
                  <span className="text-gray-600">IPv6:</span>
                  <span className="text-gray-800">{ipv6Address}</span>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">User Details</h2>
                <div className="flex items-center space-x-4">
                  <img src={localStorage.getItem('photoURL')} alt="Avatar" className="w-16 h-16 rounded-full" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{localStorage.getItem('user')}</h3>
                    <p className="text-gray-600">{localStorage.getItem('email')}</p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Your UID</h2>
                <input type="text" value={localStorage.getItem('userUID')} className="w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500" disabled />
              </div>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md mt-4 mb-8 focus:outline-none focus:ring focus:ring-blue-300 block mx-auto">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
