import React from 'react';
import styles from './Backdrop.module.css';
import ReactDOM from 'react-dom';

// 獲取Backdrop的根元素
const backdropRoot = document.getElementById('backdrop-root');

const Backdrop = (props) => {
  return ReactDOM.createPortal(<div {...props} className={`${styles.backdrop} ${props.className}`}>
      {props.children}
  </div>, backdropRoot);
};

export default Backdrop;
