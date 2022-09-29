import { useContext, useState } from 'react';
import { AppContext } from '../../context/appContextProvider';
import { fetchForecast, fetchManyForecast } from '../../utils/fetch';
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
        `https://api.weatherapi.com/v1/search.json?key=${
          process.env.NEXT_PUBLIC_WEATHERAPP_API_TOKEN
        }&q=${encodeURIComponent(query)}`
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
  const [hasFocus, setHasFocus] = useState(false);
  const containerStyles = hasFocus
    ? 'border-2 rounded-lg block w-full top-0 left-0 bg-white z-50 overflow-auto sm:relative sm:left-auto sm:bg-transparent sm:z-auto sm:overflow-visible'
    : 'relative';

  const iconDisplayStyle = hasFocus
    ? 'hidden text-crystal-600'
    : 'inline-flex text-oldsilver-400';

  const onBlur = () => setHasFocus(false);
  const onFocus = () => setHasFocus(true);
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
              const currentData = await fetchForecast(e);
              const forecastData = await fetchManyForecast(e);
              if (!currentData?.error || !forecastData?.error) {
                context?.changeCondition(currentData);
                context?.changeForecast(forecastData);
              }
            })();
          }}
          onSelect={(e: any) => {
            if (e)
              return (async () => {
                const currentCity = context?.condition?.location.name;
                if (currentCity !== e.name) {
                  const currentData = await fetchForecast(e.name);
                  const forecastData = await fetchManyForecast(e.name);
                  if (!currentData?.error || !forecastData?.error) {
                    context?.changeCondition(currentData);
                    context?.changeForecast(forecastData);
                  }
                }
              })();
          }}
        />
      </div>
    </div>
  );
};
