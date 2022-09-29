/* eslint-disable no-unused-vars */
export type UserInfo = {
  city: string;
  country_code: string;
  country_name: string;
  latitude: number;
  longitude: number;
  postal: string | null;
  state: string;
};

export type Search = {
  id: any;
  name: string;
  region: string;
};

export type Location = {
  country: string;
  localtime_epoch: number;
  name: string;
  region: string;
  tz_id: string;
};

export type StaticCondition = {
  text: string;
  icon: string;
};

export type ForecastData = {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    avgvis_km: number;
    avghumidity: number;
    condition: {
      text: string;
      icon: string;
    };
    uv: 6.0;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
  };
};

export type Forecastday = {
  forecastday: ForecastData[];
};

export type CurrentCondition = {
  location: Location;
  forecast: Forecastday;
};

export type AdditionalInfoTypes = {
  icon: any;
  desc: string;
  time?: string;
};

/**App Context Type **/
export type StateContextType = {
  condition: CurrentCondition | undefined;
  changeCondition: (condition: CurrentCondition) => void;
  forecast: CurrentCondition | undefined;
  changeForecast: (forecast: CurrentCondition) => void;
};
