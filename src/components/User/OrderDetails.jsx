import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';
import { db } from '../../firebaseConfig';
import Loading from '../UI/Loading';

export default function OrderDetails() {
  const { orderNumber } = useParams();
  const nvigate = useNavigate();
  const { currentUser } = useAuth();
  const [orderData, setOrderData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser.uid && orderNumber) {
        const orderRef = doc(db, 'orders', orderNumber);
        const orderSnap = await getDoc(orderRef);
        const order = orderSnap?.data();
        if (order?.uid === currentUser.uid) {
          setOrderData(order);
        } else {
          nvigate('/404', { relative: true });
        }
      }
    };
    fetchData();
  }, [currentUser]);

  return (
    orderData.uid ? (
      <div className="mx-auto mb-24 w-11/12 md:w-9/12 border border-slate-200 rounded rounded-tl-none p-8">
        <table className="box-border border-collapse w-full md:mx-auto text-center">
          <caption className="text-xl font-bold mb-4">訂單詳情</caption>
          <thead className="hidden md:table-header-group">
            <tr className="border">
              <th colSpan="2"> 商品資料</th>
              <th>單價</th>
              <th>數量</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orderData?.items.cartItems.map((item) => (
              <tr className="relative border flex flex-col md:flex-row md:items-center mb-1 md:mb-6 md:table-row" key={item.id}>
                <td className="md:w-44 w-36 absolute md:sticky">
                  <img src={item.imgPath} alt={item.name} className="w-full p-2 mt-1 md:mt-0" />
                </td>
                <td className="flex-1 text-left pl-36 pt-2 md:px-2" style={{ textAlign: 'left' }}>
                  {item.name}
                </td>
                <td className="text-left pl-36 md:px-2 md:text-center">
                  <span className="md:hidden">單價：</span>
                  NT$
                  {item.price.toLocaleString('en-US')}
                </td>
                <td className="text-left pl-36 md:px-2 md:text-center">
                  <span className="md:hidden">數量：</span>
                  {item.quantity}
                </td>
                <td className="text-left pl-36 md:px-2 md:text-center">
                  <span className="md:hidden">小計：</span>
                  NT$
                  {item.subtotal.toLocaleString('en-US')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="md:my-4 w-full border text-sm p-2 md:flex justify-between">
          <div className="mb-4 border-b md:m-0 md:border-0">
            <div className="text-base mb-3">訂單資訊</div>
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
                {orderData.items.totalAmount.toLocaleString('en-US')}
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
      </div>
    ) : <Loading />
  );
}
