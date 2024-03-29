import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';
import { db } from '../../firebaseConfig';
import OrderTable from '../UI/OrderTable';

export default function OrderDetails() {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [orderData, setOrderData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const orderRef = doc(db, 'orders', orderNumber);
      const orderSnap = await getDoc(orderRef);
      if (orderSnap.exists()) {
        const order = orderSnap.data();
        if (order.uid === currentUser.uid) {
          setOrderData(order);
          setIsLoading(false);
        } else {
          navigate('/404');
        }
      } else {
        navigate('/404');
      }
    };
    if (currentUser.uid && orderNumber) fetchData();
  }, [currentUser, navigate, orderNumber]);

  return (
    <div className="mx-auto mb-24 w-11/12 md:w-9/12 border border-slate-200 rounded rounded-tl-none p-8">
      {orderData.uid && !isLoading ? (
        <>
          <h3 className="text-xl font-bold mb-4">訂單詳情</h3>
          <OrderTable order={orderData} />
          <div className="mt-2 md:my-4 w-full border text-sm p-2 md:flex justify-between">
            <div className="mb-4 border-b md:m-0 md:border-0">
              <div className="text-base mb-3">訂單資料</div>
              <div className="mb-2">
                <span>訂單號碼：</span>
                <span>{orderData.orderNumber}</span>
              </div>
              <div className="mb-2">
                <span>訂單日期：</span>
                <span>{new Date(orderData.createdAt.seconds * 1000).toLocaleString('zh-TW', { hour12: false })}</span>
              </div>
              <div className="mb-2">
                <span>訂單總額：</span>
                <span>
                  NT$
                  {orderData.items.totalAmount.toLocaleString('zh-TW')}
                </span>
              </div>
              <div className="mb-2">
                <span>訂單狀態：</span>
                <span>{orderData.state}</span>
              </div>
            </div>
            <div>
              <div className="text-base mb-3">收件資訊</div>
              <div className="mb-2">
                <span>姓名：</span>
                <span>{orderData.recipientData.name}</span>
              </div>
              <div className="mb-2">
                <span>電話：</span>
                <span>{orderData.recipientData.phone}</span>
              </div>
              <div className="mb-2">
                <span>地址：</span>
                <span>{orderData.recipientData.address}</span>
              </div>
              <div className="mb-2">
                <span>備註：</span>
                <span>{orderData.recipientData.remark || '無'}</span>
              </div>
            </div>
            <div />
          </div>
        </>
      ) : '資料載入中...'}
    </div>
  );
}
