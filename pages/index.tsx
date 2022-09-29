/* eslint-disable react-hooks/exhaustive-deps */
import type { GetServerSideProps } from 'next';
import React, { useContext, useEffect } from 'react';
import { CurrentConditionCard } from '../components/card/current-condition';
import { Forecast } from '../components/card/forecast';
import { Sidebar } from '../components/sidebar';
import { AppContext } from '../context/appContextProvider';
import { UserInfo } from '../types';
import { fetchForecast, fetchManyForecast } from '../utils/fetch';

const Home = ({ userInfo }: { userInfo: UserInfo }) => {
  const context = useContext(AppContext);
  useEffect(() => {
    (async () => {
      const data = await fetchForecast(userInfo.city);
      const res = await fetchManyForecast(userInfo.city);
      context?.changeForecast(res);
      context?.changeCondition(data);
    })();
  }, []);
  return (
    <React.Fragment>
      <main className="grid grid-cols-9">
        <Sidebar />
        {context?.condition && (
          <div className="col-span-7">
            <div className="flex flex-wrap">
              <div className="min-h-screen bg-card relative min-w-0 break-words rounded-lg w-full">
                <CurrentConditionCard />
                <Forecast />
              </div>
            </div>
          </div>
        )}
      </main>
    </React.Fragment>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const req = await fetch('https://geolocation-db.com/json/geoip.json');
  const userInfo = await req.json();
  console.log('user info: ', userInfo);

  return {
    props: {
      userInfo,
    },
  };
};
