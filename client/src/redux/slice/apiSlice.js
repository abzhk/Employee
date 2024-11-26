import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URI ='http://localhost:7005'

 const baseQuery = fetchBaseQuery({
    baseUrl: API_URI + "/api",
  });

  export const apiSlice = createApi({
    baseQuery,
    tagTypes: [],
    credentials: 'include',
    endpoints: (builder) => ({}),
  });


