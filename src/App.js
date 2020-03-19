import React from "react";
import "./App.css";
import {
  Route,
  Switch
  // Redirect
} from "react-router-dom";
import LoginForm from "./component/LoginForm";
import auth from "./services/authService";
import NavigationBar from "./component/NavigationBar";
import Logout from "./common/Logout";
import ModulesList from "./component/ModulesList";
import DepartmentBlock from "./component/Departments/DepartmentBlock";
import ModuleBlock from "./component/Modules/ModuleBlock";
import ProfBlock from "./component/Profs/ProfBlock";
import ProtectedRoute from "./common/ProtectedRoute";

class App extends React.Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    console.log("user", user);
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <NavigationBar user={this.state.user} />
        <main className="container-fluid mx-auto">
          <div className="mt-5">
            <Switch>
              <Route
                path="/profs"
                render={props => (
                  <ProfBlock {...props} user={this.state.user} />
                )}
              />
              <Route
                path="/modules"
                render={props => (
                  <ModuleBlock {...props} user={this.state.user} />
                )}
              />
              <Route
                path="/departments"
                render={props => (
                  <DepartmentBlock {...props} user={this.state.user} />
                )}
              />
              <Route path="/logout" component={Logout} />
              <Route path="/login" component={LoginForm} />
              {/* <Redirect from="/" exact to="/movies" /> */}
              {/* <Redirect to="/login" /> */}
            </Switch>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
