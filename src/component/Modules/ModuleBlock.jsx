import React, { Component } from "react";
import ModuleForm from "./ModuleForm";
import ModulesList from "./ModulesList";
import * as moduleService from "../../services/modulesService";
import * as profService from "../../services/profService";
import Joi from "joi-browser";
import { paginate } from "../../utils/paginate";
import _ from "lodash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ModuleBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // departmentForm

      update: false,
      modules: [],
      selectedPage: 1,
      modulesPerPage: 4,
      selectedModule: [],
      sortColumn: {
        sortBy: "nom",
        order: "asc "
      },
      searchedText: "",
      foundModules: [],

      // department List
      data: { nom: "" },
      errors: {},
      options: []
    };
  }

  async populatingProfs() {
    const options = [];
    const profs = await profService.getProfs();
    for (let p of profs) {
      options.push({
        value: p.id,
        label: p.nom
      });
    }
    this.setState({
      options
    });
  }

  // department List

  MapToServerModel = () => {
    return {
      id: this.state.data.id,
      nom: this.state.data.nom,
      prof: {
        id: this.state.data.profId
      }
    };
  };

  async doSubmit(e) {
    //Call the server
    // e.preventDefault();
    console.log("doSubmit");
    const newDepartment = await moduleService.saveModule(
      this.MapToServerModel()
    );
    if (this.state.update) {
      const UpdatedDep = [
        ...this.state.modules.filter(m => m.id !== newDepartment.id),
        newDepartment
      ];
      this.setState({
        modules: UpdatedDep
      });
      toast.success("the Module is Updated susseccfuly");
    } else {
      console.log(newDepartment.data);

      const proflabelValue = this.state.options.filter(
        o => o.value === newDepartment.data.prof.id
      )[0];

      console.log(proflabelValue);
      newDepartment.data.prof = {
        id: proflabelValue.value,
        nom: proflabelValue.label
      };
      console.log("sub", this);
      this.setState({ modules: [...this.state.modules, newDepartment.data] });

      toast.success("the new Module is added susseccfuly");
    }
    return false;
  }

  validateForm = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    if (!result.error) return null;

    const errors = {};
    result.error.details.forEach(item => {
      errors[item.path[0]] = item.message;
    });
    console.log("Validate form", errors);
    return errors;
  };

  validateProperty = input => {
    console.log("Validate prop");
    const obj = { [input.name]: input.value };
    const schema = { [input.name]: this.schema[input.name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  SubmitHandler = e => {
    e.preventDefault();
    const errors = this.validateForm();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handelChange = ({ currentTarget: input }) => {
    console.log("handelChange");
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else delete errors[input.name];

    this.setState({ errors: errors || {} });
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({
      data,
      errors
    });
  };

  mapToViewModel(department) {
    return {
      nom: department.nom
    };
  }

  schema = {
    nom: Joi.string()
      .min(4)
      .max(100)
      .required(),
    id: Joi.number().min(0),
    profId: Joi.number()
  };
  // departmentForm
  async componentDidMount() {
    const theModules = await moduleService.getModules();
    await this.populatingProfs();
    console.log("comp Did Mount");
    this.setState({
      modules: [...theModules],
      data: { nom: "", profId: this.state.options[0].value }
    });
  }

  handelPageClicked = pageNb => {
    this.setState({
      selectedPage: pageNb
    });
    // this.getMovies(pageNb);
  };

  handelUpdate = moduleId => {
    console.log("Handel Update");
    this.setState({ errors: {} });
    const selectedModule = [
      ...this.state.modules.filter(m => m.id === moduleId)
    ];
    this.setState({
      data: {
        id: selectedModule[0].id,
        nom: selectedModule[0].nom,
        profId: selectedModule[0].prof.id
      },
      update: true
    });
  };

  handelDelete = async moduleId => {
    console.log("handel delete ");

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
    console.log("Handel sort ");

    this.setState({
      sortColumn
    });
  };

  handelAddBtnClicked = () => {
    console.log("Handel add ");

    this.setState({
      update: false,
      data: { nom: "", profId: this.state.options[0].value }
    });
  };

  moviesPaginationAndFiltering = () => {
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
  };

  handelSearchChanged = ({ currentTarget: input }) => {
    console.log("Handel SearchChanged");

    const modules = this.state.modules.filter(m =>
      m.nom.toLowerCase().startsWith(input.value.toLowerCase())
    );
    this.setState({
      searchedText: input.value,
      foundModules: modules
    });
  };

  render() {
    // if (this.state.modules.length !== 0) {
    //   console.log("render", this.state.modules[0]);
    //   const prof = { ...this.state.modules[0].prof };
    //   console.log("render", this.state.modules[0].prof.nom);
    // }

    return (
      <div className={"row"}>
        <div className={"col-4"}>
          <ModuleForm
            update={this.state.update}
            data={this.state.data}
            errors={this.state.errors}
            options={this.state.options}
            selectedDepartment={this.state.selectedModule}
            validateForm={this.validateForm}
            handelChange={this.handelChange}
            handelSubmit={this.SubmitHandler.bind(this)}
            options={this.state.options}
          />
        </div>
        <ModulesList
          moviesPaginationAndFiltering={this.moviesPaginationAndFiltering}
          handelSearchChanged={this.handelSearchChanged}
          handelSort={this.handelSort}
          handelDelete={this.handelDelete}
          handelUpdate={this.handelUpdate}
          handelAddBtnClicked={this.handelAddBtnClicked}
          handelPageClicked={this.handelPageClicked}
          user={this.props.user}
          modules={this.state.modules}
          selectedPage={this.state.selectedPage}
          modulesPerPage={this.state.modulesPerPage}
          sortColumn={this.state.sortColumn}
          searchedText={this.state.searchedText}
        />
      </div>
    );
  }
}

export default ModuleBlock;
