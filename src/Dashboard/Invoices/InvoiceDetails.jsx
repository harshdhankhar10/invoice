import React from 'react';
import Sidebar from './../SideNavBar';
import { useLocation } from 'react-router-dom';
import { RiDownload2Fill } from "react-icons/ri";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';
const InvoiceDetails = () => {
    const location = useLocation();
    const invoice = location.state.invoice;
    const date = new Date(invoice.date?.seconds * 1000).toLocaleDateString();

    function printInvoice() {
        const input = document.getElementById('invoice');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png',1.0);
                const pdf = new jsPDF({
                orientation : 'Portrait',
                unit : 'pt',
                format : [612,792]
                })
                pdf.internal.scaleFactor = 1;
                const imageProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imageProps.height * pdfWidth) / imageProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('invoice.pdf');
            });
        toast.success('Invoice downloaded successfully!');
    }

    return (
        <div className='flex h-screen'>
            <Sidebar />
            <div className="flex-grow p-8 overflow-y-scroll">
                <div className='flex justify-between items-center mb-8'>
                    <h1 className="text-2xl font-bold">Invoice Details</h1>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={printInvoice}>
                        <RiDownload2Fill className="mr-2" />
                        <span>Download Invoice</span>
                    </button>
                </div>

                <div id='invoice' className="bg-white p-8 rounded-lg shadow-2xl">
                    <div className="flex justify-between items-center mb-8">
                        <img src={localStorage.getItem('photoURL')} alt="Invoice Logo" className="rounded-full h-16 w-16" />
                        <h1 className="text-4xl font-bold">Invoice</h1>
                    </div>

                    <div className='flex justify-between'>
                        <div className="mb-8">
                            <p className="mb-2"><strong>To:</strong> {invoice.to}</p>
                            <p className="mb-2"><strong>Phone:</strong> {invoice.phone}</p>
                            <p className="mb-2"><strong>Address:</strong> {invoice.address}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-xl"><strong>Date:</strong> {date}</p>
                        </div>
                    </div>

                    <table className="w-full mb-8">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">S.No</th>
                                <th className="px-4 py-2">Product Name</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.products.map((product, index) => (
                                <tr key={index} className="text-center">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{product.productName}</td>
                                    <td className="px-4 py-2">{product.price}</td>
                                    <td className="px-4 py-2">{product.quantity}</td>
                                    <td className="px-4 py-2">{product.price * product.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-200 text-center">
                                <td className="px-4 py-3 text-xl font-bold " colSpan="4">Total</td>
                                <td className="px-4 py-3 text-xl font-bold">{invoice.total}</td>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="text-center mb-8">
                        <p className="text-lg font-semibold">Thank You for your business!</p>
                    </div>
                                <br /><br /><br />
                    <div className='flex justify-between mt-8'>
                        <div className="text-left mb-8">
                            <p className="text-lg font-semibold">Terms and Conditions</p>
                            <p className="text-sm w-96">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis, fermentum quam et, fringilla sapien. Nullam ac ante mollis, fermentum quam et, fringilla sapien.
                            </p>
                        </div>
                        <div className="text-right">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Autograph_of_Benjamin_Franklin.svg/1200px-Autograph_of_Benjamin_Franklin.svg.png" alt="Signature" className="h-24 w-32 mb-2" />
                            <p className="text-lg font-semibold">Signature</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvoiceDetails;
