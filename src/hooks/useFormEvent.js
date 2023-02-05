import { useMemo, useState, useCallback } from 'react';
import { isBefore, parse } from 'date-fns';
import { nanoid } from 'nanoid';
import { useAppContext } from '../context';
import { useLocalStorage } from './useLocalStorage';
// import { useApiCall } from './useApiCall';

export const useFormEvent = event => {
  const [name, setName] = useState(event?.name || '');
  const [date, setDate] = useState(event?.date || '');
  const [start, setStart] = useState(event?.start || '');
  const [end, setEnd] = useState(event?.end || '');
  const [description, setDescription] = useState(event?.description || '');
  const { setIsModalOpen, setModalEvent, setEvents, setError } =
    useAppContext();
  const [localStorageEvents, setLocalStorageEvents] = useLocalStorage('events');
  // const { makeCall } = useApiCall(url,'POST');

  const dateStart = useMemo(
    () => parse(`${date} ${start}`, 'yyyy-MM-dd HH:mm', new Date()),
    [date, start],
  );

  const dateEnd = useMemo(
    () => parse(`${date} ${end}`, 'yyyy-MM-dd HH:mm', new Date()),
    [date, end],
  );

  //TODO make fn async if want to use api call
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      setError('');

      if (!name.trim()) {
        setError('Event name is required');
        return;
      }

      if (!date) {
        setError('Event date is required');
        return;
      }

      if (isBefore(dateEnd, dateStart)) {
        setError('End time cannot be before start time');
        return;
      }

      let newEvent;

      if (event) {
        // Updated event
        newEvent = {
          ...event,
          name,
          description,
          date,
          start,
          end,
          updatedAt: new Date(),
        };
      } else {
        // Created event
        newEvent = {
          id: nanoid(),
          name,
          description,
          date,
          start,
          end,
          createdAt: new Date(),
          updatedAt: null,
        };
      }

      // Make post api call to add new event
      // await makeCall(newEvent);

      const updatedEvents = localStorageEvents
        ? [...localStorageEvents.filter(el => el?.id !== event?.id), newEvent]
        : [newEvent];

      setLocalStorageEvents(updatedEvents);
      setEvents(updatedEvents);

      setIsModalOpen(false);
      setModalEvent(null);
    },
    [
      date,
      description,
      end,
      event,
      localStorageEvents,
      name,
      setEvents,
      setIsModalOpen,
      setLocalStorageEvents,
      setModalEvent,
      start,
    ],
  );

  const handleDelete = useCallback(
    id => {
      const updatedEvents = localStorageEvents.filter(el => el.id !== id);

      setLocalStorageEvents(updatedEvents);
      setEvents(updatedEvents);

      setIsModalOpen(false);
      setModalEvent(null);
    },
    [
      localStorageEvents,
      setEvents,
      setIsModalOpen,
      setLocalStorageEvents,
      setModalEvent,
    ],
  );

  return useMemo(
    () => ({
      name,
      setName,
      date,
      setDate,
      start,
      setStart,
      end,
      setEnd,
      description,
      setDescription,
      handleSubmit,
      handleDelete,
    }),
    [date, description, end, handleDelete, handleSubmit, name, start],
  );
};
