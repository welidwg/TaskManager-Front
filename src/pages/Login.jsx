import axios from "axios";
import { useState } from "react";
import { URL } from "../constants/url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Headers } from "../constants/constants";

export default function Login(props) {
  const [data, setData] = useState({ username: "", password: "" });

  function handleInputChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    let formData = new FormData();

    axios
      .post(`${URL}/login`, data, {
        // validateStatus: null,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        let token = btoa(`${data.username}:${data.password}`);

        localStorage.setItem("token", token);
        toast.success("Welcome , " + data.username, {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        await axios
          .get(`${URL}/account/${data.username}`, {
            headers: { Authorization: `Basic ${token}` },
          })
          .then((r) => {
            localStorage.setItem("user", JSON.stringify(r.data));
            setTimeout(() => {
              window.location.href = "/home";
            }, 700);
          })
          .catch((er) => {
            console.log(er);
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid credentials", {
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
  }
  return (
    <div className="bg-gradient-primary d-flex align-items-center vh-100">
      <ToastContainer />
      <div className="container ">
        <div className="row justify-content-center ">
          <div className="col-md-9 col-lg-12 col-xl-10 ">
            <div className="card shadow-lg o-hidden border-0 my-5 ">
              <div className="card-body p-0 ">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-flex">
                    <div
                      className="flex-grow-1 bg-login-image"
                      style={{
                        backgroundImage: `url("assets/img/logo_main.png")`,
                        backgroundPosition: "bottom",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </div>
                  <div className="col-lg-6 ">
                    <div className="p-5">
                      <div className="text-center">
                        <h4 className="text-dark mb-4">
                          Welcome to Task Manager!
                        </h4>
                      </div>
                      <form
                        className="user"
                        encType="multipart/form-data"
                        onSubmit={(e) => handleFormSubmit(e)}
                      >
                        <div className="mb-3">
                          <input
                            className="form-control form-control-user"
                            type="text"
                            placeholder="Enter your username..."
                            name="username"
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            className="form-control form-control-user"
                            type="password"
                            id="exampleInputPassword"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>

                        <button
                          className="btn btn-primary d-block btn-user w-100"
                          type="submit"
                        >
                          Login
                        </button>
                      </form>
                      <hr />
                      {/* <div className="text-center">
                        <a
                          className="small text-decoration-none"
                          href="forgot-password.html"
                        >
                          Forgot Password?
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
