import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slice/authSlice';

import { apiSlice } from './slice/apiSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Add redux to0ol kit Query's reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add redux tool kit Query's middleware
});
  
  export default store;