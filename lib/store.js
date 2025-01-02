//path->lib/store.js
// import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from "@reduxjs/toolkit";

import taskReducer from './slices/taskSlice';
import authReducer from './slices/authSlice';
// import dashboardReducer from './slices/dashboardReducer'
const rootReducer = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
});

export default rootReducer;
