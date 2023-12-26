import ModalWrapper from "../../../Layouts/Modal";
import AssignmentCard from "./AssignmentCard";

export default function ModalDetailAssign(props) {
  return (
    <>
      <ModalWrapper id={props.id} title={props.title} size="modal-lg">
        <div
          className="d-flex flex-column m-3 bg-light mb-5 "
          style={{ maxHeight: "350px", overflowY: "auto" }}
        >
          {props.task.assignments.map((a, i) => {
            return (
              <AssignmentCard
                assignment={a}
                key={i}
                onUpdate={props.onUpdate}
                modalId={props.id}
              />
            );
          })}
        </div>
      </ModalWrapper>
    </>
  );
}
