import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoadingPage from './components/LoadingPage';
import MainPage from './components/MainPage';

export default function App() {
  const [page, setPage] = useState('landing');

  return (
    <>
      {page === 'landing' && (
        <LandingPage onEnter={() => setPage('loading')} />
      )}
      
      {page === 'loading' && (
        <LoadingPage onFinished={() => setPage('main')} />
      )}
      
      {page === 'main' && (
        <MainPage onExit={() => setPage('landing')} />
      )}
    </>
  );
}
