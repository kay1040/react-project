import React, { useEffect, useState } from 'react';
import { useGetUserDataQuery } from '../../store/api/authApi';

export default function MyOrder() {
  const [orderList, setOrderList] = useState('');
  const { data, isSuccess } = useGetUserDataQuery({}, { refetchOnMount: true });

  useEffect(() => {
    if (isSuccess && data.order) {
      setOrderList(data.order);
    }
    return () => {
      setOrderList('');
    };
  }, [data, isSuccess]);

  return (
    <div className="mx-auto mb-24 w-11/12 md:w-9/12 border border-slate-200 rounded rounded-tl-none p-8">
      {(isSuccess && orderList.length !== 0)
        ? (
          <div>
            訂單號碼：
            {orderList.map((item) => (<div key={item.number}>{item.number}</div>))}
          </div>
        )
        : (<div>尚無訂單</div>)}
    </div>
  );
}
