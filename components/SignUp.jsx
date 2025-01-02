"use client"
// import { signUp } from '@/services/operations/authAPI';
import React, { useState } from 'react';
import { toast } from "react-hot-toast"
import { AiOutlineEye,AiFillCheckCircle, AiOutlineEyeInvisible } from "react-icons/ai"
// import { useDispatch } from "react-redux"
// import {  useNavigate } from "react-router-dom"
// import { MdDoNotDisturbOn } from "react-icons/md";
import { signUp } from "../services/operations/authAPI"; // Adjust path accordingly
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
    // const navigate = useNavigate();
    const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName:'',
    email: '',
    password: '',

  })

  const [showPassword, setShowPassword] = useState(false)
  const [validation, setValidation] = useState(false);
  const { firstName, lastName, email, password, confirmPassword } = formData
  const uppercaseRegExp = /(?=.*?[A-Z])/;
  const lowercaseRegExp = /(?=.*?[a-z])/;
  const digitsRegExp = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  const minLengthRegExp = /.{8,}/; //MOHIT--CHANGE TO 8 LATER TODO:

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if(e.target.value.length === 0 ){
        setValidation(false)
      }else{
        setValidation(true)
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 🛡️ Password Validation First
    const uppercasePassword = uppercaseRegExp.test(password);
    const lowercasePassword = lowercaseRegExp.test(password);
    const digitsPassword = digitsRegExp.test(password);
    const specialCharPassword = specialCharRegExp.test(password);
    const minLengthPassword = minLengthRegExp.test(password);
  
    if (!minLengthPassword) {
      setFormData({ ...formData, password: "" });
      return toast.error("Password Too Short");
    } 
    if (!uppercasePassword) {
      setFormData({ ...formData, password: "" });
      return toast.error("At least one Uppercase");
    } 
    if (!lowercasePassword) {
      setFormData({ ...formData, password: "" });
      return toast.error("At least one Lowercase");
    } 
    if (!digitsPassword) {
      setFormData({ ...formData, password: "" });
      return toast.error("At least one Digit");
    } 
    if (!specialCharPassword) {
      setFormData({ ...formData, password: "" });
      return toast.error("At least one Special Character");
    }
  
    // ✅ If validation passes, proceed to API call
    // const success = await signUp(firstName, lastName, email, password);

    try {
        const success =    await signUp(formData.firstName, formData.lastName, formData.email, formData.password);

        
    if (success) {
        router.push("/login"); // Navigate to login page
        toast.success("User Registered Successfully");

      } else {
        router.push("/"); // Navigate to home page on failure
      }
  
      // Reset Form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
  
  
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Signup Failed. Please try again.");
    }
  };
  
  
    const ValidationData = [
      {
        id: 1,
        name: "one lowercase charater",
        regx: lowercaseRegExp,
      },
      {
        id: 2,
        name: "one special charater",
        regx: specialCharRegExp,
      },
      {
        id: 3,
        name: "one uppercase charater",
        regx: uppercaseRegExp,
      },
      {
        id: 4,
        name: "8 character minimum",
        regx: minLengthRegExp,
      },
      {
        id: 5,
        name: "one number",
        regx: digitsRegExp,
      },
    ];







//   };

  return (
    <div onClick={(e)=>e.stopPropagation()} className="form-container">
      {/* <h2>Sign Up</h2> */}
      <form onSubmit={handleSubmit}>
        <label>
          <strong>First Name</strong>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <strong>Last Name</strong>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>

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
          <span    //visible-invisible isi se ho rha[[prev->!prev</span>]]
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
