import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./pagination.scss";

/**
 * This component represents a pagination control.
 *
 * @param {Object} props - The props object.
 * @param {number} props.entriesPerPage - The number of entries per page.
 * @param {number} props.totalEntries - The total number of entries.
 * @param {function} props.paginate - The function to handle pagination.
 * @param {number} props.start - The starting index of the current page.
 * @param {number} props.end - The ending index of the current page.
 * @param {number} props.currentPage - The current page number.
 * @param {function} props.setCurrentPage - The function to set the current page number.
 * @returns {JSX} - The pagination component.
 */
function Pagination(props) {
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

  const startingPage = distanceFromStart >= 4 ? currentPage - 1 : 2;
  const endingPage = distanceFromEnd >= 4 ? currentPage + 1 : numberPages - 1;

  useEffect(() => {
    // Faire défiler vers le haut de la page lorsque la page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  /**
   * Generates an array of numbers within a specified range.
   *
   * @param {number} from - The starting value of the range.
   * @param {number} to - The ending value of the range.
   * @param {number} [step=1] - The step size between numbers in the range.
   * @returns {number[]} - An array of numbers within the specified range.
   */
  const range = (from, to, step = 1) => {
    let i = from;
    const numberpages = [];
    while (i <= to) {
      numberpages.push(i);
      i += step;
    }
    return numberpages;
  };

  // case 1 : current page = 1 2 3 4, displayed pages : 1 2 3 4 5
  if (currentPage <= 4) {
    const rangePages = range(
      startingPage,
      numberPages > 4 ? numberPages : numberPages - 1,
    );
    pages = rangePages.slice(0, 4);
  } else if (currentPage >= 5 && currentPage < numberPages - 3) {
    const rangePages = range(startingPage, endingPage);
    pages = rangePages;
  } else if (currentPage >= numberPages - 4) {
    const rangePages = range(numberPages - 4, numberPages - 1);
    pages = rangePages;
  }

  const entryEnd = numberPages === currentPage ? totalEntries : end;

  return (
    <div className="pagination">
      <div className="pagination-details">
        <p className="pagination-details-content">
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */ }
          Showing {start + 1} to {entryEnd} of {totalEntries} entries
        </p>
      </div>
      <nav className="pagination-nav">
        <ul className="pagination-list">
          <li className="pagination-list-item">
            <button
              type="button"
              className="pagination-list-item-btn prev"
              disabled={currentPage === 1 ? true : false}
              onClick={() => (currentPage > 1 ? setCurrentPage(currentPage - 1) : "")}
            >
              Previous
            </button>
          </li>
          {numberPages > 1 && (
            <li className="pagination-list-item">
              <button
                type="button"
                onClick={() => (paginate(1))}
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
              <button type="button" className="pagination-list-item-dots">...</button>
            </li>
          )}
          {pages.map((number) => (
            <li key={number} className="pagination-list-item">
              <button
                type="button"
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
          ))}
          {currentPage < numberPages - 3 && (
            <li className="pagination-list-item">
              <button type="button" className="pagination-list-item-dots">...</button>
            </li>
          )}

          <li className="pagination-list-item">
            <button
              type="button"
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
              type="button"
              className="pagination-list-item-btn next "
              /* eslint no-unneeded-ternary: [0] */
              disabled={currentPage === numberPages ? true : false}
              onClick={() => (currentPage === numberPages.length
                ? ""
                : setCurrentPage(currentPage + 1)
              )}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

Pagination.propTypes = {
  entriesPerPage: PropTypes.number.isRequired,
  totalEntries: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
export default Pagination;
