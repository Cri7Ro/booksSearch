import React from 'react';
import Search from './components/Search';
import './index.scss';

const App: React.FC = () => {
  return (
    <main className='main-container'>
      <Search />
    </main>
  );
}

export default App;