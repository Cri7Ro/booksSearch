import React from 'react';
import Search from './components/Search';
import Header from './components/Header';
import FavoriteBooks from './components/Favorites';
import {Provider} from 'react-redux';
import {store} from './redux';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import './index.scss';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <main className='main-container'>
          <Switch>
            <Route exact component={Search} path='/'/>
            <Route component={FavoriteBooks} path='/favorites'/>
          </Switch>
        </main>
      </Provider>
    </BrowserRouter>
  );
}

export default App;