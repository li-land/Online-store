import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces";

export interface UserState {
  userData: IUser;
  isLogged: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  userData: { id: 0, email: "", name: "", roles: [{ id: 0, value: "USER" }] },
  isLogged: false,
  isAdmin: false,
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setUserData: (state, action: PayloadAction<IUser>) => {
      if (action.payload.roles.findIndex((role) => role.id === 2) !== -1) {
        state.isAdmin = true;
      }
      state.isLoading = false;
      state.userData = action.payload;
      state.isLogged = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.isLogged = false;
      state.isAdmin = false;
    },
  },
});

export const { setLoading, setError, setUserData, signOut } = userSlice.actions;

export default userSlice.reducer;
