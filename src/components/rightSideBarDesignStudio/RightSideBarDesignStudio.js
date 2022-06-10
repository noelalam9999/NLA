import React, { useState } from "react";
import "../../css/style.css";
import { Accordion } from "react-bootstrap";
import info from "../../assets/images/feather-info.svg";
import { topics, dataAcess, modeling, cleansing } from "../../resources/nodes";
const RightSideBarDesignStudio = () => {
  const onDragStart = (event, node_type, node_label) => {
    event.dataTransfer.setData("application/reactflow", node_type);
    event.dataTransfer.setData("node_data", node_label);
    event.dataTransfer.effectAllowed = "move";
  };
  const [menu, setMenu] = useState("head1");
  const [tabState, setTabState] = useState("false");
  const [paramState, setParamState] = useState({});
  function onMenuClick() {
    if (menu === "head1") {
      setMenu("head2");
    } else {
      setMenu("head1");
    }
  }
  const paramSwitchHandler = (props) => {
    if (props.params) {
      setMenu("head2");
      setParamState(props.params);
    }
  };
  return (
    <div className="right_sidebar" data-position="right">
      <span className="nla-toggle-line"></span>
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        {menu == "head1" && (
          <>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <i className="fa-solid fa-user-gear"></i> <span>Operators</span>
              </button>
            </li>
            <li
              onClick={() => onMenuClick()}
              className="nav-item"
              role="presentation"
            >
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                <i className="fa-solid fa-sliders"></i> <span>Parameters</span>
              </button>
            </li>
          </>
        )}
        {menu == "head2" && (
          <>
            <li
              onClick={() => onMenuClick()}
              className="nav-item"
              role="presentation"
            >
              <button
                className="nav-link "
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <i className="fa-solid fa-user-gear"></i> <span>Operators</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                <i className="fa-solid fa-sliders"></i> <span>Parameters</span>
              </button>
            </li>
          </>
        )}
      </ul>
      <div className="tab-content" id="pills-tabContent">
        {menu === "head1" && (
          <div className="tab-pane fade show active" id="pills-home">
            <Accordion defaultActiveKey="1">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Topics</Accordion.Header>
                <Accordion.Body>
                  <div className="data-access_btn">
                    {topics.map((elem, id) => (
                      <div
                        key={id}
                        onDragStart={(event) =>
                          onDragStart(event, "input", `${elem.name}`)
                        }
                        draggable
                      >
                        <button className="btn btn-secondary">
                          <i className="fa-solid fa-book-open"></i>
                          {elem.name}
                        </button>
                        <a href="#">
                          <img src={info} alt="info" className="img-fluid" />
                        </a>
                      </div>
                    ))}
                    {/* <div
                      onDragStart={(event) =>
                        onDragStart(event, "input", "Price Elasticity")
                      }
                      draggable
                    >
                      <button className="btn btn-secondary">
                        <i className="fa-solid fa-book-open"></i>
                        Price Elasticity
                      </button>
                      <a href="#">
                        <img src={info} alt="info" className="img-fluid" />
                      </a>
                    </div> */}
                    {/* <div
                      onDragStart={(event) =>
                        onDragStart(event, "input", "Demand Forecast")
                      }
                      draggable
                    >
                      <button className="btn btn-secondary">
                        <i className="fa-solid fa-pen-nib"></i>
                        Demand Forcasting
                      </button>
                      <a href="#">
                        <img src={info} alt="info" className="img-fluid" />
                      </a>
                    </div> */}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Data Access</Accordion.Header>
                <Accordion.Body>
                  <div className="data-access_btn">
                    {dataAcess.map((elem, id) => (
                      <div
                        key={id}
                        onDragStart={(event) =>
                          onDragStart(event, "input", `${elem.name}`)
                        }
                        draggable
                      >
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            paramSwitchHandler(elem);
                          }}
                        >
                          <i className="fa-solid fa-book-open"></i>
                          {elem.name}
                        </button>
                        <a href="#">
                          <img src={info} alt="info" className="img-fluid" />
                        </a>
                      </div>
                    ))}

                    {/* <div
                      onDragStart={(event) =>
                        onDragStart(event, "input", "Write File")
                      }
                      draggable
                    >
                      <button className="btn btn-secondary">
                        <i className="fa-solid fa-pen-nib"></i>
                        Write File
                      </button>
                      <a href="#">
                        <img src={info} alt="info" className="img-fluid" />
                      </a>
                    </div> */}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Modeling</Accordion.Header>
                <Accordion.Body>
                  <div className="data-access_btn">
                    {modeling.map((elem, id) => (
                      <div
                        key={id}
                        onDragStart={(event) =>
                          onDragStart(event, "input", `${elem.name}`)
                        }
                        draggable
                      >
                        <button className="btn btn-secondary">
                          <i className="fa-solid fa-book-open"></i>
                          {elem.name}
                        </button>
                        <a href="#">
                          <img src={info} alt="info" className="img-fluid" />
                        </a>
                      </div>
                    ))}
                    {/* <div
                      onDragStart={(event) =>
                        onDragStart(event, "input", "Linear Regression")
                      }
                      draggable
                    >
                      <button className="btn btn-secondary">
                        <i className="fa-solid fa-book-open"></i>
                        Linear Regression
                      </button>
                      <a href="#">
                        <img src={info} alt="info" className="img-fluid" />
                      </a>
                    </div> */}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Cleansing</Accordion.Header>
                <Accordion.Body>
                  <div className="data-access_btn">
                    {cleansing.map((elem, id) => (
                      <div
                        key={id}
                        onDragStart={(event) =>
                          onDragStart(event, "input", `${elem.name}`)
                        }
                        draggable
                      >
                        <button className="btn btn-secondary">
                          <i className="fa-solid fa-book-open"></i>
                          {elem.name}
                        </button>
                        <a href="#">
                          <img src={info} alt="info" className="img-fluid" />
                        </a>
                      </div>
                    ))}
                    {/* <div
                      onDragStart={(event) =>
                        onDragStart(event, "input", "Cleansing")
                      }
                      draggable
                    >
                      <button className="btn btn-secondary">
                        <i className="fa-solid fa-book-open"></i>
                        Normalize
                      </button>{" "}
                      <a href="#">
                        <img src={info} alt="info" className="img-fluid" />
                      </a>
                    </div> */}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        )}
        {menu == "head2" && (
          <>
            <div
              className="tab-pane show active"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="parameters-content">
                <h5>
                  Modify {paramState.name ? paramState.name : "null"} File
                  Parameters
                </h5>
                {paramState.fileFormat ? (
                  <>
                    <div className="nla-select-box-with-lbl">
                      <label htmlFor="Logverbosity">FileFormat</label>
                      <select className="form-select">
                        <option value={paramState.fileFormat}>
                          {paramState.fileFormat}
                        </option>
                        {/* <option selected>Warning</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option> */}
                      </select>
                    </div>
                  </>
                ) : null}

                {/* <div className="nla-select-box-with-lbl">
                  <label htmlFor="sendMail">Send Mail</label>
                  <select className="form-select" aria-label="sendMail">
                    <option selected>Always</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div> */}

                <label htmlFor="send Mail">
                  {paramState.name === "Read" ? "UploadFile" : "Write File"}
                </label>
                <div className="nla-select-box-with-lbl">
                  <input type="file" className="form-control" id="sendMail" />
                  <label htmlFor="sendMail">
                    <i className="fa-solid fa-paperclip"></i>
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RightSideBarDesignStudio;
