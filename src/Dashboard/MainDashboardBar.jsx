import React, { useState, useEffect } from 'react';
import { FaChartLine, FaClipboardList, FaCalendarAlt, FaBell, FaTasks, FaCog, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
    // Sample data for invoices
    const [invoices, setInvoices] = useState([
        { invoiceNumber: 'INV001', createdOn: '2024-05-16' },
        { invoiceNumber: 'INV002', createdOn: '2024-05-15' },
        { invoiceNumber: 'INV003', createdOn: '2024-05-14' },
        { invoiceNumber: 'INV004', createdOn: '2024-05-13' },
        { invoiceNumber: 'INV005', createdOn: '2024-05-12' },
    ]);

    // State for tasks
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            return JSON.parse(savedTasks);
        } else {
            return [];
        }
    });

    // State for new task input
    const [newTask, setNewTask] = useState('');

    // Save tasks to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Function to handle task creation
    const handleTaskCreate = () => {
        if (newTask.trim() !== '') {
            const newTaskObject = {
                id: tasks.length + 1,
                title: newTask,
                assignedTo: 'You',
                completed: false,
            };
            setTasks([...tasks, newTaskObject]);
            setNewTask('');
        }
    };

    // Function to handle task completion
    const handleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    // Function to handle task deletion
    const handleTaskDelete = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    };

    return (
        <div className="flex flex-wrap justify-around">
            <DashboardFeature icon={<FaChartLine />} title="Recent Activities" description="View recent activities or transactions" />
            <DashboardFeature icon={<FaClipboardList />} title="Quick Links" description="Access frequently used pages or features" />
            <DashboardFeature icon={<FaCalendarAlt />} title="Upcoming Events" description="Stay informed about upcoming events or deadlines" />
            <DashboardFeature icon={<FaBell />} title="Notifications" description="Receive important updates and messages" />
            <DashboardFeature icon={<FaTasks />} title="Task Management" description="Create, assign, and track tasks" />
            <DashboardFeature icon={<FaCog />} title="Settings" description="Customize your dashboard and preferences" />
            <InvoiceTable invoices={invoices} />
            <TaskManagement tasks={tasks} onTaskCreate={handleTaskCreate} onTaskCompletion={handleTaskCompletion} onTaskDelete={handleTaskDelete} newTask={newTask} setNewTask={setNewTask} />
        </div>
    );
}

const DashboardFeature = ({ icon, title, description }) => {
    return (
        <div className="flex flex-col items-center justify-center w-40 h-40 bg-white shadow-md rounded-lg m-4 p-6 transition duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-105">
            <div className="text-3xl text-blue-500 mb-4">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 text-center">{description}</p>
        </div>
    );
}

const InvoiceTable = ({ invoices }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Your Logo
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Recent Invoices
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created On
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {invoices.map((invoice, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img src="https://t4.ftcdn.net/jpg/05/11/37/29/360_F_511372966_g6SCtPQTtP6nj8a7dgdmrhpDSiPmh0AZ.jpg" alt="User" className="h-8 w-8 rounded-full" />
                                </div>
                            </td>
                            <td>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">harsh</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{invoice.invoiceNumber}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{invoice.createdOn}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const TaskManagement = ({ tasks, onTaskCreate, onTaskCompletion, onTaskDelete, newTask, setNewTask }) => {
    return (
        <div className="w-96 bg-white shadow-md rounded-lg m-4 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Task Management</h3>
            <div className="mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter task title"
                    className="w-full border border-gray-300 rounded-md p-2"
                />
                <button
                    onClick={onTaskCreate}
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Create Task
                </button>
            </div>
            <div>
                {tasks.length === 0 ? (
                    <p className="text-gray-500">No tasks available</p>
                ) : (
                    tasks.map((task, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-gray-200 py-2">
                            <div>
                                <p className={task.completed ? 'line-through text-gray-500' : 'text-gray-800 font-semibold'}>{task.title}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => onTaskCompletion(task.id)}
                                    className="form-checkbox h-4 w-4 text-blue-600 mr-2"
                                />
                                <button
                                    onClick={() => onTaskDelete(task.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Dashboard;

