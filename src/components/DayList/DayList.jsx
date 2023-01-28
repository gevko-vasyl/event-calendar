import { useMemo } from 'react';
import DayCard from '../DayCard/DayCard';
import styles from './DayList.module.css';

const DayList = ({ data, firstDayOfMonth }) => {
  const DAYS = useMemo(
    () => ({
      Mon: 0,
      Tue: 1,
      Wed: 2,
      Thu: 3,
      Fri: 4,
      Sat: 5,
      Sun: 6,
    }),
    [],
  );

  const daysFromPrevMonth = useMemo(
    () => Array.from({ length: DAYS[firstDayOfMonth] }, (_, i) => i + 1),
    [DAYS, firstDayOfMonth],
  );

  return (
    <div className={styles.list}>
      {daysFromPrevMonth.map(day => (
        <div key={`day-${day}`}></div>
      ))}

      {data.map(dayData => (
        <DayCard key={dayData.date} {...dayData} />
      ))}
    </div>
  );
};

export default DayList;
