import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import "../../css/style.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import info from "../../assets/images/feather-info.svg";
import output from "../../assets/images/icon-output.svg";
import saveAs from "../../assets/images/icon-save-as.svg";
import plus from "../../assets/images/feather-file-plus.svg";
import RightSideBarDesignStudio from "../../components/rightSideBarDesignStudio/RightSideBarDesignStudio";
import { OverlayTrigger, Tooltip, Badge, Modal } from "react-bootstrap";
import Flow from "../../components/flow/Flow";
import { Link, useParams } from "react-router-dom";
import Api from "../../services/Api";
import CreateProject from "./CreateProject";
// import ReactFlow, { useStore } from "react-flow-renderer";
import ReactFlow, { useStoreApi, useStore } from "react-flow-renderer";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
// import { nodeState } from "../../store/nodesStore/nodeStoreAction";
import allActions from "../../store/index";
// import Api from "../../services/Api";

// import {
//   BsFillArrowLeftCircleFill,
//   BsFillPenFill,
//   BsFillPlayFill,
//   BsPatchExclamation,
// } from "react-icons/bs";
// import ReactFlow, {
//   ReactFlowProvider,
//   useNodesState,
//   useEdgesState,
//   arrowHeadType,
//   ConnectionLineType,
//   MarkerType,
//   getSmoothStepPath,
//   addEdge,
//   useReactFlow,
//   Background,
//   getMarkerEnd,
//   getEdgeCenter,
//   Controls,
// } from "react-flow-renderer";
const DesignStudio = () => {
  const dispatch = useDispatch();
  const project_id = useParams().id;
  const [project, setProject] = useState([]);
  const [load, setLoad] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  //SnackBar Alert
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("center");
  const [saveModel, setModalSaved] = useState(false);

  const [projectName, setProjectName] = useState("Untitled name");
  // const [projectNameByID, setProjectNameByID] = useState(project?.project_name);

  const [editIcon, setEditIcon] = useState(false);
  const [editProjectName, setEditProjectName] = useState(true);
  // const [addProjectName, setAddProjectName] = useState(true);

  const [save, setState] = useState(false);

  //useCallBack
  const addTodo = useCallback(
    (project_name) => {
      setProjectName(project_name);
      // setProjectName("Untitled project");
      // setTodos((t) => [...t, "New Todo"]);
    },
    [projectName]
  );

  //UseEffect

  useEffect(() => {
    // window.location.reload();
    // setLoad(false);
    async function fetchProject() {
      const { data } = await Api("GET", `api/project/${project_id}`);
      setProject(data[0]);
      // console.log("Project data: ", project?.project_name);
    }
    fetchProject();

    setEditIcon(false);
    setEditProjectName(false);
    // setProjectNameByID(project?.project_name);
    setLoad(false);
  }, []);
  // const store = useStoreApi();
  useEffect(() => {
    if (project_id) {
      // console.log("modelData: ", data);
      // dispatch(allActions.getNodesAction.getNodesState(project_id));
      // dispatch(nodeState(project_id));

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      async function fetchProjects() {
        let { data } = await Api("GET", `api/get/model/${project_id}`, config);
        // console.log("GetNodeAction from Action: ", data);
        const nodesData = {
          edges: data?.output_file?.edges,
          nodes: data?.output_file?.nodes,
          viewport: data?.output_file?.viewport,
        };
        if (data === "Empty nodes") {
          console.log("Empty nodes");
          localStorage.removeItem("nodesFromDatabase");
        } else {
          console.log("nodesData ", nodesData);
          localStorage.setItem("nodesFromDatabase", JSON.stringify(nodesData));
        }
      }

      fetchProjects();
    }
  }, [project_id]);

  useEffect(() => {
    setProject([]);
  }, [project_id]);

  //Edit project

  const editHandler = () => {
    setEditProjectName(true);
    setEditIcon(true);
  };

  const projectNameHandler = () => {
    setEditProjectName(false);
    setEditIcon(false);
  };

  // ==========================================

  const handleEditProjectModal = () => {
    // setProjectID(project_id);
    setModalShow(true);
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="createNewProject"
        // animation-fill-mode="forward"
        // animation={true}
        // hasBackdrop={false}
      >
        <CreateProject
          project_name={projectName}
          addTodo={addTodo}
          {...props}
        />
      </Modal>
    );
  }

  const [sideBar, setSideBar] = useState(false);

  //User
  const authData = JSON.parse(localStorage.getItem("auth"));
  const user_id = authData?.user_id;

  const modelData = JSON.parse(localStorage.getItem("nodes_data"));

  const edges = modelData?.edges;
  const nodes = modelData?.nodes;
  const viewport = modelData?.viewport;

  // console.log("viewport: ", viewport);

  // if (edges && nodes) {
  //   alert("data");
  // } else {
  //   alert("No modal data");
  //   return;
  // }

  const data = {
    user_id: user_id,
    project_id: project_id,
    edges: edges,
    nodes: nodes,
    viewport: viewport,
  };

  const nodeSaveHandler = () => {
    // console.log("project_id: ", project_id);
    if (project_id) {
      // console.log("modelData: ", data);
      dispatch(allActions.nodeStoreAction.nodeState(data));
      // dispatch(nodeState(project_id));
      setModalSaved(true);
      setTimeout(() => {
        setModalSaved(false);
      }, 3000);
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      {/* <!-- Sidebar Right Start --> */}
      {/* <Flow /> */}
      {/* <!-- Body Content Start --> */}
      <div className="main-content-wrapper">
        <div className="design-studio-topbar">
          <div className="cotainer-fluid">
            <div className="row">
              <div className="col-lg-3">
                <div className="new-project-name">
                  <Link to="/dashboard">
                    <div className="nla-arrow-left-icon">
                      <span></span>
                    </div>
                  </Link>

                  {project?.project_name ? (
                    <>
                      {" "}
                      <div className="nla-name">
                        <span>Back to Home Page</span>
                        <p className="mt-2">
                          {project?.project_name || "Enter Project Name"}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="nla-name">
                        <span>Back to Home Page</span>

                        {editProjectName == false ? (
                          <>
                            <p className="mt-2">{projectName}</p>
                          </>
                        ) : (
                          <>
                            <div
                              class="nla-select-box-with-lbl mt-1"
                              // style={{ width: "250px" }}
                            >
                              <input
                                type="text"
                                value={projectName}
                                class="form-control"
                                placeholder="Enter project name"
                                aria-describedby="searchOperators"
                                onChange={(e) => {
                                  setProjectName(e.target.value);
                                }}
                              ></input>
                            </div>
                          </>
                        )}
                      </div>
                      {editIcon == false ? (
                        <>
                          <a className="nla-edit-name" onClick={editHandler}>
                            <i className="fa-solid fa-pen"></i>
                          </a>
                        </>
                      ) : (
                        <>
                          <a
                            className="nla-edit-name mt-4"
                            onClick={projectNameHandler}
                          >
                            <i className="fa-solid fa-check"></i>
                          </a>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="col-lg-9">
                <div className="btn-wrapper">
                  <div className="nla-run-btn-and-info">
                    <a href="#" className="btn btn-primary">
                      Run <i className="fa-solid fa-play"></i>
                    </a>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 250 }}
                      overlay={
                        <Tooltip id="overlay-example">
                          Dolor eligendi natus praesentium voluptatum, nisi
                          veritatis ut minus, distinctio saepe veniam suscipit
                          corporis molestiae voluptatibus cupiditate vel.
                          Laboriosam, repellat officia. Labore?
                        </Tooltip>
                      }
                    >
                      <a href="#">
                        <img src={info} alt="" className="alertAligns" />
                      </a>
                    </OverlayTrigger>
                  </div>
                  <div className="other-design-studio-buttons">
                    <div>
                      <a
                        href="#"
                        className="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#outputModal"
                      >
                        Output <img src={output} alt="" />
                      </a>
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 250 }}
                        overlay={
                          <Tooltip id="overlay-example">
                            Dolor eligendi natus praesentium voluptatum, nisi
                            veritatis ut minus, distinctio saepe veniam suscipit
                            corporis molestiae voluptatibus cupiditate vel.
                            Laboriosam, repellat officia. Labore?
                          </Tooltip>
                        }
                      >
                        <a href="#">
                          <img src={info} alt="" className="alertAligns" />
                        </a>
                      </OverlayTrigger>
                    </div>
                    <div hidden={project_id ? true : false}>
                      <a
                        href="#"
                        className="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#createNewProject"
                        onClick={() => handleEditProjectModal()}
                      >
                        Create Project <img src={plus} alt="" />{" "}
                      </a>
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 250 }}
                        overlay={
                          <Tooltip id="overlay-example">
                            Dolor eligendi natus praesentium voluptatum, nisi
                            veritatis ut minus, distinctio saepe veniam suscipit
                            corporis molestiae voluptatibus cupiditate vel.
                            Laboriosam, repellat officia. Labore?
                          </Tooltip>
                        }
                      >
                        <a href="#">
                          <img src={info} alt="" className="alertAligns" />
                        </a>
                      </OverlayTrigger>
                    </div>
                    <div>
                      <a className="btn btn-secondary">
                        Save As
                        <img src={saveAs} alt="" />
                      </a>
                      <OverlayTrigger
                        placement="left"
                        delay={{ show: 250, hide: 250 }}
                        overlay={
                          <Tooltip id="overlay-example">
                            Dolor eligendi natus praesentium voluptatum, nisi
                            veritatis ut minus, distinctio saepe veniam suscipit
                            corporis molestiae voluptatibus cupiditate vel.
                            Laboriosam, repellat officia. Labore?
                          </Tooltip>
                        }
                      >
                        <a href="#">
                          <img src={info} alt="" className="alertAligns" />
                        </a>
                      </OverlayTrigger>
                    </div>
                    <div>
                      <button
                        // href=""
                        className="btn btn-primary"
                        // onClick={onSave}
                        onClick={nodeSaveHandler}
                      >
                        Save <i className="fa-solid fa-floppy-disk"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RightSideBarDesignStudio sideBar={sideBar} setSideBar={setSideBar} />
        <div className={sideBar === false ? "flow" : "flowActive"}>
          <Flow />
        </div>
        <div className="design-studio-additional-block position-relative">
          {/* <div className="heading">
            <h6>Design Studio</h6>
            <a href="#">
              <img src={info} alt="info" className="img-fluid" />
            </a>
          </div> */}

          <div className="nla-log-block">
            <h6>Logs</h6>
            <div className="nla-log-option">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                />
                <label htmlFor="flexSwitchCheckChecked"></label>
              </div>
            </div>
            <div className="nla-view">
              <p data-bs-toggle="modal" data-bs-target="#advanceLogModal">
                <i className="fa-solid fa-eye"></i> View
              </p>
            </div>
            <div className="nla-rpw">
              <ul>
                <li>
                  <i className="fa-solid fa-check"></i> Read File
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> Pricing
                </li>
                <li>
                  <i className="fa-solid fa-arrow-rotate-right"></i> Pricing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onCreate={() => setLoad(true)}
      />
      <Footer />
      <Snackbar
        open={saveModel}
        autoHideDuration={3000}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Model Saved successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};
// design

export default DesignStudio;
