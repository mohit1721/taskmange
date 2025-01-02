// "use client"; // Ensure client-side execution

// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./store";

// const store = configureStore({
//   reducer: rootReducer,
// });

// const ReduxProvider = ({ children }) => {
//   return <Provider store={store}>{children}</Provider>;
// };

// export default ReduxProvider;


// ....

"use client";

// import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import store from "./store";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
