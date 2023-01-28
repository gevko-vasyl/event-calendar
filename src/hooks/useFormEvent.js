import { useMemo, useState, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { useAppContext } from '../context';
import { useLocalStorage } from './useLocalStorage';

export const useFormEvent = event => {
  const [name, setName] = useState(event?.name || '');
  const [date, setDate] = useState(event?.date || '');
  const [start, setStart] = useState(event?.start || '');
  const [end, setEnd] = useState(event?.end || '');
  const [description, setDescription] = useState(event?.description || '');
  const [error, setError] = useState('');
  const { setIsModalOpen, setModalEvent, setEvents } = useAppContext();
  const [localStorageEvents, setLocalStorageEvents] = useLocalStorage('events');

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

      const newEvent = { id: nanoid(), name, description, date, start, end };

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
      event?.id,
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
      error,
    }),
    [date, description, end, error, handleDelete, handleSubmit, name, start],
  );
};
