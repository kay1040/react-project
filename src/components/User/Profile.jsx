import React, { useState } from 'react';
import ProfileEdit from './ProfileEdit';
import useAuth from '../../hooks/useAuth';

export default function Profile() {
  const { currentUser } = useAuth();
  const [isEdit, setIsEdit] = useState(false);

  const cancelEdit = () => {
    setIsEdit(false);
  };

  return (
    <div className="mx-auto mb-24 w-11/12 md:w-9/12 border border-slate-200 rounded rounded-tl-none p-8">
      {!currentUser.uid && <div>資料載入中...</div>}
      {(!isEdit && currentUser.uid)
        && (
          <>
            <div>
              <div className="flex my-5 items-center">
                <div className="w-24">e-mail</div>
                <div>{currentUser.email}</div>
              </div>
              <div className="flex my-5 items-center">
                <div className="w-24">姓名</div>
                <div>{currentUser.name}</div>
              </div>
              <div className="flex my-5 items-center">
                <div className="w-24">地址</div>
                <div>{currentUser.address}</div>
              </div>
              <div className="flex my-5 items-center">
                <div className="w-24">電話</div>
                <div>{currentUser.phone}</div>
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
      {isEdit && <ProfileEdit onCancel={cancelEdit} userData={currentUser} />}
    </div>
  );
}
