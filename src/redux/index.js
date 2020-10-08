import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import albumsReducer from './albumsList/albumsList.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  albums: albumsReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
