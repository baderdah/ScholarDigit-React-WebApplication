import React, { Component } from "react";
import * as moduleService from "../services/modulesService";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import ModulesTable from "./ModulesTable";
import _ from "lodash";
import SearchBar from "../common/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

class ModulesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modules: [{}],
      selectedPage: 1,
      modulesPerPage: 4,
      sortColumn: {
        sortBy: "nom",
        order: "asc "
      },
      searchedText: "",
      foundModules: []
    };
  }

  async componentDidMount() {
    // const theModules = [
    //   { id: 1, nom: "Informatique", prof: { nom: "Dahmane" } },
    //   { id: 2, nom: "Android", prof: { nom: "Atlas" } }
    // ];
    const theModules = await moduleService.getModules();
    console.log("test", theModules);
    this.setState({
      modules: [...theModules]
    });
  }

  handelPageClicked = pageNb => {
    this.setState({
      selectedPage: pageNb
    });
    // this.getMovies(pageNb);
  };

  handelDelete = async moduleId => {
    const originalModules = this.state.modules;

    const modules = originalModules.filter(m => m.id !== moduleId);
    this.setState({ modules });

    try {
      await moduleService.deleteModule(moduleId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("this module is already deleted");
      } else {
        this.setState({ modules: originalModules });
      }
    }
  };
  handelSort = sortColumn => {
    this.setState({
      sortColumn
    });
  };

  handelAddBtnClicked = () => {
    this.props.history.push("/modules/new");
  };

  moviesPaginationAndFiltering() {
    const {
      modules,
      selectedPage,
      modulesPerPage,
      sortColumn,
      foundModules
    } = this.state;

    if (foundModules.length > 0)
      return {
        pageModules: foundModules,
        filteredModulesCount: foundModules.length
      };

    const sortedModules =
      sortColumn.order === "asc"
        ? _.sortBy(modules, [sortColumn.sortBy])
        : _.sortBy(modules, [sortColumn.sortBy]).reverse();

    return {
      pageModules: paginate(sortedModules, selectedPage, modulesPerPage)
    };
  }

  handelSearchChanged = ({ currentTarget: input }) => {
    const modules = this.state.modules.filter(m =>
      m.nom.toLowerCase().startsWith(input.value.toLowerCase())
    );
    this.setState({
      searchedText: input.value,
      foundModules: modules
    });
  };

  render() {
    const {
      modules,
      selectedPage,
      modulesPerPage,
      sortColumn,
      searchedText
    } = this.state;
    const modulesCount = modules.length;

    const { user } = this.props;

    console.log("user", user);
    if (modulesCount === 0) return <h3>there are no movie in the database</h3>;
    else {
      const { pageModules } = this.moviesPaginationAndFiltering();

      return (
        <div className={"row"}>
          <div className={"col-2"}>
            <ToastContainer />
          </div>

          <div className={"col"}>
            {user && (
              <Link to="/modules/new" className="btn btn-primary btn-sm mb-3 ">
                Add module
              </Link>
            )}

            <SearchBar
              searchIn={modules}
              searchedText={searchedText}
              onChange={this.handelSearchChanged}
            />
            <ModulesTable
              sortColumn={sortColumn}
              onSort={this.handelSort}
              modules={pageModules}
              onModuleDelete={this.handelDelete}
            />

            <Pagination
              totalPages={modulesCount / modulesPerPage}
              selectedPage={selectedPage}
              onPageClicked={this.handelPageClicked}
            />
          </div>
        </div>
      );
    }
  }
}

export default ModulesList;
