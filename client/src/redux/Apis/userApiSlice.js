import { apiSlice } from "../slice/apiSlice";
const USER_URL ='/User'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({

        registerUser:builder.mutation({
            query:(userData)=>({
                url:`${USER_URL}/register`,
                method:'POST',
                body: userData,
                credentials:'include'
            })
        }),

        loginUser:builder.mutation({
            query:(userData)=>({
                url:`${USER_URL}/userlog`,
                method:'POST',
                body:userData,
                credentials:'include'
            })
        }),

        empdetail:builder.query({
    query:(id)=>({
        url: `${USER_URL}/viewemployee/${id}`,
        method: 'GET',
        credentials: 'include'
    }),
    providesTags:(result,error,id)=>[{type:'User',id}],
        }),
    })
})



export const { useRegisterUserMutation, useLoginUserMutation ,useEmpdetailQuery}= userApiSlice