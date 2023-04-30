import React from 'react';
import CartDetails from './CartDetails';

function Cart({ cart }) {
  const CartDetailsStyles = {
    productImg: 'w-40 mb:w-52 mr-4',
    counterButton: 'w-5 h-5 text-xs',
    counterInput: 'mx-2 md:mx-3 w-8 md:w-12 text-basic font-bold',
  };

  return (
    <div className="w-11/12 md:w-1/2 mx-auto md:mt-12 flex flex-col border-t border-inherit">
      {cart.cartItems.map((item) => (
        <CartDetails
          key={item.id}
          item={item}
          styles={CartDetailsStyles}
        />
      ))}
      <div className="mx-auto my-6">
        <p>
          商品總數
          <span className="font-bold after:content-['_'] before:content-['_']">{cart.totalQuantity}</span>
          件，總金額
          <span className="font-bold before:content-['_']">
            NT$
            {cart.totalAmount.toLocaleString('zh-TW')}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Cart;
