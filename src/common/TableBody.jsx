import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class TableBody extends Component {
  getCell(item, column) {
    if (column.content) {
      return column.content(item);
    }
    return _.get(item, column.path);
  }

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            {columns.map(column => (
              <td key={item.id + (column.path || column.key)}>
                {" "}
                {this.getCell(item, column)}{" "}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}
TableBody.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array
};

export default TableBody;
