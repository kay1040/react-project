import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import styles from './UserNav.module.css';
import { clearCart, saveCartData } from '../../store/reducers/cartSlice';
import { clearFavoritesList } from '../../store/reducers/favoritesSlice';

export default function ProfileNav() {
  const changeStyle = ({ isActive }) => (isActive ? styles.active : null);

  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(saveCartData(auth.currentUser.uid));
    dispatch(clearCart());
    dispatch(clearFavoritesList());
    signOut(auth);
  };

  return (
    <div className="mx-auto w-11/12 md:w-3/4">
      <ul className={styles.tabs}>
        <li><NavLink to="profile" className={changeStyle}>會員資料</NavLink></li>
        <li><NavLink to="orders" className={changeStyle}>我的訂單</NavLink></li>
        <li><NavLink to="favorites" className={changeStyle}>我的收藏</NavLink></li>
        <li>
          <button
            type="button"
            onClick={handleLogout}
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
