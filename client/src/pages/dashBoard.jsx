import React, { useState } from 'react';
import AdminLogin from './adminLogin';
import UserLogin from './userLogin';

function dashboard() {
  const [activeTab, setActiveTab] = useState(''); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      
      <div className="absolute top-4 left-4">
        <img src="" alt="Logo" className="h-10" />
      </div>

      <h2 className="text-2xl font-bold mb-6">Redux Store Creation</h2>

   
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setActiveTab('admin')}
          className={`px-4 py-2 font-semibold rounded-lg ${
            activeTab === 'admin' ? 'bg-violet-600 text-white' : 'bg-violet-300'
          }`}
        >
          Admin
        </button>
        <button
          onClick={() => setActiveTab('user')}
          className={`px-4 py-2 font-semibold rounded-lg ${
            activeTab === 'user' ? 'bg-violet-600 text-white' : 'bg-violet-300'
          }`}
        >
          User
        </button>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mt-12">
       
        {/* <p className="text-center text-gray-600 mb-4">
          Please select your role to log in and access the system.
        </p> */}

     
        {activeTab === 'admin' && <AdminLogin />}
        {activeTab === 'user' && <UserLogin />}
      </div>
    </div>
  );
}

export default dashboard;
