import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AlbumList from './components/AlbumsList/AlbumsList';
import Album from './components/Album/Album';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <AlbumList />
        </Route>
        <Route exact path="/album">
          <AlbumList />
        </Route>
        <Route exact path="/album/:id">
          <Album />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
