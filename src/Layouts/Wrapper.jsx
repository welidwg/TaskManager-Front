import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

export default function Wrapper(props) {
  return (
    <div id="page-top " className="">
      <div id="wrapper" className="">
        <SideBar />
        <div className="d-flex flex-column  " id="content-wrapper">
          <div id="content" className="">
            <NavBar />
            <div className="container-fluid">{props.children}</div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
