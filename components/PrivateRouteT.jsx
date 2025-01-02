import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const PrivateRouteT = ({ children }) => {
  const router = useRouter();
  const token  = useSelector((state) => state.auth.token); // Get token from Redux

  const [loading, setLoading] = useState(true);
console.log("token in private route Tasklist-->", token)
  useEffect(() => {
    if (!token) {
      console.warn('No token found, redirecting to login...');
      // Redirect to login page if no token
      router.push('/login');
    } else {
      setLoading(false); // Set loading false once the token is verified
      router.push('/tasklist')
    }
  }, [token, router]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading indicator
  }

  return children; // Return children (protected components) if authenticated
};

export default PrivateRouteT;
