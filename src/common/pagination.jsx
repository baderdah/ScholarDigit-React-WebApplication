import React from "react";
import _ from "lodash/lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  const { totalPages, selectedPage, onPageClicked } = props;
  const pages = _.range(1, totalPages + 1);
  // in the case of totalPage = 3
  // page = [1,2,3]

  let classes = "page-item ";
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(p => (
          <li
            key={p}
            className={classes + (p === selectedPage ? "active" : "")}
          >
            <span onClick={() => onPageClicked(p)} className={"page-link "}>
              {p}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  selectedPage: PropTypes.number.isRequired,
  onPageClicked: PropTypes.func.isRequired
};

export default Pagination;
