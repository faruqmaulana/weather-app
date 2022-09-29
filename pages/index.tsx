/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { CurrentConditionCard } from '../components/card/current-condition';
import { Forecast } from '../components/card/forecast';
import { Sidebar } from '../components/sidebar';
import { AppContext } from '../context/appContextProvider';
import { fetchForecast, fetchManyForecast } from '../utils/fetch';

const Home = () => {
  const context = useContext(AppContext);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      if (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const req = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_TOKEN}`
        );
        const userLocation = await req.json();
        const userCities = userLocation.name;
        const data = await fetchForecast(userCities);
        const res = await fetchManyForecast(userCities);
        context?.changeForecast(res);
        context?.changeCondition(data);
      }
    });
  }, []);
  return (
    <React.Fragment>
      {context?.condition ? (
        <main className="grid grid-cols-9">
          <Sidebar />
          <div className="col-span-7">
            <div className="flex flex-wrap">
              <div className="min-h-screen bg-card relative min-w-0 break-words rounded-lg w-full">
                <CurrentConditionCard />
                <Forecast />
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-card">
          <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-sky-400 opacity-100"></span>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
