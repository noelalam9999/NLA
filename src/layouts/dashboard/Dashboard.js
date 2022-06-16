import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { Tooltip, OverlayTrigger, Badge, Modal } from "react-bootstrap";
import moment from "moment";
import Tour from "reactour";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
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
import projectDiagram from "../../assets/newIcons/awesome-project-diagram.svg";
import mergeType from "../../assets/newIcons/material-merge-type.svg";
import featherUser from "../../assets/newIcons/feather-user.svg";
import featherCodeSandBox from "../../assets/newIcons/feather-codesandbox.svg";
import metroVersion from "../../assets/newIcons/metro-versions.svg";
import uploadIcon from "../../assets/newIcons/ionic-ios-images.svg";
import Api from "../../services/Api";
import EditProject from "./EditProject";
import Snackbar from "@mui/material/Snackbar";
import copyIcon from "../../assets/newIcons/ionic-md-copy.svg";
import downloadIcon from "../../assets/newIcons/feather-download.svg";
import introImg from "../../assets/images/main-navigation-intro-image.png";
// import DateRangePicker from "react-daterange-picker";
// import "react-daterange-picker/dist/css/react-calendar.css";
// import { extendMoment } from "moment-range";
// const momentAg = extendMoment(moment);
import { DateRangePicker } from "rsuite";
const Dashboard = () => {
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("center");

  const [projectListFilter, setProjectListFilter] = useState("pin");

  const [modalShow, setModalShow] = useState(false);
  const [projectID, setProjectID] = useState("");
  const [projectCreatedAlert, setProjectCreatedAlert] = useState(false);
  const [projectPinAlert, setProjectPinAlert] = useState(false);
  const [pinAlertText, setPinAlertText] = useState("");
  const [searchEmptyChecker, setSearchEmptyChecker] = useState(false);
  // Project and Pagination
  const [projects, setProjects] = useState([]);
  const [projectsOrderByPin, setProjectsOrderByPin] = useState([]);
  const [pagination, setPagination] = useState([]);

  const [searchResultpagination, setSearchResultpagination] = useState([]);
  const [orderByPinProjectPagination, setOrderByPinProjectPagination] =
    useState([]);

  const [progress, setProgress] = useState();

  const [pinnedProjectsTotalPages, setPinnedProjectsTotalPages] = useState(1);

  //Pagination
  const [page, setPage] = useState(1);
  const [orderByPinPage, setOrderByPinPage] = useState(1);
  const [searchResultPage, setSearchResultPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [load, setLoad] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [customTabPinnedProject, setCustomTabPinnedProject] = useState(true);
  const [customTabRecentProject, setCustomTabRecentProject] = useState(false);
  const [columnState, setColumnState] = useState();
  const [show, setShow] = useState(false);
  const [showCancelProject, setShowCancelProject] = useState(false);

  // const [PUBLIC_URL, SETPUBLIC_URL] = useState("http://localhost:5000/");

  //Search
  const [project_name, setSearchByProjectName] = useState("");
  const [project_date, setProjectDate] = useState("");
  const [searchByAuthor, setSearchByAuthor] = useState("");

  const [filteredPinData, setFilteredPinData] = useState("");
  const [filteredPinDataByDate, setFilteredPinDataByDate] = useState("");
  const [filteredUnPinData, setFilteredUnPinData] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [filteredDataError, setFilteredDataError] = useState("");

  const [projectName, setProjectName] = useState("");
  const [type, setType] = useState("");
  const [client, setClient] = useState("");
  const [product, setProduct] = useState("");
  const [version, setVersion] = useState();
  const [companyLogo, setCompanyLogo] = useState([]);
  const [companyLogoType, setCompanyLogoType] = useState("");

  //User
  const authData = JSON.parse(localStorage.getItem("auth"));
  const userID = authData?.user_id;
  const user_id = authData?.user_id;

  //Date
  const [dateType, setDateType] = useState("text");

  //Alert
  const [alertMsg, setAlertMsg] = useState("");

  //Badge
  const [newProject, setNewProject] = useState(false);

  //Searching
  const customTabHandlerPinnedProjects = () => {
    setCustomTabPinnedProject(true);
    setCustomTabRecentProject(false);
  };
  const customTabHandlerRecentProjects = async () => {
    setCustomTabPinnedProject(false);
    setCustomTabRecentProject(true);

    // console.log("orderByPinPage: ", orderByPinPage);

    try {
      let { data } = await Api(
        "GET",
        `api/projects/order-by-${projectListFilter}/${user_id}/?page=${orderByPinPage}&limit=${limit}`
      );

      if (data) {
        if (data?.message === "greater" || data?.message === "lesser") {
          // console.log("I am in greater");
          setOrderByPinProjectsHandler(data?.page);
        } else {
          setProjectsOrderByPin(data?.rows);
          setOrderByPinProjectPagination(data?.pagination);
        }

        console.log("\n\nData of OrderbyPin: ", data?.message);

        // console.log("\n\ndata of Order by Pin: ", data.rows);
        // console.log("\n\nOrder by Pin Pagination: ", data.pagination);
      }
    } catch (error) {
      console.log("Error", error.response);
    }

    // setProjectsOrderByPin()
  };
  const columnHandler = (e) => {
    setColumnState(e.target.value);
  };
  const companyLogoHandler = (e) => {
    setCompanyLogo(e.target.files);
    setCompanyLogoType(e.target.files[0]?.type);
    imageChecker(e.target.files[0]?.type);
  };

  const imageChecker = (props) => {
    // console.log(props);
    if (companyLogo.length > 0) {
      const formData = new FormData();
      for (const file of companyLogo) formData.append("company_logo", file);
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (event) => {
        const percentage = parseInt((event.loaded / event.total) * 100);
        console.log(percentage);
      };
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
          console.log("error"); // Handle error here
        }
        console.log("success"); // Handle success here
      };
      xhr.open("POST", "https://httpbin.org/post", true);
      xhr.send(formData);
      console.log("AAAAAAAAAA", companyLogo);

      // String filename = textfile.split(".")[0];

      console.log("companyLogo", companyLogo.type);
    }
    // Type
    if (companyLogoType !== "image/jpeg" || companyLogoType !== "image/png") {
      // alert("Invalid Image type");
      // setCompanyLogo([]);
      // setShowAlert(true);
      // setAlertMsg("Invalid Image type");
      // setTimeout(() => {
      //   setShowAlert(false);
      // }, 3000);
    }
  };

  const createProject = async (e) => {
    setLoad(false);
    if (
      userID !== "" &&
      projectName !== "" &&
      type !== "" &&
      client !== "" &&
      product !== "" &&
      companyLogo !== [] &&
      companyLogoType !== ""
    ) {
      try {
        const formData = new FormData();
        formData.append("user_id", userID);
        formData.append("project_name", projectName);
        formData.append("slug", "project");
        formData.append("type_of_project", type);
        formData.append("client_name", client);
        formData.append("product_name", product);
        formData.append("project_version", 1);
        formData.append("company_logo", companyLogo[0]);
        formData.append("pin_project", 0);
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        console.log(companyLogo[0]);
        const upload = {
          onUploadProgress: (data) => {
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        };

        let { data } = await Api(
          "POST",
          "api/add/project",
          formData,
          config,
          upload
        )
          .then(function (response) {
            setProjectName("");
            setType("");
            setClient("");
            setProduct("");
            setVersion("");
            setCompanyLogo([]);
            setShow(false);
            setLoad(true);
            setProjectCreatedAlert(true);
            setTimeout(() => {
              setProjectCreatedAlert(false);
            }, 3000);
          })
          .catch(function (data) {
            if (data?.response?.data === "Project exists") {
              setShowAlert(true);
              // setCreateProjectAlert("Project name already exists");
              setAlertMsg("Project name already exists");
              setTimeout(() => {
                setShowAlert(false);
              }, 3000);
            }
          });

        if (data.status === 200) {
          setShow(false);
        }
      } catch (error) {}
    } else {
      setShowAlert(true);
      setAlertMsg("Please fill all fields");
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    if (projectName === "") {
      document.querySelector("#projectName").focus();
      document.querySelector("#projectName").style.borderColor = "#eb3434";
    }
    if (type === "") {
      document.querySelector("#exampleDataList").focus();
      document.querySelector("#exampleDataList").style.borderColor = "#eb3434";
    }
    if (client === "") {
      document.querySelector("#selectClientt").focus();
      document.querySelector("#selectClientt").style.borderColor = "#eb3434";
    }
    if (product === "") {
      document.querySelector("#product").focus();
      document.querySelector("#product").style.borderColor = "#eb3434";
    }
    if (companyLogo.length === 0) {
      document.querySelector("#companyLogo").focus();
      document.querySelector("#companyLogo").style.border = "1px solid #eb3434";
      document.querySelector("#product").style.borderColor = "#eb3434";
    }
    if (projectName !== "") {
      document.querySelector("#projectName").style.borderColor = "#86b7fe";
    }
    if (type !== "") {
      document.querySelector("#exampleDataList").style.borderColor = "#86b7fe";
    }
    if (client !== "") {
      document.querySelector("#selectClientt").style.borderColor = "#86b7fe";
    }
    if (product !== "") {
      document.querySelector("#product").style.borderColor = "#86b7fe";
    }
    if (companyLogo.length > 1) {
      document.querySelector("#companyLogo").style.borderColor = "#86b7fe";
    }
  };
  // <--------------------date Range Picker-------------------------->
  const [selectedDate, setDate] = useState(new Date().toLocaleString() + "");
  const [value, setValue] = React.useState();
  const [start_date, setStartDate] = useState();
  const [end_date, setEndDate] = useState();
  const handleChange = (value) => {
    setValue(value);
    setStartDate(value ? value[0].toISOString() : "");
    setEndDate(value ? value[1].toISOString() : "");
  };
  //Search
  const searchDataHandler = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // setSearchEmptyChecker(false);
    const apiData = {
      project_name,
      project_date,
      user_id,
    };

    if (project_name && project_date) {
      const res = await Api("POST", "api/project/search", apiData, config);

      setFilteredData(res.data);
      if (res.status === 200) {
        setFilterVisible(true);
      }
    } else if (project_name) {
      const res = await Api(
        "POST",
        `api/project/name/?page=${searchResultPage}&limit=${limit}`,
        { project_name, user_id },
        config
      );

      console.log("res: ", res.data);

      if (res?.data?.message === "greater" || res?.data?.message === "lesser") {
        searchedPageHandler(res?.data?.page);
      } else {
        setFilteredData(res.data.rows);
        setSearchResultpagination(res.data.pagination);
      }

      // setFilteredData(res.data.rows);
      // setSearchResultpagination(res.data.pagination);
      if (res.status === 200) {
        setFilterVisible(true);
      }
    } else if (start_date && end_date) {
      console.log("start_date", start_date);
      console.log(end_date);
      const res = await Api(
        "POST",
        "api/project/date",
        { start_date, end_date, user_id },
        config
      );
      setFilteredData(res.data);
      if (res.status === 200) {
        setFilterVisible(true);
        console.log(res);
      }
    } else if (searchByAuthor) {
      console.log("searchByAuthor", searchByAuthor);
      setFilteredData(1);
      setFilterVisible(true);
    } else if (project_name === "" && project_date === "") {
      setSearchEmptyChecker(true);
      setTimeout(() => {
        setSearchEmptyChecker(false);
      }, 3000);
    } else {
      console.log("Invalid");
    }
  };

  //Pin or Unpin Project
  const PinUnPinHandler = async (project_id) => {
    setLoad(false);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await Api("POST", "api/pin/project", { project_id }, config);
      if (res.status === 200) {
        setLoad(true);
        setPinAlertText(res.data);
        setProjectPinAlert(true);
        setTimeout(() => {
          setProjectPinAlert(false);
        }, 3000);
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
    setSearchByAuthor("");
    setSearchByProjectName("");
    setValue("");
    setFilteredData("");
    setFilterVisible(false);
  };

  //Pagination for All Products --------------------------------
  var pages = [];
  for (let i = pagination?.page; i <= pagination?.endingLink; i++) {
    pages.push(i);
  }

  // Searched Result Pages
  var searchedPages = [];
  for (
    let i = searchResultpagination?.page;
    i <= searchResultpagination?.endingLink;
    i++
  ) {
    searchedPages.push(i);
  }

  // Order By Pin Pagination
  var orderByPinProjectPages = [];
  for (
    let i = orderByPinProjectPagination?.page;
    i <= orderByPinProjectPagination?.endingLink;
    i++
  ) {
    orderByPinProjectPages.push(i);
  }

  // console.log("orderByPinProjectPages", orderByPinProjectPages);

  const setPageHandler = (page_no) => {
    if (page_no) {
      setPage(page_no);
      setLoad(true);
    }
  };

  const setSearchedPageHandler = (page_no) => {
    if (page_no) {
      setSearchResultPage(page_no);
      searchDataHandler();
    }
  };

  const searchedPageHandler = (page_no) => {
    if (page_no) {
      setSearchResultPage(page_no);
      setLoad(true);
    }
  };

  const setOrderByPinProjectsHandler = (page_no) => {
    if (page_no) {
      setOrderByPinPage(page_no);
      setLoad(true);
    }
  };

  //Pagination for Search Products
  // ----------------------------------------------

  //Main UseEffect
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (customTabPinnedProject === true) {
      async function fetchProjects() {
        const { data } = await Api(
          "GET",
          `api/projects/${userID}/?page=${page}&limit=${limit}`
          // config
        );

        if (data) {
          if (data?.message === "greater" || data?.message === "lesser") {
            // console.log("I am in greater");
            setPageHandler(data?.page);
          } else {
            setProjects(data.rows);
            setPagination(data.pagination);

            const filteredPin = data.rows?.filter((val) => {
              return val.pin_project === 1;
            });

            //Getting Pinned Projects
            if (page <= pinnedProjectsTotalPages) {
              const response = await Api(
                "POST",
                `api/pinned/projects/?page=${page}&limit=${limit}`,
                { user_id },
                config
              );
              setPinnedProjectsTotalPages(
                response.data.pagination.numberOfPages
              );
              setFilteredPinDataByDate(response.data.rows);
            }

            const filteredUnPin = data.rows?.filter((val) => {
              return val.pin_project === 0;
            });

            // setFilteredPinDataByDate(filteredPin);
            setFilteredPinData(filteredPin);
            setFilteredUnPinData(filteredUnPin);
          }
        }
      }
      fetchProjects();
    }

    setLoad(false);
  }, [load, limit]);

  // useEffect(() => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   async function fetchProjects() {
  //     //Getting Pinned Projects
  //     const response = await Api(
  //       "POST",
  //       `api/pinned/projects/?page=${page}&limit=${limit}`,
  //       { user_id },
  //       config
  //     );

  //     console.log("response: ", response.data.rows);
  //     // console.log("user: ", user_id);

  //     // setFilteredPinData(response.data.rows);
  //     setFilteredPinDataByDate(response?.data?.rows);
  //   }

  //   fetchProjects();
  // }, []);

  // -----------------------------------------------------

  for (let i = 0; i < filteredUnPinData; i++) {
    isNewProject(i.date_created);
  }

  useEffect(() => {
    scroll();
  }, [load]);

  useEffect(() => {
    imageChecker();
  }, [companyLogoType]);

  useEffect(() => {
    if (project_name !== "" || project_date !== "" || searchByAuthor !== "") {
      searchDataHandler();
    }
  }, [limit, searchResultPage]);

  useEffect(() => {
    if (customTabPinnedProject === false) {
      customTabHandlerRecentProjects();
    }
  }, [limit, orderByPinPage, load, projectListFilter]);

  // Add project field color changer useEffect
  useEffect(() => {
    if (projectName !== "") {
      document.querySelector("#projectName").style.borderColor = "#86b7fe";
    }
    if (type !== "") {
      document.querySelector("#exampleDataList").style.borderColor = "#86b7fe";
    }
    if (client !== "") {
      document.querySelector("#selectClientt").style.borderColor = "#86b7fe";
    }
    if (product !== "") {
      document.querySelector("#product").style.borderColor = "#86b7fe";
    }
    if (companyLogo.length > 1) {
      document.querySelector("#companyLogo").style.borderColor = "#86b7fe";
    }
  }, [projectName, type, client, product, companyLogo]);

  // console.log("pagination", pagination);

  // Edit Project Modal

  const handleEditProjectModal = (project_id) => {
    setProjectID(project_id);
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
        <EditProject project_id={projectID} {...props} />
      </Modal>
    );
  }

  //ToolTip
  // const renderTooltip = (props) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     Simple Tool tip
  //   </Tooltip>
  // );

  // New Project Badge
  const todayDate = new Date();
  const isNewProject = (orderCreatedDate) => {
    console.log("orderCreatedDate: ", orderCreatedDate);
    const todayDate = new Date();

    if (moment(todayDate).diff(moment(orderCreatedDate)) / 3600000 <= 1) {
      console.log("True");
      setNewProject(true);
    } else {
      setNewProject(false);
    }
  };

  //Pop up model open for once
  const [isTourOpen, setIsTourOpen] = useState(true);
  const [currentStep, setStep] = useState();
  const steps = [
    {
      selector: "#leftSideBar",
      mutationObservables: [`[data-tour-id="mask-position-recompute"]`],
      content: () => (
        <>
          <div class="tooltip-wrapper-cb">
            <img height="150" src={introImg} class="img-fluid" alt="" />
            <h3 class="tooltip-title-cb">Main Navigation</h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt.
            </p>
            <div class="custom-checkbox">
              <input
                type="checkbox"
                id="tootltip-show-box"
                name="tootltip-show-box"
                value="Show"
              />
              <label for="tootltip-show-box"> Don't show again</label>
            </div>
          </div>
        </>
      ),
      style: {
        position: "fixed",
        left: "15px",
      },
    },
    {
      selector: "#filter_box_wrapper",
      content: () => (
        <div class="tooltip-wrapper-cb">
          <img
            height="150"
            src={require("../../assets/images/model-search-intro-image.png")}
            class="img-fluid"
            alt=""
          />
          <h3 class="tooltip-title-cb">Model Search</h3>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt.
          </p>
          <div class="custom-checkbox">
            <input
              type="checkbox"
              id="tootltip-show-box"
              name="tootltip-show-box"
              value="Show"
            />
            <label for="tootltip-show-box"> Don't show again</label>
          </div>
        </div>
      ),
      // position: [160, 250],
      style: {
        position: "absolute",
        left: "0px",
        top: "20px",
        maxWidth: "340px",
        width: "100%",
        // webkitTransform: "none",
        // transform: "translate(128px,360px)",
      },
    },
    {
      selector: "#circleS",
      content: () => (
        <div class="tooltip-wrapper-cb">
          <img
            height="150"
            src={require("../../assets/images/new_project_create_image.png")}
            class="img-fluid"
            alt=""
          />
          <h3 class="tooltip-title-cb">Create New Model</h3>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt.
          </p>
          <div class="custom-checkbox">
            <input
              type="checkbox"
              id="tootltip-show-box"
              name="tootltip-show-box"
              value="Show"
            />
            <label for="tootltip-show-box"> Don't show again</label>
          </div>
        </div>
      ),
      position: "-10px",
    },
  ];
  useEffect(() => {
    // let gg = document.getElementsByClassName("introjs-tooltip");
    // gg.style.position = "absolute";
    // gg.setAttribute("id", "gg");
    let gg = document.getElementsByClassName("eLnbMN");
    console.log(gg);
  }, []);
  useEffect(() => {
    try {
      if (currentStep === 0) {
        const mask = document
          .getElementById("mask-main")
          .getElementsByTagName("rect")[1];
        mask.style.rx = "0";
      }
      if (currentStep === 1) {
        const ab = document.getElementsByClassName("beJLEE");
        ab[0].style.position = "absolute";
        const mask = document
          .getElementById("mask-main")
          .getElementsByTagName("rect")[1];
        mask.style.rx = "8";
      }
      if (currentStep === 2) {
        const ab = document.getElementsByClassName("beJLEE");
        ab[0].style.position = "absolute";
        const element = document.getElementsByClassName("sc-eCYdqJ");
        element[0].classList.add("step3");
        const mask = document
          .getElementById("mask-main")
          .getElementsByTagName("rect")[1];
        mask.style.rx = "25";
      }
    } catch (e) {
      console.log("Issue");
    }
  }, [currentStep]);
  const disableBody = (target) => disableBodyScroll(target);
  const enableBody = (target) => enableBodyScroll(target);

  //Project filter in Project list view
  const filterHandler = async (filter) => {
    if (filter === "pin") {
      setProjectListFilter("pin");
    } else if (filter === "date") {
      setProjectListFilter("date");
    }
  };

  return (
    <div>
      <Header />
      {/* <!-- Sidebar Start --> */}
      <Sidebar />
      {/* <!-- Body Content Start --> */}
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        className="introjs-tooltip"
        onRequestClose={() => setIsTourOpen(false)}
        prevButton={"prev"}
        nextButton={"Next"}
        showNumber={false}
        maskSpace={0}
        showNavigationNumber={false}
        lastStepNextButton={"Done"}
        getCurrentStep={(curr) => setStep(curr)}
        // onAfterOpen={disableBody}
        // onBeforeClose={enableBody}
      />
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

        <div className="filter_box_wrapper" id="filter_box_wrapper">
          <div className="row">
            <div className="col-lg-3">
              <div className="nla_search">
                <img src={awUser} alt="user" className="img-fluid" />
                <input
                  type="search"
                  className="form-control mb-0 ms-3"
                  placeholder="Search Model by Author"
                  value={searchByAuthor}
                  onChange={(e) => setSearchByAuthor(e.target.value)}
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
                  value={project_name}
                  onChange={(e) => setSearchByProjectName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="nla_search">
                <img src={calenderSvg} alt="list" className="img-fluid" />
                {/* <input
                  placeholder="mm/dd/yyyy"
                  type={dateType}
                  onFocus={() => setDateType("date")}
                  // onBlur={() => setDateType("text")}
                  className="form-control mb-0 ms-3"
                  onChange={(e)
                   => setProjectDate(e.target.value)}
                /> */}
                <DateRangePicker
                  className=""
                  appearance="default"
                  placeholder="Search by Date Range"
                  style={{ width: 260 }}
                  value={value}
                  onChange={handleChange}
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
                          filteredPinDataByDate?.length === 0
                            ? { visibility: "hidden" }
                            : null
                        }
                      >
                        <p className="mb-0">
                          Pinned Projects
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 250 }}
                            overlay={
                              <Tooltip id="overlay-example">
                                Pinned projects
                              </Tooltip>
                            }
                          >
                            <a>
                              <img
                                src={feather}
                                alt=""
                                className="alertAligns"
                              />
                            </a>
                          </OverlayTrigger>
                        </p>
                      </div>
                      <div className="col-lg-7 text-end">
                        <div
                          className="nla_add_new_project_btn"
                          id="nla_add_new_project_btn"
                        >
                          <div
                            onClick={handleShow}
                            style={{ cursor: "pointer" }}
                          >
                            <p>
                              <span>
                                <img
                                  id="circleS"
                                  src={plusCircle}
                                  alt="Create New Project"
                                />
                              </span>
                              Create New Project
                            </p>
                          </div>
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 250 }}
                            overlay={
                              <Tooltip id="overlay-example">
                                Create new project
                              </Tooltip>
                            }
                          >
                            <a href="#">
                              <img
                                src={feather}
                                alt=""
                                className="alertAligns"
                              />
                            </a>
                          </OverlayTrigger>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`nla_grid_view_wrapper ${columnState}`}>
                    {filteredPinDataByDate?.length > 0
                      ? filteredPinDataByDate?.map((elem, id) => (
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
                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 250 }}
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>Share</Tooltip>
                                  }
                                >
                                  <a>
                                    <i className="fa-solid fa-share-nodes"></i>
                                  </a>
                                </OverlayTrigger>

                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 250 }}
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>
                                      Duplicate
                                    </Tooltip>
                                  }
                                >
                                  <a>
                                    <i className="fa-regular fa-copy"></i>
                                  </a>
                                </OverlayTrigger>

                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 250 }}
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>
                                      Download
                                    </Tooltip>
                                  }
                                >
                                  <a>
                                    <i className="fa-solid fa-download"></i>
                                  </a>
                                </OverlayTrigger>

                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 250 }}
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>Edit</Tooltip>
                                  }
                                >
                                  <a
                                    onClick={() =>
                                      handleEditProjectModal(elem?.project_id)
                                    }
                                  >
                                    <i className="fa-solid fa-pen"></i>
                                  </a>
                                </OverlayTrigger>
                              </div>
                              <div className="nla_additional_links">
                                {/* <Link to="/design-studio">
                                  Design Studio{" "}
                                  <i className="fa-solid fa-pencil"></i>
                                </Link> */}
                                <Link to={`/design-studio/${elem?.project_id}`}>
                                  Design Studio{" "}
                                  <i className="fa-solid fa-pencil"></i>
                                </Link>

                                <Link to={`/insights/${elem?.project_id}`}>
                                  Insights <i className="fa-solid fa-eye"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {filteredUnPinData === "" ? null : (
                    <>
                      <div className="nla_view_top_title_and_add_new_block">
                        <div className="row align-items-center">
                          <div className="col-lg-5">
                            <p className="mb-3">
                              Recently Created
                              <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 250 }}
                                overlay={
                                  <Tooltip id="overlay-example">
                                    Recently created projects
                                  </Tooltip>
                                }
                              >
                                <a href="#">
                                  <img
                                    src={feather}
                                    className="alertAligns"
                                    alt=""
                                  />
                                </a>
                              </OverlayTrigger>
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className={`nla_grid_view_wrapper ${columnState}`}>
                    {filteredUnPinData !== ""
                      ? filteredUnPinData?.map((elem, id) => (
                          <div
                            className="nla_item_box_col first-nla-itembox"
                            data-position="right"
                            key={id}
                          >
                            <div className="nla_item_box">
                              {moment(todayDate).diff(
                                moment(elem.date_created)
                              ) /
                                3600000 <=
                              1 ? (
                                <div className="mb-3 badgeNew">
                                  <Badge bg="success">NEW</Badge>
                                </div>
                              ) : (
                                ""
                              )}

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
                              {/* <img
                                src={PUBLIC_URL + elem.company_logo}
                                alt="no image"
                              ></img> */}
                              {/* <img src={elem.company_logo} alt="no image"></img> */}
                              <div className="nla_shared_link_block">
                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 250 }}
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>Share</Tooltip>
                                  }
                                >
                                  <a>
                                    <i className="fa-solid fa-share-nodes"></i>
                                  </a>
                                </OverlayTrigger>

                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 250 }}
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>
                                      Duplicate
                                    </Tooltip>
                                  }
                                >
                                  <a>
                                    <i className="fa-regular fa-copy"></i>
                                  </a>
                                </OverlayTrigger>

                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 250 }}
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>
                                      Download
                                    </Tooltip>
                                  }
                                >
                                  <a>
                                    <i className="fa-solid fa-download"></i>
                                  </a>
                                </OverlayTrigger>

                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 250 }}
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>Edit</Tooltip>
                                  }
                                >
                                  <a
                                    onClick={() =>
                                      handleEditProjectModal(elem?.project_id)
                                    }
                                  >
                                    <i className="fa-solid fa-pen"></i>
                                  </a>
                                </OverlayTrigger>
                              </div>
                              <div className="nla_additional_links">
                                <Link to={`/design-studio/${elem?.project_id}`}>
                                  Design Studio{" "}
                                  <i className="fa-solid fa-pencil"></i>
                                </Link>
                                <Link to={`/insights/${elem?.project_id}`}>
                                  Insights <i className="fa-solid fa-eye"></i>
                                </Link>
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
                                <img
                                  src={feather}
                                  alt=""
                                  className="alertAligns"
                                />
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
                        {filteredData?.length > 0 ? (
                          filteredData?.map((elem, id) => (
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
                                    onClick={() =>
                                      PinUnPinHandler(elem.project_id)
                                    }
                                  ></i>
                                </div>
                                <h3>{elem.project_name}</h3>
                                <div className="nla_shared_link_block">
                                  <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 250 }}
                                    overlay={
                                      <Tooltip id={`tooltip-top`}>
                                        Share
                                      </Tooltip>
                                    }
                                  >
                                    <a>
                                      <i className="fa-solid fa-share-nodes"></i>
                                    </a>
                                  </OverlayTrigger>

                                  <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 250 }}
                                    overlay={
                                      <Tooltip id={`tooltip-top`}>
                                        Duplicate
                                      </Tooltip>
                                    }
                                  >
                                    <a>
                                      <i className="fa-regular fa-copy"></i>
                                    </a>
                                  </OverlayTrigger>

                                  <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 250 }}
                                    overlay={
                                      <Tooltip id={`tooltip-top`}>
                                        Download
                                      </Tooltip>
                                    }
                                  >
                                    <a>
                                      <i className="fa-solid fa-download"></i>
                                    </a>
                                  </OverlayTrigger>

                                  <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 250 }}
                                    overlay={
                                      <Tooltip id={`tooltip-top`}>Edit</Tooltip>
                                    }
                                  >
                                    <a
                                      onClick={() =>
                                        handleEditProjectModal(elem?.project_id)
                                      }
                                    >
                                      <i className="fa-solid fa-pen"></i>
                                    </a>
                                  </OverlayTrigger>
                                </div>
                                <div className="nla_additional_links">
                                  <Link
                                    to={`/design-studio/${elem?.project_id}`}
                                  >
                                    Design Studio{" "}
                                    <i className="fa-solid fa-pencil"></i>
                                  </Link>
                                  <Link to={`/insights/${elem?.project_id}`}>
                                    Insights <i className="fa-solid fa-eye"></i>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p style={{ paddingLeft: "15px" }}>
                            No search results found
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <p style={{ paddingLeft: "15px" }}>
                      No search results found
                    </p>
                  )}
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
                  <div className="col-lg-7">
                    <p className="mb-3">Recently Created & Pinned Projects</p>
                  </div>

                  <div className="col-lg-2">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      // defaultValue={"value"}
                      onChange={(e) => filterHandler(e.target.value)}
                    >
                      <option value="pin">Sort by Pin</option>
                      <option value="date">Sort by Date</option>
                    </select>
                  </div>

                  <div className="col-lg-3 text-end mb-3">
                    <div className="nla_add_new_project_btn">
                      <div onClick={handleShow} style={{ cursor: "pointer" }}>
                        <p>
                          <span>
                            <img src={plusCircle} alt="Create New Project" />
                          </span>
                          Create New Project
                        </p>
                      </div>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 250 }}
                        overlay={
                          <Tooltip id="overlay-example">
                            Create new project
                          </Tooltip>
                        }
                      >
                        <a href="#">
                          <img src={feather} alt="" className="alertAligns" />
                        </a>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
              </div>

              <div className="nla_list_view_wrapper">
                <div className="nla_list_view_header">
                  <div className="nla_modal">Projects</div>
                  <div className="nla_date">Created Date</div>
                  <div className="nla_action">Actions</div>
                </div>
                <div className="nla_list_view_body_content">
                  <ul>
                    {projectsOrderByPin !== ""
                      ? projectsOrderByPin?.map((elem, id) => (
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
                                onClick={() => PinUnPinHandler(elem.project_id)}
                              ></i>
                              {elem.project_name}
                            </div>
                            <div className="nla_date">
                              <div>
                                <p style={{ paddingLeft: "21px" }}>
                                  {elem?.date_created?.substring(0, 10)}
                                </p>
                              </div>
                            </div>
                            <div className="nla_action">
                              <div>
                                Insights{" "}
                                <Link to={`/insights/${elem?.project_id}`}>
                                  <img src={featherEye} alt="eye" />
                                </Link>
                              </div>
                              <div>
                                Design Studio{" "}
                                <Link to={`/design-studio/${elem?.project_id}`}>
                                  <img src={openPencil} alt="Pencil" />{" "}
                                </Link>
                              </div>
                              <div>
                                Share{" "}
                                <a href="#">
                                  {" "}
                                  <img src={share} alt="Share" />{" "}
                                </a>
                              </div>
                              <div>
                                Edit{" "}
                                <a
                                  onClick={() =>
                                    handleEditProjectModal(elem?.project_id)
                                  }
                                >
                                  {" "}
                                  <img src={openPencil} alt="Pencil" />{" "}
                                </a>
                              </div>
                              <div>
                                Duplicate{" "}
                                <a href="#">
                                  {/* <i className="fa-solid fa-copy"></i> */}
                                  <img src={copyIcon} alt="copy Icon" />
                                </a>
                              </div>
                              <div>
                                Download{" "}
                                <a href="#">
                                  {/* <i className="fa-solid fa-download"></i> */}
                                  <img src={downloadIcon} alt="" />
                                </a>
                              </div>
                            </div>
                          </li>
                        ))
                      : ""}

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
            {filteredData !== "" &&
            filteredData !== null &&
            filteredData?.length !== 0 ? (
              <>
                {searchResultpagination?.page > 1 && (
                  <a
                    onClick={() => setSearchedPageHandler(searchResultPage - 1)}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="ion-chevron-left"></i>
                  </a>
                )}
                <ul>
                  {searchResultpagination?.results?.previous?.page && (
                    <li
                      // className={page === pagination.page ? "current" : ""}
                      style={{ cursor: "pointer" }}
                    >
                      <a
                        onClick={() =>
                          setSearchedPageHandler(
                            searchResultpagination?.results?.previous?.page
                          )
                        }
                      >
                        {searchResultpagination?.results?.previous?.page}
                      </a>
                    </li>
                  )}
                </ul>

                <ul>
                  {searchedPages?.map((page, index) => (
                    <li
                      key={index}
                      className={
                        page === searchResultpagination?.page ? "current" : ""
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <a onClick={() => setSearchedPageHandler(page)}>{page}</a>
                    </li>
                  ))}
                </ul>
                {searchResultpagination?.page <
                  searchResultpagination?.numberOfPages && (
                  <a
                    onClick={() => setSearchedPageHandler(searchResultPage + 1)}
                    style={{ cursor: "pointer" }}
                    className="arrow"
                  >
                    <i className="ion-chevron-right"></i>
                  </a>
                )}
              </>
            ) : customTabPinnedProject !== true ? (
              <>
                {orderByPinProjectPagination?.page > 1 && (
                  <a
                    onClick={() =>
                      setOrderByPinProjectsHandler(orderByPinPage - 1)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <i className="ion-chevron-left"></i>
                  </a>
                )}
                <ul>
                  {orderByPinProjectPagination?.results?.previous?.page && (
                    <li
                      // className={page === orderByPinProjectPagination.page ? "current" : ""}
                      style={{ cursor: "pointer" }}
                    >
                      <a
                        onClick={() =>
                          setOrderByPinProjectsHandler(
                            orderByPinProjectPagination?.results?.previous?.page
                          )
                        }
                      >
                        {orderByPinProjectPagination?.results?.previous?.page}
                      </a>
                    </li>
                  )}
                </ul>
                <ul>
                  {orderByPinProjectPages?.map((page, index) => (
                    <li
                      key={index}
                      className={
                        page === orderByPinProjectPagination.page
                          ? "current"
                          : ""
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <a onClick={() => setOrderByPinProjectsHandler(page)}>
                        {page}
                      </a>
                    </li>
                  ))}
                </ul>
                {orderByPinProjectPagination?.page <
                  orderByPinProjectPagination?.numberOfPages && (
                  <a
                    onClick={() =>
                      setOrderByPinProjectsHandler(orderByPinPage + 1)
                    }
                    style={{ cursor: "pointer" }}
                    className="arrow"
                  >
                    <i className="ion-chevron-right"></i>
                  </a>
                )}
              </>
            ) : (
              <>
                {pagination?.page > 1 && (
                  <a
                    onClick={() => setPageHandler(page - 1)}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="ion-chevron-left"></i>
                  </a>
                )}
                <ul>
                  {pagination?.results?.previous?.page && (
                    <li
                      // className={page === pagination.page ? "current" : ""}
                      style={{ cursor: "pointer" }}
                    >
                      <a
                        onClick={() =>
                          setPageHandler(pagination?.results?.previous?.page)
                        }
                      >
                        {pagination?.results?.previous?.page}
                      </a>
                    </li>
                  )}
                </ul>
                <ul>
                  {pages?.map((page, index) => (
                    <li
                      key={index}
                      className={page === pagination.page ? "current" : ""}
                      style={{ cursor: "pointer" }}
                    >
                      <a onClick={() => setPageHandler(page)}>{page}</a>
                    </li>
                  ))}
                </ul>
                {pagination?.page < pagination?.numberOfPages && (
                  <a
                    onClick={() => setPageHandler(page + 1)}
                    style={{ cursor: "pointer" }}
                    className="arrow"
                  >
                    <i className="ion-chevron-right"></i>
                  </a>
                )}
              </>
            )}
          </nav>

          {/* <!-- Pagination End --> */}

          <div className="nla_result_show_block">
            <div>
              <label htmlFor="">Show</label>
              <select
                className="form-select"
                aria-label="Default select example"
                // defaultValue={"value"}
                onChange={(e) => setLimit(e.target.value)}
              >
                {/* <option value="5">5 Project</option> */}
                <option value="10">10 Project</option>
                <option value="15">15 Project</option>
                <option value="20">20 Project</option>
                <option value="25">25 Project</option>
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
              {showAlert && (
                <>
                  <Alert className="mb-2" variant="outlined" severity="error">
                    {alertMsg}
                  </Alert>
                </>
              )}
              <form method="post" encType="multipart/form-data">
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
                      placeholder="Select Type*"
                      onChange={(e) => setType(e.target.value)}
                    />
                    <datalist id="selectType" className="my-option">
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
                      id="selectClientt"
                      required
                      onChange={(e) => setClient(e.target.value)}
                    >
                      <option selected value="">
                        Select Client*
                      </option>
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
                      id="product"
                      required
                      onChange={(e) => setProduct(e.target.value)}
                    >
                      <option selected value="">
                        Select Product*
                      </option>
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
                      disabled
                      // value="1"
                    />
                  </div>
                  <div className="nla_form_file_upload position-relative nla_form_field_block">
                    <img src={uploadIcon} alt="" />
                    {/* <label htmlFor="formFile">Upload Company Logo</label> */}
                    {companyLogo?.length > 0 ? (
                      <label htmlFor="formFile">{companyLogo[0].name}</label>
                    ) : (
                      <label
                        htmlFor="formFile"
                        id="companyLogo"
                        style={{ color: "#acb0b1" }}
                      >
                        Upload Company Logo*
                      </label>
                    )}
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      accept="image/png, image/jpeg"
                      // onChange={(e) => setCompanyLogo(e.target.files)}
                      onChange={companyLogoHandler}
                    />
                    {/* <ProgressBar now={progress} label={`${progress}%`} /> */}
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
                <p>Pressing yes will cancel the project</p>
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
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            onEdit={() => setLoad(true)}
          />
        </div>
      </div>
      <Snackbar
        open={searchEmptyChecker}
        autoHideDuration={3000}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Please fill at least one field
        </Alert>
      </Snackbar>
      <Snackbar
        open={projectCreatedAlert}
        autoHideDuration={3000}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Project created successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={projectPinAlert}
        autoHideDuration={3000}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {pinAlertText}
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  );
};

export default Dashboard;
