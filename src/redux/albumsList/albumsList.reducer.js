import albumsActionsTypes from './albumsList.types';

const defaultState = {
  items: [],
  isFetching: true,
  startAt: 0,
  perPage: 5,
  currentPage: 1,
  totalCount: 100, // always set to 100 since not api for total count and total 1000 item avaiable on "/albums"
  isFetchError: false,
};

export default function albumsReducer(state = defaultState, action) {
  switch (action.type) {
    case albumsActionsTypes.SET_ALBUMSLIST:
      return {
        ...state,
        items: action.payload,
        isFetching: false,
      };
    case albumsActionsTypes.SET_ALBUMSLIST_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case albumsActionsTypes.SET_ALBUMSLIST_CURRENT_PAGE:
      return {
        ...state,
        startAt: action.payload * 5 - state.perPage,
        currentPage: action.payload,
      };
    case albumsActionsTypes.SET_ALBUMSLIST_FETCH_ERROR:
      return {
        ...state,
        isFetchError: action.payload,
      };
    default:
      return state;
  }
}
