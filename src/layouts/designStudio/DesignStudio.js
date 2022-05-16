import React from "react";
import "../../css/style.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import info from "../../assets/images/feather-info.svg";
import output from "../../assets/images/icon-output.svg";
import saveAs from "../../assets/images/icon-save-as.svg";
import plus from "../../assets/images/feather-file-plus.svg";
const DesignStudio = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      {/* <!-- Sidebar Right Start --> */}
      <div className="right_sidebar" data-position="right">
        <span className="nla-toggle-line"></span>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
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
          <li className="nav-item" role="presentation">
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
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="row">
              <div className="col-lg-12">
                <div className="input-group search-operators position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Operators"
                    aria-describedby="searchOperators"
                  />
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Topics
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="data-access_btn">
                          <div>
                            <button className="btn btn-secondary">
                              <i className="fa-solid fa-book-open"></i>
                              Price Elasticity
                            </button>
                            <a href="#">
                              <img
                                src={info}
                                alt="info"
                                className="img-fluid"
                              />
                            </a>
                          </div>
                          <div>
                            <button className="btn btn-secondary">
                              <i className="fa-solid fa-pen-nib"></i>
                              Demand Forcasting
                            </button>
                            <a href="#">
                              <img
                                src={info}
                                alt="info"
                                className="img-fluid"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Data Access
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="data-access_btn">
                          <div>
                            <button className="btn btn-secondary">
                              <i className="fa-solid fa-book-open"></i>
                              Read File
                            </button>
                            <a href="#">
                              <img
                                src={info}
                                alt="info"
                                className="img-fluid"
                              />
                            </a>
                          </div>
                          <div>
                            <button className="btn btn-secondary">
                              <i className="fa-solid fa-pen-nib"></i>
                              Write File
                            </button>
                            <a href="#">
                              <img
                                src={info}
                                alt="info"
                                className="img-fluid"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Modelling
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="data-access_btn">
                          <div>
                            <button className="btn btn-secondary">
                              <i className="fa-solid fa-book-open"></i>
                              Linear Regression
                            </button>
                            <a href="#">
                              <img
                                src={info}
                                alt="info"
                                className="img-fluid"
                              />
                            </a>
                          </div>
                          <div>
                            <button className="btn btn-secondary">
                              <i className="fa-solid fa-pen-nib"></i>
                              Arima
                            </button>
                            <a href="#">
                              <img
                                src={info}
                                alt="info"
                                className="img-fluid"
                              />
                            </a>
                          </div>
                          <div>
                            <button className="btn btn-secondary">
                              <i className="fa-solid fa-pen-nib"></i>
                              Price Elasticity{" "}
                            </button>
                            <a href="#">
                              <img
                                src={info}
                                alt="info"
                                className="img-fluid"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        Cleansing
                      </button>
                    </h2>
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="data-access_btn">
                          <div>
                            <button className="btn btn-secondary">
                              <i className="fa-solid fa-book-open"></i>
                              Normalize
                            </button>{" "}
                            <a href="#">
                              <img
                                src={info}
                                alt="info"
                                className="img-fluid"
                              />
                            </a>
                          </div>
                          <div>
                            <button className="btn btn-secondary">
                              <i className="fa-solid fa-pen-nib"></i>
                              Denormalize
                            </button>
                            <a href="#">
                              <img
                                src={info}
                                alt="info"
                                className="img-fluid"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div className="parameters-content">
              <h5>Default</h5>
              <div className="nla-select-box-with-lbl">
                <label htmlFor="Logverbosity">Logverbosity</label>
                <select className="form-select" aria-label="Logverbosity">
                  <option selected>Warning</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              <div className="nla-select-box-with-lbl">
                <label htmlFor="sendMail">Send Mail</label>
                <select className="form-select" aria-label="sendMail">
                  <option selected>Always</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              <label htmlFor="send Mail">Log File</label>
              <div className="nla-select-box-with-lbl">
                <input type="file" className="form-control" id="sendMail" />
                <label htmlFor="sendMail">
                  <i className="fa-solid fa-paperclip"></i>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Sidebar Right End --> */}
      {/* <!-- Body Content Start --> */}
      <div className="main-content-wrapper">
        <div className="design-studio-topbar">
          <div className="cotainer-fluid">
            <div className="row">
              <div className="col-lg-3">
                <div className="new-project-name">
                  <a href="#">
                    <div className="nla-arrow-left-icon">
                      <span></span>
                    </div>
                  </a>
                  <div className="nla-name">
                    <span>Back to Home Page</span>
                    <p>Project Name Here</p>
                  </div>
                  <a href="#" className="nla-edit-name">
                    <i className="fa-solid fa-pen"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="btn-wrapper">
                  <div className="nla-run-btn-and-info">
                    <a
                      href="#"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#progressStatusModal"
                    >
                      Run <i className="fa-solid fa-play"></i>
                    </a>
                    <a
                      href="#"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Dolor eligendi natus praesentium voluptatum, nisi veritatis ut minus, distinctio saepe veniam suscipit corporis molestiae voluptatibus cupiditate vel. Laboriosam, repellat officia. Labore?"
                    >
                      <img src={info} alt="info" className="img-fluid" />
                    </a>
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
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Dolor eligendi natus praesentium voluptatum, nisi veritatis ut minus, distinctio saepe veniam suscipit corporis molestiae voluptatibus cupiditate vel. Laboriosam, repellat officia. Labore?"
                      >
                        <img src={info} alt="info" className="img-fluid" />
                      </a>
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
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Dolor eligendi natus praesentium voluptatum, nisi veritatis ut minus, distinctio saepe veniam suscipit corporis molestiae voluptatibus cupiditate vel. Laboriosam, repellat officia. Labore?"
                      >
                        <img src={info} alt="info" className="img-fluid" />
                      </a>
                    </div>
                    <div>
                      <a href="#" className="btn btn-secondary">
                        Save As
                        <img src={saveAs} alt="" />
                      </a>
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Dolor eligendi natus praesentium voluptatum, nisi veritatis ut minus, distinctio saepe veniam suscipit corporis molestiae voluptatibus cupiditate vel. Laboriosam, repellat officia. Labore?"
                      >
                        <img src={info} alt="info" className="img-fluid" />
                      </a>
                    </div>
                    <div>
                      <a href="#" className="btn btn-primary">
                        Save <i className="fa-solid fa-floppy-disk"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="design-studio-additional-block position-relative">
          <div className="heading">
            <h6>Design Studio</h6>
            <a href="#">
              <img src={info} alt="info" className="img-fluid" />
            </a>
          </div>

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
