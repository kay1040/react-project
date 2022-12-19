import { createSlice } from '@reduxjs/toolkit';

const authData = {
  isLogged: false,
  token: null,
  user: null,
  expirationTime: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: JSON.parse(localStorage.getItem('authData')) || authData,
  reducers: {
    login(state, action) {
      const data = state;
      data.isLogged = true;
      data.token = action.payload.token;
      data.user = action.payload.user;
      const currentTime = Date.now();
      // 設定登入狀態的有效時間為一週
      // const timeout = 1000 * 60 * 60 * 24 * 7;
      const timeout = 1000 * 60 * 60;
      // 設定登入失效的時間
      data.expirationTime = currentTime + timeout;
      localStorage.setItem('authData', JSON.stringify(data));
    },
    logout(state) {
      const data = state;
      data.isLogged = false;
      data.token = null;
      data.user = null;
      localStorage.removeItem('authData', JSON.stringify(data));
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
