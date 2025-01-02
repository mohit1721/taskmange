// 'use client'
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    signupData: null, //
    loading: false,
    // token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    token:null,
    // localStorage pe new tokken update...old token fetch....
  };

// Check for localStorage only in a safe client-side environment
if (typeof window !== "undefined") { // Ensures code only runs on the client side
  initialState.token = JSON.parse(localStorage.getItem("token") )
    // ? JSON.parse(localStorage.getItem("token")) 
    // : 'null';
}
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    
    setToken(state, value) { //
      state.token = value.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", JSON.stringify(value.payload));
      }
    },
    logout: (state) => {
        state.token = null;
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
        
      },
  },
});
export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;

// revise reducer
