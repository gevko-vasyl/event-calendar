import { useAppContext } from '../../context';
import styles from './Event.module.css';

const Event = ({ event }) => {
  const { setIsModalOpen, setModalEvent } = useAppContext();

  return (
    <div
      onClick={() => {
        setIsModalOpen(true);
        setModalEvent(event);
      }}
      key={event.name}
      className={styles.container}
    >
      <span>{event.start} </span>
      <span className={styles.title}>{event.name}</span>
    </div>
  );
};

export default Event;
