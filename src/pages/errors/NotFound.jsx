import { NavLink } from "react-router-dom";

export default function NotFound(params) {
  return (
    <>
      <section className="bg-primary vh-100 d-flex flex-column align-items-center justify-content-center">
        <img src="assets/img/logo_main.png" className="img-fluid mb-4" />
        <h1 className="text-light text-center fw-bold">
          This page doesn't exist or you don't have
          <br /> the permission to access it !
        </h1>
        <NavLink to={"/"} className={" btn btn-bg-gradient btn-warning"}>
          Go Back
        </NavLink>
      </section>
    </>
  );
}
