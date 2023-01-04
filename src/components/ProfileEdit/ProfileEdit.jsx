import React, { useEffect, useRef, useState } from 'react';
import { useGetUserDataQuery, useUpdateUserDataMutation, useChangePasswordMutation } from '../../store/api/authApi';
import Message from '../UI/Message/Message';

function ProfileEdit(props) {
  const { onCancel } = props;
  const [showChangePassword, setShowChangePassword] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const { data: userData, isSuccess } = useGetUserDataQuery();
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    if (isSuccess) {
      setInputData(userData);
    }
  }, [isSuccess]);

  const [updateUserData] = useUpdateUserDataMutation();
  const inputChangeHandler = (key, e) => {
    setInputData((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const [changePassword, { isError }] = useChangePasswordMutation();
  const currentPasswordInput = useRef();
  const passwordInput = useRef();
  const passwordConfirmationInput = useRef();

  const updateHandler = () => {
    updateUserData(inputData);

    if (showChangePassword) {
      const currentPassword = currentPasswordInput.current.value;
      const password = passwordInput.current.value;
      const passwordConfirmation = passwordConfirmationInput.current.value;
      changePassword({
        currentPassword,
        password,
        passwordConfirmation,
      }).then((res) => {
        if (!res.error) {
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
            setShowChangePassword(false);
            onCancel();
          }, 1000);
        } else {
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 1000);
        }
      });
    } else {
      onCancel();
    }
  };

  return (
    <>
      {showMessage && <Message message={isError ? '密碼更新失敗' : '密碼更新成功'} />}
      {isSuccess && (
        <div>
          <div className="flex mb-5 items-center">
            <div className="w-24">帳號</div>
            <div>{inputData.username}</div>
          </div>
          {!showChangePassword ? (
            <div className="flex my-5 items-center">
              <div className="w-24">密碼</div>
              <button
                type="button"
                className="text-blue-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowChangePassword(true);
                }}
              >
                修改密碼
              </button>
            </div>)
            : (
              <>
                <div className="flex my-5 items-center">
                  <div className="w-24">原密碼</div>
                  <input
                    type="password"
                    placeholder="請輸入當前密碼"
                    ref={currentPasswordInput}
                    className="input-primary p-1 w-48 md:w-72 h-8"
                  />
                </div>
                <div className="flex my-5 items-center">
                  <div className="w-24">新密碼</div>
                  <input
                    type="password"
                    placeholder="請輸入6-20位元的英數字組合"
                    ref={passwordInput}
                    className="input-primary p-1 w-48 md:w-72 h-8"
                  />
                </div>
                <div className="flex my-5 items-center">
                  <div className="w-24">新密碼確認</div>
                  <input
                    type="password"
                    placeholder="請再輸入一次新密碼"
                    ref={passwordConfirmationInput}
                    className="input-primary p-1 w-48 md:w-72 h-8"
                  />
                </div>
              </>
            )}
          <div className="flex my-5 items-center">
            <div className="w-24">e-mail</div>
            <input
              className="input-primary p-1 w-48 md:w-72 h-8"
              type="text"
              onChange={(e) => { inputChangeHandler('email', e); }}
              value={inputData.email || ''}
            />
          </div>
          <div className="flex my-5 items-center">
            <div className="w-24">姓名</div>
            <input
              className="input-primary p-1 w-48 md:w-72 h-8"
              type="text"
              onChange={(e) => { inputChangeHandler('name', e); }}
              value={inputData.name || ''}
            />
          </div>
          <div className="flex my-5 items-center">
            <div className="w-24">地址</div>
            <input
              className="input-primary p-1 w-48 md:w-72 h-8"
              type="text"
              onChange={(e) => { inputChangeHandler('address', e); }}
              value={inputData.address || ''}
            />
          </div>
          <div className="flex my-5 items-center">
            <div className="w-24">電話</div>
            <input
              className="input-primary p-1 w-48 md:w-72 h-8"
              type="text"
              onChange={(e) => { inputChangeHandler('phone', e); }}
              value={inputData.phone || ''}
            />
          </div>
        </div>
      )}
      <br />
      <button
        className="btn-primary w-24 h-8 font-bold mr-4"
        type="button"
        onClick={onCancel}
      >
        取消
      </button>
      <button
        className="btn-primary w-24 h-8 font-bold"
        type="button"
        onClick={updateHandler}
      >
        儲存
      </button>
    </>
  );
}

export default ProfileEdit;
