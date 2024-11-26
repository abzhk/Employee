import React, { useState } from 'react'

function userPersonalinfo() {
const [data,setData] = useState({bloodgroup:'',dateofbirth:'',martialstatus:'',emergencycontact:''})

const handlechange =(e)=>{
    setData({...data,[e.target.name]:e.target.value});
};
const handlesubmit = async (e)=>{
    e.preventDefault();
}
  return (
    <form onSubmit={handlesubmit}>
    <div>
        <p><strong>Personal Information</strong></p>
        <div className='mt-6 ml-32 grid grid-cols-2 gap-5'>
<input type ="text" placeholder='Blood Group' name='bloodgroup' value={data.bloodgroup} onChange={handlechange} className='h-10 w-64 rounded-lg bg-slate-100 text-center'></input>
<input type ="text" placeholder='DOB'name='dateofbirth' value={data.dateofbirth}  onChange={handlechange} className='h-10 w-64 rounded-lg bg-slate-100 text-center '></input>

<input type ="text" placeholder='Marital Status' name='martialstatus' value={data.martialstatus} onChange={handlechange} className='h-10 w-64 rounded-lg bg-slate-100 text-center'></input>
<input type ="text" placeholder='Emergency Contact Number'name='emergencycontact' value={data.emergencycontact} onChange={handlechange} className='h-10 w-64 rounded-lg bg-slate-100 text-center '></input>
      
        </div>
        <div className='mt-6 mr-80 flex justify-center'>
        <button type='submit' className='bg-violet-500 h-10 w-72 rounded-lg '>update info...</button>
        </div>
    </div>
    </form>
  )
}
export default userPersonalinfo