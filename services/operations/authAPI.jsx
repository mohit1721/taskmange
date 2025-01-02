import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { authENDPOINTS } from "../apis"

import { setLoading, setSignupData ,setToken } from "../../lib/slices/authSlice"
import { useDispatch } from "react-redux"

const {
  
  SIGNUP_API,
  LOGIN_API,
  
} = authENDPOINTS

export async function signUp(firstName, lastName, email, password) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", SIGNUP_API, {
      firstName,
      lastName,
      email,
      password,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Signup Successful");
    return true; // Return success
  } catch (error) {
    console.error("SIGNUP API ERROR:", error);
    toast.error("Signup Failed");
    return false; // Return failure
  } finally {
    toast.dismiss(toastId);
  }
}
  
  // export async function login(email, password, navigate ) {
  //   console.log("login req. ja rha")

  //   const toastId = toast.loading("Loading...");
  //   console.log("login req. ja rha 2", email,password)

  //   try {
  //     // Make the API request to login
  //     const response = await apiConnector("POST", LOGIN_API, {
  //       email,
  //       password,
  //     },
  //     console.log("login API req. gya with ", email,password)

  //     // {
  //     //   headers: { "Content-Type": "application/json" },
  //     //   withCredentials: true, // Important for cookies
  //     // }
    
  //   );
  
  //     // Log the full response to check the structure
  //     console.log("LOGIN API RESPONSE............", response);
  
  //     // Check if the API response indicates success
  //     if (!response?.data?.success) {
  //       throw new Error(response?.data?.message || "Login failed");
  //     }
  
  //     // On successful login, show success message
  //     toast.success("Login Successful");
  //     // const dispatch = useDispatch();
  //     dispatch(setToken(response.data.token)); // Store token in Redux
  //     dispatch(setSignupData({
  //       ...response.data.user,
  //       image: response.data?.user?.image
  //         ? response.data.user.image
  //         : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
  //     }));
  //     // Store token and user data in localStorage
  //     localStorage.setItem("token", JSON.stringify(response.data.token));
  //     localStorage.setItem("user", JSON.stringify(response.data.user));
  
  //      // Log the token to ensure it's set correctly
  //      const tokenF = useSelector((state) => state.auth.token); // Get token from Redux store
  //      console.log("Token in FE after login:", tokenF);

  //     // Log the token to ensure it's set correctly
  //     console.log("Token in localStorage:", response.data.token);
  
  //     // Navigate to the dashboard on successful login
  //     navigate('/dashboard'); // Using the provided router.push for navigation
  //     return {
  //       success: true,
  //       token: response.data.token,
  //       user: response.data.user,
  //     };
  //   } catch (error) {
  //     console.log("LOGIN API ERROR..........", error);
  //     toast.error("Login Failed");
  //     return false; // Return failure
  //   } finally {
  //     // Always dismiss the toast loading indicator after the process
  //     toast.dismiss(toastId);
  //   }
  // }
  
  // export async function login(email, password, navigate) {
  //   // return async () => {
  //     const toastId = toast.loading("Loading...")
  //     // dispatch(setLoading(true))
  //     try {
  //       const response = await apiConnector("POST", LOGIN_API, {
  //         email,
  //         password,
  //       })
  
  //       console.log("LOGIN API RESPONSE............", response)
  
  //       if (!response.data.success) {
  //         throw new Error(response.data.message)
  //       }
  
  //       toast.success("Login Successful")
  //       // dispatch(setToken(response.data.token))
  //       // const userImage = response.data?.user?.image
  //       //   ? response.data.user.image
  //       //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
  //       // dispatch(setUser({ ...response.data.user, image: userImage }))
  //       // localStorage.setItem("token", JSON.stringify(response.data.token))
  //       // localStorage.setItem("user", JSON.stringify(response.data.user )) //#LEARNT IMP. OF LOCALSTORAGE 1:41:42
  //       return {
  //         response

  //       };
  //     } catch (error) {
  //       console.log("LOGIN API ERROR..........", error)
  //       toast.error("Login Failed")
  //     }
  //     // dispatch(setLoading(false))
  //     finally{
  //       toast.dismiss(toastId)

  //     }
  //   // }
  // }




  
export function logout(navigate) {
    return () => {
      // dispatch(setToken(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }



  export async function login(email, password) {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", LOGIN_API, { email, password });
  
      console.log("LOGIN API RESPONSE:", response);
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
  
      toast.success("Login Successful");
      return response.data; // Return the data directly
    } catch (error) {
      console.log("LOGIN API ERROR:", error);
      toast.error(error.response?.data?.message || "Login Failed");
      throw error;
    } finally {
      toast.dismiss(toastId);
    }
  }
  