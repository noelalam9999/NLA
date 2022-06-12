import React, { useState, useEffect, useCallback, useRef } from "react";
import "../../css/style.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import info from "../../assets/images/feather-info.svg";
import output from "../../assets/images/icon-output.svg";
import saveAs from "../../assets/images/icon-save-as.svg";
import plus from "../../assets/images/feather-file-plus.svg";
import RightSideBarDesignStudio from "../../components/rightSideBarDesignStudio/RightSideBarDesignStudio";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Flow from "../../components/flow/Flow";
import { Link, useParams } from "react-router-dom";
import Api from "../../services/Api";

import {
  BsFillArrowLeftCircleFill,
  BsFillPenFill,
  BsFillPlayFill,
  BsPatchExclamation,
} from "react-icons/bs";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  arrowHeadType,
  ConnectionLineType,
  MarkerType,
  getSmoothStepPath,
  addEdge,
  useReactFlow,
  Background,
  getMarkerEnd,
  getEdgeCenter,
  Controls,
} from "react-flow-renderer";

const DesignStudio = () => {
  const project_id = useParams().id;
  const [project, setProject] = useState([]);

  const [save, setState] = useState(false);

  //UseEffect

  useEffect(() => {
    async function fetchProject() {
      const { data } = await Api("GET", `api/project/${project_id}`);
      setProject(data[0]);
      // console.log("Project data: ", project?.project_name);
    }
    fetchProject();
  }, []);
  const [rfInstance, setRfInstance] = useState(null);
  const flowKey = "example-flow";
  const saveclass = useRef("save-button");
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      saveclass.current = "save-button";
      // console.log("Current Flow is \n",flow);
      console.log("working");
    }
  }, [rfInstance]);
  // =====================================================================================================================
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
                  <div className="nla-name">
                    <span>Back to Home Page</span>
                    <p>{project?.project_name || "Project name here"}</p>
                  </div>
                  <a href="#" className="nla-edit-name">
                    <i className="fa-solid fa-pen"></i>
                  </a>
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
                    <div>
                      <a
                        href="#"
                        className="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#createNewProject"
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
                      <a href="#" className="btn btn-secondary">
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
                        onClick={onSave}
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
        <RightSideBarDesignStudio />
        <Flow />
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
      <Footer />
    </div>
  );
};

export default DesignStudio;
