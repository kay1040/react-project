import React from 'react';
import OrderTable from '../UI/OrderTable';
import Loading from '../UI/Loading';

export default function OrderConfirmation({ newOrder }) {
  return (
    newOrder ? (
      <div className="max-w-screen-xl mx-auto mt-2 mb-10 md:my-12 text-center w-11/12 md:w-1/2">
        <OrderTable order={newOrder} />
        <div className="w-full border mt-2 text-sm p-2 text-left">
          <div className="text-base mb-3 md:border-b md:text-center md:font-bold">收件資料</div>
          <div className="mb-2">
            <span>姓名：</span>
            <span>{newOrder.recipientData.name}</span>
          </div>
          <div className="mb-2">
            <span>電話：</span>
            <span>{newOrder.recipientData.phone}</span>
          </div>
          <div className="mb-2">
            <span>地址：</span>
            <span>{newOrder.recipientData.address}</span>
          </div>
          <div className="mb-2">
            <span>備註：</span>
            <span>{newOrder.recipientData.remark || '無'}</span>
          </div>
        </div>
      </div>)
      : <Loading />
  );
}