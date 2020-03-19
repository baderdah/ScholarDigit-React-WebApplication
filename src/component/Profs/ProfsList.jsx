import React, { Component } from "react";
import Pagination from "../../common/pagination";
import ModulesTable from "./ProfsTable";
// import _ from "lodash";
import SearchBar from "../../common/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";

class ProfList extends Component {
  render() {
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

    if (modulesCount === 0) return <h3>there are no profs in the database</h3>;
    else {
      const { pageModules } = moviesPaginationAndFiltering();
      console.log(pageModules[0]);

      return (
        <React.Fragment>
          <ToastContainer />
          <div className={"col"}>
            {user && (
              <button
                className="btn btn-primary btn-sm mb-3 "
                onClick={handelAddBtnClicked}
              >
                Add new Prof
              </button>
            )}

            <SearchBar
              searchIn={modules}
              searchedText={searchedText}
              onChange={handelSearchChanged}
            />
            <ModulesTable
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

export default ProfList;
