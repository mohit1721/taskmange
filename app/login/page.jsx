

"use client"; // Required in Next.js for client-side components

import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from 'next/navigation'
import { login } from '@/services/operations/authAPI';
import { useDispatch } from 'react-redux';
import {toast} from 'react-hot-toast'
import { setToken,setSignupData } from '@/lib/slices/authSlice';
// setToken
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Next.js router for navigation
  const dispatch= useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };




const handleSubmit = async (e) => {
  e.preventDefault();

  console.log('Form Data:', formData);

  try {
    const res = await login(formData.email, formData.password);
    console.log("LOGIN API RESPONSE in login page:", res);

    if (res?.success) {
      dispatch(setToken(res.token));

      const userImage = res.user?.image
        ? res.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${res.user.firstName} ${res.user.lastName}`;

      dispatch(setSignupData({ ...res.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(res.token));
      localStorage.setItem("user", JSON.stringify(res.user));

      console.log("Redirecting to dashboard...");
      router.push("/dashboard");
    } else {
      console.error("Login failed:", res?.message || "Unknown error");
      toast.error(res?.message || "Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
    toast.error("Login failed");
  } finally {
    // setFormData({
    //   email: '',
    //   password: '',
    // });
  }
};








// }

  return (
    <div className="form-container">
      <h2 className='text-blue-600 text-center font-bold'>
        Welcome Back to your Task Manager App
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>Email <sup className="text-pink-600 font-bold ">*</sup></strong>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
       
            required
          />
        </label>
        <label className='relative'>
          <strong>Password <sup className="text-pink-600 font-bold ">*</sup></strong>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
             placeholder="Enter Password"
            onChange={handleChange}
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
       
            required
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>

        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
