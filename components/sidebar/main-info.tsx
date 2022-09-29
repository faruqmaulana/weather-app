import React, { useContext } from 'react';
import { epochToDate } from '../../utils/utils';
import { AppContext } from '../../context/appContextProvider';
import locationInformation from '@iconify/icons-ep/location-information';
import { AditionalInfo } from './aditional-info';

/** Icons **/
import { Icon } from '@iconify/react';
import sunsetIcon from '@iconify/icons-bi/sunset';
import sunriseIcon from '@iconify/icons-bi/sunrise';
import moonriseIcon from '@iconify/icons-carbon/moonrise';
import moonsetIcon from '@iconify/icons-carbon/moonset';
import { AditionalInfoHeader } from './aditional-info-header';

export const WeatherInfo = () => {
  const context = useContext(AppContext);
  const forecast = context?.condition?.forecast.forecastday[0];
  const location = context?.condition?.location;

  return (
    <React.Fragment>
      <div className="flex flex-col mt-6">
        <div className="flex flex-col items-start">
          <div className="flex items-center text-2xl font-bold">
            <Icon icon={locationInformation} />
            &nbsp;
            <h5 className="mb-0 text-2xl">{`${location?.name}, ${location?.region}`}</h5>
          </div>
          <h6 className="mb-0 opacity-80 text-base mt-1">
            {epochToDate(forecast?.date_epoch)}
          </h6>
        </div>

        <div className="flex flex-col items-center mt-5">
          <h6 className="font-bold text-sm sm:text-6xl mt-1">
            {Math.round(forecast?.day.avgtemp_c!)}&nbsp;C&deg;
          </h6>
        </div>
        <AditionalInfoHeader
          icon={forecast?.day.condition.icon}
          desc={forecast?.day.condition.text!}
        />
        <AditionalInfo
          desc="Sunrise"
          icon={sunriseIcon}
          time={forecast?.astro.sunrise!}
        />
        <AditionalInfo
          desc="Sunset"
          icon={sunsetIcon}
          time={forecast?.astro.sunset!}
        />
        <AditionalInfo
          desc="Moonrise"
          icon={moonriseIcon}
          time={forecast?.astro.moonrise!}
        />
        <AditionalInfo
          desc="Moonset"
          icon={moonsetIcon}
          time={forecast?.astro.moonset!}
        />
      </div>
    </React.Fragment>
  );
};
