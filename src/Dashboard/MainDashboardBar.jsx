import React from 'react';
import { motion } from 'framer-motion';
import { FaChartBar, FaMoneyBill, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { BsGraphUp, BsClockHistory } from 'react-icons/bs';
import { RiFileList3Line } from 'react-icons/ri';

const MainDashboardBar = () => {
    // Static random data for demonstration
    const statisticsData = [
        { icon: <FaChartBar />, title: 'Sales', value: Math.floor(Math.random() * 1000), color: 'bg-blue-500' },
        { icon: <FaMoneyBill />, title: 'Revenue', value: `$${(Math.random() * 10000).toFixed(2)}`, color: 'bg-green-500' },
        { icon: <FaShoppingCart />, title: 'Orders', value: Math.floor(Math.random() * 500), color: 'bg-purple-500' },
        { icon: <FaUsers />, title: 'Customers', value: Math.floor(Math.random() * 100), color: 'bg-orange-500' },
        { icon: <BsGraphUp />, title: 'Growth', value: `${(Math.random() * 10).toFixed(2)}%`, color: 'bg-red-500' },
        { icon: <BsClockHistory />, title: 'Avg. Time', value: `${Math.floor(Math.random() * 60)} min`, color: 'bg-yellow-500' },
        { icon: <RiFileList3Line />, title: 'Pending Inv.', value: Math.floor(Math.random() * 20), color: 'bg-pink-500' }
    ];

    return (
        <div className="flex h-52 gap-5 flex-wrap relative top-10 left-20">
            {statisticsData.map((item, index) => (
                <motion.div
                    key={index}
                    className={`rounded-lg shadow p-6 text-center overflow-hidden transition duration-300 transform hover:scale-105 w-52 ${item.color} text-white`}
                >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-200">{item.value}</p>
                </motion.div>
            ))}
        </div>
    );
}

export default MainDashboardBar;
