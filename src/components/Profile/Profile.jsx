import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Profile.module.css';
import { useGetUserDataQuery, useUpdateUserDataMutation } from '../../store/api/authApi';

function Profile() {
  const [updateUserData] = useUpdateUserDataMutation();
  const { data: userData, isSuccess } = useGetUserDataQuery();

  const updateHandler = () => {
    updateUserData({
      address: Math.floor(Math.random() * 100) + 1,
    });
  };

  return (
    <div className={styles.profile}>
      {isSuccess
        && (
          <table>
            <tbody>
              <tr>
                <td>帳號</td>
                <td>{userData.username}</td>
              </tr>
              <tr>
                <td>電子信箱</td>
                <td>{userData.email}</td>
              </tr>
              <tr>
                <td>密碼</td>
                <td>
                  <Link
                    to="/user/profile/change-password"
                    className="text-blue-800"
                  >
                    修改密碼
                  </Link>
                </td>
              </tr>
              <tr>
                <td>地址</td>
                <td>{userData.address}</td>
                <td><button type="button" onClick={updateHandler}>修改</button></td>
              </tr>
              <tr>
                <td>電話</td>
                <td>{userData.phone}</td>
              </tr>
            </tbody>
          </table>
        )}
      <br />
    </div>
  );
}

export default Profile;
