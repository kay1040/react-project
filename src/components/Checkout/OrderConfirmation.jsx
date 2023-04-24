import React from 'react';

export default function OrderConfirmation({ newOrder }) {
  return (
    <div className="max-w-screen-xl mx-auto my-12 text-center">
      <h3>訂單確認</h3>
      <div>
        訂單號碼:
        {newOrder?.orderNumber}
        <table className="box-border border-collapse w-full md:w-2/3 md:mx-auto">
          <thead className="hidden md:table-header-group">
            <tr className="border-b">
              <th>商品</th>
              <th>單價</th>
              <th>數量</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {newOrder?.items.cartItems.map((item) => (
              <tr className="border-b" key={item.id}>
                <td className="flex items-center">
                  <img src={item.imgPath} alt={item.name} className="w-44" />
                  <p>{item.name}</p>
                </td>
                <td>
                  NT$
                  {item.price.toLocaleString('en-US')}
                </td>
                <td>
                  {item.quantity}
                </td>
                <td>
                  NT$
                  {item.subtotal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
