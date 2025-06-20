import React, { createContext, useContext, useState } from 'react';

type AppContextType = {
    cartCountMap: Record<number, number>; // mealId -> quantity
    setCartCountMap: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  };
  

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartCountMap, setCartCountMap] = useState<Record<number, number>>({});
  const [userName, setUserName] = useState('');

  return (
    <AppContext.Provider value={{ cartCountMap, setCartCountMap }}>

      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
