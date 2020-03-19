import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import PropTypes from "prop-types";

const Table = props => {
  const { data, onSort, sortColumn, columns } = props;
  console.log("Table Data ", data);
  return (
    <table className={"table"}>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />

      <TableBody data={data} columns={columns} />
    </table>
  );
};
Table.propTypes = {
  data: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  sortColumn: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired
};
export default Table;
