import { useContext, useState } from 'react';
import { AppContext } from '../../context/appContextProvider';
import { Search } from '../../types';
import { fetchForecast } from '../../utils/fetch';
import Turnstone from 'turnstone';
import { Icon } from '@iconify/react';
import searchIcon from '@iconify/icons-carbon/search';
import cancelIcon from '@iconify/icons-game-icons/cancel';
import roundClear from '@iconify/icons-ic/round-clear';
// Tailwind classes for Turnstone elements
const styles = {
  input:
    'w-full h-12 border border-oldsilver-300 py-2 pl-10 pr-7 text-xl outline-none rounded',
  inputFocus:
    'w-full h-12 border-x-0 border-t-0 border-b border-crystal-500 py-2 pl-10 pr-7 text-xl outline-none sm:rounded sm:border',
  query: 'text-oldsilver-800 placeholder-oldsilver-400',
  typeahead: 'text-crystal-500 border-white',
  cancelButton: `absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 text-crystal-600 inline-flex sm:hidden`,
  clearButton:
    'absolute inset-y-0 right-0 w-8 inline-flex items-center justify-center text-crystal-500 hover:text-hotpink-300',
  listbox:
    'w-full bg-white sm:border sm:border-crystal-500 sm:rounded text-left sm:mt-2 p-2 sm:drop-shadow-xl',
  groupHeading:
    'cursor-default mt-2 mb-0.5 px-1.5 uppercase text-sm text-hotpink-300',
  item: 'cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-oldsilver-700',
  highlightedItem:
    'cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-oldsilver-700 rounded bg-crystal-100',
  match: 'font-semibold',
  noItems: 'cursor-default text-center my-20',
};

// The maximum number of items we want to show in the list
const maxItems = 10;

// Set up listbox contents. We are fetching cities and airports from two different
// API endpoints. 10 from each but ideally we only want to show 8 cities and 2 airports.
const listbox = [
  {
    id: 'cities',
    name: 'Cities',
    ratio: 8,
    displayField: 'name',
    data: (query: any) =>
      fetch(
        `http://api.weatherapi.com/v1/search.json?key=e559ee96eef54ce28c0171816222709&q=${encodeURIComponent(
          query
        )}`
      ).then((response) => response.json()),
    searchType: 'startswith',
  },
];

const Cancel = () => (
  <Icon icon={cancelIcon} type="cancel" className="w-8 h-8" />
);

const Clear = () => <Icon icon={roundClear} type="clear" className="w-6 h-6" />;

export const Searchbar: React.FC = () => {
  const context = useContext(AppContext);

  // new
  const [hasFocus, setHasFocus] = useState(false);

  // Style the container so on mobile devices the search box and results
  // take up the whole screen
  const containerStyles = hasFocus
    ? 'border-2 rounded-lg block w-full top-0 left-0 bg-white z-50 overflow-auto sm:relative sm:left-auto sm:bg-transparent sm:z-auto sm:overflow-visible'
    : 'relative';

  const iconDisplayStyle = hasFocus
    ? 'hidden text-crystal-600'
    : 'inline-flex text-oldsilver-400';

  const onBlur = () => setHasFocus(false);
  const onFocus = () => setHasFocus(true);
  console.log(listbox);
  return (
    <div className="dropdown relative flex flex-col items-center">
      <h1 className="font-bold text-3xl pt-10 pb-5 text-center">Weather APP</h1>
      <div className={containerStyles}>
        <span
          className={`absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 sm:inline-flex ${iconDisplayStyle}`}
        >
          <Icon type="search" className="w-6 h-6" icon={searchIcon} />
        </span>
        <Turnstone
          autoFocus={true}
          cancelButton={true}
          clearButton={true}
          debounceWait={250}
          id="autocomplete"
          listbox={listbox}
          listboxIsImmutable={true}
          matchText={true}
          maxItems={maxItems}
          noItemsMessage="We found no places that match your search"
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder="Search"
          styles={styles}
          Cancel={Cancel}
          Clear={Clear}
          onEnter={(e: any) => {
            (async () => {
              const data = await fetchForecast(e);
              context?.changeCondition(data);
            })();
          }}
          // onSelect={(e: any) => {
          //   console.log(e.name);
          // }}
        />
      </div>
    </div>
  );
};

// const [inputUser, setInputUser] = useState('');
// const [searchData, setSearchData] = useState<Search[]>([]);

// const fetchCity = (state: string) => {
//   fetch(
//     `http://api.weatherapi.com/v1/search.json?key=e559ee96eef54ce28c0171816222709&q=${state}`
//   )
//     .then((response) => response.json())
//     .then((data) => setSearchData(data));
// };

// const handleSubmit = async (city: string) => {
//   const data = await fetchForecast(city);
//   context?.changeCondition(data);
// };

{
  /* <div className="mt-3 flex items-center justify-between border-2 text-gray-600 bg-white border-gray-300 h-10 px-5 rounded-lg w-full lg:w-full">
<input
autoComplete="off"
name="search"
className="text-sm focus:outline-none w-full"
type="text"
value={inputUser}
onChange={(e) => {
  setInputUser(e.target.value);
  e.target.value === '' ? e.target.value === null : e.target.value;
  fetchCity(e.target.value);
}}
placeholder="Search"
/>
<svg
className="text-gray-600 h-4 w-4 fill-current hover: cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      viewBox="0 0 56.966 56.966"
      width="512px"
      height="512px"
    >
      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
    </svg>
  </div> */
}
{
  /* <ul className="dropdown-menu text-gray-700 pt-1">
    {searchData.length > 0 &&
      searchData.map((val) => (
        <li className="" key={val.id}>
          <a
            className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
            href="#"
            onClick={() => {
              handleSubmit(val.name);
            }}
          >
            {`${val.name}, ${val.region}`}
          </a>
        </li>
      ))}
  </ul> */
}
