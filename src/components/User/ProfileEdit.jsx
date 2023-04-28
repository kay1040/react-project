import React, { useEffect, useState } from 'react';
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import Message from '../UI/Message';
import useErrorMessage from '../../hooks/useErrorMessage';

export default function ProfileEdit(props) {
  const { onCancel, userData, onUpdateData } = props;
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [message, setMessage] = useState('');
  const [userInputData, setUserInputData] = useState(userData);
  const [passwordInputData, setPasswordInputData] = useState({
    currentPassword: '',
    newPassword: '',
    passwordConfirmation: '',
  });

  const handleInputChange = (key, e) => {
    setUserInputData((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const handlePasswordChange = (key, value) => {
    setPasswordInputData((prevState) => ({ ...prevState, [key]: value }));
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }, [message]);

  const updateUserPassword = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const { currentPassword, newPassword, passwordConfirmation } = passwordInputData;
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(user, newPassword);
      if (newPassword !== passwordConfirmation) throw new Error('輸入密碼不一致');
      setMessage('密碼更新成功');
      onUpdateData(userInputData);
      setTimeout(() => {
        onCancel();
      }, 1000);
    } catch (error) {
      setMessage(useErrorMessage(error));
    }
  };

  const handleUpdate = async () => {
    if (showChangePassword) {
      updateUserPassword();
    } else {
      onUpdateData(userInputData);
      onCancel();
    }
  };

  return (
    <>
      {message && <Message message={message} />}
      <div>
        <div className="flex mb-5 items-center">
          <div className="w-24">e-mail</div>
          <div>{userInputData.email}</div>
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
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  value={passwordInputData.currentPassword}
                  className="input-primary p-1 w-48 md:w-72 h-8"
                />
              </div>
              <div className="flex my-5 items-center">
                <div className="w-24">新密碼</div>
                <input
                  type="password"
                  placeholder="請輸入6個字元以上的英數字"
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  value={passwordInputData.newPassword}
                  className="input-primary p-1 w-48 md:w-72 h-8"
                />
              </div>
              <div className="flex my-5 items-center">
                <div className="w-24">新密碼確認</div>
                <input
                  type="password"
                  placeholder="請再輸入一次新密碼"
                  onChange={(e) => handlePasswordChange('passwordConfirmation', e.target.value)}
                  value={passwordInputData.passwordConfirmation}
                  className="input-primary p-1 w-48 md:w-72 h-8"
                />
              </div>
            </>
          )}
        <div className="flex my-5 items-center">
          <div className="w-24">姓名</div>
          <input
            className="input-primary p-1 w-48 md:w-72 h-8"
            type="text"
            onChange={(e) => handleInputChange('name', e)}
            value={userInputData.name || ''}
          />
        </div>
        <div className="flex my-5 items-center">
          <div className="w-24">地址</div>
          <input
            className="input-primary p-1 w-48 md:w-72 h-8"
            type="text"
            onChange={(e) => handleInputChange('address', e)}
            value={userInputData.address || ''}
          />
        </div>
        <div className="flex my-5 items-center">
          <div className="w-24">電話</div>
          <input
            className="input-primary p-1 w-48 md:w-72 h-8"
            type="text"
            onChange={(e) => handleInputChange('phone', e)}
            value={userInputData.phone || ''}
          />
        </div>
      </div>
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
