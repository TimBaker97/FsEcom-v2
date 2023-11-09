// This is simply to set the user credentials to local storage and also remove them

import { createSlice } from "@reduxjs/toolkit";

// Check to see if there is user info in the local storage, if not set it to null
// If there is userInfo we parse it back to a JS object from a string
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // store the payload in the local storage
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    // Once logout is hit, the userInfo in localStorage will be removed
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = loginSlice.actions;

export default loginSlice.reducer;
