import React from "react";
import { Link } from "react-router-dom";
import "../../css/style.css";
const Sidebar = () => {
  return (
    <div>
      <div className="left_sidebar" data-position="right">
        <span className="nla-toggle-line"></span>
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
    </div>
  );
};

export default Sidebar;
