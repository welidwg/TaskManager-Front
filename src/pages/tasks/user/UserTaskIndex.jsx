import { ToastContainer } from "react-toastify";
import Wrapper from "../../../Layouts/Wrapper";
import CardWrapper from "../../../Layouts/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { AUTH_USER, Headers } from "../../../constants/constants";
import { URL } from "../../../constants/url";
import moment from "moment/moment";

export default function UserTaskIndex(props) {
  const static_statuses = {
    inprogess: "In Progress",
    waiting: "Waiting",
    finished: "Finished",
    canceled: "Canceled",
    expired: "Expired",
  };
  const [assignments, setAssignments] = useState([]);
  const user = AUTH_USER;
  const [updateView, setUpdateView] = useState(false);
  const [newStatus, setNewStatus] = useState({});

  const getStatus = async (label, id_assignment) => {
    await axios
      .get(`${URL}/status/label/${label}`, Headers)
      .then((res) => {
        // setNewStatus(res.data);
        console.log(res.data);
        handleStatusUpdate(id_assignment, res.data.id);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setUpdateView(false);
    axios
      .get(`${URL}/assignment/user/${user.id}`, Headers)
      .then((res) => setAssignments(res.data))
      .catch((err) => console.log(err));
  }, [updateView, props.sync]);

  const handleStatusUpdate = async (id_assignment, id_status) => {
    console.log(id_assignment + " test");
    await axios
      .put(`${URL}/task/${id_assignment}/status`, { id: id_status }, Headers)
      .then((res) => {
        console.log(res);
        setUpdateView(true);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    console.log(newStatus);
  }, [newStatus]);
  return (
    <Wrapper>
      <ToastContainer />
      <CardWrapper title="My tasks">
        <div
          className="table-responsive table mt-2"
          id="dataTable"
          role="grid"
          aria-describedby="dataTable_info"
        >
          <table className="table my-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Assigned date</th>
                <th>Due date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length == 0 ? (
                <>
                  <tr>
                    <td>No data</td>
                  </tr>
                </>
              ) : (
                assignments &&
                assignments.map((a, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <span className="badge badge-secondary">
                          {a.task.title}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-secondary">
                          {a.task.description}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-secondary">
                          {moment(a.assignemntDate).format("D MMMM Y")}
                          {/* {a.assignemntDate} */}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-secondary">
                          {/* {a.dueDate} */}
                          {moment(a.dueDate).format("D MMMM Y")}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-${a.status.className}`}>
                          {a.status.label}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-start">
                          {a.status.label == "Waiting" && (
                            <>
                              <a
                                className=" btn text-success "
                                onClick={async (e) => {
                                  await getStatus(
                                    static_statuses.inprogess,
                                    a.id
                                  );
                                }}
                              >
                                <i className="fas fa-play"></i>
                              </a>
                              <a
                                className=" btn text-danger "
                                onClick={async () => {
                                  await getStatus(
                                    static_statuses.canceled,
                                    a.id
                                  );
                                }}
                              >
                                <i className="fas fa-times"></i>
                              </a>
                            </>
                          )}
                          {a.status.label == "In Progress" && (
                            <>
                              <a
                                className=" btn text-success "
                                onClick={async () => {
                                  await getStatus(
                                    static_statuses.finished,
                                    a.id
                                  );
                                }}
                              >
                                <i className="fas fa-check"></i>
                              </a>
                              <a
                                className=" btn text-danger "
                                onClick={async () => {
                                  await getStatus(
                                    static_statuses.canceled,
                                    a.id
                                  );
                                }}
                              >
                                <i className="fas fa-times"></i>
                              </a>
                            </>
                          )}
                          {a.status.label == "Finished" ||
                          a.status.label == "Canceled" ? (
                            <a
                              className=" btn text-primary "
                              onClick={async () => {
                                await getStatus(static_statuses.waiting, a.id);
                              }}
                            >
                              <i className="fas fa-sync-alt"></i>
                            </a>
                          ) : (
                            <></>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </CardWrapper>
    </Wrapper>
  );
}
