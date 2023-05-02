import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './CartPreview.module.css';
import Backdrop from '../UI/Backdrop';
import { saveCartData } from '../../store/reducers/cartSlice';
import useAuth from '../../hooks/useAuth';
import CartDetails from './CartDetails';

export default function CartPreview({ onCloseCartPreview, isShowCartPreview, cart }) {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const { currentUser } = useAuth();

  const CartDetailsStyles = {
    productImg: 'w-32 mr-4',
    counterButton: 'w-4 h-4 text-xs',
    counterInput: 'mx-1 w-10 text-basic font-bold',
  };

  const handleClose = (e) => {
    setIsShow(false);
    setTimeout(() => onCloseCartPreview(e), 300);
  };

  useEffect(() => {
    setIsShow(isShowCartPreview);
  }, [isShowCartPreview]);

  useEffect(() => {
    if (currentUser?.uid) dispatch(saveCartData(currentUser.uid));
  }, [currentUser, dispatch, cart]);

  return (
    <Backdrop onClick={handleClose}>
      <div
        role="presentation"
        className={isShow ? `${styles.cartPreview} ${styles.cartPreviewActive}` : `${styles.cartPreview}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.title}>
          <h2>購物車</h2>
          <button type="button" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        {(cart.cartItems.length === 0)
          ? (
            <div>
              <div className={styles.cartDataWrapper}>
                <p className={styles.noData}>您的購物車內沒有商品</p>
              </div>
              <Link to="/shop/" onClick={handleClose}>
                <button type="button" className={styles.goShop}>前往商店</button>
              </Link>
            </div>
          )
          : (
            <>
              <div className={styles.cartDataWrapper}>
                {cart.cartItems?.map((item) => (
                  <CartDetails
                    key={item.id}
                    item={item}
                    onClose={handleClose}
                    styles={CartDetailsStyles}
                  />
                ))}
              </div>
              <Link to="/shop/cart" onClick={handleClose}>
                <button type="button" className={styles.checkout}>前往結帳</button>
              </Link>
            </>
          )}
      </div>
    </Backdrop>
  );
}
