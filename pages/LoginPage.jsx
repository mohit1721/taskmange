"use client"
import React, { useState } from 'react';

const LoginPage = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSignIn function passed as a prop
    onSignIn(formData);
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className="form-container">
      <h2 className='text-blue-600 text-center font-bold'>Welcome Back to your Task Manager App </h2>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>Email</strong>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <strong>Password</strong>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;
