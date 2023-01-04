import React from 'react';
import { Outlet } from 'react-router-dom';
import ProfileNav from '../components/UserDataNav/UserDataNav';

function ProfilePage() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <ProfileNav />
      <Outlet />
    </div>
  );
}

export default ProfilePage;
