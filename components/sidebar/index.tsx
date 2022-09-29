import { Searchbar } from '../search';
import { WeatherInfo } from './main-info';

export const Sidebar = () => (
  <div className="col-span-2 flex flex-col container">
    <Searchbar />
    <WeatherInfo />
  </div>
);
