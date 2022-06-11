import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
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
      <div className="left_sidebar" data-position="right" id="leftSideBar">
        <span className="nla-toggle-line" onClick={sidebarHandler}></span>
        <ul className="nav">
          <li className="active">
            <Link to="/dashboard">
              <div className="icon">
                <svg
                  id="home_icon"
                  data-name="home_icon"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="17.053"
                  height="19.385"
                  viewBox="0 0 17.053 19.385"
                >
                  <defs>
                    <clipPath id="clipPath">
                      <rect
                        id="Rectangle_27851"
                        data-name="Rectangle 27851"
                        width="17.053"
                        height="19.385"
                      ></rect>
                    </clipPath>
                  </defs>
                  <g
                    id="home_icon"
                    data-name="home_icon"
                    clipPath="url(#clip-path)"
                  >
                    <path
                      id="Path_73422"
                      data-name="Path 73422"
                      d="M8.271,0H8.33a.725.725,0,0,1,.451.2L16.8,7.55a.713.713,0,0,1,.25.554q0,5.3,0,10.6a.684.684,0,0,1-.627.682H10.736a.682.682,0,0,1-.638-.659c-.006-1.65,0-3.3,0-4.95H6.958c0,1.651,0,3.3,0,4.952a.683.683,0,0,1-.636.657H.632A.684.684,0,0,1,0,18.7Q0,13.42,0,8.139a.723.723,0,0,1,.232-.571L7.8.223A.728.728,0,0,1,8.271,0M1.35,8.358q-.005,4.841,0,9.681c1.421,0,2.841,0,4.261,0,0-1.646,0-3.292,0-4.937a.678.678,0,0,1,.68-.671q2.215,0,4.431,0a.686.686,0,0,1,.72.709q0,2.45,0,4.9c1.421,0,2.841,0,4.262,0q0-4.831,0-9.661Q12.017,4.982,8.318,1.6,4.83,4.975,1.35,8.358"
                      transform="translate(0)"
                    ></path>
                  </g>
                </svg>
              </div>
              <span style={sidebarState === true ? null : { display: "none" }}>
                Home
              </span>
            </Link>
          </li>
          <li>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 250 }}
              overlay={
                <Tooltip id="overlay-example">
                  <h6>Design Studio</h6>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Tooltip>
              }
            >
              <Link to={`/design-studio/1`}>
                {/* <i className="fa-solid fa-pen-nib"></i> */}
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19.998"
                    height="20.305"
                    viewBox="0 0 19.998 20.305"
                  >
                    <g
                      id="icon-design-studio"
                      transform="translate(0.155 0.15)"
                    >
                      <path
                        id="Path_73423"
                        data-name="Path 73423"
                        d="M9.683,0h.294a1.6,1.6,0,0,1,1.03.516,1.642,1.642,0,0,1,.373.734c1.383,0,2.765,0,4.148,0A.963.963,0,0,1,16,.723.937.937,0,1,1,16.41,2.5a.949.949,0,0,1-.879-.621c-.8-.007-1.6,0-2.4,0a8.928,8.928,0,0,1,5.533,7.03c.252,0,.5-.011.757.007a.314.314,0,0,1,.268.345v1.8a.314.314,0,0,1-.271.344c-.249.021-.5-.008-.748.011A11.878,11.878,0,0,1,18.4,12.66a8.862,8.862,0,0,1-7.3,6.318c-.006.252.011.5-.007.757a.329.329,0,0,1-.246.27H8.856a.323.323,0,0,1-.255-.27c-.017-.252,0-.5-.006-.756a9.065,9.065,0,0,1-2.225-.612,8.881,8.881,0,0,1-4.684-4.619,9.434,9.434,0,0,1-.664-2.332c-.25-.02-.5.011-.753-.012A.314.314,0,0,1,0,11.056q0-.9,0-1.8a.313.313,0,0,1,.272-.343c.25-.016.5,0,.753-.005A8.92,8.92,0,0,1,6.558,1.879c-.8-.008-1.594-.006-2.39,0a.985.985,0,0,1-.421.5A.937.937,0,1,1,3.694.721a1,1,0,0,1,.478.529H8.311A1.626,1.626,0,0,1,8.683.518a1.636,1.636,0,0,1,1-.518M9.629.65A.938.938,0,1,0,10.5.9.938.938,0,0,0,9.629.65m-6.452.618a.315.315,0,1,0,.25.019.312.312,0,0,0-.25-.019m13.127,0a.314.314,0,1,0,.313.067.312.312,0,0,0-.313-.067M3.782,4.52A8.281,8.281,0,0,0,1.66,8.906c.191,0,.382-.009.573.005a.317.317,0,0,1,.268.346q0,.919,0,1.841a.307.307,0,0,1-.265.3c-.191.015-.383,0-.575.006A8.241,8.241,0,0,0,8.6,18.341c0-.191-.009-.383.006-.574a.3.3,0,0,1,.3-.265c.573-.006,1.146,0,1.719,0a1.288,1.288,0,0,1,.236.012.309.309,0,0,1,.233.3c.007.177,0,.354,0,.532a8.237,8.237,0,0,0,6.935-6.935c-.191,0-.382.009-.572,0a.317.317,0,0,1-.269-.346V9.22a.3.3,0,0,1,.268-.3c.19-.014.381,0,.571-.005a8.285,8.285,0,0,0-6.688-6.893,1.564,1.564,0,0,1-2.993,0,8.26,8.26,0,0,0-4.564,2.5M.626,10.781h1.25V9.531H.626Zm17.188,0h1.25V9.531h-1.25ZM9.22,19.375h1.25v-1.25H9.22Z"
                        fill="#888"
                        stroke="#888"
                        strokeWidth="0.3"
                      ></path>
                      <path
                        id="Path_73424"
                        data-name="Path 73424"
                        d="M159.086,95.944c.436-.041.879-.007,1.317-.018a.324.324,0,0,1,.333.211l2.8,6.539a.488.488,0,0,1-.07.415c-.363.811-.721,1.624-1.085,2.434-.018.052-.056.107-.025.163.188.566.38,1.131.565,1.7a.318.318,0,0,1-.334.415H157a.312.312,0,0,1-.292-.414q.27-.821.548-1.64c.015-.055.046-.114.013-.168-.387-.875-.779-1.748-1.168-2.623a.347.347,0,0,1,0-.308l2.718-6.344c.06-.135.1-.309.264-.358m.309.609q-1.338,3.125-2.677,6.249.555,1.25,1.112,2.5h3.97q.554-1.25,1.112-2.5l-2.676-6.248h-.108v4.562a1.564,1.564,0,1,1-1.545.573,1.592,1.592,0,0,1,.92-.573V96.559h-.107m.2,5.181a.938.938,0,1,0,.86.23.938.938,0,0,0-.86-.23m-2.161,5.443h4.76l-.418-1.249h-3.925q-.209.624-.417,1.249"
                        transform="translate(-149.97 -92.176)"
                        fill="#888"
                        stroke="#888"
                        strokeWidth="0.3"
                      ></path>
                    </g>
                  </svg>
                </div>
                <span
                  style={sidebarState === true ? null : { display: "none" }}
                >
                  Design Studio
                </span>
              </Link>
            </OverlayTrigger>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
