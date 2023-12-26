import { useState } from "react";
import ModalWrapper from "../../../Layouts/Modal";
import { AUTH_TOKEN } from "../../../constants/constants";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../constants/url";
export default function ModalEdit(props) {
  const [tsk, setTask] = useState(props.task);
  function handleInputChange(e) {
    setTask({ ...tsk, [e.target.name]: e.target.value });
  }
  const handleUpdate = (state) => {
    props.onUpdate(state);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${URL}/task/edit`, tsk, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${AUTH_TOKEN}`,
        },
      })
      .then((res) => {
        toast.success("Successfully edited", {
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
        handleUpdate(true);
      })
      .catch((err) => {
        console.log(err);
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
      });
  };
  return (
    <ModalWrapper title={props.title} id={props.id}>
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
            defaultValue={tsk.title}
            className="form-control"
            required
          />
        </div>
        <div className="col">
          <label htmlFor="validationCustom01" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            required
            name="description"
            onChange={(e) => {
              handleInputChange(e);
            }}
            defaultValue={tsk.description}
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button
            className="btn btn-primary text-light fw-bold  "
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
