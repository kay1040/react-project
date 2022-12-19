import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Cart.module.css';
import CartDetails from '../CartDetails/CartDetails';

function Cart() {
  const cart = useSelector((state) => state.cart);
  return (
    <div className={styles.cart}>
      <table>
        <thead>
          <tr>
            <th>商品</th>
            <th>單價</th>
            <th>數量</th>
            <th>小計</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody className={styles.CartDetails}>
          {cart.cartItems.map((item, index) => (
            <CartDetails
              ey={item.id}
              item={item}
              index={index}
            />
          ))}
        </tbody>
      </table>
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
