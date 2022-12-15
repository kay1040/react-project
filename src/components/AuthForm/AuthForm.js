import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRegisterMutation, useLoginMutation } from '../../store/api/authApi';
import { login } from "../../store/reducer/authSlice";

const AuthForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [registerFn, { error: registerError }] = useRegisterMutation();
    const [loginFn, { error: loginError }] = useLoginMutation();

    const usernameInput = useRef();
    const passwordInput = useRef();
    const emailInput = useRef();
    const passwordCheckInput = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const prevPage = location.state?.preLocation?.pathname || "/";
    const [passwordSame, setPasswordSame] = useState(true);

    const submitHandler = (e) => {
        e.preventDefault();
        const username = usernameInput.current.value;
        const password = passwordInput.current.value;
        if (isLoginForm) {
            loginFn({
                identifier: username,
                password
            }).then(res => {
                if (!res.error) {
                    // 登入成功
                    dispatch(login({
                        token: res.data.jwt,
                        user: res.data.user,
                    }));
                    navigate(prevPage, { replace: true });
                }
            });
        } else {
            const email = emailInput.current.value;
            const passwordCheck = passwordCheckInput.current.value;
            if (password !== passwordCheck) {
                setPasswordSame(false);
                return;
            }
            registerFn({
                username,
                email,
                password
            }).then(res => {
                if (!res.error) {
                    setIsLoginForm(true);
                }
            })
        }
    }

    return (
        <div className="max-w-screen-xl mx-auto my-32 text-center">
            <h2 className="mb-6 text-3xl font-bold text-darkslategray">{isLoginForm ? '會員登入' : '會員註冊'}</h2>
            <p className="text-[#f00]">{registerError && !isLoginForm && '帳號或e-mail已被註冊'}</p>
            <p className="text-[#f00]">{loginError && isLoginForm && "帳號或密碼錯誤"}</p>
            <p className="text-[#f00]">{!passwordSame && !isLoginForm && "兩次輸入密碼不一致"}</p>
            <form onSubmit={submitHandler}>
                <div>
                    <input className="input-primary mb-4 w-64 h-10" ref={usernameInput} type="text" placeholder="請輸入帳號" />
                </div>
                {!isLoginForm &&
                    <div>
                        <input className="input-primary mb-4 w-64 h-10" ref={emailInput} type="email" placeholder="請輸入e-mail" />
                    </div>}
                <div>
                    <input className="input-primary mb-4 w-64 h-10" ref={passwordInput} type="password" placeholder="請輸入密碼" />
                </div>
                {!isLoginForm &&
                    <div>
                        <input className="input-primary mb-4 w-64 h-10" ref={passwordCheckInput} type="password" placeholder="請再次輸入密碼" />
                    </div>}
                <div>
                    <button className="btn-primary w-64 h-10 text-base font-bold">{isLoginForm ? '登入' : '註冊'}</button>
                    <div className="mt-4 mb-56">
                        <a href="#"
                            className="text-base text-darkslategray transition-all duration-300 hover:text-[#599b9b]"
                            onClick={e => {
                                e.preventDefault();
                                setIsLoginForm(prevState => !prevState);
                            }
                            }>
                            {isLoginForm ? '沒有帳號? 點擊註冊' : '已有帳號? 點擊登入'}
                        </a>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;