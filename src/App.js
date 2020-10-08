import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AlbumList from './components/AlbumsList/AlbumsList';
import Album from './components/Album/Album';

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
      </Switch>
    </Router>
  );
};

export default App;
