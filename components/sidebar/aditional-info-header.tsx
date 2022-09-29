import React from 'react';
import { AdditionalInfoTypes } from '../../types';

export const AditionalInfoHeader: React.FC<AdditionalInfoTypes> = (props) => {
  return (
    <div className="flex items-center justify-center mt-10">
      <img className="h-10 w-10 -mr-1" src={props.icon} alt={props.icon} />
      &nbsp;
      <small>{props.desc}</small>
    </div>
  );
};
