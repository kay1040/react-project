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
                  <td className="md:p-4">{order.orderNumber}</td>
                  <td className="md:p-4">
                    {new Date(order.createdAt.seconds * 1000).toLocaleString('zh-TW', { hour12: false })}
                  </td>
                  <td className="md:p-4">
                    NT$
                    {order.items.totalAmount.toLocaleString('en-US')}
                  </td>
                  <td className="md:p-4">
                    {order.state}
                  </td>
                  <td className="md:p-4">
                    <Link to={`${order.orderNumber}`} className="btn-primary py-1 px-4">查看訂單</Link>
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
