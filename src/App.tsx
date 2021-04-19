import React from 'react';
import Search from './components/Search';
import Header from './components/Header';
import FavoriteBooks from './components/Favorites';
import {Provider} from 'react-redux';
import {store} from './redux';

import './index.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Header />
      <main className='main-container'>
        <Search />
        <FavoriteBooks />
      </main>
    </Provider>
  );
}

export default App;