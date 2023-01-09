import React from 'react';
import { useGetOrdersQuery } from '../../store/api/ordersApi';

function MyOrder() {
  const { data, isSuccess } = useGetOrdersQuery();
  let orderNum = '';
  if (isSuccess) {
    orderNum = data.number;
  }
  return (
    <div className="mx-auto mb-24 w-11/12 md:w-9/12 border border-slate-200 rounded rounded-tl-none p-8">
      <div>
        訂單號碼：
        {orderNum}
      </div>
    </div>
  );
}

export default MyOrder;
