import React from 'react';

export const Layout = (props: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col items-center">
    {props.children}
  </div>
);
