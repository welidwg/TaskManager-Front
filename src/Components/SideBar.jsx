import { NavLink } from "react-router-dom";
import { AUTH_USER } from "../constants/constants";
import { useEffect, useState } from "react";

export default function SideBar(props) {
  const roles = AUTH_USER && AUTH_USER.roles;
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (roles.some((r) => r.role == "ADMIN")) {
      setIsAdmin(true);
    }
  }, []);
  return (
    <nav className="navbar align-items-start sidebar sidebar-dark accordion toggled bg-gradient-dark p-0 navbar-dark">
      <div className="container-fluid d-flex flex-column p-0">
        <a
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          href="#"
        >
          <div className="sidebar-brand-icon ">
            <img src="assets/img/favicon.png" width={40} />
          </div>
          <div className="sidebar-brand-text mx-3">
            <span>Task MANAGER</span>
          </div>
        </a>
        <hr className="sidebar-divider my-0" />
        <ul className="navbar-nav text-light" id="accordionSidebar">
          {/* <li className="nav-item">
            <NavLink to={"/"} className="nav-link">
              <i className="fas fa-user"></i>
              <span>Dashboard</span>
            </NavLink>
          </li> */}
          {isAdmin && (
            <>
              <li className="nav-item">
                <NavLink to={"/task"} className="nav-link">
                  <i className="fas fa-table"></i>
                  <span>Tasks</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/users"} className="nav-link">
                  <i className="far fa-user-circle"></i>
                  <span>Users</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/status"}>
                  <i className="fas fa-user-circle"></i>
                  <span>Statuses</span>
                </NavLink>
              </li>
            </>
          )}
          {!isAdmin && (
            <li className="nav-item">
              <NavLink to={"/mytasks"} className="nav-link">
                <i className="far fa-user-circle"></i>
                <span>My tasks</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
