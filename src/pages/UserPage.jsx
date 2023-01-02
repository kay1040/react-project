import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProfileNav from '../components/UserDataNav/UserDataNav';
import { logout } from '../store/reducer/authSlice';

function ProfilePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const prevPage = location.state?.preLocation?.pathname || '/';
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <ProfileNav />
      <Outlet />
      <button
        type="button"
        className="m-20 mt-0 w-24 h-8 btn-primary font-bold"
        onClick={() => { dispatch(logout()); }}
      >
        <Link to={prevPage}>登出</Link>
      </button>
    </div>
  );
}

export default ProfilePage;
