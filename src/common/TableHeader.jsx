import React, { Component } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import "font-awesome/css/font-awesome.css";

class TableHeader extends Component {
  raiseSort = sortBy => {
    const { sortColumn, onSort } = this.props;
    if (sortColumn.sortBy === sortBy) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.sortBy = sortBy;
      sortColumn.order = "asc";
    }
    onSort(sortColumn);
  };
  render() {
    const { columns, sortColumn } = this.props;
    return (
      <React.Fragment>
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.path || c.key} onClick={() => this.raiseSort(c.path)}>
                {c.label}
                {sortColumn.sortBy === (c.path || c.key) &&
                  (sortColumn.order === "asc" ? (
                    <i className="m-2 fa fa-sort-down" />
                  ) : (
                    <i className="m-2 fa fa-sort-up" />
                  ))}
              </th>
            ))}
          </tr>
        </thead>
      </React.Fragment>
    );
  }
  q;
}

Pagination.propTypes = {
  sortColumn: PropTypes.object,
  onSort: PropTypes.func,
  columns: PropTypes.object
};

export default TableHeader;
