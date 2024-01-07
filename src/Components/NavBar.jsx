import { NavLink } from "react-router-dom";
import { AUTH_USER, Headers } from "../constants/constants";
import { URL } from "../constants/url";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NavBar(props) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    axios
      .get(URL + "/account/" + AUTH_USER.username, Headers)
      .then((res) => setCurrentUser(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
        <div className="container-fluid">
          <button
            className="btn btn-link d-md-none rounded-circle me-3"
            id="sidebarToggleTop"
            type="button"
          >
            <i className="fas fa-bars"></i>
          </button>

          <ul className="navbar-nav flex-nowrap ms-auto">
            <li className="nav-item dropdown d-sm-none no-arrow">
              <a
                className="dropdown-toggle nav-link"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                href="#"
              >
                <i className="fas fa-search"></i>
              </a>
              <div
                className="dropdown-menu dropdown-menu-end p-3 animated--grow-in"
                aria-labelledby="searchDropdown"
              ></div>
            </li>

            <div className="d-none d-sm-block topbar-divider"></div>
            <li className="nav-item dropdown no-arrow">
              <div className="nav-item dropdown no-arrow">
                <a
                  className="dropdown-toggle nav-link"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  href="#"
                >
                  <span className="d-none d-lg-inline me-2   badge badge-info">
                    {currentUser == null ? "Loading" : currentUser.username}
                  </span>
                  <img
                    className="border rounded-circle img-profile"
                    src={
                      currentUser != null && currentUser.avatar != null
                        ? `${URL}/photos/${currentUser.avatar}`
                        : "assets/img/user.jpg"
                    }
                  />
                </a>
                <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                  <NavLink to={"/profile"} className="dropdown-item ">
                    <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
                    &nbsp;Profile
                  </NavLink>

                  {/* <a className="dropdown-item" href="#">
                    <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>
                    &nbsp;Settings
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>
                    &nbsp;Activity log
                  </a> */}
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      setTimeout(() => {
                        window.location.href = "/login";
                      }, 700);
                    }}
                  >
                    <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                    &nbsp;Logout
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
