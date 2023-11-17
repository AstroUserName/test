import React from "react";
import { useDispatch } from "react-redux";

const Pagination = ({ itemsPerPage, totalItems, currentPage }) => {
  const dispatch = useDispatch();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() =>
                dispatch({ type: "SET_CURRENT_PAGE", payload: number })
              }
              className={
                currentPage === number ? "page-link active" : "page-link"
              }
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
