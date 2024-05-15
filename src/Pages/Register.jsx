import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { app, storage, db } from "../Firebase/Firebase";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';   

const Register = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Display success message
      toast.success("Registration Successful");

      // Store user data in local storage

      const storageRef = ref(storage, `Company_Logos/${email}/`);
      const snapshot = await uploadBytes(storageRef, avatar);

      // Get download URL for the uploaded image
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update user profile with the image URL
      await updateProfile(auth.currentUser, {
        displayName: company,
        photoURL: downloadURL,
      });

      // Store photoURL in local storage
      localStorage.setItem('photoURL', downloadURL);
      localStorage.setItem('user', user.displayName);
      localStorage.setItem('userUID', user.uid);
      localStorage.setItem('email', email);
      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: email,
        company: company,
        imageUrl: downloadURL,
      });

      // Navigate to login page
      navigate('/login');
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-radial">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 mx-4">
        <h1 className="text-2xl text-gray-700 text-center font-bold">Register Now</h1>
        <div className="flex justify-center mb-8">
          {avatar && (
            <div className="mb-4">
              <img src={URL.createObjectURL(avatar)} alt="Avatar Preview" className="w-48 h-48 rounded-full border-4 border-blue-500  p-1" />
            </div>
          )}
        </div>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-3 py-2 placeholder-gray-400" placeholder="Enter your email" required onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div className="mb-4">
            <label htmlFor="company" className="block text-gray-700">Company Name</label>
            <input type="text" id="company" name="company" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-3 py-2 placeholder-gray-400" placeholder="Enter your company name" required onChange={(e) => { setCompany(e.target.value) }} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-3 py-2 placeholder-gray-400"
                placeholder="Enter your password"
                onChange={(e) => { setPassword(e.target.value) }}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 " />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="avatar" className="block text-gray-700">Add Logo</label>
            <input type="file" id="avatar" name="avatar" accept="image/*" onChange={handleAvatarChange} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
          </div>

          <div className="mb-6">
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Register</button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
