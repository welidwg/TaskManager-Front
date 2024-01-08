import Wrapper from "../../Layouts/Wrapper";
import { AUTH_USER } from "../../constants/constants";
import { URL } from "../../constants/url";
import FormEditUser from "./Components/FormEditUser";

export default function Profile(props) {
  return (
    <>
      <div className="row mb-3">
        <div className="col-lg-4">
          <div className="card mb-3">
            <div className="card-header py-3">
              <p className="text-primary m-0 fw-bold">Avatar</p>
            </div>
            <div className="card-body text-center shadow">
              <img
                className="rounded-circle mb-3 mt-4"
                src={
                  props.user != null && props.user.avatar != null
                    ? `${URL}/photos/${props.user.avatar}`
                    : "assets/img/user.jpg"
                }
                width="160"
                height="160"
              />
              <div className="mb-3"></div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="row">
            <div className="col">
              <div className="card shadow mb-3">
                <div className="card-header py-3">
                  <p className="text-primary m-0 fw-bold">Account Settings</p>
                </div>
                <div className="card-body">
                  <FormEditUser user={props.user} onUpdate={props.onUpdate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
