import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import Api from "../../services/Api";
import "../../css/style.css";
import projectDiagram from "../../assets/newIcons/awesome-project-diagram.svg";
import mergeType from "../../assets/newIcons/material-merge-type.svg";
import featherUser from "../../assets/newIcons/feather-user.svg";
import featherCodeSandBox from "../../assets/newIcons/feather-codesandbox.svg";
import metroVersion from "../../assets/newIcons/metro-versions.svg";
import uploadIcon from "../../assets/newIcons/ionic-ios-images.svg";
import createImg from "../../assets/images/new_project_create_image.png";
import Snackbar from "@mui/material/Snackbar";
import { getNativeSelectUtilityClasses } from "@mui/material";

export default function CreateProject(props) {
  const project_id = props.project_id;
  const project_name_from_designStudio = props.project_name;
  // console.log("addTodo: ", props.addTodo);
  // console.log("addProjectID: ", props.addProjectID);

  const [project, setProject] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [projectEditedAlert, setProjectEditedAlert] = useState(false);

  const [projectName, setProjectName] = useState(
    project_name_from_designStudio
  );
  const [type, setType] = useState("");
  const [client, setClient] = useState("");
  const [product, setProduct] = useState("");
  const [version, setVersion] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [checkLogo, setCheckLogo] = useState("");
  const [companyLogoType, setCompanyLogoType] = useState("");

  const [projectCreatedAlert, setProjectCreatedAlert] = useState(false);
  const [progress, setProgress] = useState();
  //Alert
  const [alertMsg, setAlertMsg] = useState("");

  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("center");

  const [file1, setFile1] = useState("");
  const [image, setImage] = useState(null);

  //User
  const authData = JSON.parse(localStorage.getItem("auth"));
  const userID = authData?.user_id;
  const user_id = authData?.user_id;

  //   console.log("reload", reload);
  //   console.log("setReload", setReload);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await Api("GET", `api/project/${project_id}`);
      setProject(data);
    }
    fetchProduct();
  }, [load]);
  // console.log(project);

  //   useEffect(() => {
  //     if (project) {
  //       setProjectName(project[0]?.project_name);
  //       setType(project[0]?.type_of_project);
  //       setClient(project[0]?.client_name);
  //       setProduct(project[0]?.product_name);
  //       setVersion(project[0]?.project_version);
  //       setCompanyLogo(project[0]?.company_logo);
  //       // setCheckLogo(project[0]?.company_logo);
  //     }
  //   }, [project]);

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
    // if (companyLogo?.length > 1) {
    //   document.querySelector("#companyLogo").style.borderColor = "#86b7fe";
    // }
  }, [projectName, type, client, product]);

  // console.log("companyLogo", companyLogo);

  //   -------------------------------------------------------------------------

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

  const createNewProject = async (e) => {
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
          .then(function (data) {
            // console.log("Create project response: ", data.data.projectID);
            setProjectName("");
            setType("");
            setClient("");
            setProduct("");
            setVersion("");
            setCompanyLogo([]);
            // setShow(false);
            // setLoad(true);
            setProjectCreatedAlert(true);

            setTimeout(() => {
              //   props.onCreate();
              setProjectCreatedAlert(false);
              props.onHide();
              props.addTodo(projectName);
              props.addProjectID(data.data.projectID);
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

        console.log("Create project response: ", data);

        if (data.status === 200) {
          console.log("Create project response: ", data);
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

  const imageHandler = (e) => {
    setFile1(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // ------------------------

  return (
    <div>
      <Modal.Header>
        <Modal.Title>Create Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="nla_modal_banenr">
          <img src={createImg} alt="placeholder" className="img-fluid" />
        </div>
        {showAlert && (
          <>
            <Alert className="mb-2" variant="outlined" severity="info">
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
                value={projectName}
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
                // value={type}
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
                // value={client}
                id="selectClientt"
                required
                onChange={(e) => setClient(e.target.value)}
              >
                <option selected value="">
                  Select Client
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
                // value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                <option selected value="">
                  Select Product
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
                // value={version}
                disabled
                // onChange={(e) => setVersion(e.target.value)}
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
            </div>
            {/* <p>{companyLogo}</p> */}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-outline-danger"
          data-bs-toggle="modal"
          data-bs-target="#cancelProject"
          onClick={props.onHide}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={createNewProject}
        >
          Create
        </button>
        <Snackbar
          open={projectCreatedAlert}
          autoHideDuration={3000}
          key={vertical + horizontal}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Project Created successfully!
          </Alert>
        </Snackbar>
      </Modal.Footer>
    </div>
  );
}
