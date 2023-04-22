import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import ProfileEdit from './ProfileEdit';
import useAuth from '../../hooks/useAuth';
import { db } from '../../firebaseConfig';

export default function Profile() {
  const { currentUser } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser.uid && !userData.uid) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        setUserData(userSnap?.data());
      }
    };
    fetchData();
  }, [currentUser, userData]);

  const handleUpdateData = async (newData) => {
    if (currentUser?.uid) {
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, { ...newData });
    }
    setUserData(newData);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  return (
    <div className="mx-auto mb-24 w-11/12 md:w-9/12 border border-slate-200 rounded rounded-tl-none p-8">
      {!userData.uid && <div>資料載入中...</div>}
      {(!isEdit && userData.uid)
        && (
          <>
            <div>
              <div className="flex mb-5 items-center">
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
      {isEdit && <ProfileEdit onCancel={handleCancel} userData={userData} onUpdateData={handleUpdateData} />}
    </div>
  );
}
