import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import Message from '../UI/Message';
import useErrorMessage from '../../hooks/useErrorMessage';
import ConfirmModal from '../UI/ConfirmModal';
import history from '../../history';
import useMessageTimer from '../../hooks/useMessageTimer';

export default function ProfileEdit(props) {
  const { onCancel, userData, onUpdateData } = props;
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [message, setMessage] = useMessageTimer('');
  const [userInputData, setUserInputData] = useState(userData);
  const [passwordInputData, setPasswordInputData] = useState({
    currentPassword: '',
    newPassword: '',
    passwordConfirmation: '',
  });
  const [isEdited, setIsEdited] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [nextLocation, setNextLocation] = useState(null);
  const [inputError, setInputError] = useState(null);

  let unblock;
  useEffect(() => {
    if (isEdited) {
      unblock = history.block((tx) => {
        setIsShowConfirm(true);
        setNextLocation(tx.location.pathname);
        if (setIsShowConfirm) {
          unblock();
        }
      });
    }
  }, [isEdited, history]);

  useEffect(() => {
    if (isEqual(userInputData, userData)) {
      setIsEdited(false);
    } else {
      setIsEdited(true);
    }
  }, [userInputData, userData]);

  const handleInputChange = (key, value) => {
    setUserInputData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handlePasswordChange = (key, value) => {
    setPasswordInputData((prevState) => ({ ...prevState, [key]: value }));
  };

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

  const handleSubmit = () => {
    setInputError(null);
    if (showChangePassword) {
      updateUserPassword();
    } else {
      const phonePattern = /^(09\d{8})$|^0\d{1,2}-\d{6,8}$/;
      if (!phonePattern.test(userInputData.phone)) {
        setInputError('請輸入正確的電話號碼，市話區碼請以-隔開');
      } else {
        onUpdateData(userInputData);
        onCancel();
      }
    }
  };

  const handleConfirm = () => {
    setIsShowConfirm(false);
    navigate(nextLocation);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsShowConfirm(false);
    setIsEdited(false);
  };

  return (
    <>
      {message && <Message message={message} />}
      {isShowConfirm && isEdited && (
        <ConfirmModal
          confirmText="編輯尚未儲存，確定要離開嗎？"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
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
            onChange={(e) => handleInputChange('name', e.target.value)}
            value={userInputData.name || ''}
          />
        </div>
        <div className="flex my-5 items-center">
          <div className="w-24">地址</div>
          <input
            className="input-primary p-1 w-48 md:w-72 h-8"
            type="text"
            onChange={(e) => handleInputChange('address', e.target.value)}
            value={userInputData.address || ''}
          />
        </div>
        <div className="flex mt-5 items-center">
          <div className="w-24">電話</div>
          <input
            className="input-primary p-1 w-48 md:w-72 h-8"
            type="text"
            onChange={(e) => handleInputChange('phone', e.target.value)}
            value={userInputData.phone || ''}
          />
        </div>
        <div className="ml-24 mt-2 text-red-600 text-sm">{inputError}</div>
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
        onClick={handleSubmit}
      >
        儲存
      </button>
    </>
  );
}
