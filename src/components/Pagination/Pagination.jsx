import React, { useEffect, useState } from "react";
import "./pagination.scss";

const Pagination = (props) => {
  const {
    entriesPerPage,
    totalEntries,
    paginate,
    start,
    end,
    currentPage,
    setCurrentPage,
  } = props;
  // total pages
  const numberPages = Math.ceil(totalEntries / entriesPerPage);
  // calculate number of pages from the first page
  const distanceFromStart = currentPage - 1;
  // calculate number of pages to the final page
  const distanceFromEnd = numberPages - currentPage;

  // array of pages
  let pages = [];

  let startingPage = distanceFromStart >= 4 ? currentPage - 1 : 2;
  let endingPage = distanceFromEnd >= 4 ? currentPage + 1 : numberPages - 1;

  useEffect(() => {
    // Faire défiler vers le haut de la page lorsque la page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // method to calculate the range of pages
  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  };

  // case 1 : current page = 1 2 3 4, displayed pages : 1 2 3 4 5
  if (currentPage <= 4) {
    let rangePages = range(
      startingPage,
      numberPages > 4 ? numberPages : numberPages - 1
    );
    pages = rangePages.slice(0, 4);
  }
  // case 2: current page between 5 and pages total - 4
  else if (currentPage >= 5 && currentPage < numberPages - 3) {
    let rangePages = range(startingPage, endingPage);
    pages = rangePages;
  }
  // case 3: current page
  else if (currentPage >= numberPages - 4) {
    let rangePages = range(numberPages - 4, numberPages - 1);
    pages = rangePages;
  }

  const entryEnd = numberPages === currentPage ? totalEntries : end;

  return (
    <div className="pagination">
      <div className="pagination-details">
        <p className="pagination-details-content">
          Showing {start + 1} to {entryEnd} of {totalEntries} entries{" "}
        </p>
      </div>
      <nav className="pagination-nav">
        <ul className="pagination-list">
          <li className="pagination-list-item">
            <button
              className="pagination-list-item-btn prev"
              disabled={currentPage === 1 ? true : false}
              onClick={() =>
                currentPage > 1 ? setCurrentPage(currentPage - 1) : ""
              }
            >
              Previous
            </button>
          </li>
          {numberPages > 1 && (
            <li className="pagination-list-item">
              <button
                onClick={() => paginate(1)}
                className={
                  currentPage === 1
                    ? "pagination-list-item-btn pagination-active"
                    : "pagination-list-item-btn"
                }
              >
                1
              </button>
            </li>
          )}
          {currentPage >= 5 && (
            <li className="pagination-list-item">
              <button className="pagination-list-item-dots">...</button>
            </li>
          )}
          {pages.map((number) => {
            return (
              <li key={number} className="pagination-list-item">
                <button
                  onClick={() => paginate(number)}
                  className={
                    currentPage === number
                      ? "pagination-list-item-btn pagination-active"
                      : "pagination-list-item-btn"
                  }
                >
                  {number}
                </button>
              </li>
            );
          })}
          {currentPage < numberPages - 3 && (
            <li className="pagination-list-item">
              <button className="pagination-list-item-dots">...</button>
            </li>
          )}

          <li className="pagination-list-item">
            <button
              onClick={() => paginate(numberPages)}
              className={
                currentPage === numberPages
                  ? "pagination-list-item-btn pagination-active"
                  : "pagination-list-item-btn"
              }
            >
              {numberPages}
            </button>
          </li>
          <li className="pagination-list-item">
            <button
              className="pagination-list-item-btn next "
              disabled={currentPage === numberPages ? true : false}
              onClick={() =>
                currentPage === numberPages.length
                  ? ""
                  : setCurrentPage(currentPage + 1)
              }
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
