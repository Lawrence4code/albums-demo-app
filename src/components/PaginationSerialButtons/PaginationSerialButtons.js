import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentPage as setAlbumsListCurrentPage } from './../../redux/albumsList/albumsList.action';
import { setCurrentPage as setAlbumCurrentPage } from './../../redux/album/album.actions';

const PaginationSerialButtons = ({ totalCount, inc, type = 'albumList' }) => {
  let currentPage = useSelector((state) => {
    if (type === 'album') {
      return state.selectedAlbum.currentPage;
    }
    return state.albums.currentPage;
  });
  let actionToBeDispatched = setAlbumsListCurrentPage;
  if (type === 'album') {
    actionToBeDispatched = setAlbumCurrentPage;
  }

  const dispatch = useDispatch();

  const panignationButton = [];
  for (let i = 0; i < totalCount; i = i + inc) {
    panignationButton.push({ page: i / inc + 1, start: i });
  }
  return panignationButton.map((button) => {
    return (
      <span
        className={`pagination__page-btn ${
          currentPage === button.page ? 'pagination__page-btn--isActive' : ''
        }`}
        key={button.page}
        onClick={() => {
          dispatch(actionToBeDispatched(button.page));
        }}
      >
        {button.page}
      </span>
    );
  });
};

export default PaginationSerialButtons;
