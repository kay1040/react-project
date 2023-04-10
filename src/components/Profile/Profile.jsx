import React, { useState } from 'react';
import { useGetUserDataQuery } from '../../store/api/authApi';
import ProfileEdit from '../ProfileEdit/ProfileEdit';

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const {
    data: userData,
    isSuccess,
    isFetching,
    refetch,
  } = useGetUserDataQuery();

  const cancelEdit = () => {
    setIsEdit(false);
    refetch();
  };

  return (
    <div className="mx-auto mb-24 w-11/12 md:w-9/12 border border-slate-200 rounded rounded-tl-none p-8">
      {!isEdit && isFetching && <div>資料載入中...</div>}
      {(!isEdit && isSuccess && !isFetching)
        && (
          <>
            <div>
              <div className="flex mb-5 items-center">
                <div className="w-24">帳號</div>
                <div>{userData.username}</div>
              </div>
              <div className="flex my-5 items-center">
                <div className="w-24">e-mail</div>
                <div>{userData.email}</div>
              </div>
              <div className="flex my-5 items-center">
                <div className="w-24">姓名</div>
                <div>{userData.name}</div>
              </div>
              <div className="flex my-5 items-center">
                <div className="w-24">地址</div>
                <div>{userData.address}</div>
              </div>
              <div className="flex my-5 items-center">
                <div className="w-24">電話</div>
                <div>{userData.phone}</div>
              </div>
            </div>
            <br />
            <button
              className="btn-primary w-32 h-8 font-bold"
              type="button"
              onClick={() => setIsEdit(true)}
            >
              編輯資料
            </button>
          </>
        )}
      {isEdit && <ProfileEdit onCancel={cancelEdit} userData={userData} />}
    </div>
  );
}
