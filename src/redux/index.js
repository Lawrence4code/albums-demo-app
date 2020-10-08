import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import albumsListReducer from './albumsList/albumsList.reducer';
import albumReducer from './album/album.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  albums: albumsListReducer,
  selectedAlbum: albumReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
