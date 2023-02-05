import { memo } from 'react';
import DateFilter from '../DateFilter/DateFilter';
import { useAppContext } from '../../context';
import { ReactComponent as AddIcon } from '../../assets/add-icon.svg';
import styles from './Header.module.css';

const CalendarHeader = ({ date }) => {
  const { setIsModalOpen, setError } = useAppContext();
  return (
    <header className={styles.header}>
      <div
        className={styles.addButton}
        onClick={() => {
          setIsModalOpen(true);
          setError('');
        }}
      >
        <AddIcon className={styles.svg} />
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

export default memo(CalendarHeader);
