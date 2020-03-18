import React, { Component } from "react";
import PropTypes, { object } from "prop-types";
import Table from "../common/Table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class ModulesTable extends Component {
  columns = [
    {
      path: "nom",
      label: "Name",
      content: module => <Link to={"modules/" + module.id}>{module.nom} </Link>
    },
    { path: "prof.nom", label: "Prof" }
  ];

  deleteColumn = {
    key: "delete",
    content: module => (
      <button
        onClick={() => this.props.onModuleDelete(module.id)}
        className={"btn btn-sm btn-danger"}
      >
        delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    // if (user && user.isAdmin) {
    this.columns.push(this.deleteColumn);
    // }
  }
  render() {
    const { modules, onSort, sortColumn } = this.props;
    return (
      <Table
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.columns}
        data={modules}
      />
    );
  }
}
ModulesTable.propTypes = {
  modules: PropTypes.arrayOf(object).isRequired,
  onModuleDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortColumn: PropTypes.object
};

export default ModulesTable;
