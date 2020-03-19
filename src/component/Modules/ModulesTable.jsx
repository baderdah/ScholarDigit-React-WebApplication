import React, { Component } from "react";
import PropTypes, { object } from "prop-types";
import Table from "../../common/Table";
// import { Link } from "react-router-dom";
// import auth from "../../services/authService";

class ModulesTable extends Component {
  columns = [
    {
      path: "nom",
      label: "Module's name",
      content: module => module.nom
    },
    {
      path: "prof.nom",
      label: "professeur responsable",
      content: module => module.prof.nom
    }
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
  updateColumn = {
    key: "update",
    content: module => (
      <button
        onClick={() => this.props.onModuleUpdate(module.id)}
        className={"btn btn-sm btn-primary"}
      >
        update
      </button>
    )
  };

  constructor() {
    super();
    // const user = auth.getCurrentUser();
    // if (user && user.isAdmin) {
    this.columns.push(this.deleteColumn);
    this.columns.push(this.updateColumn);
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
