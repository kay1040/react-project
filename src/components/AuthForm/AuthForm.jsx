import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRegisterMutation, useLoginMutation } from '../../store/api/authApi';
import { login } from '../../store/reducer/authSlice';

export default function AuthForm() {
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
  const prevPage = location.state?.preLocation?.pathname || '/';
  const [passwordSame, setPasswordSame] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    if (isLoginForm) {
      loginFn({
        identifier: username,
        password,
      }).then((res) => {
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
        password,
      }).then((res) => {
        if (!res.error) {
          // alert('註冊成功!');
          setIsLoginForm(true);
        }
      });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto my-24 xxl:my-48 flex-col flex">
      <h2 className="mb-6 text-3xl font-bold text-darkslategray text-center">
        {isLoginForm ? '會員登入' : '會員註冊'}
      </h2>
      <p className="text-[#f00] text-center">
        {registerError && !isLoginForm && registerError.data.error.message}
      </p>
      <p className="text-[#f00] text-center">
        {loginError && isLoginForm && loginError.data.error.message}
      </p>
      <p className="text-[#f00] text-center">
        {!passwordSame && '兩次輸入密碼不一致'}
      </p>
      <form className="mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input className="input-primary w-64 h-10" ref={usernameInput} type="text" placeholder="請輸入帳號" />
        </div>
        {!isLoginForm
          && (
            <div className="mb-4">
              <input className="input-primary w-64 h-10" ref={emailInput} type="email" placeholder="請輸入e-mail" />
            </div>
          )}
        <div className="mb-4">
          <input className="input-primary w-64 h-10" ref={passwordInput} type="password" placeholder="請輸入密碼" />
        </div>
        {!isLoginForm
          && (
            <div className="mb-4">
              <input className="input-primary w-64 h-10" ref={passwordCheckInput} type="password" placeholder="請再次輸入密碼" />
              {/* <div className="text-[#f00]">{!passwordSame && '兩次輸入密碼不一致'}</div> */}
            </div>
          )}
        <div>
          <button type="submit" className="btn-primary w-64 h-10 text-base font-bold">{isLoginForm ? '登入' : '註冊'}</button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <button
          type="button"
          className="text-base text-darkslategray transition-all duration-300 hover:text-[#599b9b]"
          onClick={() => { setIsLoginForm((prevState) => !prevState); }}
        >
          {isLoginForm ? '沒有帳號? 點擊註冊' : '已有帳號? 點擊登入'}
        </button>
      </div>
    </div>
  );
}
