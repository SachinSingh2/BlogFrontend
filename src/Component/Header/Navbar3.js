import React, { useContext } from "react";
import "../../css/Navbar3.css";
import { Link } from "react-router-dom";
import { InfoContext } from "../../Context/InfoProvider";

export default function NavBar() {
  const { Account } = useContext(InfoContext);

  const handleOnLogout = () => {
    sessionStorage.removeItem("accessToken");
    window.location.reload();
  };
  return (
    <>
      {/* <!-- Navbar --> */}
      <nav className="navbar  navbar-expand-lg ">
        {/* <!-- Container wrapper --> */}
        <div className="container-fluid">
          
          {/* <!-- Toggle button --> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
            style={{ color: "white" }}
          >
            <i className="fas fa-bars"></i>
          </button>



          <Link to="/">
            <h2 className="Logo">InspireHub</h2>
          </Link>

          

          {/* <!-- Collapsible wrapper --> */}
          <div
            style={{ textAlign: "center" }}
            className="NavigationBar navbar-collapseollapse  "
            id="navbarSupportedContent"
          >
            {/* <!-- Centered Navbar brand --> */}
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/latest">Latest Blogs</Link>
            <Link to="/mostviewd">Most Viewd</Link>
          </div>

          {/* <!-- Right elements --> */}
          <div className="d-flex align-items-center">
            {/* <!-- Icon --> */}

            {/* <!-- Avatar --> */}
            <div className="dropdown mx-2 d-flex">
              
              <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  className="rounded-circle"
                  height="35"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </a>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                {/* <h5 className='py-2' style={{textAlign:"center"}}  >{Account.name}</h5> */}
                <li>
                  <Link className="dropdown-item" to='/Profile'>
                    My profile
                  </Link>
                </li>

                <li>
                  <a
                    onClick={handleOnLogout}
                    className="dropdown-item"
                    href="#"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- Right elements --> */}
        </div>
        {/* <!-- Container wrapper --> */}
      </nav>

      {/* ----------------------------------------- Navigation here ------------------------------------------------------*/}

      {/* Offcanvas for Search */}
      <div
        className="offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasTopLabel">
            Offcanvas top
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* ... your search bar content ... */}
          <input type="text" />
        </div>
      </div>

      {/* Left canvas */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{ backgroundColor: "black" }}
      >
        <div className="offcanvas-header" style={{ backgroundColor: "#fff" }}>
          <h2 style={{ color: "black", fontWeight: "700" }}>InspireHub</h2>

          {/* Cross button */}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          {/* The links tags will be here */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              className="nav-item mx-1"
            >
              <Link
                style={{
                  fontSize: "20px",
                  letterSpacing: "2px",
                  fontWeight: "400",
                  color: "white",
                  font: "Arial",
                }}
                className="nav-link active "
                aria-current="page"
                to={"/"}
              >
                HOME
              </Link>
            </li>

            <hr />
            <li
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              className="nav-item mx-1"
            >
              <Link
                style={{
                  fontSize: "20px",
                  letterSpacing: "2px",
                  fontWeight: "400",
                  color: "white",
                }}
                className="nav-link active"
                aria-current="page"
                to={"/about"}
              >
                ABOUT
              </Link>
            </li>
            <hr />

            <li
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              className="nav-item mx-1"
            >
              <Link
                style={{
                  fontSize: "20px",
                  letterSpacing: "2px",
                  fontWeight: "400",
                  color: "white",
                }}
                className="nav-link active"
                aria-current="page"
                to={"/contact"}
              >
                CONTACT
              </Link>
            </li>

            <hr />

            <li
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              className="nav-item mx-1"
            >
              <Link
                style={{
                  fontSize: "20px",
                  letterSpacing: "2px",
                  fontWeight: "400",
                  color: "white",
                }}
                className="nav-link active"
                aria-current="page"
                to={"/latest"}
              >
                LATEST BLOGS
              </Link>
            </li>

            <hr />

            <li
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              className="nav-item mx-1"
            >
              <Link
                style={{
                  fontSize: "20px",
                  letterSpacing: "2px",
                  fontWeight: "400",
                  color: "white",
                }}
                className="nav-link active"
                aria-current="page"
                to={"/mostviewd"}
              >
                MOST VIEWD
              </Link>
            </li>

            <hr />

            <div style={{ color: "white" }} className="socialBox  p-2">
              {/* <!-- Facebook --> */}
              <i className="mx-2 fa-xl fab fa-facebook-f"></i>

              {/* <!-- Twitter --> */}
              <i className="mx-2 fa-xl fab fa-twitter"></i>

              {/* <!-- Google --> */}
              <i className=" mx-2 fa-xl fab fa-google"></i>

              {/* <!-- Instagram --> */}
              <i className="mx-2 fa-xl fab fa-instagram"></i>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
