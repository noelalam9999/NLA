import React from "react";
import chatBubbles from "../../assets/images/ionic-ios-chatbubbles.svg";

const Footer = () => {
  return (
    <div>
      {/* <!-- Footer Start  --> */}
      <footer className="nla_theme_footer">
        <p className="mb-0">Copyrights</p>
        <a href="#" className="nla_link">
          Privacy Policy
        </a>
        <p className="mb-0">2022 NLA</p>
      </footer>
      <div className="nla_help-and-faqs-block">
        <div className="position-relative help_toggle_btn">
          <img src={chatBubbles} alt="Help and FAQs" className="img-fluid" />
          <span>?</span>
        </div>
        <div className="nla_help-and-faqs-poppup">
          <div>
            <h6>
              Welcome to the Northlight Analytic Have any question? Search Here
            </h6>
            <div className="my-4">
              <form className="d-flex position-relative">
                <input
                  className="form-control mb-0"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>
            <h6>FAQs</h6>
            <ul className="ps-3">
              <li>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy?
              </li>
              <li>Lorem ipsum dolor sit amet, consetetur sadipscing elit?</li>
              <li>Lorem ipsum dolor sit amet?</li>
            </ul>
            <div className="text-center">
              <a href="tel:+919876543210" className="btn btn-primary">
                Call us Now <i className="fa-solid fa-phone"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* // <!-- Footer End  --></li> */}
    </div>
  );
};

export default Footer;
