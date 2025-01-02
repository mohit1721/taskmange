"use client"
import React, { useState } from 'react';
import SignUpForm from '../components/SignUp';
import SignInForm from '../components/SignIn';

const HomePage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isUserSignedUp, setIsUserSignedUp] = useState(false); // to track if user signed up

  const handleSignUp = (formData) => {
    console.log('Sign Up Data:', formData);
    // You can replace this with API call logic for user sign-up
     // Simulate a successful sign-up:
     setIsUserSignedUp(true); // Mark that the user has signed up
     setIsSignUp(false); // Redirect to Sign-In form
  };

  const handleSignIn = (formData) => {
    console.log('Sign In Data:', formData);
    // You can replace this with API call logic for user sign-in
  };

  return (
<div className=' flex flex-col md:flex-row gap-20'>
<div className='hidden md:flex mx-auto align-center'>
<img width={300} alt='logo' src='https://file.aiquickdraw.com/imgcompressed/img/compressed_df9f1e11c22ba61bdba5b0993b38ae03.webp'/>
</div>
  <div className="auth-container">
      <h1 className='text-blue-300 font-bold text-center'>{isSignUp ? 'Sign Up Form' : 'Sign In Form'}</h1>
      {isSignUp ? (
        <SignUpForm onSignUp={handleSignUp} />
      ) : (
        <SignInForm onSignIn={handleSignIn} />
      )}
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
      </button>
    </div>

</div>

  
  );
};

export default HomePage;
