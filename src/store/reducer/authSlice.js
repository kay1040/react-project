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
      state.isLogged = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      const currentTime = Date.now();
      // 設定登入狀態的有效時間為一週
      // const timeout = 1000 * 60 * 60 * 24 * 7;
      const timeout = 1000 * 60 * 60;
      // 設定登入失效的時間
      state.expirationTime = currentTime + timeout;
      localStorage.setItem('authData', JSON.stringify(state));
    },
    logout(state) {
      state.isLogged = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('authData', JSON.stringify(state));
      
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
