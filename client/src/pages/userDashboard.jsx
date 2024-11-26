import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useEmpdetailQuery } from '../redux/Apis/userApiSlice';

function userDashboard() {
    const user = useSelector((state) => state.auth?.user);
    console.log('User:', user); 
    
    const userId = user?._id;
    console.log('User ID:', userId); 

    const {data,isLoading,isError,error}= useEmpdetailQuery(userId);

    useEffect(() => {
        if (isError) {
            console.error('Error fetching user details:', error?.data?.message || error);
        }}, [isError, error]);

    if (isLoading) {
        return <div>Loading user details...</div>;
    }

    if (isError) {
        return <div>Error fetching user details. Please try again later.</div>;
    }

    const userDetails =data?.user;
  return (
    <div>
 <p><strong>ID:</strong> {userDetails?.generatedId}</p>
 <p><strong>Username:</strong> {userDetails?.username}</p>
 <p><strong>Mobile:</strong> {userDetails?.mobile}</p>
 <p><strong>Address:</strong> {userDetails?.address}</p>
 <p><strong>Aadhar:</strong> {userDetails?.aadhar}</p>
 <p><strong>Role:</strong> {userDetails?.role}</p>
 <p><strong>E-Mail:</strong> {userDetails?.email}</p>
    </div>
  )
}

export default userDashboard
