import React from "react";
import PropTypes from "prop-types";

const ListGroup = props => {
  const {
    items,
    selectedItem,
    onItemChanged,
    textProperty,
    valueProperty
  } = props;
  let classes = "list-group-item ";

  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemChanged(item)}
          className={classes + (item === selectedItem ? "active" : "")}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

ListGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedItem: PropTypes.object,
  onItemChanged: PropTypes.func.isRequired,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string
};
export default ListGroup;
