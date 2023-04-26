import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';
import { db } from '../../firebaseConfig';

export default function OrdersList() {
  const { currentUser } = useAuth();
  const [ordersList, setOrdersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataState, setDataState] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const orders = [];
      if (currentUser.uid && !ordersList.uid) {
        const ordersRef = collection(db, 'orders');
        const ordersQuery = query(
          ordersRef,
          where('uid', '==', currentUser.uid),
          orderBy('orderNumber', 'desc'),
        );
        const querySnapshot = await getDocs(ordersQuery);
        querySnapshot?.forEach((doc) => {
          orders.push(doc.data());
        });
        setOrdersList(orders);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentUser]);

  useEffect(() => {
    if (isLoading) {
      setDataState('資料載入中...');
    } else {
      setDataState('尚無訂單');
    }
  }, [isLoading]);

  return (
    <div className="mx-auto mb-24 w-11/12 md:w-9/12 border border-slate-200 rounded rounded-tl-none p-4 md:p-8">
      {(ordersList.length !== 0 && currentUser.uid && !isLoading)
        ? (
          <table className="overflow-hidden box-border border-collapse w-full text-left md:text-center text-sm">
            <thead className="hidden md:table-header-group">
              <tr className="border md:p-4">
                <th className="md:p-2">訂單號碼</th>
                <th className="md:p-2">訂單日期</th>
                <th className="md:p-2">訂單總額</th>
                <th className="md:p-2">訂單狀態</th>
                <th className="md:p-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {ordersList.map((order) => (
                <tr key={order.orderNumber} className="relative border flex flex-col mb-6 md:table-row">
                  <td className="p-1 md:p-4">
                    <span className="md:hidden">訂單號碼： </span>
                    {order.orderNumber}
                  </td>
                  <td className="p-1 md:p-4">
                    <span className="md:hidden">訂單日期： </span>
                    {new Date(order.createdAt.seconds * 1000).toLocaleString('zh-TW', { hour12: false })}
                  </td>
                  <td className="p-1 md:p-4">
                    <span className="md:hidden">訂單總額： </span>
                    NT$
                    {order.items.totalAmount.toLocaleString('en-US')}
                  </td>
                  <td className="p-1 md:p-4">
                    <span className="md:hidden">訂單狀態： </span>
                    {order.state}
                  </td>
                  <td className="py-5 md:py-4">
                    <Link
                      to={`${order.orderNumber}`}
                      className="absolute bottom-0 left-0 md:static btn-primary text-sm text-center
                      font-bold rounded-none hover-none p-2 md:py-1 md:px-4 w-full  md:rounded"
                    >
                      查看訂單
                    </Link>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        )
        : dataState}
    </div>
  );
}
