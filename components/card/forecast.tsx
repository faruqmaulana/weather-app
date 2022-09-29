import Image from 'next/image';
import React, { useContext } from 'react';
import { AppContext } from '../../context/appContextProvider';
import { epochToDate } from '../../utils/utils';
import { fetchForecast } from '../../utils/fetch';

export const Forecast: React.FC = () => {
  const context = useContext(AppContext);
  const manyForecast = context?.forecast?.forecast.forecastday;

  return (
    <React.Fragment>
      <h1 className="font-bold text-2xl pl-10 pb-3">10 day forecast</h1>
      <div className="px-10 relative">
        <div className="grid grid-cols-1 gap-y-7 md:grid-cols-5">
          {manyForecast &&
            manyForecast.map((val) => (
              <div
                key={val.date_epoch}
                onClick={() => {
                  (async () => {
                    const data = await fetchForecast(
                      context?.forecast?.location.name!,
                      val.date
                    );
                    context.changeCondition(data);
                  })();
                }}
                className={`text-center mb-0 flex items-center justify-center flex-col w-40 rounded-lg bg-blue-200 hover:cursor-pointer transition-all duration-300 ${
                  context.condition?.forecast.forecastday[0].date_epoch ===
                  val.date_epoch
                    ? 'shadow-selected hover:shadow-main border border-sky-600'
                    : 'shadow-lg hover:shadow-xl'
                }`}
              >
                <span className="block my-1">
                  {epochToDate(val.date_epoch)}
                </span>
                <Image
                  alt={val.date}
                  src={'https:' + val.day.condition.icon}
                  height={30}
                  width={30}
                  className="block w-8 h-8"
                />
                <span className="block my-1">{val.day.avgtemp_c} C&deg;</span>
              </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};
