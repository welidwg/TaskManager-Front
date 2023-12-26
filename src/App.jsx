import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AUTH_TOKEN, AUTH_USER } from "./constants/constants";
import NotFound from "./pages/errors/NotFound";
import IndexTask from "./pages/tasks/Index";
import IndexUser from "./pages/users/IndexUser";
import UserTaskIndex from "./pages/tasks/user/UserTaskIndex";
import IndexStatus from "./pages/status/IndexStatus";
import Pusher from "pusher-js";
import { ToastContainer, toast } from "react-toastify";
function App() {
  const [count, setCount] = useState(0);
  const roles = AUTH_USER && AUTH_USER.roles;

  useEffect(() => {
    const pusher = new Pusher("33ae8c9470ab8fad0744", {
      cluster: "eu",
      encrypted: true,
    });

    if (roles && roles.some((r) => r.role == "ADMIN")) {
      let cAdmin = pusher.subscribe("notif-admin");
      cAdmin.bind("notif-event", (data) => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        toast.success(data, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    }

    if (AUTH_USER) {
      let userChannel = pusher.subscribe(`notif-${AUTH_USER.id}`);
      userChannel.bind("notif-event", (data) => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        toast.success(data, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    }
    // let channel = pusher.subscribe("notif");
    // channel.bind("notif-event", (data) => {
    //   console.log("====================================");
    //   console.log(data);
    //   console.log("====================================");
    //   toast(data, {
    //     position: "top-right",
    //     autoClose: false,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // });
    return () => {
      // channel.unbind("notif-event");
      pusher.unsubscribe("notif");
      pusher.unsubscribe("notif-admin");
      if (AUTH_USER) {
        pusher.unsubscribe(`notif-${AUTH_USER.id}`);
      }
    };
  }, []);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={AUTH_TOKEN ? <Home /> : <Login />} />

        <Route path="/login" element={AUTH_TOKEN ? <Home /> : <Login />} />
        {AUTH_TOKEN && (
          <>
            <Route path="/home" element={<Home />} />

            {roles.some((r) => r.role === "ADMIN") && (
              <>
                <Route path="/task" element={<IndexTask />} />
                <Route path="/users" element={<IndexUser />} />
                <Route path="/status" element={<IndexStatus />} />
              </>
            )}

            <Route path="/mytasks" element={<UserTaskIndex />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
