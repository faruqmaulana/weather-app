import { CurrentCondition } from '../types';

export const fetchForecast = async (
  city: string,
  date: string = ''
): Promise<CurrentCondition> => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHERAPP_API_TOKEN}&q=${city}&dt=${date}`
  );
  const data = await response.json();

  return data;
};

export const fetchManyForecast = async (
  city: string
): Promise<CurrentCondition> => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHERAPP_API_TOKEN}&q=${city}&days=10&aqi=no&alerts=no`
  );
  const res = await response.json();

  return res;
};
