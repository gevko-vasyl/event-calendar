import { useRef, memo } from 'react';
import { ReactComponent as RightArrow } from '../../assets/right-arrow.svg';
import { ReactComponent as LeftArrow } from '../../assets/left-arrow.svg';
import { ReactComponent as CalendarIcon } from '../../assets/calendar-icon.svg';
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
          <LeftArrow className={styles.arrowSvgIcon} />
        </div>
        <div className={styles.title}>
          {month}, {year}
        </div>
        <div className={styles.item} onClick={handleNextMonth}>
          <RightArrow className={styles.arrowSvgIcon} />
        </div>
      </div>
      <div className={styles.datePicker} onClick={handleOpenDatePicker}>
        <CalendarIcon className={styles.datePickerIcon} />
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

export default memo(DateFilter);
