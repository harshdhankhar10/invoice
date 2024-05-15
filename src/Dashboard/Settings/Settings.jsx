import React, { useState, useEffect } from 'react';
import { FaBell, FaPalette, FaLanguage, FaDatabase, FaQuestionCircle, FaTimes, FaMapMarker } from 'react-icons/fa';
import SideNavBar from '../SideNavBar';

const Settings = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [colors, setColors] = useState(['#4A90E2', '#FFB946', '#7ED321', '#9013FE', '#FC3158']);
  const [selectedColor, setSelectedColor] = useState('#4A90E2');
  const [showModal, setShowModal] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const handleNotificationToggle = () => {
    setNotificationEnabled(prevState => !prevState);
    // You can perform additional actions based on the new state, such as subscribing or unsubscribing from notifications
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    document.body.style.backgroundColor = color; // Set background color of body element
    // You can perform additional actions based on the selected color
  };

  const addMoreColors = () => {
    // Add more colors to the color array
    const newColors = [...colors, '#00CED1', '#FF1493', '#32CD32', '#9400D3', '#FF4500'];
    setColors(newColors);
  };

  const handleDataManagement = () => {
    // Perform actions related to data management settings
    // This function can be expanded based on the specific requirements
    console.log("Data management settings updated");
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
    closeModal();
  };

  useEffect(() => {
    // Fetch user's location when component mounts
    fetchUserLocation();
  }, []);

  const fetchUserLocation = () => {
    // Fetch user's location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        error => {
          console.error('Error fetching user location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="flex h-screen">
      <SideNavBar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-8">Settings</h1>
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold flex items-center mb-4" onClick={handleNotificationToggle}>
            <FaBell className="mr-2" /> Notification Settings
            <div className="ml-auto">
              <label htmlFor="notificationToggle" className="flex items-center cursor-pointer">
                <input type="checkbox" id="notificationToggle" className="form-checkbox h-5 w-5 text-blue-600" checked={notificationEnabled} onChange={handleNotificationToggle} />
                <span className="ml-2">Enabled</span>
              </label>
            </div>
          </h2>
          {/* Notification settings UI */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold flex items-center mb-4">
            <FaPalette className="mr-2" /> Theme Settings
          </h2>
          <div className="flex items-center">
            <p className="mr-4">Select Theme Color:</p>
            {colors.map((color, index) => (
              <ColorBox key={index} color={color} onClick={() => handleColorChange(color)} />
            ))}
            <button onClick={addMoreColors} className="text-blue-500 hover:text-blue-600 focus:outline-none ml-4">Add More Colors</button>
          </div>
          {/* Theme settings UI */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold flex items-center mb-4">
            <FaLanguage className="mr-2" /> Language Settings
          </h2>
          {/* Language settings UI */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold flex items-center mb-4">
            <FaDatabase className="mr-2" /> Data Management Settings
          </h2>
          <button onClick={handleDataManagement} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300">
            Update Data Management
          </button>
          {/* Data management settings UI */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold flex items-center mb-4">
            <FaMapMarker className="mr-2" /> Location Settings
          </h2>
          {userLocation && (
            <p className="text-gray-600">Your current location: {userLocation.latitude}, {userLocation.longitude}</p>
          )}
          <button onClick={fetchUserLocation} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300">
            Fetch Location
          </button>
          {/* Location settings UI */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold flex items-center mb-4">
            <FaQuestionCircle className="mr-2" /> Help & Support
          </h2>
          <button onClick={openModal} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300">
            Contact Support
          </button>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
              <div className="bg-white p-8 rounded-lg w-96">
                <div className="flex justify-end">
                  <FaTimes className="text-gray-600 cursor-pointer hover:text-red-500 transition duration-300" onClick={closeModal} />
                </div>
                <h2 className="text-xl font-bold mb-4">Help & Support</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600 font-bold">Your UID:</span>
                    <input type="text" value={localStorage.getItem('userUID')} disabled className="border border-gray-300 rounded-md p-2 bg-gray-100 w-full" />
                  </div>
                  <label className="text-sm">Please enter your query below:</label>
                  <input type="text" placeholder="Name" className="border border-gray-300 rounded-md p-2" required disabled value={localStorage.getItem('user').toUpperCase()} />
                  <input type="email" placeholder="Email" className="border border-gray-300 rounded-md p-2" required disabled value={localStorage.getItem('email')} />
                  <input type="text" placeholder="Subject" className="border border-gray-300 rounded-md p-2" required />
                  <textarea placeholder="Enter your message" rows="4" className="border border-gray-300 rounded-md p-2" required />
                  <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
        {/* Add more settings sections here */}
      </div>
      <style>{`
        .color-box {
          width: 40px;
          height: 40px;
          cursor: pointer;
          border-radius: 8px;
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
}

const ColorBox = ({ color, onClick }) => {
  return (
    <div
      className="color-box"
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
}

export default Settings;
