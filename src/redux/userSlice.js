import { createSlice } from "@reduxjs/toolkit";

// LocalStorage se token aur user data ko retrieve karein
const initialToken = localStorage.getItem("token");
const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  token: initialToken || null,
  user: initialUser || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); // Token ko localStorage me save karein
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // User data ko store karein
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token"); // Logout hone par remove karein
      localStorage.removeItem("user");
    },
  },
});

export const { setToken, setUser, logout } = userSlice.actions;
export default userSlice.reducer;
