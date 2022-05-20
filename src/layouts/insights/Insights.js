import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/style.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Accordion from "react-bootstrap/Accordion";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
const Insights = () => {
  const [valuesDropDown, setValueDropDown] = useState(false);
  const Sonnet = () => {
    return (
      <div class="insights-couns-block">
        <div>
          <p>
            <i class="fa-solid fa-chart-simple"></i> Insights
          </p>
          <a href="#" data-bs-toggle="tooltip" title="lorem ipsum">
            <i class="fa-solid fa-circle-info"></i>
          </a>
        </div>
        <p>
          Total <span>3</span> Insights
        </p>
      </div>
    );
  };
  const ValuesDropDownHandler = () => {
    valuesDropDown === false ? setValueDropDown(true) : setValueDropDown(false);
  };
  return (
    <div>
      <Header />
      <Sidebar />
      <div>
        <div class="design-studio-topbar">
          <div class="cotainer-fluid">
            <div class="row">
              <div class="col-lg-4">
                <div class="new-project-name">
                  <Link to="/design-studio">
                    <div class="nla-arrow-left-icon">
                      <span></span>
                    </div>
                  </Link>
                  <div class="nla-name">
                    <span>Back to Home Page</span>
                    <p>Project Name Here</p>
                  </div>
                  <a href="#" class="nla-edit-name">
                    <i class="fa-solid fa-pen"></i>
                  </a>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="btn-wrapper">
                  <div class="other-design-studio-buttons">
                    <div>
                      <a href="#" class="btn btn-secondary">
                        Share <i class="fa-solid fa-share-nodes"></i>
                      </a>
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Dolor eligendi natus praesentium voluptatum, nisi veritatis ut minus, distinctio saepe veniam suscipit corporis molestiae voluptatibus cupiditate vel. Laboriosam, repellat officia. Labore?"
                      >
                        <i class="fa-solid fa-circle-info"></i>
                      </a>
                    </div>
                    <div>
                      <a href="#" class="btn btn-secondary">
                        Download <i class="fa-solid fa-file-arrow-down"></i>
                      </a>
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Dolor eligendi natus praesentium voluptatum, nisi veritatis ut minus, distinctio saepe veniam suscipit corporis molestiae voluptatibus cupiditate vel. Laboriosam, repellat officia. Labore?"
                      >
                        <i class="fa-solid fa-circle-info"></i>
                      </a>
                    </div>
                    <div>
                      <a href="#" class="btn btn-primary">
                        Save <i class="fa-solid fa-floppy-disk"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="nla_insight-tab-wrapper">
            <Tabs
              defaultActiveKey="all"
              id="uncontrolled-tab-example"
              className="mb-4"
            >
              <Tab eventKey="all" title="All">
                <Sonnet />
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <strong>M.A</strong> <span class="nla_number">1</span>
                      <p>
                        What is the current pricing landscape across the
                        categories analyzed? Do you have the right pricing
                        structure across channels?
                      </p>
                      <span class="nla_results">Results</span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <>
                        <div className="row">
                          <div className="col-lg-12">
                            <div class="nla_accordion-content-title-with-filter-block position-relative">
                              <div class="nla_heading">
                                <h4>Price Architecture Across Retailers</h4>
                                <a href="#">
                                  <i class="fa-solid fa-pen"></i>
                                </a>
                                <a href="#">
                                  <i class="fa-solid fa-trash"></i>
                                </a>
                              </div>
                              <div class="nla_filter_block position-relative">
                                <div
                                  class="nla_filter"
                                  onClick={ValuesDropDownHandler}
                                  style={{ cursor: "pointer" }}
                                >
                                  <i class="fa-solid fa-filter"></i>
                                </div>

                                {/* <!-- Filter custom dropdown code start --> */}
                                {valuesDropDown === true ? (
                                  <>
                                    <div
                                      class="nla_graph-filter-dropdown-menu-wrapper shadow mb-5 bg-body rounded"
                                      style={{ display: "block" }}
                                    >
                                      <div class="heading">
                                        <h5>Values</h5>
                                      </div>
                                      <div>
                                        <Accordion defaultActiveKey="0">
                                          <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                              Series
                                            </Accordion.Header>
                                            <Accordion.Body>
                                              <div class="nla_custom-checkbox">
                                                <div class="form-check">
                                                  <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="selectAll"
                                                  />
                                                  <label
                                                    class="form-check-label"
                                                    htmlFor="selectAll"
                                                  >
                                                    Select All
                                                  </label>
                                                </div>
                                                <div class="form-check">
                                                  <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="AW4OzOriginal"
                                                    checked
                                                  />
                                                  <label
                                                    class="form-check-label"
                                                    htmlFor="AW4OzOriginal"
                                                  >
                                                    AW 4 Oz (Original)
                                                  </label>
                                                </div>
                                                <div class="form-check">
                                                  <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="AW4OzNightTime"
                                                  />
                                                  <label
                                                    class="form-check-label"
                                                    htmlFor="AW4OzNightTime"
                                                  >
                                                    AW 4 Oz (Night Time)
                                                  </label>
                                                </div>
                                                <div class="form-check">
                                                  <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="AW4OzOriginalGreen"
                                                  />
                                                  <label
                                                    class="form-check-label"
                                                    htmlFor="AW4OzOriginalGreen"
                                                  >
                                                    AW 4 Oz (Original)
                                                  </label>
                                                </div>
                                                <div class="form-check">
                                                  <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="AW4OzNightTimeOrange"
                                                  />
                                                  <label
                                                    class="form-check-label"
                                                    htmlFor="AW4OzNightTimeOrange"
                                                  >
                                                    AW 4 Oz (Night Time)
                                                  </label>
                                                </div>
                                              </div>
                                            </Accordion.Body>
                                          </Accordion.Item>
                                          <Accordion.Item eventKey="1">
                                            <Accordion.Header>
                                              Categories
                                            </Accordion.Header>
                                            <Accordion.Body>
                                              <div class="nla_custom-checkbox">
                                                <div class="form-check">
                                                  <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="calSelectAll"
                                                  />
                                                  <label
                                                    class="form-check-label"
                                                    htmlFor="calSelectAll"
                                                  >
                                                    Select All
                                                  </label>
                                                </div>
                                                <div class="form-check">
                                                  <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="catCVS"
                                                  />
                                                  <label
                                                    class="form-check-label"
                                                    htmlFor="catCVS"
                                                  >
                                                    CVS
                                                  </label>
                                                </div>
                                                <div class="form-check">
                                                  <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="catWalgreens"
                                                  />
                                                  <label
                                                    class="form-check-label"
                                                    htmlFor="catWalgreens"
                                                  >
                                                    Walgreens
                                                  </label>
                                                </div>
                                                <div class="form-check">
                                                  <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="catRiteAid"
                                                  />
                                                  <label
                                                    class="form-check-label"
                                                    htmlFor="catRiteAid"
                                                  >
                                                    RiteAid
                                                  </label>
                                                </div>
                                                <div class="form-check">
                                                  <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="catMeijer"
                                                  />
                                                  <label
                                                    class="form-check-label"
                                                    htmlFor="catMeijer"
                                                  >
                                                    Meijer
                                                  </label>
                                                </div>
                                                <div class="form-check">
                                                  <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="catWalmart"
                                                  />
                                                  <label
                                                    class="form-check-label"
                                                    htmlFor="catWalmart"
                                                  >
                                                    Walmart
                                                  </label>
                                                </div>
                                                <div class="form-check">
                                                  <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="catTarget"
                                                  />
                                                  <label
                                                    class="form-check-label"
                                                    htmlFor="catTarget"
                                                  >
                                                    Target
                                                  </label>
                                                </div>
                                                <div class="form-check">
                                                  <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="catDollarGeneral"
                                                  />
                                                  <label
                                                    class="form-check-label"
                                                    htmlFor="catDollarGeneral"
                                                  >
                                                    Dollar General
                                                  </label>
                                                </div>
                                                <div class="form-check">
                                                  <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="catAmazon"
                                                  />
                                                  <label
                                                    class="form-check-label"
                                                    htmlFor="catAmazon"
                                                  >
                                                    Amazon
                                                  </label>
                                                </div>
                                              </div>
                                            </Accordion.Body>
                                          </Accordion.Item>
                                        </Accordion>
                                        <div class="nla_btn-wrapper text-center">
                                          <button class="btn btn-primary">
                                            Apply
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : null}

                                {/* <!-- Filter custom dropdown code end --> */}
                                <a href="" class="btn btn-outline-secondary">
                                  + Add New Slide
                                </a>
                                <div class="dropdown">
                                  <button
                                    class="btn btn-primary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    + Add Item
                                  </button>
                                  <ul
                                    class="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                  >
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        href=""
                                        data-bs-toggle="modal"
                                        data-bs-target="#addHeadingModal"
                                      >
                                        Add Heading
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        href=""
                                        data-bs-toggle="modal"
                                        data-bs-target="#addTakeaway"
                                      >
                                        Add Takeaway
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        href=""
                                        data-bs-toggle="modal"
                                        data-bs-target="#addChart"
                                      >
                                        Add Chart
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-3">
                            <div class="nla_take-away-block">
                              <div class="nla_heading">
                                Take Aways
                                <div>
                                  <a href="">
                                    <i class="fa-solid fa-pen"></i>
                                  </a>
                                  <a href="" id="editTakeAwayCOntent">
                                    <i class="fa-solid fa-trash"></i>
                                  </a>
                                </div>
                              </div>
                              <div class="nla_content">
                                <ul contenteditable="false">
                                  <li>
                                    Significant difference in pricing in 4 oz —
                                    potential opportunity to take pricing at
                                    WM/Amazon?
                                  </li>
                                  <li>
                                    Main source of growth is Amazon and Dollar—
                                    need for a Channel Based Strategy?
                                  </li>
                                  <li>Potential Opportunity at Grocery?</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-9">
                            <div class="nla_graph-heading">
                              <div class="nla_heading">
                                <h5>Price Architecture Across Retailers</h5>
                                <div>
                                  <a href="">
                                    <i class="fa-solid fa-pen"></i>
                                  </a>
                                  <a href="">
                                    <i class="fa-solid fa-trash"></i>
                                  </a>
                                </div>
                              </div>
                              <div class="nla_heading-buttons">
                                <a
                                  href=""
                                  data-bs-toggle="tooltip"
                                  title="Copy"
                                >
                                  <i class="fa-solid fa-copy"></i>
                                </a>
                                <a
                                  href=""
                                  data-bs-toggle="tooltip"
                                  title="Edit"
                                >
                                  <i class="fa-solid fa-pen"></i>
                                </a>
                                <a
                                  href=""
                                  data-bs-toggle="tooltip"
                                  title="Delete"
                                  class="delete-icon"
                                >
                                  <i class="fa-solid fa-trash"></i>
                                </a>
                              </div>
                            </div>

                            <div class="nla_graph-block">
                              <div class="myChartDiv">
                                <canvas
                                  id="priceArchitectureAcrossRetailersChart"
                                  width="600"
                                  height="400"
                                ></canvas>
                              </div>
                            </div>

                            <div class="nla_add-comment nla_expan position-relative">
                              <textarea
                                name="type_note"
                                id=""
                                class="form-control"
                                placeholder="Type Notes..."
                              ></textarea>
                              <div class="nla_add-comment-toggle-btn">
                                <i class="fa-solid fa-floppy-disk"></i>
                                <i class="fa-solid fa-plus"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Tab>
              <Tab eventKey="mark" title="Market Assessment">
                <Sonnet />
              </Tab>
              <Tab eventKey="pricing" title="Pricing Diagnostics">
                <Sonnet />
              </Tab>
              <Tab eventKey="modeling" title="Modeling Insights">
                <Sonnet />
              </Tab>
              <Tab eventKey="business" title="Business Implications">
                <Sonnet />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Insights;
