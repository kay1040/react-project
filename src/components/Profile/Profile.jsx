import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styles from './Profile.module.css';
import { logout } from '../../store/reducer/authSlice';

function Profile() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const prevPage = location.state?.preLocation?.pathname || '/';

  return (
    <div className={styles.profile}>
      <table>
        <tbody>
          <tr>
            <td>帳號</td>
            <td>{auth.user.username}</td>
          </tr>
          <tr>
            <td>e-mail</td>
            <td>{auth.user.email}</td>
          </tr>
        </tbody>
      </table>
      <br />

      <button type="button" onClick={() => { dispatch(logout()); }}><Link to={prevPage}>登出</Link></button>
    </div>
  );
}

export default Profile;
