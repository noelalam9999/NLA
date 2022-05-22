import React from "react";
import logo from "../../assets/images/Northlight_Analytics_Final_Logo.png";
import placeHoldImg from "../../assets/images/placeholde_100.png";
const Header = () => {
  const authData = JSON.parse(localStorage.getItem("auth"));

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
                  >
                    {authData?.username ? authData?.username : "John Doe"}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="profile_dropdown"
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
                      <a className="dropdown-item" href="#">
                        Logout
                      </a>
                    </li>
                  </ul>
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
