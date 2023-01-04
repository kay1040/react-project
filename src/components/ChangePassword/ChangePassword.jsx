import React, { useRef } from 'react';
// import { useChangePasswordMutation } from '../../store/api/authApi';

function ChangePassword() {
  // const [changePwd] = useChangePasswordMutation();
  const currentPasswordInput = useRef();
  const passwordInput = useRef();
  const passwordConfirmationInput = useRef();

  // const changePasswordHandler = () => {
  //   const currentPassword = currentPasswordInput.current.value;
  //   const password = passwordInput.current.value;
  //   const passwordConfirmation = passwordConfirmationInput.current.value;
  //   changePwd({
  //     currentPassword,
  //     password,
  //     passwordConfirmation,
  //   }).then((res) => {
  //     if (!res.error) {
  //       console.log('密碼更新成功');
  //     } else {
  //       console.log('密碼更新失敗');
  //       console.log(res.error);
  //     }
  //   });
  // };

  return (
    <>
      <div className="flex my-4">
        <div className="w-24">原密碼</div>
        <input
          type="password"
          placeholder="原密碼"
          ref={currentPasswordInput}
          className="border border-spacing-2"
        />
      </div>
      <div className="flex my-4">
        <div className="w-24">新密碼</div>
        <input
          type="password"
          placeholder="新密碼"
          ref={passwordInput}
          className="border border-spacing-2"
        />
      </div>
      <div className="flex my-4">
        <div className="w-24">新密碼確認</div>
        <input
          type="password"
          placeholder="新密碼確認"
          ref={passwordConfirmationInput}
          className="border border-spacing-2"
        />
      </div>
    </>
  );
}

export default ChangePassword;
