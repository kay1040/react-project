import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/reducer/authSlice';

const useAutoLogout = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // 設定自動登出
  useEffect(() => {
    const timeout = auth.expirationTime - Date.now();

    // 判斷timeout的值是否小於一分鐘 (測試調成6秒)
    if (timeout < 6000) {
      dispatch(logout());
      return;
    }

    const timer = setTimeout(() => {
      dispatch(logout());
    }, timeout);

    return () => {
      clearTimeout(timer);
      return null;
    };
  }, [auth]);
};

export default useAutoLogout;
