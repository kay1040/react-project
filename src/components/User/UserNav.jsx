import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from './UserNav.module.css';
import { logout } from '../../store/reducers/authSlice';

export default function ProfileNav() {
  const dispatch = useDispatch();
  const location = useLocation();
  const prevPage = location.state?.preLocation?.pathname || '/';
  const active = {
    fontWeight: 'bold',
    color: 'darkslategray',
    border: '1px solid rgb(226 232 240)',
    borderBottomColor: '#fff',
    borderTop: '4px solid darkslategray',
    backgroundColor: '#fff',
  };
  return (
    <div className="mx-auto w-11/12 md:w-3/4">
      <ul className={styles.tabs}>
        <li><NavLink to="/user/profile" style={({ isActive }) => (isActive ? active : null)}>會員資料</NavLink></li>
        <li><NavLink to="/user/order" style={({ isActive }) => (isActive ? active : null)}>我的訂單</NavLink></li>
        <li><NavLink to="/user/favorite" style={({ isActive }) => (isActive ? active : null)}>我的收藏</NavLink></li>
        <li>
          <button
            type="button"
            onClick={() => { dispatch(logout()); }}
          >
            <Link to={prevPage}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              &nbsp;登出
            </Link>
          </button>
        </li>
      </ul>
    </div>
  );
}
