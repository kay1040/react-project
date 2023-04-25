import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './CartPreview.module.css';
import Backdrop from '../UI/Backdrop';
import Counter from '../UI/Counter';
import {
  increaseItem, 
  decreaseItem, 
  getInputValue, 
  saveCartData,
} from '../../store/reducers/cartSlice';
import useAuth from '../../hooks/useAuth';

export default function CartPreview(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { onClose, showCartPreview } = props;
  const [isShow, setIsShow] = useState(false);
  const { currentUser } = useAuth();

  const handleClose = (e) => {
    setIsShow(false);
    setTimeout(() => onClose(e), 300);
  };

  useEffect(() => {
    setIsShow(showCartPreview);
  }, [showCartPreview]);

  useEffect(() => {
    if (currentUser?.uid) dispatch(saveCartData([cart, currentUser.uid]));
  }, [currentUser, dispatch, cart]);

  return (
    <Backdrop className={showCartPreview ? '' : `${styles.outer}`} onClick={handleClose}>
      <div
        className={isShow ? `${styles.cartPreview} ${styles.cartPreviewActive}` : `${styles.cartPreview}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.title}>
          <h3>購物車</h3>
          <button type="button" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        {cart.cartItems.length === 0
          ? (
            <div>
              <div className={styles.cartData}>
                <p className={styles.noData}>您的購物車內沒有商品</p>
              </div>
              <Link to="/shop/" onClick={handleClose}>
                <button type="button" className={styles.goShop}>前往商店</button>
              </Link>
            </div>
          )
          : (
            <div>
              {cart.cartItems.map((item, index) => (
                <div className={styles.cartData} key={item.id}>
                  <div className={styles.imgWrapper}>
                    <Link to={`/shop/product/${item.id}`} onClick={handleClose}>
                      <img src={item.imgPath} alt={item.name} />
                    </Link>
                  </div>
                  <div className={styles.textWrapper}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.priceWrapper}>
                      <div className={styles.price}>
                        {cart.cartItems[index].subtotal.toLocaleString('en-US')}
                      </div>
                      <Counter
                        index={index}
                        onIncrease={() => { dispatch(increaseItem(item)); }}
                        onDecrease={() => { dispatch(decreaseItem(item)); }}
                        onInputChange={(e) => { dispatch(getInputValue([item, +e.target.value])); }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Link to="/shop/cart" onClick={handleClose}>
                <button type="button" className={styles.checkout}>前往結帳</button>
              </Link>
            </div>
          )}
      </div>
    </Backdrop>
  );
}