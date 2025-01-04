"use client"
import React, { useState } from 'react';
import { toast } from "react-hot-toast"
import { AiOutlineEye,AiFillCheckCircle, AiOutlineEyeInvisible } from "react-icons/ai"
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
  







//   };

  return (
    <div onClick={(e)=>e.stopPropagation()} className="form-container">
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
