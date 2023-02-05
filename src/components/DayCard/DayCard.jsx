import { useMemo, memo } from 'react';
import { isSameDay, format } from 'date-fns';
import Event from '../Event/Event';
import { dateToTimestamp } from '../../utils/calendar';

import styles from './DayCard.module.css';

const DayCard = ({ date, events }) => {
  const dayNumber = date.getDate();
  const dayName = format(date, 'EEEEEE');

  const sameDayCheck = isSameDay(date, new Date());
  const currentDayStyles =
    sameDayCheck === true ? { backgroundColor: '#BFD0D8' } : {};

  const sortedEvents = useMemo(
    () =>
      [...events].sort(
        (a, b) =>
          dateToTimestamp(a.date, a.start) - dateToTimestamp(b.date, b.start),
      ),
    [events],
  );

  return (
    <div className={styles.container} style={currentDayStyles}>
      <div className={styles.day}>
        <span>{dayNumber}</span>
        <span>{dayName}</span>
      </div>

      <div className={styles.event}>
        {sortedEvents.map((event, i) => (
          <Event event={event} key={i} />
        ))}
      </div>
    </div>
  );
};

export default memo(DayCard);
