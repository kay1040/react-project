import React from 'react';
import styles from './ConfirmModal.module.css';
import Backdrop from '../Backdrop/Backdrop';

function ConfirmModal(props) {
  const { confirmText, onConfirm, onCancel } = props;
  return (
    <Backdrop>
      <div className={styles.confirmModal}>
        <div className={styles.confirmText}>
          <p>{confirmText}</p>
        </div>
        <div className={styles.buttons}>
          <button type="button" className="btn-primary" onClick={onConfirm}>確定</button>
          <button type="button" className={styles.cancel} onClick={onCancel}>取消</button>
        </div>
      </div>
    </Backdrop>
  );
}

export default ConfirmModal;
