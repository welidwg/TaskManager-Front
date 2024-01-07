import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AUTH_TOKEN, AUTH_USER, Headers } from "./constants/constants";
import NotFound from "./pages/errors/NotFound";
import IndexTask from "./pages/tasks/Index";
import IndexUser from "./pages/users/IndexUser";
import UserTaskIndex from "./pages/tasks/user/UserTaskIndex";
import IndexStatus from "./pages/status/IndexStatus";
import Pusher from "pusher-js";
import { ToastContainer, toast } from "react-toastify";
import Profile from "./pages/users/Profile";
import axios from "axios";
import { URL } from "./constants/url";
function App() {
  const [count, setCount] = useState(0);
  const roles = AUTH_USER && AUTH_USER.roles;
  const [currentUser, setCurrentUser] = useState(null);
  const [sync, setSync] = useState(false);
  const handleSync = (state) => {
    setSync(state);
  };
  useEffect(() => {
    var audio = new Audio("/assets/notif.wav");
    setSync(false);
    const pusher = new Pusher("33ae8c9470ab8fad0744", {
      cluster: "eu",
      encrypted: true,
    });

    if (roles && roles.some((r) => r.role == "ADMIN")) {
      let cAdmin = pusher.subscribe("notif-admin");
      cAdmin.bind("notif-event-admin", (data) => {
        toast.info(data, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSync(true);
        audio.play();
      });
    }

    if (AUTH_USER) {
      let userChannel = pusher.subscribe(`notif-${AUTH_USER.id}`);
      userChannel.bind("notif-event", (data) => {
        toast.info(data, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSync(true);
        audio.play();
      });
      axios
        .get(URL + "/account/" + AUTH_USER.username, Headers)
        .then((res) => setCurrentUser(res.data))
        .catch((err) => console.log(err));
    }

    return () => {
      pusher.unsubscribe("notif");
      pusher.unsubscribe("notif-admin");
      if (AUTH_USER) {
        pusher.unsubscribe(`notif-${AUTH_USER.id}`);
      }
    };
  }, [sync]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={AUTH_TOKEN ? <Home /> : <Login />} />

        <Route path="/login" element={AUTH_TOKEN ? <Home /> : <Login />} />
        {AUTH_TOKEN && (
          <>
            <Route path="/home" element={<Home />} />
            <Route
              path="/profile"
              element={
                <Profile sync={sync} onUpdate={handleSync} user={currentUser} />
              }
            />

            {roles.some((r) => r.role === "ADMIN") && (
              <>
                <Route path="/task" element={<IndexTask sync={sync} />} />
                <Route path="/users" element={<IndexUser />} />
                <Route path="/status" element={<IndexStatus />} />
              </>
            )}
            {!roles.some((r) => r.role === "ADMIN") && (
              <Route path="/mytasks" element={<UserTaskIndex sync={sync} />} />
            )}
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
