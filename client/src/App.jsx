import React from 'react'
import {Route, Routes} from "react-router-dom"
import Dashboard from "./pages/dashBoard";
import AdminLogin from "./pages/adminLogin";
import UserLogin from './pages/userLogin';
import Registration from './pages/registration'
import UserRegistration from './pages/userRegistration'
import UserDashboard from './pages/userDashboard';
import UserPersonalinfo from './pages/userPersonalinfo';
import 'react-toastify/dist/ReactToastify.css'; 


function App() {
  return (
    <div>
 
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/userlogin" element={<UserLogin/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/user-registration" element={<UserRegistration/>} />
        <Route path="/user-profile" element={<UserDashboard/>} />
        <Route path="/personal" element={<UserPersonalinfo/>} />
      </Routes>
    
    </div>
  )
}

export default App