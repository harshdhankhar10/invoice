import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FaHome, FaFileInvoice, FaPlusSquare, FaCog, FaSignOutAlt, FaUserCircle, FaBell, FaCog as FaCogSolid } from 'react-icons/fa';
import { signOut,onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import { app,auth } from '../Firebase/Firebase';
const Sidebar = () => {
  const navigate = useNavigate();
  const logoutWeb = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate('/login');
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Error logging out!');
    }
  }

  return (
    <div className="sidebar h-screen bg-gray-900 text-white" style={{width : "20%"}}>
      <div className="sidebar-content p-4">
        <div className="avatar mb-8 flex items-center gap-3">
         <div>
         <img src={localStorage.getItem('photoURL')} alt="Avatar" className="w-24 h-24 rounded-full mr-4 border border-2 p-1 border-blue-700" />
         </div>
          <h2 className="text-xl font-semibold">Welcome, <span className="text-gray-400 font-bold text-3xl">
            {localStorage.getItem('user').toUpperCase()}
            </span>!</h2>
        </div>
        <div className="navbar my-6">
          <ul className="list-none">
            <NavItem to="/dashboard" icon={<FaHome />} text="Home" />
            <NavItem to="/invoices" icon={<FaFileInvoice />} text="Invoices" />
            <NavItem to="/new-invoice" icon={<FaPlusSquare />} text="New Invoice" />
            <NavItem to="/settings" icon={<FaCog />} text="Settings" />
          </ul>
        </div>
        <div className="account mb-4">
          <h3 className="text-lg font-semibold mb-2">Account</h3>
          <ul className="list-none">
            <NavItem to="/profile" icon={<FaUserCircle />} text="Profile" />
            <NavItem to="/notifications" icon={<FaBell />} text="Notifications" />
            <NavItem to="/preferences" icon={<FaCogSolid />} text="Preferences" />
          </ul>
        </div>
        <div className="logout mt-auto">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={logoutWeb}>
            <FaSignOutAlt className="mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const NavItem = ({ to, icon, text }) => {
  return (
    <li className="mb-2">
      <Link to={to} className="flex items-center py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded">
        {icon}
        <span className="ml-2">{text}</span>
      </Link>
    </li>
  );
}

export default Sidebar;
