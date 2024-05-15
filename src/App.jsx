import React from 'react'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Dashboard/Dashboard'
import {Routes, Route } from 'react-router-dom'
import ContactUs from './Pages/ContactUs'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Profile from './Dashboard/Settings/Profile'
import Settings from './Dashboard/Settings/Settings'
import Notifications from './Dashboard/Settings/Notifications'
import CreateInvoice from './Dashboard/Invoices/CreateInvoice'
import AllInvoices from './Dashboard/Invoices/AllInvoices'
import InvoiceDetails from './Dashboard/Invoices/InvoiceDetails'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/new-invoice" element={<CreateInvoice />} />
        <Route path="/invoices" element={<AllInvoices />} />
        <Route path="/invoiceDetails" element={<InvoiceDetails />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
