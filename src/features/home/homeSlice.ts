import { createSlice } from "@reduxjs/toolkit";
import { IOrganization, ITask, IUser } from "types";

interface State {
  users: IUser[];
  tasks: ITask[];
  organization: IOrganization | null;
}

const initialState: State = {
  users: (localStorage?.users && JSON.parse(localStorage?.users)) || [],
  tasks: (localStorage?.tasks && JSON.parse(localStorage?.tasks)) || [],
  organization: null,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addOrganization: (state, { payload }) => {
      state.organization = payload;
      localStorage.setItem("organization", JSON.stringify(payload));
    },
    addUser: (state, { payload }) => {
      const users = [...state.users, payload];
      state.users = users;
      localStorage.setItem("users", JSON.stringify(users));
    },
    addTask: (state, { payload }) => {
      const tasks = [...state.tasks, payload];
      state.tasks = tasks;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },
  },
});

export const { addOrganization, addUser, addTask } = homeSlice.actions;

export default homeSlice.reducer;
