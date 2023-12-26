import { useEffect, useState } from "react";
import ModalWrapper from "../../../Layouts/Modal";
import axios from "axios";
import { URL } from "../../../constants/url";
import { Headers } from "../../../constants/constants";
import { toast } from "react-toastify";

export default function ModalAddStatus(props) {
  const [status, setStatus] = useState({ label: "", className: "" });
  const colors = [
    { color: "Red", class: "danger" },
    { color: "Blue", class: "primary" },
    { color: "Yellow", class: "warning" },
    { color: "Green", class: "success" },
  ];
  const handleUpdateView = (state) => {
    props.onUpdate(state);
  };
  const handleInputChange = (e) => {
    setStatus({ ...status, [e.target.name]: e.target.value });
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    await axios
      .post(`${URL}/status/add`, status, Headers)
      .then((res) => {
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
        handleUpdateView(true);
        $(`#${props.id}`).modal("hide");
      })
      .catch((err) => {
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
    <ModalWrapper title={props.title} id={props.id}>
      <form
        className="row flex-column g-3 needs-validation"
        onSubmit={(e) => handleSubmitForm(e)}
        //   onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="col">
          <label className="form-label">Label</label>
          <input
            type="text"
            name="label"
            onChange={(e) => {
              handleInputChange(e);
            }}
            className="form-control"
            required
          />
        </div>
        <div className="col">
          <label className="form-label">Color</label> <br />
          {colors.map((c, i) => {
            return (
              <div className="form-check form-check-inline" key={i}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="className"
                  value={c.class}
                  id={`${c.class}-input`}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`${c.class}-input`}
                >
                  <span className={`badge badge-${c.class}`}>{c.color}</span>
                </label>
              </div>
            );
          })}
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
    </ModalWrapper>
  );
}
