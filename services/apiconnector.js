// import axios from "axios"
// // #YEHI FILE FRONTEND+BACKEND KO CONNECT KR RHA H..USING AXIOS
// export const axiosInstance = axios.create({});

// export const apiConnector = (method, url, bodyData, headers, params) => {
//    // Set default headers if none are passed
//    const defaultHeaders = {
//     'Content-Type': 'application/json', // Default to JSON content type
//     ...headers, // Merge any custom headers passed to the function
// };
    // return axiosInstance({
    //     method:`${method}`,
    //     url:`${url}`,
    //     data: bodyData ? bodyData : null,
    //     headers: headers ? headers : defaultHeaders,
    //     params : params ? params : null,
    //     withCredentials: true, // Enable credentials for cross-origin requests
    //     credentials: 'include', // This is important for sending cookies

    //   })
// }



// ******


// import axios from 'axios';

// // Create a custom axios instance
// export const axiosInstance = axios.create({});

// export const apiConnector = (method, url, bodyData, headers = {}, params = null) => {
//   // Set default headers if none are passed
//   const defaultHeaders = {
//     'Content-Type': 'application/json', // Default to JSON content type
//     ...headers, // Merge any custom headers passed to the function
//   };

//   // Make the API call using axios
//   return axiosInstance({
//     method,          // HTTP method (GET, POST, etc.)
//     url,             // URL for the request
//     data: bodyData ? bodyData : null, // The request payload
//     headers: defaultHeaders,  // The headers for the request
//     params,          // Optional query parameters
//     withCredentials: true, // Enable credentials (cookies) for cross-origin requests
//   });
// };



// *****

import axios from 'axios';
import { useSelector } from 'react-redux';
import store from '../lib/store'
// Create a custom axios instance
export const axiosInstance = axios.create({});

// Add a request interceptor to handle the token
axiosInstance.interceptors.request.use(
  (config) => {
  
      const tokenFromRedux = store.getState().auth?.token;
      // Fetch token from localStorage
      const tokenFromLocalStorage = localStorage.getItem('token') 
      // ? JSON.parse(localStorage.getItem('token')) 
      // : 'null';  
      // Prioritize Redux token, fallback to localStorage if not present
      const token = tokenFromRedux || tokenFromLocalStorage;

    if (token) {
      config.headers.Authorization = `Bearer ${ token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API Connector Function
export const apiConnector = (method, url, bodyData , headers, params ) => {
  // Merge custom headers with default ones
  const defaultHeaders = {
    'Content-Type': 'application/json', // Default to JSON content type
    ...headers, // Merge any custom headers passed to the function
};

  return axiosInstance({
    method:`${method}`,
    url:`${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : defaultHeaders,
    params : params ? params : null,
    withCredentials: true, // Enable credentials for cross-origin requests
    credentials: 'include', // This is important for sending cookies

  })
};
