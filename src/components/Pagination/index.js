import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
import { PAGE_SIZE } from "../../utils/constants";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize = PAGE_SIZE,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage === lastPage) return;

    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage === 1) return;

    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li
          className={classnames("page-item", { disabled: currentPage === 1 })}
          onClick={onPrevious}
        >
          <span className="page-link">Previous</span>
        </li>

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={index} className="page-item">
                <span className="page-link">{DOTS}</span>
              </li>
            );
          }

          return (
            <li
              key={index}
              className={classnames("page-item", {
                active: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              <span className="page-link">{pageNumber}</span>
            </li>
          );
        })}
        <li
          className={classnames("page-item", {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <span className="page-link">Next</span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
