import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from './Counter.module.css';

function Counter(props) {
  const {
    count,
    onDecrease,
    onIncrease,
    onInputChange,
  } = props;

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

export default React.memo(Counter);
