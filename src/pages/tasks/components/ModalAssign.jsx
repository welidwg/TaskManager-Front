import { useEffect, useState } from "react";
import ModalWrapper from "../../../Layouts/Modal";
import axios from "axios";
import { URL } from "../../../constants/url";
import { Headers } from "../../../constants/constants";
import { toast } from "react-toastify";

export default function ModalAssign(props) {
  //consts
  const currentDate = new Date().toISOString().split("T")[0];

  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [assignment, setAssignment] = useState({
    task: { id: props.task.id },
    user: { id: null },
    dueDate: null,
    assignemntDate: currentDate,
    status: { id: null },
  });

  //functions
  const handleUpdateView = (state) => {
    props.onUpdate(state);
  };
  const handleChange = (e) => {
    if (e.target.name == "users") {
      if (e.target.value !== "") {
        setAssignment({ ...assignment, user: { id: e.target.value } });
      }
    } else if (e.target.name == "statuses") {
      setAssignment({
        ...assignment,
        status: { id: parseInt(e.target.value) },
      });
    } else {
      setAssignment({
        ...assignment,
        dueDate: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${URL}/task/assign`, assignment, Headers)
      .then((res) => {
        toast.success("Successfully assigned", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        $(`#${props.id}`).modal("hide");
        handleUpdateView(true);
      })
      .catch((err) => {
        toast.error(
          err.response.data.message != undefined
            ? err.response.data.message
            : "Server error",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(`${URL}/account/all`, Headers)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${URL}/status/getAll`, Headers)
      .then((res) => {
        setStatuses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <ModalWrapper id={props.id} title={props.title}>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mb-3">
          <div className="d-flex flex-column justify-content-between mb-3">
            <div className="mb-3">
              <label className="form-label fw-bold">Choose a user : </label>

              <select
                className="form-select form-select-lg"
                name="users"
                onChange={(e) => handleChange(e)}
              >
                <option value={""}>Users list</option>
                {users.length != null &&
                  users.map((user, index) => {
                    if (!user.roles.some((t) => t.role === "ADMIN")) {
                      return (
                        <option key={index} value={user.id}>
                          {user.username}
                        </option>
                      );
                    }
                  })}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Choose due date : </label>

              <input
                type="date"
                className="form-control"
                name="dueDate"
                min={currentDate}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Choose status : </label>

              <select
                className="form-select form-select-lg"
                name="statuses"
                onChange={(e) => handleChange(e)}
              >
                {statuses.length != null &&
                  statuses.map((status, index) => {
                    return (
                      <option key={index} value={status.id}>
                        {status.label}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>

        <div className="col-12 d-flex justify-content-end">
          <button
            className="btn btn-primary text-light fw-bold  "
            type="submit"
          >
            Done
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
