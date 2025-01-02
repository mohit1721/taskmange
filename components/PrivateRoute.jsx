import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const token  = useSelector((state) => state.auth.token); // Get token from Redux

  const [loading, setLoading] = useState(true);
console.log("token in private route ", token)
  useEffect(() => {
    if (!token) {
      // Redirect to login page if no token
      router.push('/login');
    } else {
      setLoading(false); // Set loading false once the token is verified
      router.push('/dashboard')
    }
  }, [token, router]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading indicator
  }

  return children; // Return children (protected components) if authenticated
};

export default PrivateRoute;
