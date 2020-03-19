import React, { Component } from "react";
import PropTypes, { object } from "prop-types";
import Table from "../../common/Table";
// import { Link } from "react-router-dom";
// import auth from "../../services/authService";

class ProfsTable extends Component {
  columns = [
    {
      path: "nom",
      label: "Last Name",
      content: module => module.nom
    },
    {
      path: "prenom",
      label: "First Name",
      content: module => module.prenom
    },
    {
      path: "email",
      label: "Email",
      content: module => module.email
    },
    {
      path: "matricule",
      label: "Matricule",
      content: module => module.matricule
    },
    {
      path: "department.nom",
      label: "department",
      content: module => module.departement.nom
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
ProfsTable.propTypes = {
  modules: PropTypes.arrayOf(object).isRequired,
  onModuleDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortColumn: PropTypes.object
};

export default ProfsTable;
