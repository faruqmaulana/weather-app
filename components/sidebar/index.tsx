import React, { useContext } from 'react';
import { AppContext } from '../../context/appContextProvider';
import { Searchbar } from '../search';
import { WeatherInfo } from './main-info';

export const Sidebar = () => {
  const context = useContext(AppContext);

  return (
    <div className="col-span-2 flex flex-col container">
      {context?.condition ? (
        <React.Fragment>
          <Searchbar />
          <WeatherInfo />
        </React.Fragment>
      ) : (
        ''
      )}
    </div>
  );
};
