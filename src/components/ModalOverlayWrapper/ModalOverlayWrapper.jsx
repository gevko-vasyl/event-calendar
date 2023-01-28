import { useAppContext } from '../../context';
import styles from './ModalOverlayWrapper.module.css';

const ModalOverlayWrapper = ({ children }) => {
  const { isModalOpen, setIsModalOpen, setModalEvent } = useAppContext();

  const handleClose = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setIsModalOpen(false);
    setModalEvent(null);
  };

  return (
    <>
      {isModalOpen && (
        <div className={styles.overlay} onClick={handleClose}>
          <div className={styles.modal}>{children}</div>
        </div>
      )}
    </>
  );
};

export default ModalOverlayWrapper;
