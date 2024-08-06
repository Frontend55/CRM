import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import loadingSlice from './loadingSlice';
import userSlice from './userSlice';
import customersSlice from './customersSlice';
import alertSlice from './alertSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    loading: loadingSlice,
    user: userSlice,
    customers: customersSlice,
    alert: alertSlice,
  },
});
export default store;
