import React, { useContext } from 'react';
import { AppContext } from '../../context/appContextProvider';
import {
  humidityStatus,
  uvStatus,
  visibilityStatus,
  windStatus,
} from '../../utils/utils';

export const CurrentConditionCard: React.FC = () => {
  const context = useContext(AppContext);
  const forecast = context?.condition?.forecast.forecastday[0];

  return (
    <React.Fragment>
      <div className="p-10 relative">
        <h1 className="mb-5 font-bold text-4xl">Weather statistics ✨✨</h1>
        <div className="grid grid-cols-1 lg:gap-x-40 lg:gap-y-5 md:grid-cols-2">
          <div className="flex flex-col justify-between items-center bg-blue-100 p-5 rounded-lg shadow-main">
            <span>Humidity</span>
            <h1 className="px-2 inline-block font-bold text-3xl my-1">
              {forecast?.day.avghumidity}
            </h1>
            {humidityStatus(2)}
          </div>
          <div className="flex flex-col justify-between items-center bg-blue-100 p-5 rounded-lg shadow-main">
            <span>UV</span>
            <h1 className="px-2 inline-block font-bold text-3xl my-1">
              {forecast?.day.uv}
            </h1>
            {uvStatus(0.2)}
          </div>
          <div className="flex flex-col justify-between items-center bg-blue-100 p-5 rounded-lg shadow-main">
            <span>Wind Status</span>
            <h1 className="px-2 inline-block font-bold text-3xl my-1">
              {forecast?.day.maxwind_kph} <span className="text-sm">km/h</span>
            </h1>
            {windStatus(forecast?.day.maxwind_kph!)}
          </div>
          <div className="flex flex-col justify-between items-center bg-blue-100 p-5 rounded-lg shadow-main">
            <span>Visibility</span>
            <h1 className="px-2 inline-block font-bold text-3xl my-1">
              {forecast?.day.avgvis_km} <span className="text-sm">km</span>
            </h1>
            {visibilityStatus(forecast?.day.avgvis_km!)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
