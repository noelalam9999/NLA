import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Northlight_Analytics_Final_Logo.png";
import video from "../../assets/images/video_login_page.mp4";
import "../../css/style.css";
import Spinner from "react-bootstrap/Spinner";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Modal, Button } from "react-bootstrap";
const Login = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMsg] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });
  const loginHandlerSub = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://nla-backend-1.herokuapp.com/api/login",
        // "http://localhost:5000/api/login",
        {
          username,
          password,
        },
        config
      );

      if (data.code === 200) {
        navigate("/dashboard");
        localStorage.setItem("auth", JSON.stringify(data.data));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error", error.response);
      setErrorMsg(error?.response?.data?.msg);
    }
  };
  const loginHandler = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }
    loginHandlerSub();
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Forgot Password?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{ marginTop: 15 }}>
            Please email techsupport@northanalytics.com to reset the password.
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  // ---------------------------------------------

  return (
    <>
      {/* <!-- Header Start --> */}
      <header className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-6 col-4">
            <div className="nla_logo">
              <Link to="/login">
                <img
                  src={logo}
                  alt="Northlight Analytics Logo"
                  className="img-fluid"
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-7 col-md-6 col-8">
            <div className="theme-title">
              <h1 className="mb-0">
                NORTHLIGHT <span>GAZELLE</span>
              </h1>
            </div>
          </div>
        </div>
      </header>
      {/* <!-- Header End --> */}
      <div className="container-fluid">
        <div className="row align-items-center login-wrapper">
          <div className="col-lg-5 col-md-6 px-0">
            <div className="nla_login-sidebar">
              <div className="ratio ratio-1x1">
                <video
                  id="myVideo"
                  poster=""
                  width="300"
                  height="150"
                  autoPlay
                  loop
                  muted
                >
                  <source src={video} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-6 px-0">
            <div className="nla_login_data_wrapper">
              <div className="login-form">
                <h4 className="pb-3">
                  <strong>Analyze business, discover strategies.</strong>
                </h4>
                <p>
                  A path breaking analytics platform that harmonizes advanced
                  analytics and business decision making.
                </p>
                {showAlert && (
                  <>
                    <Alert variant="outlined" severity="info">
                      Please fill all fields
                    </Alert>
                  </>
                )}
                <div className="login-form-block">
                  <form noValidate>
                    <div className="row align-items-center">
                      <div className="col-lg-12 col-md-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          name="username"
                          // onChange={handleChange}
                          onChange={(e) => setUsername(e.currentTarget.value)}
                          required
                        />
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          // onChange={handleChange}
                          onChange={(e) => setPassword(e.currentTarget.value)}
                          required
                        />
                      </div>
                      <div className="col-lg-12 col-md-12">
                        {error !== "" ? (
                          <Stack
                            sx={{ width: "100%", marginTop: "5px" }}
                            spacing={2}
                          >
                            <Alert variant="outlined" severity="info">
                              {error}
                            </Alert>
                          </Stack>
                        ) : null}
                      </div>
                      <div className="col-6 nla_top-spacing">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ width: "166.81px" }}
                          // onClick={(e) => loginHandler()}
                          onClick={loginHandler}
                        >
                          {loading === true ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            </>
                          ) : (
                            "Login"
                          )}
                        </button>
                      </div>

                      <div className="col-6 text-end nla_top-spacing">
                        <a
                          style={{ cursor: "pointer" }}
                          className="nla_forgot_psw"
                          onClick={() => setModalShow(true)}
                        >
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="login_footer_wrapper">
                <div className="login_footer">
                  <div className="row align-items-center">
                    <div className="col-lg-4 col-md-4">
                      <div className="nla_help_and_support">
                        <a href="#">
                          <i className="fa-solid fa-circle-question"></i> Help &
                          Support
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-8 text-end">
                      <div className="nla_help_and_support">
                        <p className="mb-0">
                          &copy; 2022 NorthLight Analytic Partners |
                          Confidential and Proprietary
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </>
  );
};

export default Login;
