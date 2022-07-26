import { AppDispatch } from "..";
import jwt_decode from "jwt-decode";
import { AuthAPI } from "../../http/api/auth";
import { userSlice } from "../slices/userSlice";
import { IUser } from "../../interfaces";

export const AuthAsyncActionCreators = {
  registration:
    (name: string, email: string, password: string): any =>
    async (dispatch: AppDispatch) => {
      dispatch(userSlice.actions.setLoading());
      try {
        const response = await AuthAPI.registration(name, email, password);
        const userData: IUser = await jwt_decode(response.data.accessToken);
        dispatch(userSlice.actions.setUserData(userData));
      } catch (e: any) {
        dispatch(userSlice.actions.setError(e.response?.data?.message));
      }
    },
  login:
    (email: string, password: string): any =>
    async (dispatch: AppDispatch) => {
      dispatch(userSlice.actions.setLoading());
      try {
        const response = await AuthAPI.login(email, password);
        const userData: IUser = await jwt_decode(response.data.accessToken);
        console.log(userData);
        console.log(response.data.accessToken);
        dispatch(userSlice.actions.setUserData(userData));
      } catch (e: any) {
        console.log(e);
        dispatch(userSlice.actions.setError(e.response?.data?.message));
      }
    },
  checkAuth: (): any => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.setLoading());
    try {
      const response = await AuthAPI.checkAuth();
      const userData: IUser = await jwt_decode(response.data.accessToken);
      dispatch(userSlice.actions.setUserData(userData));
    } catch (e: any) {
      console.log(e);
    }
  },
  logout: (): any => async (dispatch: AppDispatch) => {
    await AuthAPI.logout();
    dispatch(userSlice.actions.signOut());
  },
};
