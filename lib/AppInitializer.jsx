'use client'; // Only for App Router (Next.js 13+)

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from './slices/authSlice';

const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(setToken(JSON.parse(storedToken)));
    }
  }, [dispatch]);

  return null; // No UI, just logic
};

export default AppInitializer;
