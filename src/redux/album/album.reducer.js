import albumActionsTypes from './album.types';

const defaultState = {
  items: [],
  isFetching: true,
  startAt: 0,
  perPage: 9,
  currentPage: 1,
  totalCount: 100, // always set to 100 since not api for total count and total 1000 item avaiable on "/albums"
  isFetchError: false,
  currentAlbum: [],
  user: {},
};

export default function albumReducer(state = defaultState, action) {
  switch (action.type) {
    case albumActionsTypes.SET_ALBUM:
      return {
        ...state,
        items: action.payload.items,
        totalCount: action.payload.totalCount,
        isFetching: false,
        currentAlbum: action.payload.currentAlbum,
        user: action.payload.user,
      };
    case albumActionsTypes.SET_ALBUM_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case albumActionsTypes.SET_ALBUM_CURRENT_PAGE:
      return {
        ...state,
        startAt: action.payload * 9 - state.perPage,
        currentPage: action.payload,
      };
    case albumActionsTypes.SET_ALBUM_FETCH_ERROR:
      return {
        ...state,
        isFetchError: action.payload,
      };
    default:
      return state;
  }
}
