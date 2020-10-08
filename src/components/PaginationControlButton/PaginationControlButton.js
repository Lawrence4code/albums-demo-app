import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PaginationControlButton = ({ type, ops, text }) => {
  console.log(type, ops, text);
  const dispatch = useDispatch();

  const handleNextClick = () => {
    // dispatch(setCurrentPage(currentPage + 1));
  };
  const handlePreviousClick = () => {
    // dispatch(setCurrentPage(currentPage - 1));
  };
  return <span>button</span>;
};

export default PaginationControlButton;
