import React, { useState } from 'react';
import { useRegisterUserMutation } from '../redux/Apis/userApiSlice';

function UserRegistration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [role, setRole] = useState('employee');
  const [generatedId, setGeneratedId] = useState('');  

  const [registerUser, { isLoading, isSuccess, isError, error }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log({
      username,
      email,
      password,
      confirmPassword,
      mobile,
      address,
      aadhar,
      role,
    });

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const userData = {
        username,
        email,
        password,
        mobile,
        address,
        aadhar,
        role,
      };

      console.log('Submitting data:', userData);  
    
      const result = await registerUser(userData).unwrap();

      setGeneratedId(result.user.generatedId);
      alert('User registered successfully!');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Register here..
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Aadhar Number"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700">
            Generated ID: {generatedId || 'N/A'}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {isError && <p className="text-red-500 mt-4">Error: {error?.data?.message || 'Registration failed'}</p>}
        {isSuccess && <p className="text-green-500 mt-4">User registered successfully!</p>}
      </div>
    </div>
  );
}

export default UserRegistration;
