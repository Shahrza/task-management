import { createSlice } from "@reduxjs/toolkit";

interface ICurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: string;
}

interface State {
  currentUser: ICurrentUser;
}

const initialState: State = {
  currentUser:
    (localStorage.userData && JSON.parse(localStorage.userData)) || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.currentUser = payload;
      localStorage.setItem("userData", JSON.stringify(payload));
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
