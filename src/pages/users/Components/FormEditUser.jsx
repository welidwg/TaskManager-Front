import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { URL } from "../../../constants/url";
import { AUTH_TOKEN, AUTH_USER, Headers } from "../../../constants/constants";

export default function FormEditUser(props) {
  const currentUser = AUTH_TOKEN && AUTH_USER;
  const [u, setUserData] = useState({
    id: props.user != null ? props.user.id : 0,
    username: props.user != null ? props.user.username : "",
    password: props.user != null ? props.user.password : "",
    email: props.user != null ? props.user.email : "",
    avatar: props.user != null ? props.user.avatar : null,
    roles: props.user != null ? props.user.roles : [],
  });

  const [avatar, setAvatar] = useState([]);
  const [rolesData, setRoles] = useState([]);

  useEffect(() => {
    setUserData({
      id: props.user != null && props.user.id,
      username: props.user != null ? props.user.username : "",
      password: props.user != null ? props.user.password : "",
      email: props.user != null ? props.user.email : "",
      avatar: props.user != null ? props.user.avatar : null,
      roles: props.user != null ? props.user.roles : [],
    });
  }, [props.user]);

  function handleInputChange(e) {
    if (e.target.type == "checkbox") {
      if (u.roles.some((r) => r.role === e.target.value)) {
        setUserData((prev) => ({
          ...prev,
          roles: prev.roles.filter((role) => role.role !== e.target.value),
        }));
      } else {
        setUserData((prev) => ({
          ...prev,
          roles: [...prev.roles, { role: e.target.value }],
        }));
      }
    } else if (e.target.type == "file") {
      setAvatar(e.target.files[0]);
    } else {
      setUserData({ ...u, [e.target.name]: e.target.value });
    }
  }

  const handleUpdate = (state) => {
    props.onUpdate(state);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(u)], { type: "application/json" })
    );

    formData.append("photo", avatar);
    await axios
      .put(`${URL}/account/edit`, formData, {
        headers: {
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
        localStorage.setItem("user", JSON.stringify(res.data));

        handleUpdate(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data != undefined
            ? err.response.data.message
            : "Server error",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      });
  };
  useEffect(() => {
    axios
      .get(`${URL}/roles/getAll`, Headers)
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <form
        id={`form-edit-user-${u.id}`}
        encType="multipart/form-data"
        className="row flex-column g-3 needs-validation"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="col">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            onChange={(e) => {
              handleInputChange(e);
            }}
            className="form-control "
            defaultValue={u.username}
            disabled={props.user != null && currentUser.id === props.user.id}
          />
        </div>
        <div className="col">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            defaultValue={u.email}
            name="email"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>
        <div className="col">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={(e) => {
              handleInputChange(e);
            }}
            disabled={props.user != null && currentUser.id === props.user.id}
          />
        </div>
        <div className="col">
          <label className="form-label">Avatar</label>
          <input
            type="file"
            className="form-control"
            name="avatar"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>
        {u.id != 0 && u.id !== currentUser.id && (
          <div className="col">
            <label className="form-label">Roles</label>
            <div className="d-flex justify-content-start">
              {rolesData.length !== 0 &&
                rolesData.map((role, index) => {
                  let check = false;
                  if (props.user.roles.some((r) => r.role === role.role))
                    check = true;
                  return (
                    <div className="mx-2" key={index}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`role-${role.role}-${
                          props.user != null && props.user.id
                        }`}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        defaultValue={role.role}
                        defaultChecked={check}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`role-${role.role}-${
                          props.user != null && props.user.id
                        }`}
                      >
                        {role.role}
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        <div className="col-12 d-flex justify-content-end">
          <button
            className="btn btn-primary text-light fw-bold  "
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
