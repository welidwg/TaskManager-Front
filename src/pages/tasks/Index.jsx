import { useEffect, useState } from "react";
import CardWrapper from "../../Layouts/Card";
import Wrapper from "../../Layouts/Wrapper";
import axios from "axios";
import { URL } from "../../constants/url";
import { AUTH_TOKEN, Headers } from "../../constants/constants";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import ModalEdit from "./components/ModalEdit";
import ModalAssign from "./components/ModalAssign";
import ModalDetailAssign from "./components/ModalDetailAssign";
export default function IndexTask(props) {
  const [tasks, setTask] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [show, setShow] = useState(false);
  const [updateView, setUpdateView] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [mc, setMc] = useState("");
  const [pageable, setPageable] = useState([]);
  const [page, setPage] = useState(1);
  const randomInt = (min, max) => {
    return Math.round(Math.random() * (max - min)) + min;
  };
  const fetchData = () => {
    axios
      .get(`${URL}/task/getAll?mc=${mc}&page=${page - 1}`, Headers)
      .then((res) => {
        setTask(res.data.content);
        setPageable(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
    setUpdateView(false);
  }, [updateView, mc, page, props.sync]);
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
  const generateModalEdit = () => {
    if (!tasks || tasks.length === 0) {
      // Handle the case when users is null, undefined, or an empty array
      return <p>No tasks available</p>;
    }
    return tasks.map((task, i) => (
      <>
        <ModalEdit
          key={task.id * randomInt(5, 1000)}
          title={"Edit Task ' " + task.title + " '"}
          task={task}
          id={`modal-${task.id}`}
          onUpdate={handleUpdate}
        />
        <ModalAssign
          key={task.id * randomInt(30, 2000)}
          title={"Assign Task ' " + task.title + " '"}
          task={task}
          id={`modal-assign-${task.id}`}
          onUpdate={handleUpdate}
        />
        <ModalDetailAssign
          key={task.id * randomInt(50, 4000)}
          title={`Task '${task.title}' assignments`}
          task={task}
          id={`modal-details-assign-${task.id}`}
          onUpdate={handleUpdate}
        />
      </>
    ));
  };
  // const generateModalAssign = () => {
  //   if (!tasks || tasks.length === 0) {
  //     // Handle the case when users is null, undefined, or an empty array
  //     return <p>No tasks availlable</p>;
  //   }

  //   return tasks.map((task) => (

  //   ));
  // };

  // const generateModalDetailAssign = () => {
  //   if (!tasks || tasks.length === 0) {
  //     // Handle the case when users is null, undefined, or an empty array
  //     return <p>No tasks available</p>;
  //   }

  //   return tasks.map((task) => (

  //   ));
  // };
  const handleUpdate = (state) => {
    setUpdateView(state);
  };

  function handleInputChange(e) {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${URL}/task/add`, newTask, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${AUTH_TOKEN}`,
        },
      })
      .then((res) => {
        setUpdateView(true);
        setShow(false);
        toast.success("Successfully added", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        if (err.response.data.length > 0) {
          for (let i = 0; i < err.response.data.length; i++) {
            toast.error(err.response.data[i], {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        } else {
          toast.error("Server error", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };
  const handleDelete = async (id) => {
    axios
      .delete(`${URL}/task/delete/${id}`, Headers)
      .then((res) => {
        setUpdateView(true);
        console.log(res);
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
      })
      .catch((err) => {
        console.log(err);

        toast.error("Server error", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  return (
    <Wrapper>
      {/* <h3 className="text-dark mb-1">Tasks list</h3> */}
      {/* <ToastContainer /> */}

      <CardWrapper title="tasks">
        <aside className="d-flex align-items-center justify-content-between w-100">
          <button
            className="btn btn-secondary m-2  fw-bold"
            onClick={handleShow}
          >
            <i className="fas fa-plus"></i> Add Task
          </button>
          <form className="">
            <div className="input-group">
              <input
                className="bg-light form-control border-0 small"
                type="text"
                placeholder="Search for task"
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
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add new Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                className="row flex-column g-3 needs-validation"
                onSubmit={(e) => handleFormSubmit(e)}
              >
                <div className="col">
                  <label htmlFor="validationCustom01" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <label htmlFor="validationCustom01" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-12 d-flex justify-content-end">
                  <button
                    className="btn btn-primary text-light fw-bold  "
                    type="submit"
                  >
                    Add new
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
          <table className="table my-0" id="dataTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Assigned to</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length == 0 ? (
                <tr>
                  <td>No data</td>
                </tr>
              ) : (
                tasks &&
                tasks.map((task, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <span className="badge badge-secondary">
                          {task.title}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-secondary">
                          {task.description}
                        </span>
                      </td>
                      <td>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target={"#modal-details-assign-" + task.id}
                        >
                          {task.assignments.length !== 0 ? (
                            task.assignments.map((assignment, i) => {
                              let ind = 0;
                              return (
                                <span key={i}>
                                  <img
                                    className="rounded-circle shadow me-2"
                                    width="30"
                                    height="30"
                                    alt={assignment.user.username}
                                    src={
                                      assignment.user.avatar == null
                                        ? "assets/img/user.jpg"
                                        : `${URL}/photos/${assignment.user.avatar}`
                                    }
                                  />
                                </span>
                              );
                            })
                          ) : (
                            <>No one</>
                          )}
                        </a>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-start">
                          <a
                            className=" btn text-success "
                            data-bs-toggle="modal"
                            data-bs-target={`#modal-assign-${task.id}`}
                          >
                            <i className="fas fa-user-plus"></i>
                          </a>

                          <a
                            data-bs-toggle="modal"
                            data-bs-target={"#modal-" + task.id}
                            className=" btn "
                          >
                            <i className="fas fa-edit"></i>
                          </a>
                          <a
                            onClick={(e) => {
                              if (confirm("Are you sure ?"))
                                handleDelete(task.id);
                            }}
                            href="#"
                            className="text-danger btn"
                          >
                            <i className="fas fa-trash"></i>
                          </a>
                        </div>
                        <div></div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {generateModalEdit()}
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
