import axios from "axios";
import { URL } from "../../../constants/url";
import { Headers } from "../../../constants/constants";
import { toast } from "react-toastify";
import moment from "moment";

export default function AssignmentCard({ assignment, onUpdate, modalId }) {
  const handleDelete = async (id) => {
    axios
      .delete(`${URL}/assignment/${id}/delete`, Headers)
      .then((res) => {
        toast.success("Successfully unassigned", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        onUpdate(true);
        $(`#${modalId}`).modal("hide");
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
    <div className="card shadow-sm border mb-3 text-dark">
      <div className="card-header py-2 text-danger">
        <div className="text-dark m-0 fw-bold d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={
                assignment.user.avatar == null
                  ? "/assets/img/user.jpg"
                  : `${URL}/photos/${assignment.user.avatar}`
              }
              className="rounded-circle "
              width={30}
            />
            <span className="mx-2">{assignment.user.username}</span>
          </div>
          <a
            href="#"
            onClick={(e) => handleDelete(assignment.id)}
            className="btn p-0 text-danger"
          >
            <i className="fas fa-trash"></i>
          </a>
        </div>
      </div>
      <div className="card-body d-flex justify-content-between">
        <div className="col-3">
          <span className="fw-bold ">Assigned : </span>{" "}
          <span className="badge badge-primary">
            {moment(assignment.assignemntDate).format("d MMM Y")}
          </span>
        </div>
        <div className="col-3 ">
          <span className="fw-bold ">Due date : </span>{" "}
          <span className="badge badge-primary">
            {moment(assignment.dueDate).format("d MMM Y")}
          </span>
        </div>
        <div className="col-3 ">
          <div>
            <span className="fw-bold">Status : </span>
            <span className={`badge badge-${assignment.status.className}`}>
              {assignment.status.label}
            </span>
          </div>
          {assignment.finishedDate != null && (
            <div>
              <span className="fw-bold">End date : </span>
              <span className={`badge badge-primary`}>
                {moment(assignment.finishedDate).format("d MMM Y")}
              </span>
            </div>
          )}
        </div>
        {/* <div className="col-1"></div> */}
      </div>
    </div>
  );
}
