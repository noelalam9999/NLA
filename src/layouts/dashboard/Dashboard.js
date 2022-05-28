import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../css/style.css";
import awUser from "../../assets/images/awesome-user-alt.svg";
import list from "../../assets/images/ionic-ios-list.svg";
import calenderSvg from "../../assets/images/feather-calendar.svg";
import feather from "../../assets/images/feather-info.svg";
import plusCircle from "../../assets/images/icon-plus-circle.svg";
import featherEye from "../../assets/images/feather-eye.svg";
import openPencil from "../../assets/images/open-pencil.svg";
import share from "../../assets/images/feather-share.svg";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import createImg from "../../assets/images/new_project_create_image.png";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import projectDiagram from "../../assets/newIcons/awesome-project-diagram.svg";
import mergeType from "../../assets/newIcons/material-merge-type.svg";
import featherUser from "../../assets/newIcons/feather-user.svg";
import featherCodeSandBox from "../../assets/newIcons/feather-codesandbox.svg";
import metroVersion from "../../assets/newIcons/metro-versions.svg";
import uploadIcon from "../../assets/newIcons/ionic-ios-images.svg";
const Dashboard = () => {
  const [load, setLoad] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [customTabPinnedProject, setCustomTabPinnedProject] = useState(true);
  const [customTabRecentProject, setCustomTabRecentProject] = useState(false);
  const [columnState, setColumnState] = useState();
  const [show, setShow] = useState(false);
  const [showCancelProject, setShowCancelProject] = useState(false);

  //Search
  const [project_name, setSearchByProjectName] = useState("");
  const [project_date, setProjectDate] = useState("");
  const [filteredPinData, setFilteredPinData] = useState("");
  const [filteredUnPinData, setFilteredUnPinData] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [projectName, setProjectName] = useState("");
  const [type, setType] = useState("");
  const [client, setClient] = useState("");
  const [product, setProduct] = useState("");
  const [version, setVersion] = useState();
  const [companyLogo, setCompanyLogo] = useState("");
  const [projects, setProjects] = useState([]);
  const authData = JSON.parse(localStorage.getItem("auth"));
  const userID = authData?.user_id;
  const user_id = authData?.user_id;

  //Searching--
  const customTabHandlerPinnedProjects = () => {
    setCustomTabPinnedProject(true);
    setCustomTabRecentProject(false);
  };
  const customTabHandlerRecentProjects = () => {
    setCustomTabPinnedProject(false);
    setCustomTabRecentProject(true);
  };
  const columnHandler = (e) => {
    setColumnState(e.target.value);
  };
  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(
        // `https://nla-backend-1.herokuapp.com/api/projects/${userID}`
        `http://localhost:5000/api/projects/${userID}`
      );
      setProjects(data);
    }

    fetchProduct();
  }, [load]);

  const createProject = async () => {
    setLoad(false);
    try {
      const formData = new FormData();
      formData.append("user_id", userID);
      formData.append("project_name", projectName);
      formData.append("slug", "project");
      formData.append("type_of_project", type);
      formData.append("client_name", client);
      formData.append("product_name", product);
      formData.append("project_version", version);
      formData.append("company_logo", companyLogo);
      formData.append("pin_project", 0);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const { data } = await axios
        .post(
          // "https://nla-backend-1.herokuapp.com/api/add/project",
          "http://localhost:5000/api/add/project",
          formData,
          config
        )
        .then(function (response) {
          setShow(false);
          setLoad(true);
        })
        .catch(function (response) {
          console.log(response);
        });

      if (data.status === 200) {
        setShow(false);
      }
    } catch (error) {}
  };

  const searchDataHandler = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (project_name && project_date) {
      const res = await axios.post(
        "https://nla-backend-1.herokuapp.com/api/project/search",
        // "http://localhost:5000/api/project/date",
        {
          project_name,
          project_date,
          user_id,
        },
        config
      );
      setFilteredData(res.data);
      if (res.status === 200) {
        setFilterVisible(true);
      }
    } else if (project_name) {
      const res = await axios.post(
        "https://nla-backend-1.herokuapp.com/api/project/name",
        // "http://localhost:5000/api/project/name",
        {
          project_name,
          user_id,
        },
        config
      );
      setFilteredData(res.data);
      if (res.status === 200) {
        setFilterVisible(true);
      }
    } else if (project_date) {
      const res = await axios.post(
        "https://nla-backend-1.herokuapp.com/api/project/date",
        // "http://localhost:5000/api/project/date",
        {
          project_date,
          user_id,
        },
        config
      );
      setFilteredData(res.data);
      if (res.status === 200) {
        setFilterVisible(true);
      }
    } else {
      console.log("Invalid");
    }
  };
  // const searchData = (text) => {
  //   // console.log("\n\nI typed: ", project_name);
  //   const formattedQuery = text.toLowerCase();

  //   const newData = projects.filter((item) => {
  //     return item.project_name.toLowerCase().search(formattedQuery) > -1;
  //   });
  //   setSearchedProjects(newData);
  // };
  const PinUnPinHandler = async (project_id) => {
    setLoad(false);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "https://nla-backend-1.herokuapp.com/api/pin/project",
        // "http://localhost:5000/api/add/project/unpinned",
        {
          project_id,
        },
        config
      );
      if (res.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.log("Error", error.response);
      setLoad(false);
    }
  };
  // ---------------------------------------------------

  const handleClose = () => {
    setShow(false);
    setShowCancelProject(true);
  };
  const handleCloseCancel = () => {
    setShow(true);
    setShowCancelProject(false);
  };
  const handleCloseCancelClose = () => {
    setShow(false);
    setShowCancelProject(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const scroll = () => {
    const getFilteredDiv = document.getElementById("searchedResults");
    if (filteredData) {
      getFilteredDiv.scrollIntoView({ behavior: "smooth" });
    }
  };
  const unsetSearchData = () => {
    setFilterVisible(false);
  };
  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(
        `https://nla-backend-1.herokuapp.com/api/projects/${userID}`
        // `http://localhost:5000/api/projects/${userID}`
      );
      setProjects(data);
      const filteredPin = data?.filter((val) => {
        return val.pin_project === 1;
      });
      const filteredUnPin = data?.filter((val) => {
        return val.pin_project === 0;
      });
      setFilteredPinData(filteredPin);
      setFilteredUnPinData(filteredUnPin);
    }
    fetchProduct();
  }, [load]);
  useEffect(() => {
    scroll();
  }, [filteredData]);
  return (
    <div>
      <Header />
      {/* <!-- Sidebar Start --> */}
      <Sidebar />
      {/* <!-- Body Content Start --> */}
      <div className="main-content-wrapper">
        <div className="dashboard_banner">
          <div className="banner_content">
            <h1>Welcome John,</h1>
            <h2>To the Gazelle Home Screen</h2>
            <p>Make faster, more confident decisions.</p>
          </div>
          <div className="nla_tabbing">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className={
                    customTabPinnedProject === true
                      ? `nav-link active`
                      : `nav-link`
                  }
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                  onClick={customTabHandlerPinnedProjects}
                >
                  <i className="fa-solid fa-layer-group"></i>
                </button>
                <button
                  className={
                    customTabRecentProject === true
                      ? `nav-link active`
                      : `nav-link`
                  }
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                  onClick={customTabHandlerRecentProjects}
                >
                  <i className="fa-solid fa-list-ul"></i>
                </button>
              </div>
            </nav>
          </div>
        </div>

        <div className="filter_box_wrapper">
          <div className="row">
            <div className="col-lg-3">
              <div className="nla_search">
                <img src={awUser} alt="user" className="img-fluid" />
                <input
                  type="search"
                  className="form-control mb-0 ms-3"
                  placeholder="Search Model by Author"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="nla_search">
                {/* <!-- <i className="fa-regular fa-rectangle-list"></i> --> */}
                <img src={list} alt="list" className="img-fluid" />
                <input
                  type="search"
                  className="form-control mb-0 ms-3"
                  placeholder="Search by Project Name"
                  onChange={(e) => setSearchByProjectName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="nla_search">
                <img src={calenderSvg} alt="list" className="img-fluid" />
                <input
                  type="date"
                  className="form-control mb-0 ms-3"
                  onChange={(e) => setProjectDate(e.target.value)}
                  // placeholder="Search by Project Name"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="text-center">
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-primary mb-0"
                  onClick={() => searchDataHandler(project_name)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Grid and list view block --> */}
        <div className="nla_grid_and_list_view_data_wrapper">
          <div className="tab-content" id="nav-tabContent">
            {/* <!-- Grid view content start --> */}

            <div
              className={
                customTabPinnedProject === true
                  ? `tab-pane fade show active`
                  : "tab-pane fade "
              }
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              {filterVisible === false ? (
                <>
                  <div className="nla_view_top_title_and_add_new_block">
                    <div className="row align-items-center">
                      <div
                        className="col-lg-5"
                        style={
                          filteredPinData.length === 0
                            ? { visibility: "hidden" }
                            : null
                        }
                      >
                        <p className="mb-0">
                          Pinned Projects
                          <a href="#">
                            <img
                              src={feather}
                              style={{ marginLeft: 5 }}
                              alt=""
                            />
                          </a>
                        </p>
                      </div>
                      <div className="col-lg-7 text-end">
                        <div className="nla_add_new_project_btn">
                          <div
                            onClick={handleShow}
                            style={{ cursor: "pointer" }}
                          >
                            <p>
                              <span>
                                <img
                                  src={plusCircle}
                                  alt="Create New Project"
                                />
                              </span>
                              Create New Project
                            </p>
                          </div>
                          <a href="#">
                            <img src={feather} alt="" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`nla_grid_view_wrapper ${columnState}`}>
                    {filteredPinData.length > 0
                      ? filteredPinData?.map((elem, id) => (
                          <div
                            className="nla_item_box_col first-nla-itembox"
                            data-position="right"
                            key={id}
                          >
                            <div className="nla_item_box">
                              <div className="nla_pin-icon unpin">
                                <i
                                  className="fa-solid fa-thumbtack"
                                  onClick={() =>
                                    PinUnPinHandler(elem.project_id)
                                  }
                                ></i>
                              </div>
                              <h3>{elem.project_name}</h3>
                              <div className="nla_shared_link_block">
                                <a
                                  href="#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Share"
                                  data-bs-target="#shareProject"
                                >
                                  <i className="fa-solid fa-share-nodes"></i>
                                </a>
                                <a
                                  href="#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Duplicate"
                                >
                                  <i className="fa-regular fa-copy"></i>
                                </a>
                                <a
                                  href="#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Download"
                                >
                                  <i className="fa-solid fa-download"></i>
                                </a>
                                <a
                                  href="#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Edit"
                                >
                                  <i className="fa-solid fa-pen"></i>
                                </a>
                              </div>
                              <div className="nla_additional_links">
                                <a href="#">
                                  Design Studio{" "}
                                  <i className="fa-solid fa-pencil"></i>
                                </a>
                                <a href="#">
                                  Insights <i className="fa-solid fa-eye"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  <div className="nla_view_top_title_and_add_new_block">
                    <div className="row align-items-center">
                      <div className="col-lg-5">
                        <p className="mb-0">
                          Recently Created
                          <a href="#">
                            <img
                              src={feather}
                              style={{ marginLeft: 5 }}
                              alt=""
                            />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`nla_grid_view_wrapper ${columnState}`}>
                    {filteredUnPinData !== ""
                      ? filteredUnPinData?.map((elem, id) => (
                          <div
                            className="nla_item_box_col first-nla-itembox"
                            data-position="right"
                            key={id}
                          >
                            <div className="nla_item_box">
                              <div className="nla_pin-icon">
                                <i
                                  className="fa-solid fa-thumbtack"
                                  onClick={() =>
                                    PinUnPinHandler(elem.project_id)
                                  }
                                  style={{ color: "rgba(0, 0, 0, 0.23)" }}
                                ></i>
                              </div>
                              <h3>{elem.project_name}</h3>
                              <div className="nla_shared_link_block">
                                <a
                                  href="#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Share"
                                  data-bs-target="#shareProject"
                                >
                                  <i className="fa-solid fa-share-nodes"></i>
                                </a>
                                <a
                                  href="#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Duplicate"
                                >
                                  <i className="fa-regular fa-copy"></i>
                                </a>
                                <a
                                  href="#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Download"
                                >
                                  <i className="fa-solid fa-download"></i>
                                </a>
                                <a
                                  href="#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Edit"
                                >
                                  <i className="fa-solid fa-pen"></i>
                                </a>
                              </div>
                              <div className="nla_additional_links">
                                <a href="#">
                                  Design Studio{" "}
                                  <i className="fa-solid fa-pencil"></i>
                                </a>
                                <a href="#">
                                  Insights <i className="fa-solid fa-eye"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </>
              ) : (
                <>
                  {filteredData !== "" ? (
                    <>
                      <div
                        className="nla_view_top_title_and_add_new_block"
                        id="searchedResults"
                      >
                        <div className="row align-items-center">
                          <div className="col-lg-5">
                            <p className="mb-0">
                              Searched Results
                              <a href="#">
                                <img src={feather} alt="" />
                              </a>
                            </p>
                          </div>
                          <div className="col-lg-7 text-end">
                            <div className={`clearbtn`}>
                              <button onClick={unsetSearchData}>
                                Clear Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`nla_grid_view_wrapper ${columnState}`}>
                        {filteredData.length > 0
                          ? filteredData?.map((elem, id) => (
                              <div
                                className="nla_item_box_col first-nla-itembox"
                                data-position="right"
                                key={id}
                              >
                                <div className="nla_item_box">
                                  <div className="nla_pin-icon">
                                    <i
                                      className="fa-solid fa-thumbtack"
                                      style={
                                        elem.pin_project === 0
                                          ? { color: "rgba(0, 0, 0, 0.23)" }
                                          : { color: "#0c0d25" }
                                      }
                                    ></i>
                                  </div>
                                  <h3>{elem.project_name}</h3>
                                  <div className="nla_shared_link_block">
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="Share"
                                      data-bs-target="#shareProject"
                                    >
                                      <i className="fa-solid fa-share-nodes"></i>
                                    </a>
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="Duplicate"
                                    >
                                      <i className="fa-regular fa-copy"></i>
                                    </a>
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="Download"
                                    >
                                      <i className="fa-solid fa-download"></i>
                                    </a>
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="Edit"
                                    >
                                      <i className="fa-solid fa-pen"></i>
                                    </a>
                                  </div>
                                  <div className="nla_additional_links">
                                    <a href="#">
                                      Design Studio{" "}
                                      <i className="fa-solid fa-pencil"></i>
                                    </a>
                                    <a href="#">
                                      Insights{" "}
                                      <i className="fa-solid fa-eye"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))
                          : null}
                      </div>
                    </>
                  ) : null}
                </>
              )}
            </div>
            {/* <!-- Grid view content end -->

                <!-- List view content start --> */}
            <div
              className={
                customTabRecentProject === true
                  ? `tab-pane fade show active`
                  : `tab-pane fade`
              }
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <div className="nla_view_top_title_and_add_new_block">
                <div className="row align-items-center">
                  <div className="col-lg-5">
                    <p className="mb-0">Recently Created & Pinned Models</p>
                  </div>
                  <div className="col-lg-7 text-end">
                    <div className="nla_add_new_project_btn">
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#createNewProject"
                      >
                        <p>
                          <span>
                            <img src={plusCircle} alt="Create New Project" />
                          </span>
                          Create New Project
                        </p>
                      </a>
                      <a href="#">
                        <img src={feather} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="nla_list_view_wrapper">
                <div className="nla_list_view_header">
                  <div className="nla_modal">Models</div>
                  <div className="nla_action">Actions</div>
                </div>
                <div className="nla_list_view_body_content">
                  <ul>
                    {projects.map((elem, id) => (
                      <li
                        // className="active"
                        key={id}
                      >
                        <div className="nla_modal">
                          <i
                            className="fa-solid fa-thumbtack"
                            style={
                              elem.pin_project === 0
                                ? { color: "rgba(0, 0, 0, 0.23)" }
                                : { color: "#0c0d25" }
                            }
                          ></i>
                          {elem.project_name}
                        </div>
                        <div className="nla_action">
                          <div>
                            Insights{" "}
                            <a href="#">
                              <img src={featherEye} alt="eye" />
                            </a>
                          </div>
                          <div>
                            Design Studio{" "}
                            <a href="#">
                              {" "}
                              <img src={openPencil} alt="Pencil" />{" "}
                            </a>
                          </div>
                          <div>
                            Share{" "}
                            <a href="#">
                              {" "}
                              <img src={share} alt="Share" />{" "}
                            </a>
                          </div>
                          <div>
                            Copy{" "}
                            <a href="#">
                              <i className="fa-solid fa-copy"></i>
                            </a>
                          </div>
                          <div>
                            Download{" "}
                            <a href="#">
                              <i className="fa-solid fa-download"></i>
                            </a>
                          </div>
                        </div>
                      </li>
                    ))}

                    {/* <li>
                      <div className="nla_modal">
                        <i className="fa-solid fa-thumbtack"></i> Covid Demand
                        Forecasting
                      </div>
                      <div className="nla_action">
                        <div>
                          Insights{" "}
                          <a href="#">
                            <img src={featherEye} alt="eye" />
                          </a>
                        </div>
                        <div>
                          Design Studio{" "}
                          <a href="#">
                            {" "}
                            <img src={openPencil} alt="Pencil" />{" "}
                          </a>
                        </div>
                        <div>
                          Share{" "}
                          <a href="#">
                            {" "}
                            <img src={share} alt="Share" />{" "}
                          </a>
                        </div>
                        <div>
                          Copy{" "}
                          <a href="#">
                            <i className="fa-solid fa-copy"></i>
                          </a>
                        </div>
                        <div>
                          Download{" "}
                          <a href="#">
                            <i className="fa-solid fa-download"></i>
                          </a>
                        </div>
                      </div>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
            {/* <!-- List view content end --> */}
          </div>
        </div>

        {/* <!-- Pagination Start --> */}
        <div className="nla-pagination-and-all-results-wrapper">
          <nav data-pagination>
            <a href="#" disabled>
              <i className="ion-chevron-left"></i>
            </a>
            <ul>
              <li className="current">
                <a href="">1</a>
              </li>
              <li>
                <a href="">2</a>
              </li>
              <li>
                <a href="">3</a>
              </li>
              <li>
                <a href="">4</a>
              </li>
              <li>
                <a href="">5</a>
              </li>
              <li>
                <a href="">6</a>
              </li>
              <li>
                <a href="">…</a>
              </li>
              <li>
                <a href="">15</a>
              </li>
            </ul>
            <a href="#2" className="arrow">
              <i className="ion-chevron-right"></i>
            </a>
          </nav>

          <div className="nla_result_show_block">
            <div>
              <label htmlFor="">Show</label>
              <select
                className="form-select"
                aria-label="Default select example"
                defaultValue={"value"}
              >
                <option value="0">10 Project</option>
                <option value="1">15 Project</option>
                <option value="2">20 Project</option>
                <option value="3">25 Project</option>
              </select>
            </div>
            <div>
              <label htmlFor="">Show</label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="selectColumns"
                onChange={columnHandler}
              >
                <option value="nla-col-2">2 Column</option>
                <option value="nla-col-3">3 Column</option>
                <option value="nla-col-4">4 Column</option>
                <option value="nla-col-5" selected>
                  5 Column
                </option>
                <option value="nla-col-6">6 Column</option>
              </select>
            </div>
          </div>
          {/* <!-- Create new project Modal Start --> */}
          <Modal
            show={show}
            id="createNewProject"
            onHide={handleClose}
            animation={true}
            centered
          >
            <Modal.Header>
              <Modal.Title>Create New Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="nla_modal_banenr">
                <img src={createImg} alt="placeholder" className="img-fluid" />
              </div>
              <form method="post" enctype="multipart/form-data">
                <div className="">
                  <div className="nla_form_project_name position-relative nla_form_field_block">
                    {/* <i className="fa fa-share-alt" aria-hidden="true"></i> */}
                    <img src={projectDiagram} alt="" />
                    <input
                      type="text"
                      className="form-control"
                      id="projectName"
                      placeholder="Enter Project Name*"
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>
                  <div className="nla_form_select_type position-relative nla_form_field_block">
                    <img src={mergeType} alt="" />
                    <input
                      className="form-control"
                      list="selectType"
                      id="exampleDataList"
                      placeholder="Select Type"
                      onChange={(e) => setType(e.target.value)}
                    />
                    <datalist id="selectType">
                      <option value="Pricing" />
                      <option value="Optimization" />
                      <option value="Forecasting" />
                      <option value="Other" />
                    </datalist>
                  </div>
                  <div className="nla_form_select_client position-relative nla_form_field_block">
                    <img src={featherUser} alt="" />
                    <select
                      className="form-select"
                      aria-label="Select Client"
                      onChange={(e) => setClient(e.target.value)}
                    >
                      <option selected>Select Client</option>
                      <option value="one">One</option>
                      <option value="two">Two</option>
                      <option value="three">Three</option>
                    </select>
                  </div>
                  <div className="nla_form_select_product position-relative nla_form_field_block">
                    <img src={featherCodeSandBox} alt="" />
                    <select
                      className="form-select"
                      aria-label="Select Product"
                      onChange={(e) => setProduct(e.target.value)}
                    >
                      <option selected>Select Product</option>
                      <option value="one">One</option>
                      <option value="two">Two</option>
                      <option value="three">Three</option>
                    </select>
                  </div>
                  <div className="nla_form_version position-relative nla_form_field_block">
                    <img src={metroVersion} alt="" />
                    <input
                      type="number"
                      className="form-control"
                      id="version"
                      placeholder="Version 1"
                      onChange={(e) => setVersion(e.target.value)}
                    />
                  </div>
                  <div className="nla_form_file_upload position-relative nla_form_field_block">
                    <img src={uploadIcon} alt="" />
                    <label htmlFor="formFile">Upload Company Logo</label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      // ref={imageRef}
                      onChange={(e) => setCompanyLogo(e.target.files[0])}
                    />
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-toggle="modal"
                data-bs-target="#cancelProject"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={createProject}
              >
                Create
              </button>
            </Modal.Footer>
          </Modal>
          {/* <!-- Create new project Modal End --> */}
          {/* <!-- Cancel Project Modal Start --> */}
          <Modal
            show={showCancelProject}
            onHide={handleClose}
            id="cancelProject"
            centered
          >
            <Modal.Header>
              <Modal.Title>Cancel Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="nla_modal_banenr">
                <img src={createImg} alt="placeholder" class="img-fluid" />
              </div>
              <div class="nla_modal_body_title text-center">
                <h5>Are you Sure?</h5>
                <p>
                  Hitting yes will delete all the relevant data and output for
                  the project.
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#createNewProject"
                onClick={handleCloseCancel}
              >
                No
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleCloseCancelClose}
              >
                Yes
              </button>
            </Modal.Footer>
          </Modal>
          {/* <!-- Cancel Project Modal End --> */}
        </div>
        {/* <!-- Pagination End --> */}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
