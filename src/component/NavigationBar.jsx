import React from "react";
import { NavLink } from "react-router-dom";
const NavigationBar = ({ user }) => {
  console.log(user);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <NavLink className="navbar-brand" to="/">
        My Movies
      </NavLink>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/movies">
              Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/modules">
              Modules
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/departments">
              Departments
            </NavLink>
          </li>
          {!user && (
            <React.Fragment>
              <li>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <li>
                <NavLink className="nav-link" to="/profile">
                  {user.sub}
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/logout">
                  logout
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default NavigationBar;
