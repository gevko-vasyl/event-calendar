import DateFilter from '../DateFilter/DateFilter';
import { useAppContext } from '../../context';
import styles from './Header.module.css';

const CalendarHeader = ({ date }) => {
  const { setIsModalOpen } = useAppContext();
  return (
    <header className={styles.header}>
      <div className={styles.addButton} onClick={() => setIsModalOpen(true)}>
        <svg viewBox="0 0 24 24" className={styles.svg}>
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      </div>
      <DateFilter
        month={date?.month}
        year={date?.year}
        yearMonth={date?.yearAndMonth}
        handleNextMonth={date?.getNextMonth}
        handlePreviousMonth={date?.getPreviousMonth}
        onChangeSelectedMonth={date?.getSelectedMonth}
      />
    </header>
  );
};

export default CalendarHeader;
