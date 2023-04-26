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

export default function CartDetails({ item, index }) {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleIncreaseButton = useCallback(() => {
    dispatch(increaseItem(item));
  }, [item, dispatch]);

  const handleDecreaseButton = useCallback(() => {
    dispatch(decreaseItem(item));
  }, [item, dispatch]);

  const handleInputChange = useCallback((e) => {
    dispatch(getInputValue([item, +e.target.value]));
  }, [item, dispatch]);

  const handleShowConfirm = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  const handleConfirm = useCallback(() => {
    dispatch(removeItem(item));
  }, [item, dispatch]);

  return (
    <>
      {showConfirm && <Confirm confirmText="確定要刪除此商品嗎？" onCancel={handleCancel} onConfirm={handleConfirm} />}
      <div className="flex p-2.5 border-b border-inherit bg-white">
        <div className="w-40 mb:w-52 mr-4">
          <Link to={`/shop/product/${item.id}`}>
            <img
              className="w-full"
              src={item.imgPath}
              alt={item.name}
            />
          </Link>
        </div>
        <div className="flex-auto">
          <div className="text-basic md:mt-2">{item.name}</div>
          <div className="flex md:mt-6 justify-between flex-col md:flex-row pr-2 md:pr-6">
            <div className="before:content-['NT$'] font-bold my-3 md:my-0">
              {item.subtotal.toLocaleString('en-US')}
            </div>
            <Counter
              index={index}
              count={item.quantity}
              onIncrease={handleIncreaseButton}
              onDecrease={handleDecreaseButton}
              onInputChange={handleInputChange}
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
