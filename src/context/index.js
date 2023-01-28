import { createContext, useContext } from 'react';
import useProvideAppContext from './useProvideAppContext';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const eventsData = useProvideAppContext();
  return (
    <AppContext.Provider value={eventsData}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
