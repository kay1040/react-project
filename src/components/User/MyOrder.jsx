import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';
import { db } from '../../firebaseConfig';

export default function MyOrder() {
  const { currentUser } = useAuth();
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

  return (
    <div className="mx-auto mb-24 w-11/12 md:w-9/12 border border-slate-200 rounded rounded-tl-none p-8">
      {(!userData?.orders)
        ? (
          <table>
            <thead>
              <tr>
                <th>訂單號碼</th>
                <th>訂單日期</th>
                <th>訂單總額</th>
                <th>訂單狀態</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>???????????</td>
                <td>???????????</td>
                <td>???????????</td>
                <td>???????????</td>
                <td>???????????</td>
              </tr>
            </tbody>
          </table>
        )
        : (<div>尚無訂單</div>)}
    </div>
  );
}
