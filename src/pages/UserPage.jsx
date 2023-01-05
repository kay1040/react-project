import React from 'react';
import { Outlet } from 'react-router-dom';
import UserNav from '../components/UserNav/UserNav';

function ProfilePage() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <UserNav />
      <Outlet />
    </div>
  );
}

export default ProfilePage;
