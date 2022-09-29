import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { AppContextProvider } from '../context/appContextProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;
