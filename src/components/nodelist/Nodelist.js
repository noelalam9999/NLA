import React, { useState } from "react";
import "./nodelist.css";
import "../../css/style.css";
import { Accordion, Form } from "react-bootstrap";
import { BsGear, BsSearch, BsFilterLeft } from "react-icons/bs";
const Nodelist = () => {
  const onDragStart = (event, node_type, node_label) => {
    event.dataTransfer.setData("application/reactflow", node_type);
    event.dataTransfer.setData("node_data", node_label);
    //alert(node_type);
    event.dataTransfer.effectAllowed = "move";
  };

  const [menu, setMenu] = useState("head1");

  function onMenuClick() {
    if (menu == "head1") {
      setMenu("head2");
    } else {
      setMenu("head1");
    }
  }
  return (
    <div class="right_sidebar" data-postion="right">
      {menu == "head1" && (
        <div className="heads">
          <div className="head1">
            <BsGear className="head-icon1"></BsGear>
            <h6>Operators</h6>
          </div>
          <div onClick={() => onMenuClick()} className="head2">
            <BsFilterLeft className="head-icon2"></BsFilterLeft>
            <h6>Parameters</h6>
          </div>
        </div>
      )}
      {menu == "head2" && (
        <>
          <div className="heads">
            <div onClick={() => onMenuClick()} className="head1-2">
              <BsGear className="head-icon1"></BsGear>
              <h6>Operators</h6>
            </div>
            <div className="head2-1">
              <BsFilterLeft className="head-icon2"></BsFilterLeft>
              <h6>Parameters</h6>
            </div>
          </div>
        </>
      )}

      {menu == "head1" && (
        <>
          <BsSearch className="searchIcon"></BsSearch>
          <input
            className="search-field"
            placeholder="Search Operators"
          ></input>
          <div className="nodes-list">
            <Accordion defaultActiveKey={["1"]}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Topics</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Data Access</Accordion.Header>
                <Accordion.Body>
                  <h6
                    className="node"
                    onDragStart={(event) =>
                      onDragStart(event, "input", "Read File")
                    }
                    draggable
                  >
                    Read File
                  </h6>
                  <h6
                    className="node"
                    onDragStart={(event) =>
                      onDragStart(event, "output", "Write File")
                    }
                    draggable
                  >
                    Write File
                  </h6>
                  <h6
                    className="node"
                    onDragStart={(event) =>
                      onDragStart(event, "default", "$ Pricing")
                    }
                    draggable
                  >
                    $ Pricing
                  </h6>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Modeling</Accordion.Header>
                <Accordion.Body>
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Cleansing</Accordion.Header>
                <Accordion.Body>
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </>
      )}

      {menu == "head2" && (
        <>
          <h4 className="align-left">Read</h4>
          <h6 className="align-left">Logverbosity</h6>
          <Form.Select size="lg" aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <div className="dropdowns"></div>
          <h6 className="align-left">Send Mail</h6>
          <Form.Select size="lg" aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <div className="dropdowns"></div>
          <Form.Group controlId="formFile" className="mb-3">
            <h6 className="align-left">Log File</h6>
            <Form.Control type="file" />
          </Form.Group>
          <div className="dropdowns"></div>
          <h4 className="align-left">Write</h4>
          <h6 className="align-left">Logverbosity</h6>
          <Form.Select size="lg" aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <div className="dropdowns"></div>
          <h6 className="align-left">Send Mail</h6>
          <Form.Select size="lg" aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <div className="dropdowns"></div>
          <Form.Group controlId="formFile" className="mb-3">
            <h6 className="align-left">Log File</h6>
            <Form.Control type="file" />
          </Form.Group>
          <div className="dropdowns"></div>
          <h4 className="align-left">Pricing</h4>
          <h6 className="align-left">Logverbosity</h6>
          <Form.Select size="lg" aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <div className="dropdowns"></div>
          <h6 className="align-left">Send Mail</h6>
          <Form.Select size="lg" aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <div className="dropdowns"></div>
          <Form.Group controlId="formFile" className="mb-3">
            <h6 className="align-left">Log File</h6>
            <Form.Control type="file" />
          </Form.Group>
        </>
      )}
    </div>
  );
};

export default Nodelist;
