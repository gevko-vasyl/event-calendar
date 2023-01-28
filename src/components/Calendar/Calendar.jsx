import { useMemo } from 'react';
import { parse } from 'date-fns';
import DayList from '../DayList/DayList';
import {
  getMatchMonthAndYear,
  getEventsByDayNumber,
} from '../../utils/calendar';
import { useAppContext } from '../../context';
import styles from './Calendar.module.css';

const Calendar = ({ date }) => {
  const { events } = useAppContext();
  const eventsInSelectedMonth = getMatchMonthAndYear(
    date.month,
    date.year,
    events,
  );

  // An array of days containing events for the calendar
  const days = useMemo(
    () =>
      Array.from({ length: date.daysInMonth }, (_, i) => {
        const currentDay = i + 1;

        const dateObject = parse(
          `${date.month}, ${currentDay}, ${date.year}`,
          'MMMM, d, yyyy',
          new Date(),
        );

        return {
          date: dateObject,
          events: getEventsByDayNumber(currentDay, eventsInSelectedMonth),
        };
      }),
    [date.daysInMonth, date.month, date.year, eventsInSelectedMonth],
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.calendar}>
        <DayList data={days} firstDayOfMonth={date.firstDay} />
      </div>
    </div>
  );
};

export default Calendar;
