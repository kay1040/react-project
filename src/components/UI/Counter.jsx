import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from './Counter.module.css';

function Counter(props) {
  const {
    count,
    onDecrement,
    onIncrement,
    onInputChange,
    buttonStyle,
    inputStyle,
  } = props;

  return (
    <div className={styles.counter}>
      <button type="button" className={`${styles.sub} ${buttonStyle}`} onClick={onDecrement}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <input type="text" value={count} onChange={onInputChange} className={`${styles.count} ${inputStyle}`} />
      <button type="button" className={`${styles.add} ${buttonStyle}`} onClick={onIncrement}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

export default React.memo(Counter);
