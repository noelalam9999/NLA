import { useState, useEffect } from "react";
import { Handle, Position } from "react-flow-renderer";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

function TextUpdaterNode({ data }) {
  const styleSet = (props) => {
    if (props.label === "Price ") {
      return { border: "1px solid #174f73", fontStyle: "italic" };
    } else if (props.label === "Read File ") {
      return { border: "1px solid #174f73", fontWeight: "bold" };
    } else if (props.label === "Write File ") {
      return { border: "1px solid #174f73", fontWeight: "normal" };
    } else {
      return { border: "1px solid #174f73" };
    }
  };
  const styleSetClass = (data) => {
    if (data.label === "Price ") {
      return "text-updater-node xyz price";
    } else if (data.label === "Read File ") {
      return "text-updater-node xyz readFile";
    } else if (data.label === "Write File ") {
      return "text-updater-node xyz writeFile";
    } else {
      return "text-updater-node xyz";
    }
  };
  // useEffect(() => {
  //   try {
  //     // const edge = document.getElementsByClassName("react-flow__container");
  //     // edge[0].classList.remove("selected");
  //     const node = document.getElementsByClassName("react-flow__nodes");
  //     node[0].setAttribute("id", "my-class");
  //     const newClass = document.getElementById("my-class");
  //     if (newClass.getElementsByClassName("selected")) {
  //       const remove = newClass.getElementsByClassName("selected");
  //       console.log("working", remove);
  //       remove[0].classList.remove("selected");
  //     }
  //     // }
  //   } catch (e) {}
  // }, []);
  return (
    // <OverlayTrigger
    //   placement="top"
    //   delay={{ show: 500, hide: 250 }}
    //   overlay={
    //     <Tooltip id="overlay-example">
    //       Click on Node to delete (For Windows press Backspace and for Mac press
    //       Delete)
    //     </Tooltip>
    //   }
    // >
    <div className={styleSetClass(data)} style={styleSet(data)}>
      <Handle type="source" className="" position={Position.Top} />
      <label>{data.label}</label>
      <Handle type="source" position="left" id="left" />
      <Handle type="target" position="right" />
      <Handle type="target" position={Position.Bottom} id="b" />
    </div>
    // </OverlayTrigger>
  );
}

export default TextUpdaterNode;
