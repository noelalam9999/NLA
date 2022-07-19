import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import "../../css/style.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Accordion from "react-bootstrap/Accordion";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Tooltip, OverlayTrigger, Badge, Modal } from "react-bootstrap";
import feather from "../../assets/images/feather-info.svg";
import featherFilePlus from "../../assets/images/feather-file-plus.svg";
import downloadIcon from "../../assets/newIcons/icon-download.svg";
import chartIcon from "../../assets/newIcons/icon-chart.svg";
import featherInfo from "../../assets/images/feather-info.svg";
import Chartjs from "../../components/Chartjs";
import { useClickAway } from "react-use";
import ChartjsBar from "../../components/ChartjsBar";
import { Link, useParams } from "react-router-dom";
import Api from "../../services/Api";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import GoogleChart from "../../components/GoogleChart";
const Insights = () => {
  const project_id = useParams().id;

  const [project, setProject] = useState([]);
  const [notes, setNotes] = useState([]);

  // console.log("ID: ", id);
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("center");

  const [saveNote, setNoteSaved] = useState(false);
  const [noteAlert, setNoteAlert] = useState("Note Added");

  const notesFromLocal = JSON.parse(localStorage.getItem("notesFromDB"));

  //Notes state
  const [note1, setNote1] = useState(notesFromLocal?.note1);
  const [note2, setNote2] = useState(notesFromLocal?.note2);
  const [note3, setNote3] = useState(notesFromLocal?.note3);

  //Take Away
  const [editTakeAway, setEditTakeAway] = useState(false);
  const [editIcon, setEditIcon] = useState(false);

  const [takeAwayFromDB, setTakeAwayFromDB] = useState([]);

  //Edit Slide Name
  const [editSlideIcon, setEditSlideIcon] = useState(false);
  const [editSlideName, setEditSlideName] = useState(false);

  //Edit Project Name

  const [editProjectIcon, setEditProjectIcon] = useState(false);
  const [editProjectName, setEditProjectName] = useState(false);

  //Slide titles
  const [slide1Title, setSlide1Title] = useState(
    "Price Architecture Across Retailers M.I"
  );
  const [slide2Title, setSlide2Title] = useState(
    "Price Architecture Across Retailers"
  );
  const [slide3Title, setSlide3Title] = useState(
    "Area of Opportunity by Retailer"
  );

  // Load
  const [load, setLoad] = useState(false);
  const [addInsights, setAddInsights] = useState(true);

  // Slide Type
  const [slideType, setSlideType] = useState("M.A");

  // console.log("Note 1: ", note1);

  const [valuesDropDown, setValueDropDown] = useState(false);
  const [valuesDropDown1, setValueDropDown1] = useState(false);
  const [valuesDropDown2, setValueDropDown2] = useState(false);
  const [typeNotesExp, setTypeNotesExp] = useState(false);
  const [addItemDropDown, setAddItemDropDown] = useState(false);
  const typeNoteExpHandler = () => {
    typeNotesExp === false ? setTypeNotesExp(true) : setTypeNotesExp(false);
    // setNewNote1(notes?.note1);
    // console.log("newNote1: ", newNote1);
    // console.log("Note 2: ", note2);
    // console.log("Note 3: ", note3);
  };

  //Note save Handler
  const noteSaveHandler = async () => {
    // console.log("Note 1: ", note1);
    if (note1 === "" && note2 === "" && note3 === "") {
      alert("Please enter a note");
    } else {
      // console.log("Note 1 in else: ", note1);

      if (note1 === "" && note2 !== "" && note3 !== "") {
        const projectNotes = {
          note1: notes.note1,
          note2: note2,
          note3: note3,
        };
        addNoteAPIcall(projectNotes);
      } else if (note1 !== "" && note2 === "" && note3 !== "") {
        const projectNotes = {
          note1: note1,
          note2: notes.note2,
          note3: note3,
        };
        addNoteAPIcall(projectNotes);
      } else if (note1 !== "" && note2 !== "" && note3 === "") {
        const projectNotes = {
          note1: note1,
          note2: note2,
          note3: notes.note3,
        };
        addNoteAPIcall(projectNotes);
      } else if (note1 === "" && note2 === "" && note3 !== "") {
        const projectNotes = {
          note1: notes.note1,
          note2: notes.note2,
          note3: note3,
        };
        addNoteAPIcall(projectNotes);
      } else if (note1 === "" && note2 !== "" && note3 === "") {
        const projectNotes = {
          note1: notes.note1,
          note2: note2,
          note3: notes.note3,
        };
        addNoteAPIcall(projectNotes);
      } else if (note1 !== "" && note2 === "" && note3 === "") {
        const projectNotes = {
          note1: note1,
          note2: notes.note2,
          note3: notes.note3,
        };
        // console.log("In note 1");
        addNoteAPIcall(projectNotes);
      } else {
        const projectNotes = {
          note1: note1,
          note2: note2,
          note3: note3,
        };
        addNoteAPIcall(projectNotes);
      }
    }
    typeNoteExpHandler();
  };

  const addNoteAPIcall = async (project_notes) => {
    setLoad(false);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const apiData = {
      project_id,
      project_notes,
    };

    const { data } = await Api(
      "POST",
      `api/insights/add/notes`,
      apiData,
      config
    );

    if (data) {
      setNoteAlert(data?.message);
      // console.log("Data from ADD Notes API: ", data);
      setNoteSaved(true);
      setTimeout(() => {
        setNoteSaved(false);
      }, 2000);
      setLoad(true);
    }
  };

  // console.log("note1: ", note1);

  // Take Away Stuff ---------------------------------------------------------
  useEffect(() => {
    // console.log("takeAwayText: ");
    if (takeAwayFromDB) {
      setTakeAwayText(takeAwayFromDB?.take_away_description);
    }

    if (project) {
      setProjectName(project?.project_name);
    }
  }, [project]);

  //Edit Project Name handler
  const projectNameHandler = () => {
    editProjectIcon === false
      ? setEditProjectIcon(true)
      : setEditProjectIcon(false);
    editProjectName === false
      ? setEditProjectName(true)
      : setEditProjectName(false);
  };

  //Slide name Edit hanler
  const slideNameEditHanlder = async () => {
    editSlideIcon === false ? setEditSlideIcon(true) : setEditSlideIcon(false);
    editSlideName === false ? setEditSlideName(true) : setEditSlideName(false);
  };

  const editHandler = async () => {
    editIcon === false ? setEditIcon(true) : setEditIcon(false);
    editTakeAway === false ? setEditTakeAway(true) : setEditTakeAway(false);
    if (editTakeAway === true) {
      // const projectNotes = {
      //   note1: note1,
      //   note2: note2,
      //   note3: note3,
      // };
      // addNoteAPIcall(projectNotes);
      setLoad(false);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const apiData = {
        project_id,
        slide_type: slideType,
        take_away_title: "Take away",
        take_away_description: takeAwayText,
      };

      const { data } = await Api(
        "POST",
        `api/insights/add/take-away`,
        apiData,
        config
      );

      if (data) {
        setLoad(true);
        setNoteAlert(data?.message);
        // console.log("Data from ADD Take Aways API: ", data);
        setNoteSaved(true);

        setTimeout(() => {
          setNoteSaved(false);
        }, 2000);
      }
    }
  };

  // Accordion Handler ----------------------------------------------------

  const accordionSlideHanlder = (value) => {
    // console.log("I am clicked", value);
    setSlideType(value);
  };

  // ----------------------------------------------------------------------
  const addItemDropDownHandler = () => {
    addItemDropDown === false
      ? setAddItemDropDown(true)
      : setAddItemDropDown(false);
  };
  const ref = useRef(null);
  useClickAway(ref, () => {
    setAddItemDropDown(false);
  });
  const Sonnet = () => {
    return (
      <div className="insights-couns-block">
        <div>
          <p>
            {/* <i className="fa-solid fa-chart-simple"></i>  */}
            <img src={chartIcon} alt="" style={{ marginRight: "3.3px" }} />
            Insights
          </p>
          {/* <a href="#" data-bs-toggle="tooltip" title="lorem ipsum">
            <i className="fa-solid fa-circle-info"></i>
          </a> */}
          <OverlayTrigger
            placement="top"
            delay={{ show: 50, hide: 250 }}
            overlay={<Tooltip id="overlay-example">Lorem Ipsum</Tooltip>}
          >
            <a href="#">
              <img src={feather} alt="" />
            </a>
          </OverlayTrigger>
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
  const ValuesDropDownHandler1 = () => {
    valuesDropDown1 === false
      ? setValueDropDown1(true)
      : setValueDropDown1(false);
  };
  const ValuesDropDownHandler2 = () => {
    valuesDropDown2 === false
      ? setValueDropDown2(true)
      : setValueDropDown2(false);
  };

  // UseEffect for Fetching notes:
  useEffect(() => {
    // console.log("I am in notes useEffect");
    async function fetchNotes() {
      const { data } = await Api("GET", `api/insights/get/notes/${project_id}`);
      const notesData = JSON.parse(data[0].notes);
      setNotes(notesData);
      localStorage.setItem("notesFromDB", JSON.stringify(notesData));
    }
    fetchNotes();
    setLoad(false);
  }, [load]);

  //Main UseEffect

  useEffect(() => {
    // console.log("\n\nI am in Main useEffect");

    async function fetchProject() {
      const { data } = await Api("GET", `api/project/${project_id}`);
      setProject(data[0]);
      // console.log("Project data: ", data);
    }
    fetchProject();

    if (addInsights === true) {
      // console.log("I am true");
      async function addNoteAPIcall() {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const projectNotes = {
          note1: notes?.note1 || note1,
          note2: notes?.note2 || note2,
          note3: notes?.note3 || note3,
        };

        const apiData = {
          project_id,
          project_notes: projectNotes,
        };

        const { data } = await Api(
          "POST",
          `api/insights/add/notes`,
          apiData,
          config
        );

        if (data) {
          // console.log("Data from ADD Notes API: ", data);
        }
      }

      addNoteAPIcall();
      setAddInsights(false);
    }
  }, []);

  // UseEffect for Fetching Take Aways:

  useEffect(() => {
    async function fetchTakeAways() {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const apiData = {
        project_id,
        slide_type: slideType,
      };

      const { data } = await Api(
        "POST",
        `api/insights/get/take-aways`,
        apiData,
        config
      );

      // const { data } = await Api(
      //   "GET",
      //   `api/insights/get/take-aways/${project_id}`
      // );
      // console.log("Data: ", data);
      setTakeAwayFromDB(data[0]);
    }
    fetchTakeAways();
  }, [load, slideType]);

  const [takeAwayText, setTakeAwayText] = useState(
    takeAwayFromDB?.take_away_description
  );

  const [projectName, setProjectName] = useState(project?.project_name);

  // console.log("takeAwayText: ", takeAwayText);

  // console.log("Take aways from db: ", takeAwayFromDB);
  // =====================================================================================================================
  return (
    <div>
      <Header />
      <Sidebar />
      <div>
        <div className="design-studio-topbar">
          <div className="cotainer-fluid">
            <div className="row">
              <div className="col-lg-4">
                <div className="new-project-name">
                  <Link to="/design-studio">
                    <div className="nla-arrow-left-icon">
                      <span></span>
                    </div>
                  </Link>
                  <div className="nla-name">
                    {/* <span>Back to Home Page</span> */}
                    {/* <p>{project?.project_name || "Project name here"}</p> */}

                    <span>Back to Home Page</span>

                    <div className="project_name">
                      {editProjectName == false ? (
                        <>
                          <p>{projectName || "Project name here"}</p>
                        </>
                      ) : (
                        <>
                          <div
                            className="nla-select-box-with-lbl mt-1"
                            // style={{ width: "250px" }}
                          >
                            <input
                              type="text"
                              value={projectName}
                              className="form-control"
                              placeholder="Enter project name"
                              aria-describedby="searchOperators"
                              onChange={(e) => {
                                setProjectName(e.target.value);
                              }}
                            ></input>
                          </div>
                        </>
                      )}

                      {editProjectIcon == false ? (
                        <>
                          <a
                            onClick={projectNameHandler}
                            className="nla-edit-name"
                            style={{ cursor: "pointer" }}
                          >
                            {/* <i className="fa-solid fa-pen"></i> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="44"
                              height="37"
                              viewBox="0 0 44 37"
                            >
                              <g
                                id="Group_123037"
                                data-name="Group 123037"
                                transform="translate(-322 -75)"
                              >
                                <path
                                  id="Icon_material-edit"
                                  data-name="Icon material-edit"
                                  d="M4.5,16.114v3.057H7.557l9.016-9.016L13.516,7.1ZM18.936,7.792a.812.812,0,0,0,0-1.149L17.029,4.735a.812.812,0,0,0-1.149,0L14.388,6.226l3.057,3.057,1.492-1.492Z"
                                  transform="translate(332.163 81.504)"
                                  fill="#164f73"
                                ></path>
                              </g>
                            </svg>
                          </a>
                        </>
                      ) : (
                        <>
                          <a
                            className="nla-edit-name mt-2"
                            onClick={projectNameHandler}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fa-solid fa-check"></i>
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="btn-wrapper">
                  <div className="other-design-studio-buttons">
                    <div>
                      <a href="#" className="btn btn-secondary">
                        Share
                        {/* <i className="fa-solid fa-share-nodes"></i> */}
                        <img src={featherFilePlus} alt="" />
                      </a>
                      <a href="#">
                        {/* <i className="fa-solid fa-circle-info"></i> */}
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 50, hide: 250 }}
                          overlay={
                            <Tooltip id="overlay-example">
                              Dolor eligendi natus praesentium voluptatum, nisi
                              veritatis ut minus, distinctio saepe veniam
                              suscipit corporis molestiae voluptatibus
                              cupiditate vel. Laboriosam, repellat officia.
                              Labore?
                            </Tooltip>
                          }
                        >
                          <img
                            src={featherInfo}
                            alt=""
                            style={{ marginLeft: "4px" }}
                          />
                        </OverlayTrigger>
                      </a>
                    </div>
                    <div>
                      <a href="#" className="btn btn-secondary">
                        Download
                        {/* <i className="fa-solid fa-file-arrow-down"></i> */}
                        <img src={downloadIcon} alt="" />
                      </a>
                      <a href="#">
                        {/* <i className="fa-solid fa-circle-info"></i> */}
                        <OverlayTrigger
                          placement="left"
                          delay={{ show: 50, hide: 250 }}
                          overlay={
                            <Tooltip id="overlay-example">
                              Dolor eligendi natus praesentium voluptatum, nisi
                              veritatis ut minus, distinctio saepe veniam
                              suscipit corporis molestiae voluptatibus
                              cupiditate vel. Laboriosam, repellat officia.
                              Labore?
                            </Tooltip>
                          }
                        >
                          <img
                            src={featherInfo}
                            alt=""
                            style={{ marginLeft: "4px" }}
                          />
                        </OverlayTrigger>
                      </a>
                    </div>
                    <div>
                      <a href="#" className="btn btn-primary ms-3">
                        Save
                        {/* <i className="fa-solid fa-floppy-disk"></i> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11.769"
                          height="11.769"
                          viewBox="0 0 11.769 11.769"
                          style={{ marginLeft: "0.5rem" }}
                        >
                          <g
                            id="Icon_feather-save"
                            data-name="Icon feather-save"
                            transform="translate(-4 -4)"
                          >
                            <path
                              id="Path_20096"
                              data-name="Path 20096"
                              d="M14.072,15.269H5.7a1.2,1.2,0,0,1-1.2-1.2V5.7A1.2,1.2,0,0,1,5.7,4.5h6.581l2.991,2.991v6.581A1.2,1.2,0,0,1,14.072,15.269Z"
                              transform="translate(0 0)"
                              fill="none"
                              stroke="#ffffff"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                            ></path>
                            <path
                              id="Path_20097"
                              data-name="Path 20097"
                              d="M16.483,24.286V19.5H10.5v4.786"
                              transform="translate(-3.607 -9.017)"
                              fill="none"
                              stroke="#ffffff"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                            ></path>
                            <path
                              id="Path_20098"
                              data-name="Path 20098"
                              d="M10.5,4.5V7.491h4.786"
                              transform="translate(-3.607 0)"
                              fill="none"
                              stroke="#ffffff"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                            ></path>
                          </g>
                        </svg>
                      </a>
                      <a href="#">
                        {/* <i className="fa-solid fa-circle-info"></i> */}
                        <OverlayTrigger
                          placement="left"
                          delay={{ show: 50, hide: 250 }}
                          overlay={
                            <Tooltip id="overlay-example">
                              Dolor eligendi natus praesentium voluptatum, nisi
                              veritatis ut minus, distinctio saepe veniam
                              suscipit corporis molestiae voluptatibus
                              cupiditate vel. Laboriosam, repellat officia.
                              Labore?
                            </Tooltip>
                          }
                        >
                          <img
                            src={featherInfo}
                            alt=""
                            style={{ marginLeft: "4px" }}
                          />
                        </OverlayTrigger>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="nla_insight-tab-wrapper">
            <Tabs
              defaultActiveKey="all"
              id="uncontrolled-tab-example"
              className="mb-4"
            >
              <Tab eventKey="all" title="All">
                <Sonnet />
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header
                      onClick={() => accordionSlideHanlder("M.A")}
                    >
                      <strong>M.A</strong> <span className="nla_number">1</span>
                      <p>
                        What is the current pricing landscape across the
                        categories analyzed? Do you have the right pricing
                        structure across channels?
                      </p>
                      <span className="nla_results">Results</span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="nla_accordion-content-title-with-filter-block position-relative">
                              <div className="nla_heading">
                                {/* <h4>Price Architecture Across Retailers</h4> */}
                                {/* <h4>
                                  {takeAwayFromDB?.take_away_title ||
                                    "Price Architecture Across Retailers"}
                                </h4> */}

                                {editSlideName == false ? (
                                  <>
                                    <h4>{slide1Title}</h4>
                                  </>
                                ) : (
                                  <>
                                    <div
                                      className="nla-select-box-with-lbl mt-1"
                                      style={{ width: "300px" }}
                                    >
                                      <input
                                        type="text"
                                        value={slide1Title}
                                        className="form-control"
                                        placeholder="Enter slide name"
                                        aria-describedby="searchOperators"
                                        onChange={(e) => {
                                          setSlide1Title(e.target.value);
                                        }}
                                      ></input>
                                    </div>
                                  </>
                                )}

                                {editSlideIcon == false ? (
                                  <>
                                    <a
                                      onClick={slideNameEditHanlder}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13.058"
                                        height="12.924"
                                        viewBox="0 0 13.058 12.924"
                                      >
                                        <g
                                          id="Group_127802"
                                          data-name="Group 127802"
                                          transform="translate(-662.829 -728.333)"
                                        >
                                          <path
                                            id="Icon_feather-edit-2"
                                            data-name="Icon feather-edit-2"
                                            d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                            transform="translate(660.329 725.575)"
                                            fill="none"
                                            stroke="#164f73"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                          />
                                        </g>
                                      </svg>
                                    </a>
                                  </>
                                ) : (
                                  <>
                                    <a
                                      onClick={slideNameEditHanlder}
                                      style={{
                                        cursor: "pointer",
                                        marginLeft: 25,
                                      }}
                                      className=""
                                    >
                                      <i className="fa-solid fa-check"></i>
                                    </a>
                                  </>
                                )}

                                <a href="#">
                                  {/* <i className="fa-solid fa-trash"></i> */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10.688"
                                    height="13.513"
                                    viewBox="0 0 10.688 13.513"
                                  >
                                    <g
                                      id="Group_127803"
                                      data-name="Group 127803"
                                      transform="translate(-655.004 -728.038)"
                                    >
                                      <path
                                        id="Icon_material-delete-forever"
                                        data-name="Icon material-delete-forever"
                                        d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                        transform="translate(647.904 723.938)"
                                        fill="none"
                                        stroke="#164f73"
                                        strokeWidth="0.8"
                                      ></path>
                                    </g>
                                  </svg>
                                </a>
                              </div>
                              <div className="nla_filter_block position-relative">
                                <div
                                  className="nla_filter"
                                  onClick={ValuesDropDownHandler}
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="fa-solid fa-filter"></i>
                                </div>

                                {/* <!-- Filter custom dropdown code start --> */}
                                {valuesDropDown === true ? (
                                  <>
                                    <div
                                      className="nla_graph-filter-dropdown-menu-wrapper shadow mb-5 bg-body rounded"
                                      style={{ display: "block" }}
                                    >
                                      <div className="heading">
                                        <h5>Values</h5>
                                      </div>
                                      <div>
                                        <Accordion defaultActiveKey="0">
                                          <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                              Series
                                            </Accordion.Header>
                                            <Accordion.Body>
                                              <div className="nla_custom-checkbox">
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="selectAll"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="selectAll"
                                                  >
                                                    Select All
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="AW4OzOriginal"
                                                    checked
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="AW4OzOriginal"
                                                  >
                                                    AW 4 Oz (Original)
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="AW4OzNightTime"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="AW4OzNightTime"
                                                  >
                                                    AW 4 Oz (Night Time)
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="AW4OzOriginalGreen"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="AW4OzOriginalGreen"
                                                  >
                                                    AW 4 Oz (Original)
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="AW4OzNightTimeOrange"
                                                  />
                                                  <label
                                                    className="form-check-label"
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
                                              <div className="nla_custom-checkbox">
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="calSelectAll"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="calSelectAll"
                                                  >
                                                    Select All
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catCVS"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catCVS"
                                                  >
                                                    CVS
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catWalgreens"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catWalgreens"
                                                  >
                                                    Walgreens
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catRiteAid"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catRiteAid"
                                                  >
                                                    RiteAid
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catMeijer"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catMeijer"
                                                  >
                                                    Meijer
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catWalmart"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catWalmart"
                                                  >
                                                    Walmart
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catTarget"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catTarget"
                                                  >
                                                    Target
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catDollarGeneral"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catDollarGeneral"
                                                  >
                                                    Dollar General
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catAmazon"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catAmazon"
                                                  >
                                                    Amazon
                                                  </label>
                                                </div>
                                              </div>
                                            </Accordion.Body>
                                          </Accordion.Item>
                                        </Accordion>
                                        <div className="nla_btn-wrapper text-center">
                                          <button className="btn btn-primary">
                                            Apply
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : null}

                                {/* <!-- Filter custom dropdown code end --> */}
                                <a
                                  href=""
                                  className="btn btn-outline-secondary"
                                >
                                  + Add New Slide
                                </a>
                                <div className="dropdown">
                                  <button
                                    className="btn btn-primary dropdown-toggle"
                                    id="dropdownMenuButton1"
                                    onClick={addItemDropDownHandler}
                                  >
                                    + Add Item
                                  </button>
                                  <ul
                                    ref={ref}
                                    className={
                                      addItemDropDown === true
                                        ? "dropdown-menu show"
                                        : "dropdown-menu"
                                    }
                                    aria-labelledby="dropdownMenuButton1"
                                  >
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href=""
                                        data-bs-toggle="modal"
                                        data-bs-target="#addHeadingModal"
                                      >
                                        Add Heading
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href=""
                                        data-bs-toggle="modal"
                                        data-bs-target="#addTakeaway"
                                      >
                                        Add Takeaway
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
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
                        <div className="row">
                          <div className="col-lg-3">
                            <div className="nla_take-away-block">
                              <div className="nla_heading">
                                Take Aways
                                <div>
                                  {editIcon == false ? (
                                    <>
                                      <a
                                        onClick={editHandler}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="13.058"
                                          height="12.924"
                                          viewBox="0 0 13.058 12.924"
                                        >
                                          <g
                                            id="Group_127802"
                                            data-name="Group 127802"
                                            transform="translate(-662.829 -728.333)"
                                          >
                                            <path
                                              id="Icon_feather-edit-2"
                                              data-name="Icon feather-edit-2"
                                              d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                              transform="translate(660.329 725.575)"
                                              fill="none"
                                              stroke="#ffffff"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="1"
                                            ></path>
                                          </g>
                                        </svg>
                                      </a>
                                    </>
                                  ) : (
                                    <>
                                      <a
                                        style={{ cursor: "pointer" }}
                                        className="nla-edit-name mt-4"
                                        onClick={editHandler}
                                      >
                                        <i className="fa-solid fa-check"></i>
                                      </a>
                                    </>
                                  )}

                                  <a href="" id="editTakeAwayCOntent">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="10.688"
                                      height="13.513"
                                      viewBox="0 0 10.688 13.513"
                                    >
                                      <g
                                        id="Group_127803"
                                        data-name="Group 127803"
                                        transform="translate(-655.004 -728.038)"
                                      >
                                        <path
                                          id="Icon_material-delete-forever"
                                          data-name="Icon material-delete-forever"
                                          d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                          transform="translate(647.904 723.938)"
                                          fill="none"
                                          stroke="#ffffff"
                                          strokeWidth="0.8"
                                        ></path>
                                      </g>
                                    </svg>
                                  </a>
                                </div>
                              </div>
                              <div className="nla_content">
                                {editTakeAway == false ? (
                                  <>
                                    <ul contentEditable={false}>
                                      <li>
                                        {takeAwayFromDB?.take_away_description ||
                                          "Add new Take Away"}
                                      </li>
                                      {/* <li>
                                        Main source of growth is Amazon and
                                        Dollar— need for a Channel Based
                                        Strategy?
                                      </li>
                                      <li>Potential Opportunity at Grocery?</li> */}
                                    </ul>
                                  </>
                                ) : (
                                  <>
                                    <div
                                      className="nla-select-box-with-lbl mt-1"
                                      // style={{ width: "250px" }}
                                    >
                                      <textarea
                                        name="type_note"
                                        id=""
                                        value={
                                          takeAwayText ||
                                          takeAwayFromDB?.take_away_description
                                        }
                                        className="form-control"
                                        placeholder="Type Notes..."
                                        onChange={(e) => {
                                          setTakeAwayText(e.target.value);
                                        }}
                                      ></textarea>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-9">
                            <div className="nla_graph-heading">
                              <div className="nla_heading">
                                <h5>Price Architecture Across Retailers</h5>
                                <div>
                                  <a href="">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="13.058"
                                      height="12.924"
                                      viewBox="0 0 13.058 12.924"
                                    >
                                      <g
                                        id="Group_127802"
                                        data-name="Group 127802"
                                        transform="translate(-662.829 -728.333)"
                                      >
                                        <path
                                          id="Icon_feather-edit-2"
                                          data-name="Icon feather-edit-2"
                                          d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                          transform="translate(660.329 725.575)"
                                          fill="none"
                                          stroke="#164f73"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="1"
                                        ></path>
                                      </g>
                                    </svg>
                                  </a>
                                  <a href="">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="10.688"
                                      height="13.513"
                                      viewBox="0 0 10.688 13.513"
                                    >
                                      <g
                                        id="Group_127803"
                                        data-name="Group 127803"
                                        transform="translate(-655.004 -728.038)"
                                      >
                                        <path
                                          id="Icon_material-delete-forever"
                                          data-name="Icon material-delete-forever"
                                          d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                          transform="translate(647.904 723.938)"
                                          fill="none"
                                          stroke="#164f73"
                                          strokeWidth="0.8"
                                        ></path>
                                      </g>
                                    </svg>
                                  </a>
                                </div>
                              </div>
                              <div className="nla_heading-buttons">
                                <a
                                  href=""
                                  data-bs-toggle="tooltip"
                                  title="Copy"
                                >
                                  {/* <i className="fa-solid fa-copy"></i> */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    viewBox="0 0 36 36"
                                  >
                                    <g
                                      id="Group_122928"
                                      data-name="Group 122928"
                                      transform="translate(-647.292 -717)"
                                    >
                                      <g
                                        id="Group_122924"
                                        data-name="Group 122924"
                                        transform="translate(658.828 728.438)"
                                      >
                                        <g
                                          id="Icon_feather-copy"
                                          data-name="Icon feather-copy"
                                        >
                                          <path
                                            id="Path_20160"
                                            data-name="Path 20160"
                                            d="M14.771,13.5h5.721a1.271,1.271,0,0,1,1.271,1.271v5.721a1.271,1.271,0,0,1-1.271,1.271H14.771A1.271,1.271,0,0,1,13.5,20.492V14.771A1.271,1.271,0,0,1,14.771,13.5Z"
                                            transform="translate(-9.05 -9.05)"
                                            fill="none"
                                            stroke="#164f73"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                          ></path>
                                          <path
                                            id="Path_20161"
                                            data-name="Path 20161"
                                            d="M4.907,11.263H4.271A1.271,1.271,0,0,1,3,9.992V4.271A1.271,1.271,0,0,1,4.271,3H9.992a1.271,1.271,0,0,1,1.271,1.271v.636"
                                            transform="translate(-3 -3)"
                                            fill="none"
                                            stroke="#164f73"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                          ></path>
                                        </g>
                                      </g>
                                    </g>
                                  </svg>
                                </a>
                                <a
                                  href=""
                                  data-bs-toggle="tooltip"
                                  title="Edit"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="13.058"
                                    height="12.924"
                                    viewBox="0 0 13.058 12.924"
                                  >
                                    <g
                                      id="Group_127802"
                                      data-name="Group 127802"
                                      transform="translate(-662.829 -728.333)"
                                    >
                                      <path
                                        id="Icon_feather-edit-2"
                                        data-name="Icon feather-edit-2"
                                        d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                        transform="translate(660.329 725.575)"
                                        fill="none"
                                        stroke="#164f73"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1"
                                      ></path>
                                    </g>
                                  </svg>
                                </a>
                                <a
                                  href=""
                                  data-bs-toggle="tooltip"
                                  title="Delete"
                                  className="delete-icon"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10.688"
                                    height="13.513"
                                    viewBox="0 0 10.688 13.513"
                                  >
                                    <g
                                      id="Group_127803"
                                      data-name="Group 127803"
                                      transform="translate(-655.004 -728.038)"
                                    >
                                      <path
                                        id="Icon_material-delete-forever"
                                        data-name="Icon material-delete-forever"
                                        d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                        transform="translate(647.904 723.938)"
                                        fill="none"
                                        stroke="#DC3912"
                                        strokeWidth="0.8"
                                      ></path>
                                    </g>
                                  </svg>
                                </a>
                              </div>
                            </div>
                            <div className="nla_graph-block">
                              <div className="myChartDiv">
                                <Chartjs />
                              </div>
                            </div>

                            <div
                              className={
                                typeNotesExp === true
                                  ? "nla_add-comment position-relative"
                                  : "nla_add-comment nla_expan position-relative"
                              }
                            >
                              <textarea
                                name="type_note"
                                id=""
                                value={note1}
                                className="form-control"
                                placeholder="Type Notes..."
                                onChange={(e) => {
                                  setNote1(e.target.value);
                                }}
                              ></textarea>
                              <div className="nla_add-comment-toggle-btn">
                                <i
                                  className="fa-solid fa-floppy-disk"
                                  onClick={noteSaveHandler}
                                ></i>
                                <i
                                  className="fa-solid fa-plus"
                                  onClick={typeNoteExpHandler}
                                ></i>
                              </div>
                            </div>
                            <div>
                              <h6>Previous Note:</h6>
                              <p className="mt-2">
                                {notes?.note1}
                                {/* {setNote1FromDB(notes?.note1)} */}
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div class="nla_brand_logo">
                              {/* <h3>Brand Logo</h3> */}
                              <img
                                src={project.company_logo}
                                height={100}
                              ></img>
                            </div>
                          </div>
                        </div>
                      </>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header
                      onClick={() => accordionSlideHanlder("M.I")}
                    >
                      <strong>M.I</strong> <span className="nla_number">2</span>
                      <p>
                        How sensitive is Client Brand's portfolio to price
                        changes?
                      </p>
                      <span className="nla_results">Results</span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="nla_accordion-content-title-with-filter-block">
                            <div className="nla_heading">
                              {/* <h4>Price Architecture Across Retailers</h4> */}

                              {/* <h4>
                                {takeAwayFromDB?.take_away_title ||
                                  "Price Architecture Across Retailers"}
                              </h4> */}

                              {editSlideName == false ? (
                                <>
                                  <h4>{slide2Title}</h4>
                                </>
                              ) : (
                                <>
                                  <div
                                    className="nla-select-box-with-lbl mt-1"
                                    style={{ width: "300px" }}
                                  >
                                    <input
                                      type="text"
                                      value={slide2Title}
                                      className="form-control"
                                      placeholder="Enter slide name"
                                      aria-describedby="searchOperators"
                                      onChange={(e) => {
                                        setSlide2Title(e.target.value);
                                      }}
                                    ></input>
                                  </div>
                                </>
                              )}

                              {editSlideIcon == false ? (
                                <>
                                  <a
                                    onClick={slideNameEditHanlder}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="13.058"
                                      height="12.924"
                                      viewBox="0 0 13.058 12.924"
                                    >
                                      <g
                                        id="Group_127802"
                                        data-name="Group 127802"
                                        transform="translate(-662.829 -728.333)"
                                      >
                                        <path
                                          id="Icon_feather-edit-2"
                                          data-name="Icon feather-edit-2"
                                          d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                          transform="translate(660.329 725.575)"
                                          fill="none"
                                          stroke="#164f73"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="1"
                                        />
                                      </g>
                                    </svg>
                                  </a>
                                </>
                              ) : (
                                <>
                                  <a
                                    onClick={slideNameEditHanlder}
                                    style={{
                                      cursor: "pointer",
                                      marginLeft: 25,
                                    }}
                                    className=""
                                  >
                                    <i className="fa-solid fa-check"></i>
                                  </a>
                                </>
                              )}

                              <a href="">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10.688"
                                  height="13.513"
                                  viewBox="0 0 10.688 13.513"
                                >
                                  <g
                                    id="Group_127803"
                                    data-name="Group 127803"
                                    transform="translate(-655.004 -728.038)"
                                  >
                                    <path
                                      id="Icon_material-delete-forever"
                                      data-name="Icon material-delete-forever"
                                      d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                      transform="translate(647.904 723.938)"
                                      fill="none"
                                      stroke="#164f73"
                                      strokeWidth="0.8"
                                    />
                                  </g>
                                </svg>
                              </a>
                            </div>
                            <div className="nla_filter_block position-relative">
                              <div
                                className="nla_filter"
                                onClick={ValuesDropDownHandler1}
                                style={{ cursor: "pointer" }}
                              >
                                <i className="fa-solid fa-filter"></i>
                              </div>
                              {/* <!-- Filter custom dropdown code start --> */}
                              {valuesDropDown1 === true ? (
                                <>
                                  <div
                                    className="nla_graph-filter-dropdown-menu-wrapper shadow mb-5 bg-body rounded"
                                    style={{ display: "block" }}
                                  >
                                    <div className="heading">
                                      <h5>Values</h5>
                                    </div>
                                    <div>
                                      <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                          <Accordion.Header>
                                            Series
                                          </Accordion.Header>
                                          <Accordion.Body>
                                            <div className="nla_custom-checkbox">
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="selectAll"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="selectAll"
                                                >
                                                  Select All
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzOriginal"
                                                  checked
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="AW4OzOriginal"
                                                >
                                                  AW 4 Oz (Original)
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzNightTime"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="AW4OzNightTime"
                                                >
                                                  AW 4 Oz (Night Time)
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzOriginalGreen"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="AW4OzOriginalGreen"
                                                >
                                                  AW 4 Oz (Original)
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzNightTimeOrange"
                                                />
                                                <label
                                                  className="form-check-label"
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
                                            <div className="nla_custom-checkbox">
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="calSelectAll"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="calSelectAll"
                                                >
                                                  Select All
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catCVS"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catCVS"
                                                >
                                                  CVS
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catWalgreens"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catWalgreens"
                                                >
                                                  Walgreens
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catRiteAid"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catRiteAid"
                                                >
                                                  RiteAid
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catMeijer"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catMeijer"
                                                >
                                                  Meijer
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catWalmart"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catWalmart"
                                                >
                                                  Walmart
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catTarget"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catTarget"
                                                >
                                                  Target
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catDollarGeneral"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catDollarGeneral"
                                                >
                                                  Dollar General
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catAmazon"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catAmazon"
                                                >
                                                  Amazon
                                                </label>
                                              </div>
                                            </div>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                      </Accordion>
                                      <div className="nla_btn-wrapper text-center">
                                        <button className="btn btn-primary">
                                          Apply
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                              {/* <!-- Filter custom dropdown code end --> */}
                              <a href="" className="btn btn-outline-secondary">
                                + Add New Slide
                              </a>
                              <div className="dropdown">
                                <button
                                  className="btn btn-primary dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton1"
                                  onClick={addItemDropDownHandler}
                                >
                                  + Add Item
                                </button>
                                <ul
                                  ref={ref}
                                  className={
                                    addItemDropDown === true
                                      ? "dropdown-menu show"
                                      : "dropdown-menu"
                                  }
                                  aria-labelledby="dropdownMenuButton1"
                                >
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href=""
                                      data-bs-toggle="modal"
                                      data-bs-target="#addHeadingModal"
                                    >
                                      Add Heading
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href=""
                                      data-bs-toggle="modal"
                                      data-bs-target="#addTakeaway"
                                    >
                                      Add Takeaway
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
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
                      <div className="row">
                        <div className="col-lg-9">
                          <div className="nla_graph-heading">
                            <div className="nla_heading">
                              <h5>Price Architecture Across Retailers</h5>
                              <div>
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="13.058"
                                    height="12.924"
                                    viewBox="0 0 13.058 12.924"
                                  >
                                    <g
                                      id="Group_127802"
                                      data-name="Group 127802"
                                      transform="translate(-662.829 -728.333)"
                                    >
                                      <path
                                        id="Icon_feather-edit-2"
                                        data-name="Icon feather-edit-2"
                                        d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                        transform="translate(660.329 725.575)"
                                        fill="none"
                                        stroke="#164f73"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1"
                                      />
                                    </g>
                                  </svg>
                                </a>
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10.688"
                                    height="13.513"
                                    viewBox="0 0 10.688 13.513"
                                  >
                                    <g
                                      id="Group_127803"
                                      data-name="Group 127803"
                                      transform="translate(-655.004 -728.038)"
                                    >
                                      <path
                                        id="Icon_material-delete-forever"
                                        data-name="Icon material-delete-forever"
                                        d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                        transform="translate(647.904 723.938)"
                                        fill="none"
                                        stroke="#164f73"
                                        strokeWidth="0.8"
                                      />
                                    </g>
                                  </svg>
                                </a>
                              </div>
                            </div>
                            <div className="nla_heading-buttons">
                              <a href="#" data-bs-toggle="tooltip" title="Copy">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="36"
                                  height="36"
                                  viewBox="0 0 36 36"
                                >
                                  <g
                                    id="Group_122928"
                                    data-name="Group 122928"
                                    transform="translate(-647.292 -717)"
                                  >
                                    <g
                                      id="Group_122924"
                                      data-name="Group 122924"
                                      transform="translate(658.828 728.438)"
                                    >
                                      <g
                                        id="Icon_feather-copy"
                                        data-name="Icon feather-copy"
                                      >
                                        <path
                                          id="Path_20160"
                                          data-name="Path 20160"
                                          d="M14.771,13.5h5.721a1.271,1.271,0,0,1,1.271,1.271v5.721a1.271,1.271,0,0,1-1.271,1.271H14.771A1.271,1.271,0,0,1,13.5,20.492V14.771A1.271,1.271,0,0,1,14.771,13.5Z"
                                          transform="translate(-9.05 -9.05)"
                                          fill="none"
                                          stroke="#164f73"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="1"
                                        />
                                        <path
                                          id="Path_20161"
                                          data-name="Path 20161"
                                          d="M4.907,11.263H4.271A1.271,1.271,0,0,1,3,9.992V4.271A1.271,1.271,0,0,1,4.271,3H9.992a1.271,1.271,0,0,1,1.271,1.271v.636"
                                          transform="translate(-3 -3)"
                                          fill="none"
                                          stroke="#164f73"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="1"
                                        />
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                              </a>
                              <a href="#" data-bs-toggle="tooltip" title="Edit">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="13.058"
                                  height="12.924"
                                  viewBox="0 0 13.058 12.924"
                                >
                                  <g
                                    id="Group_127802"
                                    data-name="Group 127802"
                                    transform="translate(-662.829 -728.333)"
                                  >
                                    <path
                                      id="Icon_feather-edit-2"
                                      data-name="Icon feather-edit-2"
                                      d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                      transform="translate(660.329 725.575)"
                                      fill="none"
                                      stroke="#164f73"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1"
                                    />
                                  </g>
                                </svg>
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="tooltip"
                                title="Delete"
                                className="delete-icon"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10.688"
                                  height="13.513"
                                  viewBox="0 0 10.688 13.513"
                                >
                                  <g
                                    id="Group_127803"
                                    data-name="Group 127803"
                                    transform="translate(-655.004 -728.038)"
                                  >
                                    <path
                                      id="Icon_material-delete-forever"
                                      data-name="Icon material-delete-forever"
                                      d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                      transform="translate(647.904 723.938)"
                                      fill="none"
                                      stroke="#DC3912"
                                      strokeWidth="0.8"
                                    />
                                  </g>
                                </svg>
                              </a>
                            </div>
                          </div>

                          <div className="nla_graph-block">
                            <div className="myChartDiv">
                              <ChartjsBar />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-8">
                          <div
                            className={
                              typeNotesExp === true
                                ? "nla_add-comment position-relative"
                                : "nla_add-comment nla_expan position-relative"
                            }
                          >
                            <textarea
                              name="type_note"
                              id=""
                              value={note2}
                              className="form-control"
                              placeholder="Type Notes..."
                              onChange={(e) => {
                                setNote2(e.target.value);
                              }}
                            ></textarea>
                            <div className="nla_add-comment-toggle-btn">
                              <i
                                className="fa-solid fa-floppy-disk"
                                onClick={noteSaveHandler}
                              ></i>
                              <i
                                className="fa-solid fa-plus"
                                onClick={typeNoteExpHandler}
                              ></i>
                            </div>
                          </div>
                          <div>
                            <h6>Previous Note:</h6>
                            <p className="mt-2">{notes.note2}</p>
                          </div>
                          <div class="col-lg-4">
                            <div class="nla_brand_logo">
                              {/* <h3>Brand Logo</h3> */}
                              <img
                                src={project.company_logo}
                                height={100}
                              ></img>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header
                      onClick={() => accordionSlideHanlder("B.I")}
                    >
                      <strong>B.I</strong> <span className="nla_number">3</span>
                      <p>What are the areas of opportunity by retailer?</p>
                      <span className="nla_results">Results</span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="nla_accordion-content-title-with-filter-block position-relative">
                            <div className="nla_heading">
                              {/* <h4>Area of Opportunity by Retailer</h4> */}

                              {editSlideName == false ? (
                                <>
                                  <h4>{slide3Title}</h4>
                                </>
                              ) : (
                                <>
                                  <div
                                    className="nla-select-box-with-lbl mt-1"
                                    style={{ width: "300px" }}
                                  >
                                    <input
                                      type="text"
                                      value={slide3Title}
                                      className="form-control"
                                      placeholder="Enter slide name"
                                      aria-describedby="searchOperators"
                                      onChange={(e) => {
                                        setSlide3Title(e.target.value);
                                      }}
                                    ></input>
                                  </div>
                                </>
                              )}

                              {editSlideIcon == false ? (
                                <>
                                  <a
                                    onClick={slideNameEditHanlder}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="13.058"
                                      height="12.924"
                                      viewBox="0 0 13.058 12.924"
                                    >
                                      <g
                                        id="Group_127802"
                                        data-name="Group 127802"
                                        transform="translate(-662.829 -728.333)"
                                      >
                                        <path
                                          id="Icon_feather-edit-2"
                                          data-name="Icon feather-edit-2"
                                          d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                          transform="translate(660.329 725.575)"
                                          fill="none"
                                          stroke="#164f73"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="1"
                                        />
                                      </g>
                                    </svg>
                                  </a>
                                </>
                              ) : (
                                <>
                                  <a
                                    onClick={slideNameEditHanlder}
                                    style={{
                                      cursor: "pointer",
                                      marginLeft: 25,
                                    }}
                                    className=""
                                  >
                                    <i className="fa-solid fa-check"></i>
                                  </a>
                                </>
                              )}

                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10.688"
                                  height="13.513"
                                  viewBox="0 0 10.688 13.513"
                                >
                                  <g
                                    id="Group_127803"
                                    data-name="Group 127803"
                                    transform="translate(-655.004 -728.038)"
                                  >
                                    <path
                                      id="Icon_material-delete-forever"
                                      data-name="Icon material-delete-forever"
                                      d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                      transform="translate(647.904 723.938)"
                                      fill="none"
                                      stroke="#164f73"
                                      strokeWidth="0.8"
                                    />
                                  </g>
                                </svg>
                              </a>
                            </div>
                            <div className="nla_filter_block position-relative">
                              <div
                                className="nla_filter"
                                onClick={ValuesDropDownHandler2}
                                style={{ cursor: "pointer" }}
                              >
                                <i className="fa-solid fa-filter"></i>
                              </div>

                              {/* <!-- Filter custom dropdown code start --> */}
                              {valuesDropDown2 === true ? (
                                <>
                                  <div
                                    className="nla_graph-filter-dropdown-menu-wrapper shadow mb-5 bg-body rounded"
                                    style={{ display: "block" }}
                                  >
                                    <div className="heading">
                                      <h5>Values</h5>
                                    </div>
                                    <div>
                                      <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                          <Accordion.Header>
                                            Series
                                          </Accordion.Header>
                                          <Accordion.Body>
                                            <div className="nla_custom-checkbox">
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="selectAll"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="selectAll"
                                                >
                                                  Select All
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzOriginal"
                                                  checked
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="AW4OzOriginal"
                                                >
                                                  AW 4 Oz (Original)
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzNightTime"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="AW4OzNightTime"
                                                >
                                                  AW 4 Oz (Night Time)
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzOriginalGreen"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="AW4OzOriginalGreen"
                                                >
                                                  AW 4 Oz (Original)
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzNightTimeOrange"
                                                />
                                                <label
                                                  className="form-check-label"
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
                                            <div className="nla_custom-checkbox">
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="calSelectAll"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="calSelectAll"
                                                >
                                                  Select All
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catCVS"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catCVS"
                                                >
                                                  CVS
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catWalgreens"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catWalgreens"
                                                >
                                                  Walgreens
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catRiteAid"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catRiteAid"
                                                >
                                                  RiteAid
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catMeijer"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catMeijer"
                                                >
                                                  Meijer
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catWalmart"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catWalmart"
                                                >
                                                  Walmart
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catTarget"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catTarget"
                                                >
                                                  Target
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catDollarGeneral"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catDollarGeneral"
                                                >
                                                  Dollar General
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catAmazon"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catAmazon"
                                                >
                                                  Amazon
                                                </label>
                                              </div>
                                            </div>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                      </Accordion>
                                      <div className="nla_btn-wrapper text-center">
                                        <button className="btn btn-primary">
                                          Apply
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                              {/* <!-- Filter custom dropdown code end --> */}
                              <a href="" className="btn btn-outline-secondary">
                                + Add New Slide
                              </a>
                              <div className="dropdown">
                                <button
                                  className="btn btn-primary dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton1"
                                  onClick={addItemDropDownHandler}
                                >
                                  + Add Item
                                </button>
                                <ul
                                  ref={ref}
                                  className={
                                    addItemDropDown === true
                                      ? "dropdown-menu show"
                                      : "dropdown-menu"
                                  }
                                  aria-labelledby="dropdownMenuButton1"
                                >
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href=""
                                      data-bs-toggle="modal"
                                      data-bs-target="#addHeadingModal"
                                    >
                                      Add Heading
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href=""
                                      data-bs-toggle="modal"
                                      data-bs-target="#addTakeaway"
                                    >
                                      Add Takeaway
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
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
                          <div className="nla_take-away-block">
                            <div className="nla_heading">
                              Take Aways
                              <div>
                                {editIcon == false ? (
                                  <>
                                    <a
                                      onClick={editHandler}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13.058"
                                        height="12.924"
                                        viewBox="0 0 13.058 12.924"
                                      >
                                        <g
                                          id="Group_127802"
                                          data-name="Group 127802"
                                          transform="translate(-662.829 -728.333)"
                                        >
                                          <path
                                            id="Icon_feather-edit-2"
                                            data-name="Icon feather-edit-2"
                                            d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                            transform="translate(660.329 725.575)"
                                            fill="none"
                                            stroke="#ffffff"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                          ></path>
                                        </g>
                                      </svg>
                                    </a>
                                  </>
                                ) : (
                                  <>
                                    <a
                                      style={{ cursor: "pointer" }}
                                      className="nla-edit-name mt-4"
                                      onClick={editHandler}
                                    >
                                      <i className="fa-solid fa-check"></i>
                                    </a>
                                  </>
                                )}

                                <a href="" id="editTakeAwayCOntent">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10.688"
                                    height="13.513"
                                    viewBox="0 0 10.688 13.513"
                                  >
                                    <g
                                      id="Group_127803"
                                      data-name="Group 127803"
                                      transform="translate(-655.004 -728.038)"
                                    >
                                      <path
                                        id="Icon_material-delete-forever"
                                        data-name="Icon material-delete-forever"
                                        d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                        transform="translate(647.904 723.938)"
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="0.8"
                                      ></path>
                                    </g>
                                  </svg>
                                </a>
                              </div>
                            </div>
                            <div className="nla_content">
                              {editTakeAway == false ? (
                                <>
                                  <ul contentEditable={false}>
                                    <li>
                                      {takeAwayFromDB?.take_away_description}
                                    </li>
                                    {/* <li>
                                        Main source of growth is Amazon and
                                        Dollar— need for a Channel Based
                                        Strategy?
                                      </li>
                                      <li>Potential Opportunity at Grocery?</li> */}
                                  </ul>
                                </>
                              ) : (
                                <>
                                  <div
                                    className="nla-select-box-with-lbl mt-1"
                                    // style={{ width: "250px" }}
                                  >
                                    <textarea
                                      name="type_note"
                                      id=""
                                      value={
                                        takeAwayText ||
                                        takeAwayFromDB?.take_away_description
                                      }
                                      className="form-control"
                                      placeholder="Type Notes..."
                                      onChange={(e) => {
                                        setTakeAwayText(e.target.value);
                                      }}
                                    ></textarea>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-9">
                          <div class="nla_graph-block">
                            <div class="row">
                              <div class="col-lg-6">
                                <div class="nla_graph-heading">
                                  <div class="nla_heading">
                                    {/* <h5>Area of Opportunity by Retailer</h5> */}

                                    {editSlideName == false ? (
                                      <>
                                        <h5>{slide3Title}</h5>
                                      </>
                                    ) : (
                                      <>
                                        <div
                                          className="nla-select-box-with-lbl mt-1"
                                          style={{ width: "300px" }}
                                        >
                                          <input
                                            type="text"
                                            value={slide3Title}
                                            className="form-control"
                                            placeholder="Enter slide name"
                                            aria-describedby="searchOperators"
                                            onChange={(e) => {
                                              setSlide3Title(e.target.value);
                                            }}
                                          ></input>
                                        </div>
                                      </>
                                    )}

                                    {editSlideIcon == false ? (
                                      <>
                                        <a
                                          onClick={slideNameEditHanlder}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="13.058"
                                            height="12.924"
                                            viewBox="0 0 13.058 12.924"
                                          >
                                            <g
                                              id="Group_127802"
                                              data-name="Group 127802"
                                              transform="translate(-662.829 -728.333)"
                                            >
                                              <path
                                                id="Icon_feather-edit-2"
                                                data-name="Icon feather-edit-2"
                                                d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                                transform="translate(660.329 725.575)"
                                                fill="none"
                                                stroke="#164f73"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1"
                                              />
                                            </g>
                                          </svg>
                                        </a>
                                      </>
                                    ) : (
                                      <>
                                        <a
                                          onClick={slideNameEditHanlder}
                                          style={{
                                            cursor: "pointer",
                                            marginLeft: 25,
                                          }}
                                          className=""
                                        >
                                          <i className="fa-solid fa-check"></i>
                                        </a>
                                      </>
                                    )}
                                    <div>
                                      <a href="#">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="10.688"
                                          height="13.513"
                                          viewBox="0 0 10.688 13.513"
                                        >
                                          <g
                                            id="Group_127803"
                                            data-name="Group 127803"
                                            transform="translate(-655.004 -728.038)"
                                          >
                                            <path
                                              id="Icon_material-delete-forever"
                                              data-name="Icon material-delete-forever"
                                              d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                              transform="translate(647.904 723.938)"
                                              fill="none"
                                              stroke="#164f73"
                                              strokeWidth="0.8"
                                            />
                                          </g>
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                  <div class="nla_heading-buttons">
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      title="Copy"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="36"
                                        height="36"
                                        viewBox="0 0 36 36"
                                      >
                                        <g
                                          id="Group_122928"
                                          data-name="Group 122928"
                                          transform="translate(-647.292 -717)"
                                        >
                                          <g
                                            id="Group_122924"
                                            data-name="Group 122924"
                                            transform="translate(658.828 728.438)"
                                          >
                                            <g
                                              id="Icon_feather-copy"
                                              data-name="Icon feather-copy"
                                            >
                                              <path
                                                id="Path_20160"
                                                data-name="Path 20160"
                                                d="M14.771,13.5h5.721a1.271,1.271,0,0,1,1.271,1.271v5.721a1.271,1.271,0,0,1-1.271,1.271H14.771A1.271,1.271,0,0,1,13.5,20.492V14.771A1.271,1.271,0,0,1,14.771,13.5Z"
                                                transform="translate(-9.05 -9.05)"
                                                fill="none"
                                                stroke="#164f73"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1"
                                              />
                                              <path
                                                id="Path_20161"
                                                data-name="Path 20161"
                                                d="M4.907,11.263H4.271A1.271,1.271,0,0,1,3,9.992V4.271A1.271,1.271,0,0,1,4.271,3H9.992a1.271,1.271,0,0,1,1.271,1.271v.636"
                                                transform="translate(-3 -3)"
                                                fill="none"
                                                stroke="#164f73"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1"
                                              />
                                            </g>
                                          </g>
                                        </g>
                                      </svg>
                                    </a>
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      title="Edit"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13.058"
                                        height="12.924"
                                        viewBox="0 0 13.058 12.924"
                                      >
                                        <g
                                          id="Group_127802"
                                          data-name="Group 127802"
                                          transform="translate(-662.829 -728.333)"
                                        >
                                          <path
                                            id="Icon_feather-edit-2"
                                            data-name="Icon feather-edit-2"
                                            d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                            transform="translate(660.329 725.575)"
                                            fill="none"
                                            stroke="#164f73"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                          />
                                        </g>
                                      </svg>
                                    </a>
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      title="Delete"
                                      class="delete-icon"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10.688"
                                        height="13.513"
                                        viewBox="0 0 10.688 13.513"
                                      >
                                        <g
                                          id="Group_127803"
                                          data-name="Group 127803"
                                          transform="translate(-655.004 -728.038)"
                                        >
                                          <path
                                            id="Icon_material-delete-forever"
                                            data-name="Icon material-delete-forever"
                                            d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                            transform="translate(647.904 723.938)"
                                            fill="none"
                                            stroke="#DC3912"
                                            strokeWidth="0.8"
                                          />
                                        </g>
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                                {/* <canvas
                                  id="areaOfOpportunityByRetailer"
                                  width="500"
                                  height="300"
                                ></canvas> */}
                                <div style={{ width: "100%", height: "100%" }}>
                                  <GoogleChart />
                                  {/* <Chartjs/> */}
                                </div>
                              </div>
                              <div class="col-lg-6">
                                <div class="nla_graph-heading">
                                  <div class="nla_heading">
                                    <h5>Area of Opportunity by Retailer</h5>
                                    <div>
                                      <a href="#">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="13.058"
                                          height="12.924"
                                          viewBox="0 0 13.058 12.924"
                                        >
                                          <g
                                            id="Group_127802"
                                            data-name="Group 127802"
                                            transform="translate(-662.829 -728.333)"
                                          >
                                            <path
                                              id="Icon_feather-edit-2"
                                              data-name="Icon feather-edit-2"
                                              d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                              transform="translate(660.329 725.575)"
                                              fill="none"
                                              stroke="#164f73"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="1"
                                            />
                                          </g>
                                        </svg>
                                      </a>
                                      <a href="#">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="10.688"
                                          height="13.513"
                                          viewBox="0 0 10.688 13.513"
                                        >
                                          <g
                                            id="Group_127803"
                                            data-name="Group 127803"
                                            transform="translate(-655.004 -728.038)"
                                          >
                                            <path
                                              id="Icon_material-delete-forever"
                                              data-name="Icon material-delete-forever"
                                              d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                              transform="translate(647.904 723.938)"
                                              fill="none"
                                              stroke="#164f73"
                                              strokeWidth="0.8"
                                            />
                                          </g>
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                  <div class="nla_heading-buttons">
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      title="Copy"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="36"
                                        height="36"
                                        viewBox="0 0 36 36"
                                      >
                                        <g
                                          id="Group_122928"
                                          data-name="Group 122928"
                                          transform="translate(-647.292 -717)"
                                        >
                                          <g
                                            id="Group_122924"
                                            data-name="Group 122924"
                                            transform="translate(658.828 728.438)"
                                          >
                                            <g
                                              id="Icon_feather-copy"
                                              data-name="Icon feather-copy"
                                            >
                                              <path
                                                id="Path_20160"
                                                data-name="Path 20160"
                                                d="M14.771,13.5h5.721a1.271,1.271,0,0,1,1.271,1.271v5.721a1.271,1.271,0,0,1-1.271,1.271H14.771A1.271,1.271,0,0,1,13.5,20.492V14.771A1.271,1.271,0,0,1,14.771,13.5Z"
                                                transform="translate(-9.05 -9.05)"
                                                fill="none"
                                                stroke="#164f73"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1"
                                              />
                                              <path
                                                id="Path_20161"
                                                data-name="Path 20161"
                                                d="M4.907,11.263H4.271A1.271,1.271,0,0,1,3,9.992V4.271A1.271,1.271,0,0,1,4.271,3H9.992a1.271,1.271,0,0,1,1.271,1.271v.636"
                                                transform="translate(-3 -3)"
                                                fill="none"
                                                stroke="#164f73"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1"
                                              />
                                            </g>
                                          </g>
                                        </g>
                                      </svg>
                                    </a>
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      title="Edit"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13.058"
                                        height="12.924"
                                        viewBox="0 0 13.058 12.924"
                                      >
                                        <g
                                          id="Group_127802"
                                          data-name="Group 127802"
                                          transform="translate(-662.829 -728.333)"
                                        >
                                          <path
                                            id="Icon_feather-edit-2"
                                            data-name="Icon feather-edit-2"
                                            d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                            transform="translate(660.329 725.575)"
                                            fill="none"
                                            stroke="#164f73"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                          />
                                        </g>
                                      </svg>
                                    </a>
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      title="Delete"
                                      class="delete-icon"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10.688"
                                        height="13.513"
                                        viewBox="0 0 10.688 13.513"
                                      >
                                        <g
                                          id="Group_127803"
                                          data-name="Group 127803"
                                          transform="translate(-655.004 -728.038)"
                                        >
                                          <path
                                            id="Icon_material-delete-forever"
                                            data-name="Icon material-delete-forever"
                                            d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                            transform="translate(647.904 723.938)"
                                            fill="none"
                                            stroke="#DC3912"
                                            strokeWidth="0.8"
                                          />
                                        </g>
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                                {/* <canvas
                                  id="areaOfOpportunityByRetailer"
                                  width="500"
                                  height="300"
                                ></canvas> */}
                                <GoogleChart />
                              </div>
                              <div class="col-lg-6">
                                <div class="nla_graph-heading">
                                  <div class="nla_heading">
                                    <h5>Area of Opportunity by Retailer</h5>
                                    <div>
                                      <a href="#">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="13.058"
                                          height="12.924"
                                          viewBox="0 0 13.058 12.924"
                                        >
                                          <g
                                            id="Group_127802"
                                            data-name="Group 127802"
                                            transform="translate(-662.829 -728.333)"
                                          >
                                            <path
                                              id="Icon_feather-edit-2"
                                              data-name="Icon feather-edit-2"
                                              d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                              transform="translate(660.329 725.575)"
                                              fill="none"
                                              stroke="#164f73"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="1"
                                            />
                                          </g>
                                        </svg>
                                      </a>
                                      <a href="#">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="10.688"
                                          height="13.513"
                                          viewBox="0 0 10.688 13.513"
                                        >
                                          <g
                                            id="Group_127803"
                                            data-name="Group 127803"
                                            transform="translate(-655.004 -728.038)"
                                          >
                                            <path
                                              id="Icon_material-delete-forever"
                                              data-name="Icon material-delete-forever"
                                              d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                              transform="translate(647.904 723.938)"
                                              fill="none"
                                              stroke="#164f73"
                                              strokeWidth="0.8"
                                            />
                                          </g>
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                {/* <canvas
                                  id="areaOfOpportunityByRetailer"
                                  width="500"
                                  height="300"
                                ></canvas> */}
                                <GoogleChart />
                              </div>
                            </div>
                          </div>

                          <div
                            className={
                              typeNotesExp === true
                                ? "nla_add-comment position-relative"
                                : "nla_add-comment nla_expan position-relative"
                            }
                          >
                            <textarea
                              name="type_note"
                              id=""
                              value={note3}
                              className="form-control"
                              placeholder="Type Notes..."
                              onChange={(e) => {
                                setNote3(e.target.value);
                              }}
                            ></textarea>
                            <div className="nla_add-comment-toggle-btn">
                              <i
                                className="fa-solid fa-floppy-disk"
                                onClick={noteSaveHandler}
                              ></i>
                              <i
                                className="fa-solid fa-plus"
                                onClick={typeNoteExpHandler}
                              ></i>
                            </div>
                          </div>
                          <div>
                            <h6>Previous Note:</h6>
                            <p className="mt-2">{notes.note3}</p>
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="nla_brand_logo">
                            {/* <h3>Brand Logo</h3> */}
                            <img src={project.company_logo} height={100}></img>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Tab>
              <Tab eventKey="mark" title="Market Assessment">
                <Sonnet />
                <Accordion defaultActiveKey={["0"]} alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <strong>M.A</strong> <span className="nla_number">1</span>
                      <p>
                        What is the current pricing landscape across the
                        categories analyzed? Do you have the right pricing
                        structure across channels?
                      </p>
                      <span className="nla_results">Results</span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="nla_accordion-content-title-with-filter-block position-relative">
                              <div className="nla_heading">
                                <h4>Price Architecture Across Retailers</h4>
                                <a href="#">
                                  {/* <i className="fa-solid fa-pen"></i> */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="13.058"
                                    height="12.924"
                                    viewBox="0 0 13.058 12.924"
                                  >
                                    <g
                                      id="Group_127802"
                                      data-name="Group 127802"
                                      transform="translate(-662.829 -728.333)"
                                    >
                                      <path
                                        id="Icon_feather-edit-2"
                                        data-name="Icon feather-edit-2"
                                        d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                        transform="translate(660.329 725.575)"
                                        fill="none"
                                        stroke="#164f73"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1"
                                      ></path>
                                    </g>
                                  </svg>
                                </a>
                                <a href="#">
                                  {/* <i className="fa-solid fa-trash"></i> */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10.688"
                                    height="13.513"
                                    viewBox="0 0 10.688 13.513"
                                  >
                                    <g
                                      id="Group_127803"
                                      data-name="Group 127803"
                                      transform="translate(-655.004 -728.038)"
                                    >
                                      <path
                                        id="Icon_material-delete-forever"
                                        data-name="Icon material-delete-forever"
                                        d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                        transform="translate(647.904 723.938)"
                                        fill="none"
                                        stroke="#164f73"
                                        strokeWidth="0.8"
                                      ></path>
                                    </g>
                                  </svg>
                                </a>
                              </div>
                              <div className="nla_filter_block position-relative">
                                <div
                                  className="nla_filter"
                                  onClick={ValuesDropDownHandler}
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="fa-solid fa-filter"></i>
                                </div>

                                {/* <!-- Filter custom dropdown code start --> */}
                                {valuesDropDown === true ? (
                                  <>
                                    <div
                                      className="nla_graph-filter-dropdown-menu-wrapper shadow mb-5 bg-body rounded"
                                      style={{ display: "block" }}
                                    >
                                      <div className="heading">
                                        <h5>Values</h5>
                                      </div>
                                      <div>
                                        <Accordion defaultActiveKey="0">
                                          <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                              Series
                                            </Accordion.Header>
                                            <Accordion.Body>
                                              <div className="nla_custom-checkbox">
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="selectAll"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="selectAll"
                                                  >
                                                    Select All
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="AW4OzOriginal"
                                                    checked
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="AW4OzOriginal"
                                                  >
                                                    AW 4 Oz (Original)
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="AW4OzNightTime"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="AW4OzNightTime"
                                                  >
                                                    AW 4 Oz (Night Time)
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="AW4OzOriginalGreen"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="AW4OzOriginalGreen"
                                                  >
                                                    AW 4 Oz (Original)
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="AW4OzNightTimeOrange"
                                                  />
                                                  <label
                                                    className="form-check-label"
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
                                              <div className="nla_custom-checkbox">
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="calSelectAll"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="calSelectAll"
                                                  >
                                                    Select All
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catCVS"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catCVS"
                                                  >
                                                    CVS
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catWalgreens"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catWalgreens"
                                                  >
                                                    Walgreens
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catRiteAid"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catRiteAid"
                                                  >
                                                    RiteAid
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catMeijer"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catMeijer"
                                                  >
                                                    Meijer
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catWalmart"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catWalmart"
                                                  >
                                                    Walmart
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catTarget"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catTarget"
                                                  >
                                                    Target
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catDollarGeneral"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catDollarGeneral"
                                                  >
                                                    Dollar General
                                                  </label>
                                                </div>
                                                <div className="form-check">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="catAmazon"
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor="catAmazon"
                                                  >
                                                    Amazon
                                                  </label>
                                                </div>
                                              </div>
                                            </Accordion.Body>
                                          </Accordion.Item>
                                        </Accordion>
                                        <div className="nla_btn-wrapper text-center">
                                          <button className="btn btn-primary">
                                            Apply
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : null}

                                {/* <!-- Filter custom dropdown code end --> */}
                                <a
                                  href=""
                                  className="btn btn-outline-secondary"
                                >
                                  + Add New Slide
                                </a>
                                <div className="dropdown">
                                  <button
                                    className="btn btn-primary dropdown-toggle"
                                    id="dropdownMenuButton1"
                                    onClick={addItemDropDownHandler}
                                  >
                                    + Add Item
                                  </button>
                                  <ul
                                    ref={ref}
                                    className={
                                      addItemDropDown === true
                                        ? "dropdown-menu show"
                                        : "dropdown-menu"
                                    }
                                    aria-labelledby="dropdownMenuButton1"
                                  >
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href=""
                                        data-bs-toggle="modal"
                                        data-bs-target="#addHeadingModal"
                                      >
                                        Add Heading
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href=""
                                        data-bs-toggle="modal"
                                        data-bs-target="#addTakeaway"
                                      >
                                        Add Takeaway
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
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
                        <div className="row">
                          <div className="col-lg-3">
                            <div className="nla_take-away-block">
                              <div className="nla_heading">
                                Take Aways
                                <div>
                                  <a href="">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="13.058"
                                      height="12.924"
                                      viewBox="0 0 13.058 12.924"
                                    >
                                      <g
                                        id="Group_127802"
                                        data-name="Group 127802"
                                        transform="translate(-662.829 -728.333)"
                                      >
                                        <path
                                          id="Icon_feather-edit-2"
                                          data-name="Icon feather-edit-2"
                                          d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                          transform="translate(660.329 725.575)"
                                          fill="none"
                                          stroke="#ffffff"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="1"
                                        ></path>
                                      </g>
                                    </svg>
                                  </a>
                                  <a href="" id="editTakeAwayCOntent">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="10.688"
                                      height="13.513"
                                      viewBox="0 0 10.688 13.513"
                                    >
                                      <g
                                        id="Group_127803"
                                        data-name="Group 127803"
                                        transform="translate(-655.004 -728.038)"
                                      >
                                        <path
                                          id="Icon_material-delete-forever"
                                          data-name="Icon material-delete-forever"
                                          d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                          transform="translate(647.904 723.938)"
                                          fill="none"
                                          stroke="#ffffff"
                                          strokeWidth="0.8"
                                        ></path>
                                      </g>
                                    </svg>
                                  </a>
                                </div>
                              </div>
                              <div className="nla_content">
                                <ul contentEditable={false}>
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
                          <div className="col-lg-9">
                            <div className="nla_graph-heading">
                              <div className="nla_heading">
                                <h5>Price Architecture Across Retailers</h5>
                                <div>
                                  <a href="">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="13.058"
                                      height="12.924"
                                      viewBox="0 0 13.058 12.924"
                                    >
                                      <g
                                        id="Group_127802"
                                        data-name="Group 127802"
                                        transform="translate(-662.829 -728.333)"
                                      >
                                        <path
                                          id="Icon_feather-edit-2"
                                          data-name="Icon feather-edit-2"
                                          d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                          transform="translate(660.329 725.575)"
                                          fill="none"
                                          stroke="#164f73"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="1"
                                        ></path>
                                      </g>
                                    </svg>
                                  </a>
                                  <a href="">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="10.688"
                                      height="13.513"
                                      viewBox="0 0 10.688 13.513"
                                    >
                                      <g
                                        id="Group_127803"
                                        data-name="Group 127803"
                                        transform="translate(-655.004 -728.038)"
                                      >
                                        <path
                                          id="Icon_material-delete-forever"
                                          data-name="Icon material-delete-forever"
                                          d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                          transform="translate(647.904 723.938)"
                                          fill="none"
                                          stroke="#164f73"
                                          strokeWidth="0.8"
                                        ></path>
                                      </g>
                                    </svg>
                                  </a>
                                </div>
                              </div>
                              <div className="nla_heading-buttons">
                                <a
                                  href=""
                                  data-bs-toggle="tooltip"
                                  title="Copy"
                                >
                                  {/* <i className="fa-solid fa-copy"></i> */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    viewBox="0 0 36 36"
                                  >
                                    <g
                                      id="Group_122928"
                                      data-name="Group 122928"
                                      transform="translate(-647.292 -717)"
                                    >
                                      <g
                                        id="Group_122924"
                                        data-name="Group 122924"
                                        transform="translate(658.828 728.438)"
                                      >
                                        <g
                                          id="Icon_feather-copy"
                                          data-name="Icon feather-copy"
                                        >
                                          <path
                                            id="Path_20160"
                                            data-name="Path 20160"
                                            d="M14.771,13.5h5.721a1.271,1.271,0,0,1,1.271,1.271v5.721a1.271,1.271,0,0,1-1.271,1.271H14.771A1.271,1.271,0,0,1,13.5,20.492V14.771A1.271,1.271,0,0,1,14.771,13.5Z"
                                            transform="translate(-9.05 -9.05)"
                                            fill="none"
                                            stroke="#164f73"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                          ></path>
                                          <path
                                            id="Path_20161"
                                            data-name="Path 20161"
                                            d="M4.907,11.263H4.271A1.271,1.271,0,0,1,3,9.992V4.271A1.271,1.271,0,0,1,4.271,3H9.992a1.271,1.271,0,0,1,1.271,1.271v.636"
                                            transform="translate(-3 -3)"
                                            fill="none"
                                            stroke="#164f73"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                          ></path>
                                        </g>
                                      </g>
                                    </g>
                                  </svg>
                                </a>
                                <a
                                  href=""
                                  data-bs-toggle="tooltip"
                                  title="Edit"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="13.058"
                                    height="12.924"
                                    viewBox="0 0 13.058 12.924"
                                  >
                                    <g
                                      id="Group_127802"
                                      data-name="Group 127802"
                                      transform="translate(-662.829 -728.333)"
                                    >
                                      <path
                                        id="Icon_feather-edit-2"
                                        data-name="Icon feather-edit-2"
                                        d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                        transform="translate(660.329 725.575)"
                                        fill="none"
                                        stroke="#164f73"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1"
                                      ></path>
                                    </g>
                                  </svg>
                                </a>
                                <a
                                  href=""
                                  data-bs-toggle="tooltip"
                                  title="Delete"
                                  className="delete-icon"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10.688"
                                    height="13.513"
                                    viewBox="0 0 10.688 13.513"
                                  >
                                    <g
                                      id="Group_127803"
                                      data-name="Group 127803"
                                      transform="translate(-655.004 -728.038)"
                                    >
                                      <path
                                        id="Icon_material-delete-forever"
                                        data-name="Icon material-delete-forever"
                                        d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                        transform="translate(647.904 723.938)"
                                        fill="none"
                                        stroke="#DC3912"
                                        strokeWidth="0.8"
                                      ></path>
                                    </g>
                                  </svg>
                                </a>
                              </div>
                            </div>

                            <div className="nla_graph-block">
                              <div className="myChartDiv">
                                <Chartjs />
                              </div>
                            </div>

                            <div
                              className={
                                typeNotesExp === true
                                  ? "nla_add-comment position-relative"
                                  : "nla_add-comment nla_expan position-relative"
                              }
                            >
                              <textarea
                                name="type_note"
                                id=""
                                value={note1}
                                className="form-control"
                                placeholder="Type Notes..."
                                onChange={(e) => {
                                  setNote1(e.target.value);
                                }}
                              ></textarea>
                              <div className="nla_add-comment-toggle-btn">
                                <i
                                  className="fa-solid fa-floppy-disk"
                                  onClick={noteSaveHandler}
                                ></i>
                                <i
                                  className="fa-solid fa-plus"
                                  onClick={typeNoteExpHandler}
                                ></i>
                              </div>
                            </div>
                            <div>
                              <h6>Previous Note:</h6>
                              <p className="mt-2">{notes.note1}</p>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div class="nla_brand_logo">
                              {/* <h3>Brand Logo</h3> */}
                              <img
                                src={project.company_logo}
                                height={100}
                              ></img>
                            </div>
                          </div>
                        </div>
                      </>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Tab>
              <Tab eventKey="pricing" title="Pricing Diagnostics">
                <Sonnet />
                Pricing Diagnostics
              </Tab>
              <Tab eventKey="modeling" title="Modeling Insights">
                <Sonnet />
                <Accordion defaultActiveKey={["0"]} alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <strong>M.I</strong> <span className="nla_number">2</span>
                      <p>
                        How sensitive is Client Brand's portfolio to price
                        changes?
                      </p>
                      <span className="nla_results">Results</span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="nla_accordion-content-title-with-filter-block">
                            <div className="nla_heading">
                              <h4>Price Architecture Across Retailers</h4>
                              <a href="">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="13.058"
                                  height="12.924"
                                  viewBox="0 0 13.058 12.924"
                                >
                                  <g
                                    id="Group_127802"
                                    data-name="Group 127802"
                                    transform="translate(-662.829 -728.333)"
                                  >
                                    <path
                                      id="Icon_feather-edit-2"
                                      data-name="Icon feather-edit-2"
                                      d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                      transform="translate(660.329 725.575)"
                                      fill="none"
                                      stroke="#164f73"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1"
                                    />
                                  </g>
                                </svg>
                              </a>
                              <a href="">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10.688"
                                  height="13.513"
                                  viewBox="0 0 10.688 13.513"
                                >
                                  <g
                                    id="Group_127803"
                                    data-name="Group 127803"
                                    transform="translate(-655.004 -728.038)"
                                  >
                                    <path
                                      id="Icon_material-delete-forever"
                                      data-name="Icon material-delete-forever"
                                      d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                      transform="translate(647.904 723.938)"
                                      fill="none"
                                      stroke="#164f73"
                                      strokeWidth="0.8"
                                    />
                                  </g>
                                </svg>
                              </a>
                            </div>
                            <div className="nla_filter_block position-relative">
                              <div
                                className="nla_filter"
                                onClick={ValuesDropDownHandler1}
                                style={{ cursor: "pointer" }}
                              >
                                <i className="fa-solid fa-filter"></i>
                              </div>
                              {/* <!-- Filter custom dropdown code start --> */}
                              {valuesDropDown1 === true ? (
                                <>
                                  <div
                                    className="nla_graph-filter-dropdown-menu-wrapper shadow mb-5 bg-body rounded"
                                    style={{ display: "block" }}
                                  >
                                    <div className="heading">
                                      <h5>Values</h5>
                                    </div>
                                    <div>
                                      <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                          <Accordion.Header>
                                            Series
                                          </Accordion.Header>
                                          <Accordion.Body>
                                            <div className="nla_custom-checkbox">
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="selectAll"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="selectAll"
                                                >
                                                  Select All
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzOriginal"
                                                  checked
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="AW4OzOriginal"
                                                >
                                                  AW 4 Oz (Original)
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzNightTime"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="AW4OzNightTime"
                                                >
                                                  AW 4 Oz (Night Time)
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzOriginalGreen"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="AW4OzOriginalGreen"
                                                >
                                                  AW 4 Oz (Original)
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzNightTimeOrange"
                                                />
                                                <label
                                                  className="form-check-label"
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
                                            <div className="nla_custom-checkbox">
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="calSelectAll"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="calSelectAll"
                                                >
                                                  Select All
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catCVS"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catCVS"
                                                >
                                                  CVS
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catWalgreens"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catWalgreens"
                                                >
                                                  Walgreens
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catRiteAid"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catRiteAid"
                                                >
                                                  RiteAid
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catMeijer"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catMeijer"
                                                >
                                                  Meijer
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catWalmart"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catWalmart"
                                                >
                                                  Walmart
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catTarget"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catTarget"
                                                >
                                                  Target
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catDollarGeneral"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catDollarGeneral"
                                                >
                                                  Dollar General
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catAmazon"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catAmazon"
                                                >
                                                  Amazon
                                                </label>
                                              </div>
                                            </div>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                      </Accordion>
                                      <div className="nla_btn-wrapper text-center">
                                        <button className="btn btn-primary">
                                          Apply
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                              {/* <!-- Filter custom dropdown code end --> */}
                              <a href="" className="btn btn-outline-secondary">
                                + Add New Slide
                              </a>
                              <div className="dropdown">
                                <button
                                  className="btn btn-primary dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton1"
                                  onClick={addItemDropDownHandler}
                                >
                                  + Add Item
                                </button>
                                <ul
                                  ref={ref}
                                  className={
                                    addItemDropDown === true
                                      ? "dropdown-menu show"
                                      : "dropdown-menu"
                                  }
                                  aria-labelledby="dropdownMenuButton1"
                                >
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href=""
                                      data-bs-toggle="modal"
                                      data-bs-target="#addHeadingModal"
                                    >
                                      Add Heading
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href=""
                                      data-bs-toggle="modal"
                                      data-bs-target="#addTakeaway"
                                    >
                                      Add Takeaway
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
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
                      <div className="row">
                        <div className="col-lg-9">
                          <div className="nla_graph-heading">
                            <div className="nla_heading">
                              <h5>Price Architecture Across Retailers</h5>
                              <div>
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="13.058"
                                    height="12.924"
                                    viewBox="0 0 13.058 12.924"
                                  >
                                    <g
                                      id="Group_127802"
                                      data-name="Group 127802"
                                      transform="translate(-662.829 -728.333)"
                                    >
                                      <path
                                        id="Icon_feather-edit-2"
                                        data-name="Icon feather-edit-2"
                                        d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                        transform="translate(660.329 725.575)"
                                        fill="none"
                                        stroke="#164f73"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1"
                                      />
                                    </g>
                                  </svg>
                                </a>
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10.688"
                                    height="13.513"
                                    viewBox="0 0 10.688 13.513"
                                  >
                                    <g
                                      id="Group_127803"
                                      data-name="Group 127803"
                                      transform="translate(-655.004 -728.038)"
                                    >
                                      <path
                                        id="Icon_material-delete-forever"
                                        data-name="Icon material-delete-forever"
                                        d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                        transform="translate(647.904 723.938)"
                                        fill="none"
                                        stroke="#164f73"
                                        strokeWidth="0.8"
                                      />
                                    </g>
                                  </svg>
                                </a>
                              </div>
                            </div>
                            <div className="nla_heading-buttons">
                              <a href="#" data-bs-toggle="tooltip" title="Copy">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="36"
                                  height="36"
                                  viewBox="0 0 36 36"
                                >
                                  <g
                                    id="Group_122928"
                                    data-name="Group 122928"
                                    transform="translate(-647.292 -717)"
                                  >
                                    <g
                                      id="Group_122924"
                                      data-name="Group 122924"
                                      transform="translate(658.828 728.438)"
                                    >
                                      <g
                                        id="Icon_feather-copy"
                                        data-name="Icon feather-copy"
                                      >
                                        <path
                                          id="Path_20160"
                                          data-name="Path 20160"
                                          d="M14.771,13.5h5.721a1.271,1.271,0,0,1,1.271,1.271v5.721a1.271,1.271,0,0,1-1.271,1.271H14.771A1.271,1.271,0,0,1,13.5,20.492V14.771A1.271,1.271,0,0,1,14.771,13.5Z"
                                          transform="translate(-9.05 -9.05)"
                                          fill="none"
                                          stroke="#164f73"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="1"
                                        />
                                        <path
                                          id="Path_20161"
                                          data-name="Path 20161"
                                          d="M4.907,11.263H4.271A1.271,1.271,0,0,1,3,9.992V4.271A1.271,1.271,0,0,1,4.271,3H9.992a1.271,1.271,0,0,1,1.271,1.271v.636"
                                          transform="translate(-3 -3)"
                                          fill="none"
                                          stroke="#164f73"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="1"
                                        />
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                              </a>
                              <a href="#" data-bs-toggle="tooltip" title="Edit">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="13.058"
                                  height="12.924"
                                  viewBox="0 0 13.058 12.924"
                                >
                                  <g
                                    id="Group_127802"
                                    data-name="Group 127802"
                                    transform="translate(-662.829 -728.333)"
                                  >
                                    <path
                                      id="Icon_feather-edit-2"
                                      data-name="Icon feather-edit-2"
                                      d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                      transform="translate(660.329 725.575)"
                                      fill="none"
                                      stroke="#164f73"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1"
                                    />
                                  </g>
                                </svg>
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="tooltip"
                                title="Delete"
                                className="delete-icon"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10.688"
                                  height="13.513"
                                  viewBox="0 0 10.688 13.513"
                                >
                                  <g
                                    id="Group_127803"
                                    data-name="Group 127803"
                                    transform="translate(-655.004 -728.038)"
                                  >
                                    <path
                                      id="Icon_material-delete-forever"
                                      data-name="Icon material-delete-forever"
                                      d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                      transform="translate(647.904 723.938)"
                                      fill="none"
                                      stroke="#DC3912"
                                      strokeWidth="0.8"
                                    />
                                  </g>
                                </svg>
                              </a>
                            </div>
                          </div>

                          <div className="nla_graph-block">
                            <div className="myChartDiv">
                              <ChartjsBar />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-8">
                          <div
                            className={
                              typeNotesExp === true
                                ? "nla_add-comment position-relative"
                                : "nla_add-comment nla_expan position-relative"
                            }
                          >
                            <textarea
                              name="type_note"
                              id=""
                              value={note2}
                              className="form-control"
                              placeholder="Type Notes..."
                              onChange={(e) => {
                                setNote2(e.target.value);
                              }}
                            ></textarea>
                            <div className="nla_add-comment-toggle-btn">
                              <i
                                className="fa-solid fa-floppy-disk"
                                onClick={noteSaveHandler}
                              ></i>
                              <i
                                className="fa-solid fa-plus"
                                onClick={typeNoteExpHandler}
                              ></i>
                            </div>
                          </div>
                          <div>
                            <h6>Previous Note:</h6>
                            <p className="mt-2">{notes.note2}</p>
                          </div>
                          <div class="col-lg-4">
                            <div class="nla_brand_logo">
                              {/* <h3>Brand Logo</h3> */}
                              <img
                                src={project.company_logo}
                                height={100}
                              ></img>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Tab>
              <Tab eventKey="business" title="Business Implications">
                <Sonnet />
                <Accordion defaultActiveKey={["0"]} alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <strong>B.I</strong> <span className="nla_number">3</span>
                      <p>What are the areas of opportunity by retailer?</p>
                      <span className="nla_results">Results</span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="nla_accordion-content-title-with-filter-block position-relative">
                            <div className="nla_heading">
                              <h4>Area of Opportunity by Retailer</h4>
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="13.058"
                                  height="12.924"
                                  viewBox="0 0 13.058 12.924"
                                >
                                  <g
                                    id="Group_127802"
                                    data-name="Group 127802"
                                    transform="translate(-662.829 -728.333)"
                                  >
                                    <path
                                      id="Icon_feather-edit-2"
                                      data-name="Icon feather-edit-2"
                                      d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                      transform="translate(660.329 725.575)"
                                      fill="none"
                                      stroke="#164f73"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1"
                                    />
                                  </g>
                                </svg>
                              </a>
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10.688"
                                  height="13.513"
                                  viewBox="0 0 10.688 13.513"
                                >
                                  <g
                                    id="Group_127803"
                                    data-name="Group 127803"
                                    transform="translate(-655.004 -728.038)"
                                  >
                                    <path
                                      id="Icon_material-delete-forever"
                                      data-name="Icon material-delete-forever"
                                      d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                      transform="translate(647.904 723.938)"
                                      fill="none"
                                      stroke="#164f73"
                                      strokeWidth="0.8"
                                    />
                                  </g>
                                </svg>
                              </a>
                            </div>
                            <div className="nla_filter_block position-relative">
                              <div
                                className="nla_filter"
                                onClick={ValuesDropDownHandler2}
                                style={{ cursor: "pointer" }}
                              >
                                <i className="fa-solid fa-filter"></i>
                              </div>
                              {/* <!-- Filter custom dropdown code start --> */}
                              {valuesDropDown2 === true ? (
                                <>
                                  <div
                                    className="nla_graph-filter-dropdown-menu-wrapper shadow mb-5 bg-body rounded"
                                    style={{ display: "block" }}
                                  >
                                    <div className="heading">
                                      <h5>Values</h5>
                                    </div>
                                    <div>
                                      <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                          <Accordion.Header>
                                            Series
                                          </Accordion.Header>
                                          <Accordion.Body>
                                            <div className="nla_custom-checkbox">
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="selectAll"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="selectAll"
                                                >
                                                  Select All
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzOriginal"
                                                  checked
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="AW4OzOriginal"
                                                >
                                                  AW 4 Oz (Original)
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzNightTime"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="AW4OzNightTime"
                                                >
                                                  AW 4 Oz (Night Time)
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzOriginalGreen"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="AW4OzOriginalGreen"
                                                >
                                                  AW 4 Oz (Original)
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="AW4OzNightTimeOrange"
                                                />
                                                <label
                                                  className="form-check-label"
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
                                            <div className="nla_custom-checkbox">
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="calSelectAll"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="calSelectAll"
                                                >
                                                  Select All
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catCVS"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catCVS"
                                                >
                                                  CVS
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catWalgreens"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catWalgreens"
                                                >
                                                  Walgreens
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catRiteAid"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catRiteAid"
                                                >
                                                  RiteAid
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catMeijer"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catMeijer"
                                                >
                                                  Meijer
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catWalmart"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catWalmart"
                                                >
                                                  Walmart
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catTarget"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catTarget"
                                                >
                                                  Target
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catDollarGeneral"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catDollarGeneral"
                                                >
                                                  Dollar General
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="catAmazon"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="catAmazon"
                                                >
                                                  Amazon
                                                </label>
                                              </div>
                                            </div>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                      </Accordion>
                                      <div className="nla_btn-wrapper text-center">
                                        <button className="btn btn-primary">
                                          Apply
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                              {/* <!-- Filter custom dropdown code end --> */}
                              <a href="" className="btn btn-outline-secondary">
                                + Add New Slide
                              </a>
                              <div className="dropdown">
                                <button
                                  className="btn btn-primary dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton1"
                                  onClick={addItemDropDownHandler}
                                >
                                  + Add Item
                                </button>
                                <ul
                                  ref={ref}
                                  className={
                                    addItemDropDown === true
                                      ? "dropdown-menu show"
                                      : "dropdown-menu"
                                  }
                                  aria-labelledby="dropdownMenuButton1"
                                >
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href=""
                                      data-bs-toggle="modal"
                                      data-bs-target="#addHeadingModal"
                                    >
                                      Add Heading
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href=""
                                      data-bs-toggle="modal"
                                      data-bs-target="#addTakeaway"
                                    >
                                      Add Takeaway
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
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
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="13.058"
                                    height="12.924"
                                    viewBox="0 0 13.058 12.924"
                                  >
                                    <g
                                      id="Group_127802"
                                      data-name="Group 127802"
                                      transform="translate(-662.829 -728.333)"
                                    >
                                      <path
                                        id="Icon_feather-edit-2"
                                        data-name="Icon feather-edit-2"
                                        d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                        transform="translate(660.329 725.575)"
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1"
                                      />
                                    </g>
                                  </svg>
                                </a>
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10.688"
                                    height="13.513"
                                    viewBox="0 0 10.688 13.513"
                                  >
                                    <g
                                      id="Group_127803"
                                      data-name="Group 127803"
                                      transform="translate(-655.004 -728.038)"
                                    >
                                      <path
                                        id="Icon_material-delete-forever"
                                        data-name="Icon material-delete-forever"
                                        d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                        transform="translate(647.904 723.938)"
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="0.8"
                                      />
                                    </g>
                                  </svg>
                                </a>
                              </div>
                            </div>
                            <div class="nla_content">
                              <ul>
                                <li>
                                  Currently no competitor to 4 Oz Nighttime and
                                  Gel; Private Label is the biggest competitor
                                  to 4 Oz Original
                                </li>
                                <li>
                                  Given fairly low elasticities In both GW
                                  products, volume loss can be minimized and can
                                  be offset by growth in dollars—opportunity to
                                  take 4-6% price increase
                                </li>
                                <li>Key watch outs are the gap to PL</li>
                                <li>
                                  Other watch out is price gap to Amazon (which
                                  seems to have grown strongly over the past 52
                                  weeks) — there is a danger of the WM shopper
                                  migrating to that channel.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-9">
                          <div class="nla_graph-block">
                            <div class="row">
                              <div class="col-lg-6">
                                <div class="nla_graph-heading">
                                  <div class="nla_heading">
                                    <h5>Area of Opportunity by Retailer</h5>
                                    <div>
                                      <a href="#">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="13.058"
                                          height="12.924"
                                          viewBox="0 0 13.058 12.924"
                                        >
                                          <g
                                            id="Group_127802"
                                            data-name="Group 127802"
                                            transform="translate(-662.829 -728.333)"
                                          >
                                            <path
                                              id="Icon_feather-edit-2"
                                              data-name="Icon feather-edit-2"
                                              d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                              transform="translate(660.329 725.575)"
                                              fill="none"
                                              stroke="#164f73"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="1"
                                            />
                                          </g>
                                        </svg>
                                      </a>
                                      <a href="#">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="10.688"
                                          height="13.513"
                                          viewBox="0 0 10.688 13.513"
                                        >
                                          <g
                                            id="Group_127803"
                                            data-name="Group 127803"
                                            transform="translate(-655.004 -728.038)"
                                          >
                                            <path
                                              id="Icon_material-delete-forever"
                                              data-name="Icon material-delete-forever"
                                              d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                              transform="translate(647.904 723.938)"
                                              fill="none"
                                              stroke="#164f73"
                                              strokeWidth="0.8"
                                            />
                                          </g>
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                  <div class="nla_heading-buttons">
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      title="Copy"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="36"
                                        height="36"
                                        viewBox="0 0 36 36"
                                      >
                                        <g
                                          id="Group_122928"
                                          data-name="Group 122928"
                                          transform="translate(-647.292 -717)"
                                        >
                                          <g
                                            id="Group_122924"
                                            data-name="Group 122924"
                                            transform="translate(658.828 728.438)"
                                          >
                                            <g
                                              id="Icon_feather-copy"
                                              data-name="Icon feather-copy"
                                            >
                                              <path
                                                id="Path_20160"
                                                data-name="Path 20160"
                                                d="M14.771,13.5h5.721a1.271,1.271,0,0,1,1.271,1.271v5.721a1.271,1.271,0,0,1-1.271,1.271H14.771A1.271,1.271,0,0,1,13.5,20.492V14.771A1.271,1.271,0,0,1,14.771,13.5Z"
                                                transform="translate(-9.05 -9.05)"
                                                fill="none"
                                                stroke="#164f73"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1"
                                              />
                                              <path
                                                id="Path_20161"
                                                data-name="Path 20161"
                                                d="M4.907,11.263H4.271A1.271,1.271,0,0,1,3,9.992V4.271A1.271,1.271,0,0,1,4.271,3H9.992a1.271,1.271,0,0,1,1.271,1.271v.636"
                                                transform="translate(-3 -3)"
                                                fill="none"
                                                stroke="#164f73"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1"
                                              />
                                            </g>
                                          </g>
                                        </g>
                                      </svg>
                                    </a>
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      title="Edit"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13.058"
                                        height="12.924"
                                        viewBox="0 0 13.058 12.924"
                                      >
                                        <g
                                          id="Group_127802"
                                          data-name="Group 127802"
                                          transform="translate(-662.829 -728.333)"
                                        >
                                          <path
                                            id="Icon_feather-edit-2"
                                            data-name="Icon feather-edit-2"
                                            d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                            transform="translate(660.329 725.575)"
                                            fill="none"
                                            stroke="#164f73"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                          />
                                        </g>
                                      </svg>
                                    </a>
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      title="Delete"
                                      class="delete-icon"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10.688"
                                        height="13.513"
                                        viewBox="0 0 10.688 13.513"
                                      >
                                        <g
                                          id="Group_127803"
                                          data-name="Group 127803"
                                          transform="translate(-655.004 -728.038)"
                                        >
                                          <path
                                            id="Icon_material-delete-forever"
                                            data-name="Icon material-delete-forever"
                                            d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                            transform="translate(647.904 723.938)"
                                            fill="none"
                                            stroke="#DC3912"
                                            strokeWidth="0.8"
                                          />
                                        </g>
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                                {/* <canvas
                                  id="areaOfOpportunityByRetailer"
                                  width="500"
                                  height="300"
                                ></canvas> */}
                                <GoogleChart />
                              </div>
                              <div class="col-lg-6">
                                <div class="nla_graph-heading">
                                  <div class="nla_heading">
                                    <h5>Area of Opportunity by Retailer</h5>
                                    <div>
                                      <a href="#">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="13.058"
                                          height="12.924"
                                          viewBox="0 0 13.058 12.924"
                                        >
                                          <g
                                            id="Group_127802"
                                            data-name="Group 127802"
                                            transform="translate(-662.829 -728.333)"
                                          >
                                            <path
                                              id="Icon_feather-edit-2"
                                              data-name="Icon feather-edit-2"
                                              d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                              transform="translate(660.329 725.575)"
                                              fill="none"
                                              stroke="#164f73"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="1"
                                            />
                                          </g>
                                        </svg>
                                      </a>
                                      <a href="#">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="10.688"
                                          height="13.513"
                                          viewBox="0 0 10.688 13.513"
                                        >
                                          <g
                                            id="Group_127803"
                                            data-name="Group 127803"
                                            transform="translate(-655.004 -728.038)"
                                          >
                                            <path
                                              id="Icon_material-delete-forever"
                                              data-name="Icon material-delete-forever"
                                              d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                              transform="translate(647.904 723.938)"
                                              fill="none"
                                              stroke="#164f73"
                                              strokeWidth="0.8"
                                            />
                                          </g>
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                  <div class="nla_heading-buttons">
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      title="Copy"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="36"
                                        height="36"
                                        viewBox="0 0 36 36"
                                      >
                                        <g
                                          id="Group_122928"
                                          data-name="Group 122928"
                                          transform="translate(-647.292 -717)"
                                        >
                                          <g
                                            id="Group_122924"
                                            data-name="Group 122924"
                                            transform="translate(658.828 728.438)"
                                          >
                                            <g
                                              id="Icon_feather-copy"
                                              data-name="Icon feather-copy"
                                            >
                                              <path
                                                id="Path_20160"
                                                data-name="Path 20160"
                                                d="M14.771,13.5h5.721a1.271,1.271,0,0,1,1.271,1.271v5.721a1.271,1.271,0,0,1-1.271,1.271H14.771A1.271,1.271,0,0,1,13.5,20.492V14.771A1.271,1.271,0,0,1,14.771,13.5Z"
                                                transform="translate(-9.05 -9.05)"
                                                fill="none"
                                                stroke="#164f73"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1"
                                              />
                                              <path
                                                id="Path_20161"
                                                data-name="Path 20161"
                                                d="M4.907,11.263H4.271A1.271,1.271,0,0,1,3,9.992V4.271A1.271,1.271,0,0,1,4.271,3H9.992a1.271,1.271,0,0,1,1.271,1.271v.636"
                                                transform="translate(-3 -3)"
                                                fill="none"
                                                stroke="#164f73"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1"
                                              />
                                            </g>
                                          </g>
                                        </g>
                                      </svg>
                                    </a>
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      title="Edit"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13.058"
                                        height="12.924"
                                        viewBox="0 0 13.058 12.924"
                                      >
                                        <g
                                          id="Group_127802"
                                          data-name="Group 127802"
                                          transform="translate(-662.829 -728.333)"
                                        >
                                          <path
                                            id="Icon_feather-edit-2"
                                            data-name="Icon feather-edit-2"
                                            d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                            transform="translate(660.329 725.575)"
                                            fill="none"
                                            stroke="#164f73"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                          />
                                        </g>
                                      </svg>
                                    </a>
                                    <a
                                      href="#"
                                      data-bs-toggle="tooltip"
                                      title="Delete"
                                      class="delete-icon"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10.688"
                                        height="13.513"
                                        viewBox="0 0 10.688 13.513"
                                      >
                                        <g
                                          id="Group_127803"
                                          data-name="Group 127803"
                                          transform="translate(-655.004 -728.038)"
                                        >
                                          <path
                                            id="Icon_material-delete-forever"
                                            data-name="Icon material-delete-forever"
                                            d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                            transform="translate(647.904 723.938)"
                                            fill="none"
                                            stroke="#DC3912"
                                            strokeWidth="0.8"
                                          />
                                        </g>
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                                {/* <canvas
                                  id="areaOfOpportunityByRetailer"
                                  width="500"
                                  height="300"
                                ></canvas> */}
                                <GoogleChart />
                              </div>
                              <div class="col-lg-6">
                                <div class="nla_graph-heading">
                                  <div class="nla_heading">
                                    <h5>Area of Opportunity by Retailer</h5>
                                    <div>
                                      <a href="#">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="13.058"
                                          height="12.924"
                                          viewBox="0 0 13.058 12.924"
                                        >
                                          <g
                                            id="Group_127802"
                                            data-name="Group 127802"
                                            transform="translate(-662.829 -728.333)"
                                          >
                                            <path
                                              id="Icon_feather-edit-2"
                                              data-name="Icon feather-edit-2"
                                              d="M12.021,3.756a1.7,1.7,0,0,1,2.406,2.406L6.308,14.28,3,15.182l.9-3.308Z"
                                              transform="translate(660.329 725.575)"
                                              fill="none"
                                              stroke="#164f73"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="1"
                                            />
                                          </g>
                                        </svg>
                                      </a>
                                      <a href="#">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="10.688"
                                          height="13.513"
                                          viewBox="0 0 10.688 13.513"
                                        >
                                          <g
                                            id="Group_127803"
                                            data-name="Group 127803"
                                            transform="translate(-655.004 -728.038)"
                                          >
                                            <path
                                              id="Icon_material-delete-forever"
                                              data-name="Icon material-delete-forever"
                                              d="M8.206,15.8a1.417,1.417,0,0,0,1.413,1.413h5.65A1.417,1.417,0,0,0,16.682,15.8V6.619H8.206Zm6.71-10.594L14.21,4.5H10.678l-.706.706H7.5V6.619h9.888V5.206Z"
                                              transform="translate(647.904 723.938)"
                                              fill="none"
                                              stroke="#164f73"
                                              strokeWidth="0.8"
                                            />
                                          </g>
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                {/* <canvas
                                  id="areaOfOpportunityByRetailer"
                                  width="500"
                                  height="300"
                                ></canvas> */}
                                <GoogleChart />
                              </div>
                            </div>
                          </div>

                          <div
                            className={
                              typeNotesExp === true
                                ? "nla_add-comment position-relative"
                                : "nla_add-comment nla_expan position-relative"
                            }
                          >
                            <textarea
                              name="type_note"
                              id=""
                              value={note3}
                              className="form-control"
                              placeholder="Type Notes..."
                              onChange={(e) => {
                                setNote3(e.target.value);
                              }}
                            ></textarea>
                            <div className="nla_add-comment-toggle-btn">
                              <i
                                className="fa-solid fa-floppy-disk"
                                onClick={noteSaveHandler}
                              ></i>
                              <i
                                className="fa-solid fa-plus"
                                onClick={typeNoteExpHandler}
                              ></i>
                            </div>
                          </div>
                          <div>
                            <h6>Previous Note:</h6>
                            <p className="mt-2">{notes.note3}</p>
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="nla_brand_logo">
                            {/* <h3>Brand Logo</h3> */}
                            <img src={project.company_logo} height={100}></img>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
      <Snackbar
        open={saveNote}
        autoHideDuration={3000}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {noteAlert}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Insights;
