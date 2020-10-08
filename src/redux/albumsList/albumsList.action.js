import axios from 'axios';
import albumsActionsTypes from './albumsList.types';

const baseAPI = 'http://jsonplaceholder.typicode.com';

export const getAlbums = (startAt, perPage) => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetching(true));
      const albumsResponse = await axios.get(
        `${baseAPI}/albums?_start=${startAt}&_limit=${perPage}`
      );
      const userList =
        JSON.parse(localStorage.getItem('userList')) ||
        (await (await axios.get(`${baseAPI}/users`)).data);

      localStorage.setItem('userList', JSON.stringify(userList));
      const albumsData = albumsResponse.data.map((album) => {
        const user = userList.filter((user) => album.userId === user.id)[0]; // considering user are unique
        return { ...album, user };
      });

      dispatch(setAlbums(albumsData));
    } catch (e) {
      dispatch(setFetchError(true));
      dispatch(setIsFetching(false));
    }
  };
};

export const setAlbums = (albums) => ({
  type: albumsActionsTypes.SET_ALBUMSLIST,
  payload: albums,
});
export const setIsFetching = (bool) => ({
  type: albumsActionsTypes.SET_ALBUMSLIST_IS_FETCHING,
  payload: bool,
});
export const setCurrentPage = (page) => ({
  type: albumsActionsTypes.SET_ALBUMSLIST_CURRENT_PAGE,
  payload: page,
});
export const setFetchError = (bool) => ({
  type: albumsActionsTypes.SET_ALBUMSLIST_FETCH_ERROR,
  payload: bool,
});
