import React, { Component } from "react";
import Pagination from "../common/pagination";
import DepartmentsTable from "./DepartmentsTable";
import _ from "lodash";
import SearchBar from "../common/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

class DepartmentList extends Component {
  render() {
    // const {
    //   modules,
    //   selectedPage,
    //   modulesPerPage,
    //   sortColumn,
    //   searchedText
    // } = this.state;

    const {
      moviesPaginationAndFiltering,
      handelSearchChanged,
      handelSort,
      handelDelete,
      handelUpdate,
      handelPageClicked,
      handelAddBtnClicked,
      modules,
      selectedPage,
      modulesPerPage,
      sortColumn,
      searchedText
    } = this.props;
    const modulesCount = modules.length;

    const { user } = this.props;

    console.log("user", user);
    if (modulesCount === 0)
      return <h3>there are no departement in the database</h3>;
    else {
      const { pageModules } = moviesPaginationAndFiltering();

      return (
        <React.Fragment>
          <ToastContainer />
          <div className={"col"}>
            {user && (
              <button
                className="btn btn-primary btn-sm mb-3 "
                onClick={handelAddBtnClicked}
              >
                Add new Department
              </button>
            )}

            <SearchBar
              searchIn={modules}
              searchedText={searchedText}
              onChange={handelSearchChanged}
            />
            <DepartmentsTable
              sortColumn={sortColumn}
              onSort={handelSort}
              modules={pageModules}
              onModuleDelete={handelDelete}
              onModuleUpdate={handelUpdate}
            />

            <Pagination
              totalPages={modulesCount / modulesPerPage}
              selectedPage={selectedPage}
              onPageClicked={handelPageClicked}
            />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default DepartmentList;
