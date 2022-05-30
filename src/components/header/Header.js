import React, { useState, useRef } from "react";
import { useClickAway } from "react-use";
import logo from "../../assets/images/Northlight_Analytics_Final_Logo.png";
import placeHoldImg from "../../assets/images/placeholde_100.png";
import { Link } from "react-router-dom";
const Header = () => {
  const [notifState, notifSetState] = useState(false);
  const authData = JSON.parse(localStorage.getItem("auth"));
  const notifHandler = () => {
    if (notifState === true) {
      notifSetState(false);
    } else {
      notifSetState(true);
    }
  };
  // Closes Notification dropDown When Clicked outside
  const ref = useRef(null);
  useClickAway(ref, () => {
    notifSetState(false);
  });
  const logoutHandler = () => {
    localStorage.removeItem("auth");
  };
  return (
    <div>
      {/* <!-- Header Start --> */}
      <header className="container-fluid dashboard_header">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6">
            <div className="nla_header_left">
              <div className="nla_logo">
                <a href="#">
                  <img
                    src={logo}
                    alt="Northlight Analytics Logo"
                    className="img-fluid navbar-brand"
                  />
                </a>
              </div>
              <div className="nla_title">
                <p className="mb-0">Gazelle</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 text-end">
            <div className="nla_settings_block">
              <div className="position-relative nla_notification">
                <a href="#">
                  <i className="fa-regular fa-bell"></i>
                </a>
              </div>
              <div className="nla_profile_setting_wrapper">
                <div className="nla_profile">
                  <img src={placeHoldImg} className="img-fluid" alt="profile" />
                </div>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id="profile_dropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={notifHandler}
                  >
                    {authData?.email ? authData?.email : "John Doe"}
                  </button>
                  {notifState === true ? (
                    <>
                      <ul
                        ref={ref}
                        className="dropdown-menu show"
                        aria-labelledby="profile_dropdown"
                        style={{
                          position: "absolute",
                          inset: "0px auto auto 0px",
                          margin: "0px",
                          transform: "translate3d(-124px, 21px, 0px)",
                        }}
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            Profile
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Dark Mode
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Clients
                          </a>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/login"
                            onClick={logoutHandler}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* {/* <!-- Header Start --> */}
    </div>
  );
};

export default Header;
