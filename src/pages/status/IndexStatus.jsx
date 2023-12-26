import { useEffect, useState } from "react";
import Wrapper from "../../Layouts/Wrapper";
import axios from "axios";
import { URL } from "../../constants/url";
import CardWrapper from "../../Layouts/Card";
import { Headers } from "../../constants/constants";
import ModalAddStatus from "./Components/ModalAddStatus";
import { ToastContainer, toast } from "react-toastify";

export default function IndexStatus(props) {
  const [status, setStatus] = useState([]);
  const [updateView, setUpdateView] = useState(false);
  const handleUpdateView = (state) => {
    setUpdateView(state);
  };
  const handleDelete = async (id) => {
    await axios
      .delete(`${URL}/status/${id}/delete`, Headers)
      .then((res) => setUpdateView(true))
      .catch((err) =>
        toast.error("Server error", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  };
  useEffect(() => {
    setUpdateView(false);
    axios
      .get(`${URL}/status/getAll`, Headers)
      .then((res) => setStatus(res.data))
      .catch((err) => console.log(err));
  }, [updateView]);
  return (
    <Wrapper>
      <ToastContainer />

      <ModalAddStatus
        id="modal-add-status"
        title="Add new status"
        onUpdate={handleUpdateView}
      />
      <CardWrapper title="Statuses">
        <aside className="d-flex align-items-center justify-content-between w-100">
          <button
            className="btn btn-secondary m-2  fw-bold"
            data-bs-toggle="modal"
            data-bs-target={"#modal-add-status"}
          >
            <i className="fas fa-plus"></i> Add status
          </button>
          <form className="">
            <div className="input-group">
              <input
                className="bg-light form-control border-0 small"
                type="text"
                placeholder="Search for status"
                //   onChange={(e) => {
                //     setTimeout(() => {
                //       setMc(e.target.value);
                //     }, 1000);
                //   }}
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
        <div className="table-responsive table mt-2" role="grid">
          <table className="table my-0">
            <thead>
              <tr>
                <th>#</th>
                <th>label</th>
                <th>Color</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {status.length == 0 ? (
                <>
                  <tr>
                    <td>No data</td>
                  </tr>
                </>
              ) : (
                status &&
                status.map((status, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{status.label}</td>
                      <td>
                        <span className={`badge badge-${status.className}`}>
                          {status.className}
                        </span>
                      </td>
                      <td>
                        {index >= 5 ? (
                          <div className="d-flex align-items-center justify-content-start">
                            <a
                              data-bs-toggle="modal"
                              data-bs-target={"#modal-edit-" + status.id}
                              className=" btn "
                            >
                              <i className="fas fa-edit"></i>
                            </a>
                            <a
                              onClick={(e) => {
                                if (confirm("Are you sure ?"))
                                  handleDelete(status.id);
                              }}
                              href="#"
                              className="text-danger btn"
                            >
                              <i className="fas fa-trash"></i>
                            </a>
                          </div>
                        ) : (
                          <>----</>
                        )}
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
