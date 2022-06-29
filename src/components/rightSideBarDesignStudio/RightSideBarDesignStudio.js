import React, { useState, useEffect } from "react";
import "../../css/style.css";
import { Accordion } from "react-bootstrap";
import info from "../../assets/images/feather-info.svg";
import { topics, dataAcess, modeling, cleansing } from "../../resources/nodes";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../store/index";
import Api from "../../services/Api";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const RightSideBarDesignStudio = ({ sideBar, setSideBar }) => {
  const dispatch = useDispatch();
  const onDragStart = (event, node_type, node_label) => {
    event.dataTransfer.setData("application/reactflow", node_type);
    event.dataTransfer.setData("node_data", node_label);
    event.dataTransfer.effectAllowed = "move";
  };
  const nodeState = useSelector(
    (state) => state.getNodeClickStateReducer.settingState
  );

  const [menu, setMenu] = useState("head1");
  //Parameters
  const [modelingParameter, setModelingParameter] = useState("");
  const [dataAccessParameter, setDataAccessParameter] = useState("");
  const [tabState, setTabState] = useState("false");
  const [paramState, setParamState] = useState({});

  //File
  const [uploadProjectFile, setUploadFile] = useState("");

  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileUploadedMessage, setFileUploadedMessage] = useState("");

  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("center");
  // console.log("file: ", uploadProjectFile);

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
      if (props.params.name === "Price") {
        setDataAccessParameter("");
        setModelingParameter("modelingHead");
        setParamState(props.params);
      } else if (
        props.params.name === "Write" ||
        props.params.name === "Read"
      ) {
        setModelingParameter("");
        setDataAccessParameter("dataHead");
        setParamState(props.params);
      } else {
        // setParamState(props.params);
      }
    }
  };
  const sideBarHandler = () => {
    sideBar === false ? setSideBar(true) : setSideBar(false);
  };
  const [nState, setNState] = useState(false);
  const [pState, setPState] = useState(false);
  useEffect(() => {
    if (typeof nodeState === "string") {
      if (nodeState.includes("Read File")) {
        setNState(true);
        setPState(false);
        setModelingParameter("");
        setDataAccessParameter("dataHead");
        setParamState({ fileFormat: ".csv", name: "Read" });
      }
      if (nodeState.includes("Write File")) {
        setNState(true);
        setPState(false);
        setModelingParameter("");
        setDataAccessParameter("dataHead");
        setParamState({ fileFormat: ".csv", name: "Write" });
      }
      if (nodeState.includes("Price")) {
        setModelingParameter("modelingHead");
        setDataAccessParameter("");
        setNState(false);
        setPState(true);
        setParamState({
          name: "Price",
          pValue: "P-value",
          test: "Test",
          train: "Train",
          validate: "Validate",
        });
      }
    }
  }, [nodeState]);

  const nodeStateHandler = () => {
    setNState(false);
    setPState(false);
    dispatch(allActions.getNodeClickStateAction.getNodeStateResponse(nState));
  };
  useEffect(() => {
    if (nState) {
      setMenu("head2");
    }
  }, [nState]);
  useEffect(() => {
    if (pState) {
      setMenu("head2");
    }
  }, [pState]);

  // -------------------------------------------------------

  //File handler
  const uploadFileHandler = async (e) => {
    setUploadFile(e.target.files);
    // console.log("i am clicked inside", uploadProjectFile[0]);

    if (uploadProjectFile !== "") {
      const formData = new FormData();
      formData.append("projectFile", uploadProjectFile[0]);

      let { data } = await Api("POST", "api/upload/project/file", formData);

      if (data) {
        alert(data.message);
        console.log("\nThis is the data from API: ", data);
        // setFileUploaded(true);
        // setFileUploadedMessage(data.message);
        // setTimeout(() => {
        //   setFileUploaded(false);
        // }, 3000);
      }
    } else {
      alert("Please select a file");
    }
  };

  //File handler
  // const fileUploader = async () => {
  //   const config = {
  //     headers: { "content-type": "multipart/form-data" },
  //   };

  //   const formData = new FormData();
  //   formData.append("projectFile", uploadProjectFile[0]);

  //   let { data } = await Api(
  //     "POST",
  //     "api/upload/project/file",
  //     formData,
  //     config
  //   );

  //   console.log("Data: ", data);

  //   if (data) {
  //     console.log("\nThis is the data from API: ", data);
  //   }
  // };

  // console.log("i am clicked outside", uploadProjectFile[0]);

  // -------------------------------------------------------
  return (
    <div
      className={
        sideBar === false
          ? `right_sidebar`
          : `right_sidebar nla_rightside-bar-small`
      }
      data-position="right"
    >
      <span className="nla-toggle-line" onClick={sideBarHandler}></span>
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        {menu === "head1" && (
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
        {menu === "head2" && (
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
                onClick={nodeStateHandler}
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
                        onDragStart={(event) => {
                          console.log("Working", event);
                          onDragStart(event, "input", `${elem.name}`);
                        }}
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
                          onDragEnd={() => {
                            paramSwitchHandler(elem);
                          }}
                          draggable
                        >
                          <i className="fa-solid fa-book-open"></i>
                          {elem.name}
                        </button>
                        <a href="#">
                          <img src={info} alt="info" className="img-fluid" />
                        </a>
                      </div>
                    ))}
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
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            paramSwitchHandler(elem);
                          }}
                          onDragEnd={() => {
                            paramSwitchHandler(elem);
                          }}
                          draggable
                        >
                          <i className="fa-solid fa-book-open"></i>
                          {elem.name}
                        </button>
                        <a href="#">
                          <img src={info} alt="info" className="img-fluid" />
                        </a>
                      </div>
                    ))}
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
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="py-3 px-3">
              <h6 className="mb-1">
                <strong style={{ color: "#174f73" }}>Keyboard Shortcuts</strong>
              </h6>
              <strong>Node and Line Delete</strong>

              <p className="mt-2">MAC: Delete</p>
              <p className="">Window: Backspace button</p>
            </div>
          </div>
        )}
        {/* {menu == "head2" && dataAccessParameter == "dataHead" && (
          <>
            <div
              className="tab-pane show active"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="parameters-content">
                <h5>
                  Modify {paramState.name ? paramState.name : "null"} i am in
                  head 2 and datahead Parameters
                </h5>
                {paramState.fileFormat ? (
                  <>
                    <div className="nla-select-box-with-lbl">
                      <label htmlFor="Logverbosity">FileFormat</label>
                      <select className="form-select">
                        <option value={paramState.fileFormat}>
                          {paramState.fileFormat}
                        </option>
                      </select>
                    </div>
                  </>
                ) : null}
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
        {menu == "head2" && modelingParameter == "modelingHead" && (
          <>
            <div
              className="tab-pane show active"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="parameters-content">
                <h5>
                  Modify {paramState.name ? paramState.name : "null"}
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
                      </select>
                    </div>
                  </>
                ) : null}
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
        )} */}
        {menu === "head2" && (
          <>
            {dataAccessParameter === "dataHead" || nState === true ? (
              <>
                <div
                  className="tab-pane show active"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div className="parameters-content">
                    <h5>
                      Modify {paramState.name ? paramState.name : "null"}{" "}
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
                          </select>
                        </div>
                      </>
                    ) : null}

                    <label htmlFor="file">
                      {paramState.name === "Read" ? "UploadFile" : "Write File"}
                    </label>
                    <div className="nla-select-box-with-lbl">
                      <input
                        type="file"
                        className="form-control"
                        id="file"
                        // onClick={fileUploadHandler}
                        onChange={uploadFileHandler}
                      />
                      <label htmlFor="file">
                        <i className="fa-solid fa-paperclip"></i>
                      </label>
                    </div>
                  </div>
                </div>
              </>
            ) : modelingParameter === "modelingHead" || pState === true ? (
              <>
                <div
                  className="tab-pane show active"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div className="parameters-content">
                    {paramState.name && (
                      <h5>
                        Modify {paramState.name ? paramState.name : "null"}{" "}
                        Parameters
                      </h5>
                    )}

                    <label htmlFor="send Mail">{paramState.pValue}</label>
                    <div class="nla-select-box-with-lbl">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="p-value"
                        aria-describedby="searchOperators"
                      ></input>
                    </div>

                    <label htmlFor="send Mail">{paramState.train}</label>
                    <div class="nla-select-box-with-lbl">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Train"
                        aria-describedby="searchOperators"
                      ></input>
                    </div>

                    <label htmlFor="send Mail">{paramState.test}</label>
                    <div class="nla-select-box-with-lbl">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Test"
                        aria-describedby="searchOperators"
                      ></input>
                    </div>

                    <label htmlFor="send Mail">{paramState.validate}</label>
                    <div class="nla-select-box-with-lbl">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Validate"
                        aria-describedby="searchOperators"
                      ></input>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
      <Snackbar
        open={fileUploaded}
        autoHideDuration={3000}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {fileUploadedMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RightSideBarDesignStudio;
