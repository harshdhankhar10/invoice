import React, { useState } from 'react';
import Sidebar from '../SideNavBar';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { db } from '../../Firebase/Firebase';
import { collection, Timestamp, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Spinner from "../../Components/spinner";

const CreateInvoice = () => {
  const [to, setTo] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const userUID = localStorage.getItem('userUID');

  const handleAddProduct = () => {
    const product = {
      productName,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };
    setProducts([...products, product]);
    setProductName('');
    setPrice('');
    setQuantity('');
    toast.success('Product Added Successfully!');
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  async function saveData() {
    const userUID = localStorage.getItem('userUID');
    if (!userUID) {
      toast.error('User UID not found. Please log in.');
      return;
    }

    setLoading(true); // Set loading to true

    try {
      await addDoc(collection(db, "invoices", userUID, "userInvoices"), { // Corrected path
        uid: userUID,
        to: to,
        phone: phone,
        address: address,
        products: products,
        total: products.reduce((total, product) => total + (product.price * product.quantity), 0),
        date: Timestamp.fromDate(new Date())
      });
      toast.success('Invoice saved successfully!');
    } catch (error) {
      toast.error('Failed to save invoice. Please try again.');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const totalPrice = products.reduce((total, product) => total + (product.price * product.quantity), 0);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow p-8 overflow-y-scroll">
        <div className='flex justify-between my-3'>
          <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
          <button className='bg-gray-200 rounded px-3' onClick={saveData} disabled={loading}>
            {loading ? (<div className="flex items-center">
            <Spinner />
            <span className="ml-2">Saving data...</span>
          </div>) : "Save Data"}
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="To" className="border border-gray-300 rounded-md p-2" value={to} onChange={(e) => setTo(e.target.value)} />
            <input type="text" placeholder="Phone" className="border border-gray-300 rounded-md p-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input type="text" placeholder="Address" className="border border-gray-300 rounded-md p-2" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <h2 className="text-xl font-bold mb-4">Product Details</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <input type="text" placeholder="Product Name" className="border border-gray-300 rounded-md p-2" value={productName} onChange={(e) => setProductName(e.target.value)} />
            <input type="number" placeholder="Price" className="border border-gray-300 rounded-md p-2" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="number" placeholder="Quantity" className="border border-gray-300 rounded-md p-2" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300" onClick={handleAddProduct}>Add Product</button>
          </div>
        </div>
        {products.length > 0 && (
          <>
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-bold mb-4">Product List</h2>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Sr. No.</th>
                    <th className="border border-gray-300 px-4 py-2">Product Name</th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">Quantity</th>
                    <th className="border border-gray-300 px-4 py-2">Total Price</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                      <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{product.productName}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">${product.price.toFixed(2)}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{product.quantity}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">${(product.price * product.quantity).toFixed(2)}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button onClick={() => handleDeleteProduct(index)} className="text-red-500 hover:text-red-700">
                          <RiDeleteBin5Fill />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-bold mb-4">Total Price</h2>
              <p className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateInvoice;
