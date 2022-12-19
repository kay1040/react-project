import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './CartPreview.module.css';

function CartPreview() {
  const cart = useSelector((state) => state.cart);

  return (
    <div className={styles.cartPreview}>
      {cart.cartItems.length === 0
        ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ borderBottom: '1px solid #ddd' }}>您的購物車內沒有商品</div>
            <div className={styles.goShop}><Link to="/shop/">前往商店</Link></div>
          </div>
        )
        : (
          <div>
            {cart.cartItems.map((item) => (
              <Link to={`/shop/product/${item.id}`} key={item.id}>
                <div className={styles.cartData}>
                  <div>
                    <img src={item.attributes.imgSrc} alt={item.attributes.title} />
                  </div>
                  <div>
                    <p>{item.attributes.title}</p>
                    <p>
                      單價: NT$
                      {item.attributes.price.toLocaleString('en-US')}
                    </p>
                    <p>
                      數量:
                      {item.quantity}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            <div className={styles.checkout}><Link to="/shop/cart">前往結帳</Link></div>
          </div>
        )}
    </div>
  );
}

export default CartPreview;
