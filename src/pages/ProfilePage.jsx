import React from 'react';
import { Outlet } from 'react-router-dom';
import ProfileNav from '../components/ProfileNav/ProfileNav';

function ProfilePage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <ProfileNav />
      <Outlet />
    </div>
  );
}

export default ProfilePage;
