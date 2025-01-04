"use client"
import React, { useState } from 'react';
import SignUpForm from '../components/SignUp';
import SignInForm from '../components/SignIn';
import {Suspense} from "react";

const App = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
<div className='flex flex-col md:flex-row gap-20'>
<Suspense>
<div className='hidden md:flex mx-auto align-center'>
</div>
  <div className="auth-container">
      <h1 className='text-blue-300 font-bold text-center'>{isSignUp ? 'Sign Up Form' : 'Sign In Form'}</h1>
      {isSignUp ? (
        <SignUpForm />
      ) : (
        <SignInForm />
      )}
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
      </button>
    </div>
</Suspense>


</div>

  
  );
};

export default App;
