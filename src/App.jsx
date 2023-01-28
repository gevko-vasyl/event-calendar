import Calendar from './components/Calendar/Calendar';
import Header from './components/Header/Header';
import ModalOverlayWrapper from './components/ModalOverlayWrapper/ModalOverlayWrapper';
import EventForm from './components/EventForm/EventForm';
import { useDate } from './hooks/useDate';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [localStorageDate] = useLocalStorage('selectedDate');
  const date = useDate(localStorageDate);

  return (
    <div className="app">
      <ModalOverlayWrapper>
        <EventForm />
      </ModalOverlayWrapper>
      <Header date={date} />
      <Calendar date={date} />
    </div>
  );
}

export default App;
