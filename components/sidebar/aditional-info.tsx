import { Icon } from '@iconify/react';
import React from 'react';
import { AdditionalInfoTypes } from '../../types';

export const AditionalInfo: React.FC<AdditionalInfoTypes> = (props) => {
  return (
    <div className="flex justify-between">
      <p className="text-sm">{props.desc}</p>
      <div className="flex items-center">
        <Icon icon={props.icon} />
        &nbsp;
        <p className="text-sm">{props.time}</p>
      </div>
    </div>
  );
};
