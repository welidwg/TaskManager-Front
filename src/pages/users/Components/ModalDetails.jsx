import ModalWrapper from "../../../Layouts/Modal";
import { URL } from "../../../constants/url";

export default function ModalDetails({ user, id }) {
  return (
    <ModalWrapper title={``} id={id}>
      <div className="container  d-flex justify-content-center">
        <div className="card  shadow-0 bg-light">
          <div className=" image d-flex flex-column justify-content-center align-items-center">
            <a className="">
              <img
                src={
                  user.avatar == null
                    ? "assets/img/user.jpg"
                    : `${URL}/photos/${user.avatar}`
                }
                height="200"
                width="200"
                className="img-fluid rounded-circle avatar shadow-sm mb-3"
              />
            </a>
            <span className="name mt-3 fw-bold text-dark fs-4">
              {user.username}
            </span>
            <div className="d-flex flex-row justify-content-center mb-3 align-items-center gap-2">
              <span className="idd1">{user.id}</span>
              <span>
                <i className="fa fa-copy"></i>
              </span>
            </div>
            <div className="d-flex align-items-center fs-5">
              <strong className="text-dark">Tasks assigned :</strong>
              <span className="badge badge-secondary mx-2 rounded-4">
                {user.assignments.length}
              </span>
            </div>
            <div className="d-flex align-items-center fs-6">
              <strong className="text-dark">
                <i className="fa fa-spinner"></i> Tasks in progress :
              </strong>
              <span className="badge badge-info mx-2 rounded-4">
                {
                  user.assignments.filter(
                    (assignment) => assignment.status.label === "In progress"
                  ).length
                }
              </span>
            </div>
            <div className="d-flex align-items-center fs-6">
              <strong className="text-dark">
                <i className="far fa-check-circle"></i> Tasks completed :
              </strong>
              <span className="badge badge-success mx-2 rounded-4">
                {
                  user.assignments.filter(
                    (assignment) => assignment.status.label === "Finished"
                  ).length
                }
              </span>
            </div>
            <div className="d-flex align-items-center fs-6">
              <strong className="text-dark">
                {" "}
                <i className="far fa-pause-circle"></i> Tasks on hold :
              </strong>
              <span className="badge badge-warning mx-2 rounded-4">
                {
                  user.assignments.filter(
                    (assignment) => assignment.status.label === "Waiting"
                  ).length
                }
              </span>
            </div>
            <div className="d-flex align-items-center fs-6">
              <strong className="text-dark">
                {" "}
                <i className="far fa-times-circle"></i> Tasks canceled :
              </strong>
              <span className="badge badge-danger mx-2 rounded-4">
                {
                  user.assignments.filter(
                    (assignment) => assignment.status.label === "Canceled"
                  ).length
                }
              </span>
            </div>
            {/* <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center text-dark">
              <span>
                <i className="fab fa-twitter"></i>
              </span>
              <span>
                <i className="fab fa-facebook-f"></i>
              </span>
              <span>
                <i className="fab fa-instagram"></i>
              </span>
              <span>
                <i className="fab fa-linkedin"></i>
              </span>
            </div> */}
            {/* <div className=" px-2 rounded mt-4 date ">
              <span className="join">Joined May,2021</span>
            </div> */}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
