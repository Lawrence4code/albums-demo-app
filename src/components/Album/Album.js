import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAlbum, setCurrentPage } from '../../redux/album/album.actions';
import PaginationSerialButtons from '../PaginationSerialButtons/PaginationSerialButtons';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

import './styles.css';

const Album = () => {
  const dispatch = useDispatch();
  const { id: albumId = 1 } = useParams(); // destructure as albumId, default to 1
  const {
    startAt,
    perPage,
    currentAlbum,
    user,
    isFetching,
    isFetchError,
    totalCount,
    currentPage,
    items: album,
  } = useSelector((state) => {
    return state.selectedAlbum;
  });

  useEffect(() => {
    dispatch(getAlbum(albumId, startAt, perPage));
  }, [albumId, startAt, perPage, dispatch]);

  const handleNextClick = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePreviousClick = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  return (
    <div className="album-container">
      <h2 className="album-title"> {currentAlbum.title || 'Album Title'} </h2>
      <h3> Uploaded by: {user.username || 'Username'} </h3>
      <div className="album__card-container">
        {isFetching ? (
          <Loader />
        ) : (
          album.map((item) => {
            return (
              <div className="album__card" key={item.id}>
                <img
                  className="album__card--image"
                  src={item.thumbnailUrl}
                  alt={item.title}
                />
                <p className="album__card--title">{item.title}</p>
              </div>
            );
          })
        )}
      </div>

      {isFetchError && <ErrorMessage />}

      {!isFetching && !isFetchError && (
        <div className="pagination">
          <button
            className={`pagination__prev-btn ${
              startAt < 9 && 'pagination__btn--disabled'
            } `}
            disabled={startAt < 9}
            onClick={() => {
              handlePreviousClick(startAt);
            }}
          >
            Prev
          </button>
          <span>
            <PaginationSerialButtons
              totalCount={totalCount}
              inc={perPage}
              type="album"
            />
          </span>

          <button
            className={`pagination__next-btn ${
              startAt >= totalCount - 9 && 'pagination__btn--disabled'
            }`}
            disabled={startAt >= totalCount - 9}
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

export default Album;
