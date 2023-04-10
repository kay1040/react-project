import React, { useEffect, useState } from 'react';
import { useGetUserDataQuery } from '../../store/api/authApi';

export default function Order() {
  const { data, isSuccess } = useGetUserDataQuery();
  const [orderNum, setOrderNum] = useState('');

  useEffect(() => {
    if (isSuccess) {
      setOrderNum(data.order[0].number);
    }
    return () => {
      setOrderNum('');
    };
  }, [isSuccess, data]);

  return (
    <div className="max-w-screen-xl mx-auto my-48 text-center">
      <h2>完成訂單！</h2>
      <div>
        訂單編號:
        {orderNum}
      </div>
    </div>
  );
}
