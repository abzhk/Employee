import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useLoginUserMutation } from '../redux/Apis/userApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../redux/slice/authSlice';
import { useDispatch } from 'react-redux';

function userLogin() {
    const [role, setRole] = useState('employee');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
    const navigate = useNavigate(); // Initialize useNavigate
    const dispatch = useDispatch();

    const notifySuccess = () => toast.success("Login successfully!");
    const notifyError = (message) => toast.error(message);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = { role, email, password };
            const response = await loginUser(userData).unwrap();
            console.log('Login successful', response);
            dispatch(login(response.user));
            notifySuccess();

            // Redirect to user registration page after successful login
            setTimeout(() => {
                navigate('/user-profile'); // Redirect to the desired route
            }, 300); // Add a slight delay to allow toast to be shown
        } catch (err) {
            console.error('Login failed:', err);
            notifyError(err?.data?.message || "Not valid credentials");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">User Login</h3>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                </select>
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
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <ToastContainer />
            </form>
            {isError && <p className="text-red-500">{error?.data?.message || 'Login failed'}</p>}
            <div className="mt-4 text-center">
                <span className="text-gray-500">Not yet registered? </span>
                <Link to="/user-registration" className="text-blue-600 font-semibold">
                    Register here
                </Link>
            </div>
        </div>
    );
}

export default userLogin;
