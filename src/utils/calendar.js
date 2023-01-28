import { parseISO, format } from 'date-fns';

export const getMatchMonthAndYear = (monthToMatch, yearToMatch, events) => {
  if (!events.length) return [];

  const allMatchedEvents = events.filter(event => {
    const isoDate = parseISO(`${event.date}T${event.start}`);
    const monthInString = format(isoDate, 'LLLL');
    const year = isoDate.getFullYear();
    return monthToMatch === monthInString && year === yearToMatch;
  });

  return allMatchedEvents;
};

export const getEventsByDayNumber = (currentDay, allEvents) => {
  if (!allEvents.length) return [];

  return allEvents.filter(event => {
    const isoDate = parseISO(`${event.date}T${event.start}`);
    const day = format(isoDate, 'd');

    return currentDay === Number(day);
  });
};

export const dateToTimestamp = (date, time) =>
  new Date(`${date}T${time}`).getTime();
