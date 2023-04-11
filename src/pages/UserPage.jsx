import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import UserNav from '../components/User/UserNav';

export default function ProfilePage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/user' || pathname === '/user/') {
      navigate('/user/profile', { replace: true });
    }
  }, [pathname]);

  return (
    <div className="max-w-screen-xl mx-auto">
      <UserNav />
      <Outlet />
    </div>
  );
}
