import React, { createContext, useState } from 'react';
import { CurrentCondition, StateContextType } from '../types';

export const AppContext = createContext<StateContextType | undefined>(
  undefined
);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /**@@ STATE **/

  const [weather, setWeather] = useState<CurrentCondition | undefined>(
    undefined
  );

  const [forecast, setForecast] = useState<CurrentCondition | undefined>(
    undefined
  );

  const AppContextValue = {
    condition: weather,
    changeCondition: setWeather,
    forecast: forecast,
    changeForecast: setForecast,
  };

  return (
    <AppContext.Provider value={AppContextValue}>
      {children}
    </AppContext.Provider>
  );
};
