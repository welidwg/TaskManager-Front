export default function CardWrapper(props) {
  return (
    <>
      <div className="card shadow">
        <div className="card-header py-3">
          <p className="text-primary m-0 fw-bold">{props.title}</p>
        </div>
        <div className="card-body">{props.children}</div>
      </div>
    </>
  );
}
