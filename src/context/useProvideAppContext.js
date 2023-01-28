import { useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const useProvideAppContext = () => {
  const [localStorageEvents] = useLocalStorage('events');
  const [events, setEvents] = useState(localStorageEvents || []);
  const [modalEvent, setModalEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return useMemo(
    () => ({
      events,
      setEvents,
      isModalOpen,
      setIsModalOpen,
      modalEvent,
      setModalEvent,
    }),
    [events, isModalOpen, modalEvent],
  );
};

export default useProvideAppContext;
