import React from 'react';
import styles from './Profile.module.css';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { logout } from "../../store/reducer/authSlice";
import { useSelector } from "react-redux";

const Profile = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const location = useLocation();
    const prevPage = location.state?.preLocation?.pathname || "/";

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
           
            <button onClick={() => { dispatch(logout()) }}><Link to={prevPage}>登出</Link></button>
        </div>
    );
};

export default Profile;