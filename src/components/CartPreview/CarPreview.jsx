import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './CartPreview.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import Counter from '../UI/Counter/Couner';
import {
  increaseItem, decreaseItem, getInputValue, removeItem,
} from '../../store/reducer/cartSlice';

function CartPreview(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { onClose, showCartPreview } = props;
  const [isShow, setIsShow] = useState(false);

  const closeHandler = (e) => {
    setIsShow(false);
    setTimeout(() => onClose(e), 300);
  };

  useEffect(() => {
    setIsShow(showCartPreview);
  }, [showCartPreview]);

  return (
    <Backdrop className={showCartPreview ? '' : `${styles.outer}`} onClick={closeHandler}>
      <div
        className={isShow ? `${styles.cartPreview} ${styles.cartPreviewActive}` : `${styles.cartPreview}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.title}>
          <h3>購物車</h3>
          <button type="button" onClick={closeHandler}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        {cart.cartItems.length === 0
          ? (
            <div>
              <div className={styles.cartData}>
                <p className={styles.noData}>您的購物車內沒有商品</p>
              </div>
              <div className={styles.goShop}><Link to="/shop/" onClick={closeHandler}>前往商店</Link></div>
            </div>
          )
          : (
            <div>
              {cart.cartItems.map((item, index) => (
                <div className={styles.cartData}>
                  <div className={styles.imgWrapper}>
                    <Link to={`/shop/product/${item.id}`} key={item.id} onClick={closeHandler}>
                      <img src={item.attributes.imgSrc} alt={item.attributes.title} />
                    </Link>
                  </div>
                  <div className={styles.textWrapper}>
                    <div className={styles.itemName}>{item.attributes.title}</div>
                    <div className={styles.priceWrapper}>
                      <div className={styles.price}>
                        {cart.cartItems[index].subtotal.toLocaleString('en-US')}
                      </div>
                      <Counter
                        index={index}
                        onIncrease={() => { dispatch(increaseItem(item)) }}
                        onDecrease={() => { dispatch(decreaseItem(item)) }}
                        onInputChange={(e) => { dispatch(getInputValue([item, +e.target.value])) }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.checkout}><Link to="/shop/cart" onClick={closeHandler}>前往結帳</Link></div>
            </div>
          )}
      </div>
    </Backdrop>
  );
}

export default CartPreview;
