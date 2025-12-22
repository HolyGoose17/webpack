import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  id: number;
  username: string;
  password: string;
}

interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuth: boolean;
}

const initialState: IAuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuth: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
