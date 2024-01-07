import { useEffect, useState } from "react";
import { URL } from "../../constants/url";
import { Headers } from "../../constants/constants";
import { ToastContainer, toast } from "react-toastify";
import Wrapper from "../../Layouts/Wrapper";
import CardWrapper from "../../Layouts/Card";
import axios from "axios";
import ModalAdd from "./Components/ModalAdd";
import ModalEditUser from "./Components/ModalEditUser";

export default function IndexUser(props) {
  const [users, setUsers] = useState([]);
  const [pageable, setPageable] = useState([]);
  const [updateView, setUpdateView] = useState(false);
  const [mc, setMc] = useState("");
  const [page, setPage] = useState(1);

  const fetchData = () => {
    axios
      .get(`${URL}/account/getAll?mc=${mc}&page=${page - 1}`, Headers)
      .then((res) => {
        setUsers(res.data.content);
        setPageable(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setUpdateView(false);
    fetchData();
  }, [updateView, mc, page]);

  const handleUpdateView = (state) => {
    setUpdateView(state);
  };

  const handlePage = (p) => {
    setPage(p);
  };

  const generatePageLinks = () => {
    const links = [];
    const { totalPages } = pageable;

    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <li className={`page-item  ${i === page ? "active" : ""}`} key={i}>
          <a
            className={`page-link`}
            key={i}
            onClick={() => {
              handlePage(i);
              setUpdateView(true);
            }}
          >
            {i}
          </a>
        </li>
      );
    }
    return links;
  };
  const generateModal = () => {
    if (!users || users.length === 0) {
      // Handle the case when users is null, undefined, or an empty array
      return <p>No users available</p>;
    }

    return users.map((u) => (
      <ModalEditUser
        key={u.id} // Don't forget to add a unique key when using map
        onUpdate={handleUpdateView}
        user={u}
        title={`Edit user '${u.username}'`}
        id={`modal-edit-${u.id}`}
      />
    ));
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${URL}/account/${id}/delete`, Headers)
      .then((res) => {
        toast.success("Successfully deleted.", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUpdateView(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data.message != undefined
            ? err.response.data.message
            : "Server error",
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      });
  };

  return (
    <Wrapper>
      <ToastContainer />
      <ModalAdd
        title="Add user"
        id="modal-add-user"
        onUpdate={handleUpdateView}
      />

      <CardWrapper title="Users list">
        <aside className="d-flex align-items-center justify-content-between w-100">
          <button
            className="btn btn-secondary m-2  fw-bold"
            data-bs-toggle="modal"
            data-bs-target={"#modal-add-user"}
          >
            <i className="fas fa-plus"></i> Add User
          </button>
          <form className="">
            <div className="input-group">
              <input
                className="bg-light form-control border-0 small"
                type="text"
                placeholder="Search for user"
                onChange={(e) => {
                  setTimeout(() => {
                    setMc(e.target.value);
                    setPage(1);
                  }, 1000);
                }}
              />
              <button
                className="btn btn-primary py-0 shadow-none"
                type="button"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
        </aside>
        <div className="table-responsive table mt-2" id="dataTable" role="grid">
          <table className="table my-0" id="dataTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length == 0 ? (
                <tr>
                  <td>
                    <span className="text-dark">Loading</span>
                  </td>
                </tr>
              ) : users.length != 0 ? (
                users.map((u, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center justify-content-start">
                          <img
                            className="rounded-circle shadow me-2"
                            width="30"
                            height="30"
                            alt={u.username}
                            src={
                              u.avatar == null
                                ? "assets/img/user.jpg"
                                : `${URL}/photos/${u.avatar}`
                            }
                          />
                          <span className="badge badge-primary">
                            {u.username}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-warning">{u.email}</span>
                      </td>
                      <td>
                        {u.roles.map((role, i) => {
                          return (
                            <span key={i} className="badge badge-success mx-2">
                              {role.role}
                            </span>
                          );
                        })}
                      </td>
                      <td>
                        <div>
                          <a
                            data-bs-toggle="modal"
                            data-bs-target={"#modal-edit-" + u.id}
                            className="mx-2 btn shadow-sm"
                          >
                            <i className="fas fa-edit"></i>
                          </a>
                          <a
                            onClick={(e) => {
                              if (confirm("Are you sure ?")) handleDelete(u.id);
                            }}
                            href="#"
                            className="text-danger btn shadow-sm"
                          >
                            <i className="fas fa-trash"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <>error</>
              )}
            </tbody>
          </table>
          {generateModal(users)}
          <nav aria-label="Page navigation">
            <ul className="pagination    ">
              <li className={`page-item  ${page === 1 && "disabled"}`}>
                <button
                  disabled={page === 1}
                  className="page-link "
                  aria-label="Previous"
                  onClick={() => handlePage(page - 1)}
                >
                  <span aria-hidden="true">
                    <i className="fas fa-chevron-left"></i>
                  </span>
                </button>
              </li>

              {generatePageLinks()}

              <li
                className={`page-item  ${
                  page === pageable.totalPages && "disabled"
                }`}
              >
                <button
                  disabled={page === pageable.totalPages}
                  className="page-link"
                  aria-label="Next"
                  onClick={() => handlePage(page + 1)}
                >
                  <span aria-hidden="true">
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </CardWrapper>
    </Wrapper>
  );
}
