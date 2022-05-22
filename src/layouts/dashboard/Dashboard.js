import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../css/style.css";
import { Link } from "react-router-dom";
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
const Dashboard = () => {
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
                  className="nav-link active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  <i className="fa-solid fa-layer-group"></i>
                </button>
                <button
                  className="nav-link"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
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
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="nla_search">
                <img src={calenderSvg} alt="list" className="img-fluid" />
                <input
                  type="date"
                  className="form-control mb-0 ms-3"
                  placeholder="Search by Project Name"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="text-center">
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-primary mb-0"
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
              className="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <div className="nla_view_top_title_and_add_new_block">
                <div className="row align-items-center">
                  <div className="col-lg-5">
                    <p className="mb-0">
                      Pinned Projects
                      <a href="#">
                        <img src={feather} alt="" />
                      </a>
                    </p>
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
              <div className="nla_grid_view_wrapper">
                <div
                  className="nla_item_box_col first-nla-itembox"
                  data-position="right"
                >
                  <div className="nla_item_box">
                    <div className="nla_pin-icon">
                      <i className="fa-solid fa-thumbtack"></i>
                    </div>
                    <h3>Covid Demand Forecasting</h3>
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
                        Design Studio <i className="fa-solid fa-pencil"></i>
                      </a>
                      <a href="#">
                        Insights <i className="fa-solid fa-eye"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="nla_item_box_col">
                  <div className="nla_item_box">
                    <div className="nla_pin-icon">
                      <i className="fa-solid fa-thumbtack"></i>
                    </div>
                    <h3>Covid Demand Forecasting</h3>
                    <div className="nla_shared_link_block">
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Share"
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
                        Design Studio <i className="fa-solid fa-pencil"></i>
                      </a>
                      <a href="#">
                        Insights <i className="fa-solid fa-eye"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="nla_item_box_col">
                  <div className="nla_item_box">
                    <div className="nla_pin-icon">
                      <i className="fa-solid fa-thumbtack"></i>
                    </div>
                    <h3>Covid Demand Forecasting</h3>
                    <div className="nla_shared_link_block">
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Share"
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
                        Design Studio <i className="fa-solid fa-pencil"></i>
                      </a>
                      <a href="#">
                        Insights <i className="fa-solid fa-eye"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="nla_item_box_col">
                  <div className="nla_item_box">
                    <div className="nla_pin-icon">
                      <i className="fa-solid fa-thumbtack"></i>
                    </div>
                    <h3>Covid Demand Forecasting</h3>
                    <div className="nla_shared_link_block">
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Share"
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
                        Design Studio <i className="fa-solid fa-pencil"></i>
                      </a>
                      <a href="#">
                        Insights <i className="fa-solid fa-eye"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="nla_item_box_col">
                  <div className="nla_item_box">
                    <div className="nla_pin-icon">
                      <i className="fa-solid fa-thumbtack"></i>
                    </div>
                    <h3>Covid Demand Forecasting</h3>
                    <div className="nla_shared_link_block">
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Share"
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
                        Design Studio <i className="fa-solid fa-pencil"></i>
                      </a>
                      <a href="#">
                        Insights <i className="fa-solid fa-eye"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="nla_item_box_col">
                  <div className="nla_item_box">
                    <div className="nla_pin-icon">
                      <i className="fa-solid fa-thumbtack"></i>
                    </div>
                    <h3>Covid Demand Forecasting</h3>
                    <div className="nla_shared_link_block">
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Share"
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
                        Design Studio <i className="fa-solid fa-pencil"></i>
                      </a>
                      <a href="#">
                        Insights <i className="fa-solid fa-eye"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Grid view content end -->

                <!-- List view content start --> */}
            <div
              className="tab-pane fade"
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
                    <li className="active">
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
                    </li>
                    <li className="active">
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
                    </li>
                    <li>
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
                    </li>
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
              >
                <option selected>10 Project</option>
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
        </div>
        {/* <!-- Pagination End --> */}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
