import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  increaseItem, decreaseItem, getInputValue, removeItem,
} from '../../store/reducers/cartSlice';
import Confirm from '../UI/ConfirmModal';
import Counter from '../UI/Counter';

export default function CartDetails({ item, onClose, styles }) {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleShowConfirm = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  const handleIncrement = useCallback(() => {
    dispatch(increaseItem(item));
  }, [item, dispatch]);

  const handleDecrement = useCallback(() => {
    if (item.quantity <= 1) {
      setShowConfirm(true);
    } else {
      dispatch(decreaseItem(item));
    }
  }, [item, dispatch]);

  const handleInputChange = useCallback((e) => {
    if (+e.target.value > 0 && !Number.isNaN(+e.target.value)) {
      dispatch(getInputValue([item, +e.target.value]));
    }
  }, [item, dispatch]);

  const handleConfirm = useCallback(() => {
    dispatch(removeItem(item));
  }, [item, dispatch]);

  return (
    <>
      {showConfirm && <Confirm confirmText="確定要將商品移出購物車嗎？" onCancel={handleCancel} onConfirm={handleConfirm} />}
      <div className="flex p-2.5 border-b border-inherit bg-white">
        <div className={styles.productImg}>
          <Link to={`/shop/product/${item.id}`} onClick={onClose}>
            <img
              className="w-full"
              src={item.imgPath}
              alt={item.name}
            />
          </Link>
        </div>
        <div className="flex-auto">
          <div className="text-basic mt-2">{item.name}</div>
          <div className="flex md:mt-6 justify-between flex-col md:flex-row pr-2 md:pr-6">
            <div className="before:content-['NT$'] font-bold my-3 md:my-0">
              {item.subtotal.toLocaleString('zh-TW')}
            </div>
            <Counter
              count={item.quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onInputChange={handleInputChange}
              buttonStyle={styles.counterButton}
              inputStyle={styles.counterInput}
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="text-gray-500"
            onClick={handleShowConfirm}
            onKeyDown={handleShowConfirm}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </>
  );
}
