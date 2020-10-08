import axios from 'axios';
import albumActionsTypes from './album.types';

const baseAPI = 'http://jsonplaceholder.typicode.com';

export const getAlbum = (albumId, startAt, perPage) => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetching(true));
      const albumResponse = await axios.get(
        `${baseAPI}/albums/${albumId}/photos?_start=${startAt}&_limit=${perPage}`
      );
      const albumCount = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
      );

      const selectedAlbumDetails = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${albumId}`
      );

      const userList =
        JSON.parse(localStorage.getItem('userList')) ||
        (await (await axios.get(`${baseAPI}/users`)).data);

      localStorage.setItem('userList', JSON.stringify(userList));
      const user = userList.filter((user) => {
        return user.id === selectedAlbumDetails.data.userId;
      })[0];

      const albumData = {
        items: albumResponse.data,
        totalCount: albumCount.data.length,
        currentAlbum: selectedAlbumDetails.data,
        user,
      };
      dispatch(setAlbum(albumData));
    } catch (e) {
      dispatch(setFetchError(true));
      dispatch(setIsFetching(false));
    }
  };
};

export const setAlbum = (album) => ({
  type: albumActionsTypes.SET_ALBUM,
  payload: album,
});
export const setIsFetching = (bool) => ({
  type: albumActionsTypes.SET_ALBUM_IS_FETCHING,
  payload: bool,
});
export const setCurrentPage = (page) => ({
  type: albumActionsTypes.SET_ALBUM_CURRENT_PAGE,
  payload: page,
});
export const setFetchError = (bool) => ({
  type: albumActionsTypes.SET_ALBUM_FETCH_ERROR,
  payload: bool,
});
