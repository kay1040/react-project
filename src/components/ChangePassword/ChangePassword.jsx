import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useChangePasswordMutation } from '../../store/api/authApi';

function ChangePassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const prevPage = location.state?.preLocation?.pathname || '/';
  const [changePwd, { isError, isSuccess }] = useChangePasswordMutation();
  console.log(useChangePasswordMutation());

  const currentPasswordInput = useRef();
  const passwordInput = useRef();
  const passwordConfirmationInput = useRef();

  const changePasswordHandler = (e) => {
    e.preventDefault();
    const currentPassword = currentPasswordInput.current.value;
    const password = passwordInput.current.value;
    const passwordConfirmation = passwordConfirmationInput.current.value;
    changePwd({
      currentPassword,
      password,
      passwordConfirmation,
    });
    if (isError) {
      console.log(changePwd.data.error.message);
    } else if (isSuccess) {
      console.log('密碼更新成功');
      navigate(prevPage, { replace: true });
    }
  };

  return (
    <div className="mx-auto w-[90%] md:w-4/5 border border-[#ddd] rounded rounded-tl-none p-8">
      <form onSubmit={changePasswordHandler}>
        <div>
          <input
            type="password"
            placeholder="舊密碼"
            ref={currentPasswordInput}
            className="border border-spacing-2"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="新密碼"
            ref={passwordInput}
            className="border border-spacing-2"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="新密碼確認"
            ref={passwordConfirmationInput}
            className="border border-spacing-2"
          />
        </div>
        <div>
          <button type="submit">更新密碼</button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
