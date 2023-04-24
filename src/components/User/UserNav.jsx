import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import styles from './UserNav.module.css';

export default function ProfileNav() {
  const active = {
    fontWeight: 'bold',
    color: 'darkslategray',
    border: '1px solid rgb(226 232 240)',
    borderBottomColor: '#fff',
    borderTop: '4px solid darkslategray',
    backgroundColor: '#fff',
  };
  const changeStyle = ({ isActive }) => (isActive ? active : null);

  return (
    <div className="mx-auto w-11/12 md:w-3/4">
      <ul className={styles.tabs}>
        <li><NavLink to="profile" style={changeStyle}>會員資料</NavLink></li>
        <li><NavLink to="orders" style={changeStyle}>我的訂單</NavLink></li>
        <li><NavLink to="favorite" style={changeStyle}>我的收藏</NavLink></li>
        <li>
          <button
            type="button"
            onClick={() => signOut(auth)}
          >
            <Link to="/">
              <FontAwesomeIcon icon={faRightFromBracket} />
              &nbsp;登出
            </Link>
          </button>
        </li>
      </ul>
    </div>
  );
}
