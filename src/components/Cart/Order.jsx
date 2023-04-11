import React from 'react';

export default function Order(props) {
  const { newOrder } = props;
  return (
    <div className="max-w-screen-xl mx-auto my-48 text-center">
      <h3>完成訂單！</h3>
      <div>
        訂單號碼:
        {newOrder?.number}
      </div>
    </div>
  );
}
