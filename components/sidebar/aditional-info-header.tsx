import Image from 'next/image';
import React from 'react';
import { AdditionalInfoTypes } from '../../types';

export const AditionalInfoHeader: React.FC<AdditionalInfoTypes> = (props) => {
  return (
    <div className="flex items-center justify-center mt-10">
      <Image
        className="-mr-1"
        width={30}
        height={30}
        src={'https:' + props.icon}
        alt={props.icon}
      />
      &nbsp;
      <small>{props.desc}</small>
    </div>
  );
};
