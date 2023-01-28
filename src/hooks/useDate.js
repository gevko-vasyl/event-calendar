import { useCallback, useMemo, useState } from 'react';
import { format } from 'date-fns';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import startOfMonth from 'date-fns/startOfMonth';

import { useLocalStorage } from './useLocalStorage';

export const useDate = localStorageDate => {
  const [date, setDate] = useState(() => {
    if (localStorageDate) {
      return new Date(localStorageDate);
    }
    return new Date();
  });
  const [, setLocalStorageDate] = useLocalStorage('selectedDate');

  const year = getYear(date);
  const month = format(date, 'LLLL');
  const yearAndMonth = format(date, 'yyyy-MM');
  const daysInMonth = getDaysInMonth(date);
  const firstDay = format(startOfMonth(date), 'E');

  const getNextMonth = useCallback(() => {
    setDate(prevDate => new Date(getYear(prevDate), getMonth(prevDate) + 1));
  }, []);

  const getPreviousMonth = useCallback(() => {
    setDate(prevDate => new Date(getYear(prevDate), getMonth(prevDate) - 1));
  }, []);

  const getSelectedMonth = useCallback(
    (year, month) => {
      const date = new Date(year, month - 1, 1);

      setDate(date);
      setLocalStorageDate(date);
    },
    [setLocalStorageDate],
  );

  return useMemo(
    () => ({
      year,
      month,
      yearAndMonth,
      daysInMonth,
      firstDay,
      getNextMonth,
      getPreviousMonth,
      getSelectedMonth,
    }),
    [
      daysInMonth,
      firstDay,
      getNextMonth,
      getPreviousMonth,
      getSelectedMonth,
      month,
      year,
      yearAndMonth,
    ],
  );
};
