import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { app } from '../Firebase/Firebase';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
        setError('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        setIsLoading(true);
        const auth = getAuth(app);
        try {
            await sendPasswordResetEmail(auth, email);
            setIsLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Password Reset Email Sent',
                text: 'Check your email inbox to reset your password.'
            });
        } catch (error) {
            setIsLoading(false);
            setError('Failed to send password reset email. Please try again.');
        }
    }

    return (
        <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
            <div className="mt-7 rounded-xl shadow-lg dark:border-gray-700 border-2 border-indigo-300">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold">Forgot password?</h1>
                        <p className="mt-2 text-sm text-gray-600 ">
                            Remember your password? 
                             <Link className="text-blue-600 decoration-2 hover:underline font-medium" to="/login">
                                Login here
                            </Link>
                        </p>
                    </div>

                    <div className="mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2">Email address</label>
                                    <div className="relative">
                                        <input type="email" id="email" name="email" value={email} onChange={handleChange} className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                                    </div>
                                    {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
                                </div>
                                <button type="submit" className={`py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 text-white'}`} disabled={isLoading}>
                                    {isLoading ? 'Wait a Second...' : 'Reset password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ForgotPassword;
