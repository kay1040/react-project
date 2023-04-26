import React from 'react';

export default function OrderTable({ order, imgStyle, tdStyle }) {
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
          <tr
            className="relative border flex flex-col p-2 md:p-0 md:flex-row
            md:items-center border-b-0 last:border-b md:mb-6 md:table-row"
            key={item.id}
          >
            <td className={`${imgStyle} md:w-44 absolute md:sticky`}>
              <img src={item.imgPath} alt={item.name} className="w-full md:mt-0 md:p-2" />
            </td>
            <td className={`flex-1 text-left ${tdStyle} md:pt-0 md:px-2`}>
              {item.name}
            </td>
            <td className={`flex-1 text-left ${tdStyle} md:pt-0 md:px-2`}>
              <span className="md:hidden">單價：</span>
              NT$
              {item.price.toLocaleString('en-US')}
            </td>
            <td className={`flex-1 text-left ${tdStyle} md:pt-0 md:px-2`}>
              <span className="md:hidden">數量：</span>
              {item.quantity}
            </td>
            <td className={`flex-1 text-left ${tdStyle} md:pt-0 md:px-2`}>
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
