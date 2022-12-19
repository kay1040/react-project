import React, { useState } from 'react';
import styles from './CartDetails.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { increaseItem, decreaseItem, getInputValue, removeItem } from "../../store/reducer/cartSlice";
import { Link } from 'react-router-dom';
import Confirm from '../UI/ConfirmModal/ConfirmModal';

const CartDetails = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const increaseButtonHandler = () => {
    dispatch(increaseItem(props.item))
  }

  const decreaseButtonHandler = () => {
    dispatch(decreaseItem(props.item))
  }

  const inputChangeHandler = (e) => {
    dispatch(getInputValue([props.item, +e.target.value]))
  }

  const showConfirmHandler = () => {
    setShowConfirm(true);
  };

  const cancelHandler = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  const confirmHandler = () => {
    dispatch(removeItem(props.item))
  };


  return (
    <>
      {showConfirm && <Confirm confirmText='確定要刪除此商品嗎？' onCancel={cancelHandler} onConfirm={confirmHandler}/>}
      <tr>
        <td>
          <Link to={`/shop/product/${props.item.id}`}>
            <img className={styles.productImg} src={props.item.attributes.imgSrc} />
            <p className={styles.productTitle} >{props.item.attributes.title}</p>
          </Link>
        </td>
        <td>NT$ {props.item.attributes.price.toLocaleString('en-US')}</td>
        <td>
          <div className={styles.counter}>
            <button className={styles.sub} onClick={decreaseButtonHandler}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input type="text" value={cart.cartItems[props.index].quantity} onChange={inputChangeHandler} className={styles.count} />
            <button className={styles.add} onClick={increaseButtonHandler}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

        </td>
        <td className={styles.total}>NT$ {cart.cartItems[props.index].subtotal.toLocaleString('en-US')}</td>
        <td>
          <i className={styles.delete} onClick={showConfirmHandler}><FontAwesomeIcon icon={faXmark} /></i>
        </td>
      </tr>
    </>
  );
};

export default CartDetails;