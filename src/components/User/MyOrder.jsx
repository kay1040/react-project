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

export default function MyOrder() {
  const { currentUser } = useAuth();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const orders = [];
      if (currentUser.uid && !orderList.uid) {
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
      }
      return orders;
    };
    fetchData().then((orders) => setOrderList(orders));
  }, [currentUser]);

  return (
    <div className="mx-auto mb-24 w-11/12 md:w-9/12 border border-slate-200 rounded rounded-tl-none p-8">
      {(orderList.length !== 0)
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
              {orderList.map((order) => (
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
                  <td className="bottom-0 mb-4 md:py-4">
                    <Link
                      to={`${order.orderNumber}`}
                      className="absolute md:static btn-primary text-sm text-center
                      font-bold rounded-none hover-none p-2 md:py-1 md:px-4 w-full md:w-28 md:rounded"
                    >
                      查看訂單
                    </Link>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        )
        : (<div>尚無訂單</div>)}
    </div>
  );
}
