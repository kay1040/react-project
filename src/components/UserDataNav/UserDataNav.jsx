import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserDataNav.module.css';

function ProfileNav() {
  const active = {
    fontWeight: 'bold',
    color: 'darkslategray',
    border: '1px solid #ddd',
    borderBottomColor: '#fff',
    borderTop: '4px solid darkslategray',
    backgroundColor: '#fff',
  };
  return (
    <div className={styles.profileNav}>
      <ul className={styles.tabs}>
        <li>
          <NavLink
            to="/user/profile"
            style={({ isActive }) => (isActive ? active : null)}
          >
            會員資料
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user/favorite"
            style={({ isActive }) => (isActive ? active : null)}
          >
            我的收藏
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default ProfileNav;
