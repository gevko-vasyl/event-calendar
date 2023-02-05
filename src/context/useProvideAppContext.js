import { useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const useProvideAppContext = () => {
  const [localStorageEvents] = useLocalStorage('events');
  const [events, setEvents] = useState(localStorageEvents || []);
  const [modalEvent, setModalEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  return useMemo(
    () => ({
      events,
      setEvents,
      isModalOpen,
      setIsModalOpen,
      modalEvent,
      setModalEvent,
      isLoading,
      setIsLoading,
      error,
      setError,
    }),
    [events, isModalOpen, modalEvent, isLoading, error],
  );
};

export default useProvideAppContext;
