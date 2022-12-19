import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  increaseItem, decreaseItem, getInputValue, removeItem,
} from '../../store/reducer/cartSlice';
import styles from './CartDetails.module.css';
import Confirm from '../UI/ConfirmModal/ConfirmModal';

function CartDetails(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const { item, index } = props;

  const increaseButtonHandler = () => {
    dispatch(increaseItem(item));
  };

  const decreaseButtonHandler = () => {
    dispatch(decreaseItem(item));
  };

  const inputChangeHandler = (e) => {
    dispatch(getInputValue([item, +e.target.value]));
  };

  const showConfirmHandler = () => {
    setShowConfirm(true);
  };

  const cancelHandler = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  const confirmHandler = () => {
    dispatch(removeItem(item));
  };

  return (
    <>
      {showConfirm && <Confirm confirmText="確定要刪除此商品嗎？" onCancel={cancelHandler} onConfirm={confirmHandler} />}
      <tr>
        <td>
          <Link to={`/shop/product/${item.id}`}>
            <img
              className={styles.productImg}
              src={item.attributes.imgSrc}
              alt={item.attributes.title}
            />
            <p className={styles.productTitle}>{item.attributes.title}</p>
          </Link>
        </td>
        <td>
          NT$
          {item.attributes.price.toLocaleString('en-US')}
        </td>
        <td>
          <div className={styles.counter}>
            <button type="button" className={styles.sub} onClick={decreaseButtonHandler}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input type="text" value={cart.cartItems[index].quantity} onChange={inputChangeHandler} className={styles.count} />
            <button type="button" className={styles.add} onClick={increaseButtonHandler}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

        </td>
        <td className={styles.total}>
          NT$
          {cart.cartItems[index].subtotal.toLocaleString('en-US')}
        </td>
        <td>
          <button
            type="button"
            className={styles.delete}
            onClick={showConfirmHandler}
            onKeyDown={showConfirmHandler}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </td>
      </tr>
    </>
  );
}

export default CartDetails;
