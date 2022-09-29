import { CurrentCondition } from '../types';

export const fetchForecast = async (
  city: string,
  date: string = ''
): Promise<CurrentCondition> => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e559ee96eef54ce28c0171816222709&q=${city}&dt=${date}`
  );
  const data = await response.json();

  return data;
};

export const fetchManyForecast = async (
  city: string
): Promise<CurrentCondition> => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e559ee96eef54ce28c0171816222709&q=${city}&days=10&aqi=no&alerts=no`
  );
  const res = await response.json();

  return res;
};
