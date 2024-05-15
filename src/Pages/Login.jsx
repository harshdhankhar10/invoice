import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { app } from "../Firebase/Firebase";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState('');
  const [isResetEmailSent, setIsResetEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    const auth = getAuth(app);
    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, resetEmail);
      setIsResetEmailSent(true);
      Swal.fire({
        icon: 'success',
        title: 'Password Reset Email Sent',
        text: 'Check your email inbox to reset your password.'
      });
      setResetEmail('');
      setShowForgotPassword(false);
    } catch (error) {
      toast.error('Failed to send password reset email. Please try again.');
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    localStorage.setItem('loginEmail', email);
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('user', user.displayName);
        localStorage.setItem('photoURL', user.photoURL);
        localStorage.setItem('userUID', user.uid);
        toast.success("Login Successful");
        navigate('/dashboard');
      })
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-radial">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 mx-4">
        <h1 className="text-2xl text-gray-700 text-center font-bold">Login</h1>
        <br />
        <div className="flex justify-center mb-8">
          <img src={localStorage.getItem('photoURL')} alt="Invoice" className="w-48 h-48 rounded-full border-4 border-blue-500 p-1" />
        </div>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-3 py-2 placeholder-gray-400" placeholder="Enter your email" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input type="password" id="password" name="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-3 py-2 placeholder-gray-400" placeholder="Enter your password" />
            <div className='flex justify-between items-center'>
              <span></span>
              <span className='text-blue-600 cursor-pointer hover:underline' onClick={() => setShowForgotPassword(true)}>Forgot Password</span>
            </div>
            {showForgotPassword && (
              <div className="mt-4">
                <label htmlFor="resetEmail" className="block text-gray-700">Enter your email to reset password</label>
                <input type="email" id="resetEmail" name="resetEmail" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-3 py-2 placeholder-gray-400" placeholder="Enter your email" /> <br />
                <button className='w-full bg-blue-500 rounded py-2 text-white' onClick={handleResetPassword}>Send Reset Email</button>
              </div>
            )}
          </div>
          <div className="mb-6">
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-gray-600">Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
