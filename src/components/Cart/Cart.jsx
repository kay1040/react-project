import React from 'react';
import { useSelector } from 'react-redux';
import CartDetails from '../CartDetails/CartDetails';

function Cart() {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="w-11/12 md:w-3/5 mx-auto flex flex-col ">
      {cart.cartItems.map((item, index) => (
        <CartDetails
          ey={item.id}
          item={item}
          index={index}
        />
      ))}
      <div style={{ margin: '15px auto' }}>
        <p>
          共
          <span id="totalCount">{cart.totalQuantity}</span>
          件商品；總金額：
          <span id="totalPrice" className="total-price">
            NT$
            {cart.totalAmount.toLocaleString('en-US')}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Cart;
