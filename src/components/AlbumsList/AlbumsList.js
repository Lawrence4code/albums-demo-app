import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAlbums,
  setCurrentPage,
} from './../../redux/albumsList/albumsList.action';

import PaginationSerialButtons from '../PaginationSerialButtons/PaginationSerialButtons';
import Loader from '../Loader/Loader';
import ErrorMessage from './../ErrorMessage/ErrorMessage';

import './styles.css';

const renderAlbumsList = (list) => {
  return list.map((album) => {
    return (
      <Link
        style={{ textDecoration: 'none' }}
        to={`/album/${album.id}`}
        key={album.id}
      >
        <li className="album">
          <p className="album__title"> Album title: {album.title} </p>
          <p className="album__user"> User: {album.user.username} </p>
        </li>
      </Link>
    );
  });
};

const AlbumList = () => {
  const dispatch = useDispatch();

  const startAt = useSelector((state) => {
    return state.albums.startAt;
  });

  const currentPage = useSelector((state) => {
    return state.albums.currentPage;
  });
  const isFetchError = useSelector((state) => state.albums.isFetchError);
  const isFetching = useSelector((state) => state.albums.isFetching);

  const perPage = useSelector((state) => state.albums.perPage);
  const albums = useSelector((state) => state.albums.items);

  useEffect(() => {
    dispatch(getAlbums(startAt, perPage));
  }, [startAt, perPage, dispatch]);

  const handleNextClick = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };
  const handlePreviousClick = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  return (
    <div className="albums-list">
      <h2> List of Albums </h2>
      {isFetching ? <Loader /> : <ul>{renderAlbumsList(albums)}</ul>}
      {isFetchError && <ErrorMessage />}
      {!isFetching && !isFetchError && (
        <div className="pagination">
          <button
            className="pagination__prev-btn"
            disabled={startAt < 5}
            onClick={() => {
              handlePreviousClick(startAt);
            }}
          >
            Prev
          </button>
          {/* <PaginationControlButton type="albumList" ops="prev" text="Prev"  /> */}
          <span>
            <PaginationSerialButtons
              totalCount={100}
              inc={perPage}
              type="albumList"
            />
          </span>

          <button
            className="pagination__next-btn"
            disabled={startAt >= 95}
            onClick={() => {
              handleNextClick(startAt);
            }}
          >
            {/* 95 cause max albums is 100 and it will dynamic in case we receive total count from the API */}
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AlbumList;
