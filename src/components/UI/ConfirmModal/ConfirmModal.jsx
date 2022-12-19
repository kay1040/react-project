import styles from "./ConfirmModal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const ConfirmModal = (props) => {
    return (
        <Backdrop>
            <div className={styles.confirmModal}>
                <div className={styles.confirmText}>
                    <p>{props.confirmText}</p>
                </div>
                <div className={styles.buttons}>
                    <button className="btn-primary" onClick={props.onConfirm}>確定</button>
                    <button className={styles.cancel} onClick={props.onCancel}>取消</button>
                </div>
            </div>
        </Backdrop>
    )
};

export default ConfirmModal;