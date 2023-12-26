import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function ModalWrapper(props) {
  return (
    <>
      <div className="modal fade " tabIndex="-1" id={props.id}>
        <div className={`modal-dialog bg-light ${props.size}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-primary fw-bold">
                {props.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{props.children}</div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
