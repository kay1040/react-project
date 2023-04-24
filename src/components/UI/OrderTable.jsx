import React from 'react';

export default function OrderTable({ order }) {
  return (
    <table className="box-border border-collapse w-full md:mx-auto text-center">
      <thead className="hidden md:table-header-group">
        <tr className="border">
          <th colSpan="2"> 商品資料</th>
          <th>單價</th>
          <th>數量</th>
          <th>小計</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {order?.items.cartItems.map((item) => (
          <tr className="relative border flex flex-col md:flex-row md:items-center mb-1 md:mb-6 md:table-row" key={item.id}>
            <td className="md:w-44 w-36 absolute md:sticky">
              <img src={item.imgPath} alt={item.name} className="w-full p-2 mt-1 md:mt-0" />
            </td>
            <td className="flex-1 text-left pl-36 pt-2 md:px-2" style={{ textAlign: 'left' }}>
              {item.name}
            </td>
            <td className="text-left pl-36 md:px-2 md:text-center">
              <span className="md:hidden">單價：</span>
              NT$
              {item.price.toLocaleString('en-US')}
            </td>
            <td className="text-left pl-36 md:px-2 md:text-center">
              <span className="md:hidden">數量：</span>
              {item.quantity}
            </td>
            <td className="text-left pl-36 md:px-2 md:text-center">
              <span className="md:hidden">小計：</span>
              NT$
              {item.subtotal.toLocaleString('en-US')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
