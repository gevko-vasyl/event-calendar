import { useRef } from 'react';
import styles from './DateFilter.module.css';

const DateFilter = ({
  month,
  year,
  yearAndMonth,
  handlePreviousMonth,
  handleNextMonth,
  onChangeSelectedMonth,
}) => {
  const inputRef = useRef(null);

  const handleOpenDatePicker = async () => {
    await inputRef.current.showPicker();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.item} onClick={handlePreviousMonth}>
          <svg
            className={styles.arrowSvgIcon}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div className={styles.title}>
          {month}, {year}
        </div>
        <div className={styles.item} onClick={handleNextMonth}>
          <svg
            className={styles.arrowSvgIcon}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
      <div className={styles.datePicker} onClick={handleOpenDatePicker}>
        <svg
          className={styles.datePickerIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
        >
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
        </svg>
        <input
          ref={inputRef}
          className={styles.datePickerInput}
          type="month"
          value={yearAndMonth}
          onChange={e => {
            if (!e.target.value) {
              return;
            }
            onChangeSelectedMonth(...e.target.value.split('-'));
          }}
        />
      </div>
    </div>
  );
};

export default DateFilter;
