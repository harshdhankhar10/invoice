import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import SideNavBar from '../SideNavBar';

const Notifications = () => {
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]);

  // Function to generate random notifications
  const generateRandomNotifications = () => {
    const randomNotifications = [
      "New message from John Doe",
      "Your order has been shipped",
      "Reminder: Meeting at 2 PM",
      "You have a new friend request",
      "Check out our latest deals!",
    ];
    const randomNotificationList = randomNotifications.map((notification, index) => ({
      id: index,
      message: notification,
    }));
    setNotifications(randomNotificationList);
    setUnreadNotifications(randomNotificationList.length);
  };

  // Initially generate random notifications on component mount
  useState(() => {
    generateRandomNotifications();
  }, []);

  return (
    <div className="flex h-screen">
      <SideNavBar />
      <div className="flex-grow p-8">
      <div className='flex gap-12'>
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
   
      </div>
        <div className="">
          {notifications.map(notification => (
            <div key={notification.id} className="bg-gray-200 rounded-lg shadow p-4 mr-4 mb-4">
              <p className="text-gray-700">{notification.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
