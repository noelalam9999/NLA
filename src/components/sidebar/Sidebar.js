import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/style.css";
const Sidebar = () => {
  const [sidebarState, setSidebarState] = useState(true);
  const sidebarHandler = () => {
    if (sidebarState === false) {
      setSidebarState(true);
    } else {
      setSidebarState(false);
    }
  };

  return (
    <>
      <div className="left_sidebar" data-position="right">
        <span className="nla-toggle-line" onClick={sidebarHandler}></span>
        <ul className="nav">
          <li className="active">
            <Link to="/dashboard">
              <i className="fa-solid fa-house"></i>
              <span style={sidebarState === true ? null : { display: "none" }}>
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/design-studio"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            >
              <i className="fa-solid fa-pen-nib"></i>
              <span style={sidebarState === true ? null : { display: "none" }}>
                Design Studio
              </span>
            </Link>
          </li>
        </ul>
      </div>
      {/* {sidebarState === true ? (
        <>
          <div className="left_sidebar" data-position="right">
            <span className="nla-toggle-line" onClick={sidebarHandler}></span>
            <ul className="nav">
              <li className="active">
                <Link to="/dashboard">
                  <i className="fa-solid fa-house"></i>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/design-studio"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                >
                  <i className="fa-solid fa-pen-nib"></i>
                  <span>Design Studio</span>
                </Link>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="left_sidebar" data-position="right">
            <span className="nla-toggle-line" onClick={sidebarHandler}></span>
            <ul className="nav">
              <li className="active">
                <Link to="/dashboard">
                  <i className="fa-solid fa-house"></i>
                  <span className="leftSidebarSpanHide">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/design-studio"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                >
                  <i className="fa-solid fa-pen-nib"></i>
                  <span style={{ display: "none" }}>Design Studio</span>
                </Link>
              </li>
            </ul>
          </div>
        </>
      )} */}
    </>
  );
};

export default Sidebar;
