import { useEffect, useState } from "react";
import ModalWrapper from "../../../Layouts/Modal";
import axios from "axios";
import { URL } from "../../../constants/url";
import { AUTH_TOKEN, Headers } from "../../../constants/constants";
import { toast } from "react-toastify";

export default function ModalAdd(props) {
  // const
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    roles: [{ role: "USER" }],
  });
  const [avatar, setAvatar] = useState(null);
  const [rolesData, setRoles] = useState([]);

  function handleInputChange(e) {
    if (e.target.type == "checkbox") {
      if (userData.roles.some((r) => r.role === e.target.value)) {
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
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    console.log(userData.roles);
  }

  const handleUpdate = (state) => {
    props.onUpdate(state);
    setUserData({
      username: "",
      password: "",
      email: "",
      roles: [{ role: "USER" }],
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(userData)], { type: "application/json" })
    );

    formData.append("photo", avatar);
    await axios
      .post(`${URL}/addUser`, formData, {
        headers: {
          Authorization: `Basic ${AUTH_TOKEN}`,
        },
      })
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
        $(`#${props.id}`).modal("hide");
        e.target.reset();
        handleUpdate(true);
      })
      .catch((err) => {
        if (err.response.data.length > 0) {
          for (let i = 0; i < err.response.data.length; i++) {
            toast.error(err.response.data[i], {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        } else if (err.response.data.message != undefined) {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
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
        }
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
    <ModalWrapper title={props.title} id={props.id}>
      <form
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
            className="form-control"
          />
        </div>
        <div className="col">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
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
        <div className="col">
          <label className="form-label">Roles</label>
          <div className="d-flex justify-content-start">
            {rolesData.length != 0 &&
              rolesData.map((role, index) => {
                return (
                  <div className="mx-2" key={index}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`role-${role.role}`}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      defaultValue={role.role}
                      readOnly={role.role == "USER" ? true : false}
                      defaultChecked={role.role == "USER" ? true : false}
                      disabled={role.role == "USER" ? true : false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`role-${role.role}`}
                    >
                      {role.role}
                    </label>
                  </div>
                );
              })}
          </div>
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
