import React, { useEffect, useState } from 'react';
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
    currentPassword: '',
    newPassword: '',
    passwordConfirmation: '',
  });

  useEffect(() => {
    if (isSuccess) {
      setInputData(userData);
    }
  }, [isSuccess]);

  const [updateUserData] = useUpdateUserDataMutation();
  const handleInputChange = (key, e) => {
    setInputData((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const [changePassword, { isError }] = useChangePasswordMutation();

  const handleUpdate = () => {
    updateUserData(inputData);
    if (showChangePassword) {
      changePassword({
        currentPassword: inputData.currentPassword,
        password: inputData.newPassword,
        passwordConfirmation: inputData.passwordConfirmation,
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
      {showMessage && <Message message={isError ? '原密碼錯誤或新密碼不一致' : '密碼更新成功'} />}
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
                    onChange={(e) => handleInputChange('currentPassword', e)}
                    className="input-primary p-1 w-48 md:w-72 h-8"
                  />
                </div>
                <div className="flex my-5 items-center">
                  <div className="w-24">新密碼</div>
                  <input
                    type="password"
                    placeholder="請輸入6-20位元的英數字組合"
                    onChange={(e) => handleInputChange('newPassword', e)}
                    className="input-primary p-1 w-48 md:w-72 h-8"
                  />
                </div>
                <div className="flex my-5 items-center">
                  <div className="w-24">新密碼確認</div>
                  <input
                    type="password"
                    placeholder="請再輸入一次新密碼"
                    onChange={(e) => handleInputChange('passwordConfirmation', e)}
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
              onChange={(e) => handleInputChange('email', e)}
              value={inputData.email || ''}
            />
          </div>
          <div className="flex my-5 items-center">
            <div className="w-24">姓名</div>
            <input
              className="input-primary p-1 w-48 md:w-72 h-8"
              type="text"
              onChange={(e) => handleInputChange('name', e)}
              value={inputData.name || ''}
            />
          </div>
          <div className="flex my-5 items-center">
            <div className="w-24">地址</div>
            <input
              className="input-primary p-1 w-48 md:w-72 h-8"
              type="text"
              onChange={(e) => handleInputChange('address', e)}
              value={inputData.address || ''}
            />
          </div>
          <div className="flex my-5 items-center">
            <div className="w-24">電話</div>
            <input
              className="input-primary p-1 w-48 md:w-72 h-8"
              type="text"
              onChange={(e) => handleInputChange('phone', e)}
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
        onClick={handleUpdate}
      >
        儲存
      </button>
    </>
  );
}

export default ProfileEdit;
