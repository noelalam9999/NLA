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

export default function EditProject(props) {
  const project_id = props.project_id;
  const [project, setProject] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [projectEditedAlert, setProjectEditedAlert] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [type, setType] = useState("");
  const [client, setClient] = useState("");
  const [product, setProduct] = useState("");
  const [version, setVersion] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [checkLogo, setCheckLogo] = useState("");

  const [file1, setFile1] = useState("");
  const [image, setImage] = useState(null);

  //   console.log("reload", reload);
  //   console.log("setReload", setReload);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await Api("GET", `api/project/${project_id}`);
      setProject(data);
    }
    fetchProduct();
  }, [load]);
  console.log(project);

  useEffect(() => {
    if (project) {
      setProjectName(project[0]?.project_name);
      setType(project[0]?.type_of_project);
      setClient(project[0]?.client_name);
      setProduct(project[0]?.product_name);
      setVersion(project[0]?.project_version);
      setCompanyLogo(project[0]?.company_logo);
      // setCheckLogo(project[0]?.company_logo);
    }
  }, [project]);

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

  console.log("companyLogo", companyLogo);

  //   ----------------------

  const createProject = async () => {
    setLoad(false);
    if (
      projectName !== "" &&
      type !== "" &&
      client !== "" &&
      product !== "" &&
      checkLogo !== ""
    ) {
      try {
        const formData = new FormData();
        formData.append("project_name", projectName);
        formData.append("type_of_project", type);
        formData.append("client_name", client);
        formData.append("product_name", product);
        formData.append("company_logo", checkLogo);
        formData.append("project_id", project_id);
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };

        let { data } = await Api("POST", "api/edit/project", formData, config)
          .then(function (response) {
            setProjectName("");
            setType("");
            setClient("");
            setProduct("");
            setVersion("");
            setCompanyLogo("");
            setCheckLogo("");
            setShow(false);
            setProjectEditedAlert(true);
            setTimeout(() => {
              props.onEdit();
              props.onHide();
              setProjectEditedAlert(false);
            }, 2000);

            setLoad(true);
          })
          .catch(function (response) {
            console.log(response);
          });

        if (data.status === 200) {
          setShow(false);
        }
      } catch (error) {}
    } else if (checkLogo == "") {
      try {
        // const formData = new FormData();
        // formData.append("project_name", projectName);
        // formData.append("type_of_project", type);
        // formData.append("client_name", client);
        // formData.append("product_name", product);
        // formData.append("project_id", project_id);
        const apiData = {
          project_name: projectName,
          type_of_project: type,
          client_name: client,
          product_name: product,
          project_id: project_id,
        };
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };

        let { data } = await Api(
          "POST",
          "api/edit/image/project",
          apiData,
          config
        )
          .then(function (response) {
            setProjectName("");
            setType("");
            setClient("");
            setProduct("");
            setVersion("");
            setShow(false);
            setProjectEditedAlert(true);
            setTimeout(() => {
              props.onEdit();
              props.onHide();
              setProjectEditedAlert(false);
            }, 2000);

            setLoad(true);
          })
          .catch(function (response) {
            console.log(response);
          });

        if (data.status === 200) {
          setShow(false);
        }
      } catch (error) {}
    } else {
      setShowAlert(true);
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
    if (companyLogo?.length === 0) {
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
    // if (companyLogo.length > 1) {
    //   document.querySelector("#companyLogo").style.borderColor = "#86b7fe";
    // }
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
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="nla_modal_banenr">
          <img src={createImg} alt="placeholder" className="img-fluid" />
        </div>
        {showAlert && (
          <>
            <Alert className="mb-2" variant="outlined" severity="info">
              Please fill all field including image
            </Alert>
          </>
        )}
        <form method="post" enctype="multipart/form-data">
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
                value={type}
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
                value={client}
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
                value={product}
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
                value={version}
                disabled
                onChange={(e) => setVersion(e.target.value)}
              />
            </div>
            <div className="nla_form_file_upload position-relative nla_form_field_block">
              <img src={uploadIcon} alt="" />
              {/* <label htmlFor="formFile">Upload Company Logo</label> */}
              {companyLogo?.length > 0 ? (
                <label htmlFor="formFile">{companyLogo}</label>
              ) : (
                <label htmlFor="formFile">Upload Company Logo*</label>
              )}
              <input
                className="form-control"
                type="file"
                id="formFile"
                value={""}
                accept="image/*"
                // placeholder="Upload Company Logo"
                // onChange={(e) => {
                //   imageHandler(e);
                // }}
                onChange={(e) => setCheckLogo(e.target.files[0])}
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
          onClick={createProject}
        >
          Update
        </button>
        <Snackbar open={projectEditedAlert} autoHideDuration={3000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Project edited successfully!
          </Alert>
        </Snackbar>
      </Modal.Footer>
    </div>
  );
}
