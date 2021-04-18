import React from 'react';
import Search from './components/Search';
import Header from './components/Header';
import './index.scss';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className='main-container'>
        <Search />
      </main>
    </>
  );
}

export default App;