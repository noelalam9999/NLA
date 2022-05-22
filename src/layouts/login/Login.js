import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Northlight_Analytics_Final_Logo.png";
import video from "../../assets/images/video_login_page.mp4";
import "../../css/style.css";
const Login = () => {
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
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
      const api = `https://nla-backend.herokuapp.com/api/login `;
      var res = await axios.get(api, loginState);
      console.log(res);

      if (res.status === 200) {
        console.log(res);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error", error.response);
    }
  };
  const loginHandler = (e) => {
    e.preventDefault();
    loginHandlerSub();
  };
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
                <div className="login-form-block">
                  <form onSubmit={loginHandler}>
                    <div className="row align-items-center">
                      <div className="col-lg-12 col-md-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          name="username"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-6 nla_top-spacing">
                        <input
                          type="submit"
                          value="Login"
                          className="btn btn-primary"
                        />
                      </div>
                      <div className="col-6 text-end nla_top-spacing">
                        <a href="" className="nla_forgot_psw">
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
      </div>
    </>
  );
};

export default Login;
