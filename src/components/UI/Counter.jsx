import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import styles from './Counter.module.css';

export default function Counter(props) {
  const cart = useSelector((state) => state.cart);
  const {
    index, onDecrease, onIncrease, onInputChange,
  } = props;
  let { count } = props;

  if (!count) count = cart.cartItems[index].quantity;

  return (
    <div className={styles.counter}>
      <button type="button" className={styles.sub} onClick={onDecrease}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <input type="text" value={count} onChange={onInputChange} className={styles.count} />
      <button type="button" className={styles.add} onClick={onIncrease}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}
