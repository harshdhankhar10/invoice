import React, { useEffect, useState } from 'react';
import SideNavBar from '../SideNavBar';
import { db } from '../../Firebase/Firebase';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { RiEyeFill, RiDeleteBin5Fill } from 'react-icons/ri';
import Spinner from '../../Components/spinner'; // Import the Spinner component
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { CSVLink } from 'react-csv';

const AllInvoices = () => {
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false); // State to track loading status
    const userUID = localStorage.getItem('userUID');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown visibility

    useEffect(() => {
        if (userUID) {
            getData();
        }
    }, [userUID]);

    const getData = async () => {
        setLoading(true); // Set loading to true when fetching data
        try {
            const q = query(collection(db, "invoices", userUID, "userInvoices"), where("uid", "==", userUID)); // Corrected query path
            const querySnapshot = await getDocs(q);
            const tempInvoices = [];
            querySnapshot.forEach((doc) => {
                tempInvoices.push({ id: doc.id, ...doc.data() });
            });
            setInvoices(tempInvoices);
        } catch (error) {
            console.error("Error fetching invoices:", error);
            toast.error("Failed to fetch invoices.");
        } finally {
            setLoading(false); // Set loading to false when data is fetched or an error occurs
        }
    }

    const handleDelete = async (id) => {
        // Show SweetAlert2 confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this invoice!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, "invoices", userUID, "userInvoices", id)); // Corrected delete path
                    getData();
                    toast.success('Invoice deleted successfully!');
                } catch (error) {
                    console.error("Error deleting invoice:", error);
                    toast.error("Failed to delete invoice.");
                }
            }
        });
    }

    const exportAsExcel = () => {
        // Extract data for Excel
        const excelData = invoices.map(({ id, to, phone, address, total, date }) => ({
            ID: id,
            To: to,
            Phone: phone,
            Address: address,
            'Total Amount': total.toFixed(2),
            'Created On': new Date(date.seconds * 1000).toLocaleString(),
        }));
        // Convert data to Excel format
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices');
        // Generate Excel file
        XLSX.writeFile(workbook, 'invoices.xlsx');
        // Show Swal confirmation
        Swal.fire({
            icon: 'success',
            title: 'Export Successful',
            text: 'Invoices exported as Excel',
        });
    };

    const exportAsCSV = () => {
        // Extract data for CSV
        const csvData = invoices.map(({ id, to, phone, address, total, date }) => ({
            ID: id,
            To: to,
            Phone: phone,
            Address: address,
            'Total Amount': total.toFixed(2),
            'Created On': new Date(date.seconds * 1000).toLocaleString(),
        }));
        
        return (<CSVLink data={csvData} filename={'invoices.csv'}>CSV</CSVLink>
    );
    };

    const handleExport = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='flex h-screen'>
            <SideNavBar />
            <div className='flex-grow p-8'>
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-bold mb-4">All Invoices</h1>
                    <div className="relative">
                        <button className='bg-gray-200 rounded px-5 py-3' onClick={() => handleExport()}>Export</button>
                        {isDropdownOpen && (
                            <div className="absolute top-8 right-0 bg-white border border-gray-300 shadow-lg rounded-md py-2 w-36">
                                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => exportAsExcel()}>Excel</div>
                                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{exportAsCSV()}</div>
                            </div>
                        )}
                    </div>
                </div>
                <br />
                <div className="bg-white rounded-lg shadow p-4">
                    {loading ? ( // Display spinner while loading
                        <div className='flex items-center gap-2'><Spinner /> <span>Loading Invoices</span></div>
                    ) : (
                        <>
                            {invoices.length > 0 ? (
                                <table className="w-full text-center border-collapse">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className='py-4 border'>Sr. No.</th>
                                            <th className='py-4 border'>To</th>
                                            <th className='py-4 border'>Phone</th>
                                            <th className='py-4 border'>Address</th>
                                            <th className='py-4 border'>Total Amount</th>
                                            <th className='py-4 border'>Created On</th>
                                            <th className='py-4 border'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {invoices.map((invoice, index) => (
                                            <tr key={invoice.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                                <td className="py-3 border">{index + 1}</td>
                                                <td className="py-3 border">{invoice.to}</td>
                                                <td className="py-3 border">{invoice.phone}</td>
                                                <td className="py-3 border">{invoice.address}</td>
                                                <td className="py-3 border">${invoice.total.toFixed(2)}</td>
                                                <td className="py-3 border">{new Date(invoice.date.seconds * 1000).toLocaleString()}</td>
                                                <td className="py-3 border flex justify-center gap-4">
                                                    <Link to='/invoiceDetails' state={{ invoice }}>
                                                        <RiEyeFill className="text-blue-500 hover:text-blue-600 cursor-pointer" />
                                                    </Link>
                                                    <button className="text-red-500hover:text-red-600 cursor-pointer" onClick={() => handleDelete(invoice.id)}>
                                                        <RiDeleteBin5Fill />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center p-8">
                                    <h2 className="text-xl font-semibold mb-4">No Invoices Found</h2>
                                    <p className="mb-4 text-gray-600">You don't have any invoices yet. Create your first invoice by clicking the button below.</p>
                                    <button 
                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300"
                                        onClick={() => navigate('/new-invoice')}
                                    >
                                        Create New Invoice
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllInvoices;
