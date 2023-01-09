import React from 'react';
import { useAddOrderMutation } from '../../store/api/ordersApi';

function Order() {
  const orderNum = Date.now();
  const [addOrder] = useAddOrderMutation();
  addOrder({ number: orderNum });

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
export default Order;
