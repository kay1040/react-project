import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './CartPreview.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';

function CartPreview(props) {
  const cart = useSelector((state) => state.cart);
  const { onClose, showCartPreview } = props;
  const [isShow, setIsShow] = useState(showCartPreview);

  useEffect(() => { 
    setIsShow(showCartPreview) 
  }, [showCartPreview]) 

  return (
    <Backdrop className={showCartPreview ? '' : `${styles.outer}`} onClick={onClose}>
      <div
        className={isShow ? `${styles.cartPreview} ${styles.cartPreviewActive}` : `${styles.cartPreview}`}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.title}>
          <h2>購物車</h2>
          <button type="button" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        {cart.cartItems.length === 0
          ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ borderBottom: '1px solid #ddd' }}>您的購物車內沒有商品</div>
              <div className={styles.goShop}><Link to="/shop/" onClick={onClose}>前往商店</Link></div>
            </div>
          )
          : (
            <div>
              {cart.cartItems.map((item) => (
                <Link to={`/shop/product/${item.id}`} key={item.id} onClick={onClose}>
                  <div className={styles.cartData}>
                    <div className={styles.imgWrapper}>
                      <img src={item.attributes.imgSrc} alt={item.attributes.title} />
                    </div>
                    <div className={styles.textWrapper}>
                      <p>{item.attributes.title}</p>
                      <p>
                        單價： NT$
                        {item.attributes.price.toLocaleString('en-US')}
                      </p>
                      <p>
                        數量：
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              <div className={styles.checkout}><Link to="/shop/cart" onClick={onClose}>前往結帳</Link></div>
            </div>
          )}
      </div>
    </Backdrop>
  );
}

export default CartPreview;
