import { Handle, Position } from "react-flow-renderer";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

function TextUpdaterNode({ data }) {
  console.log(data);
  const styleSet = (props) => {
    console.log(props);
    if (props.label === "Price Elasticity ") {
      return { border: "1px solid red", fontStyle: "italic" };
    } else if (props.label === "Read File ") {
      return { border: "1px solid blue", fontWeight: "bold" };
    } else if (props.label === "Write File ") {
      return { border: "1px solid green", fontWeight: "normal" };
    } else {
      return { border: "1px solid black" };
    }
  };
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 250 }}
      overlay={
        <Tooltip id="overlay-example">
          Click On Node and press backspace to delete node
        </Tooltip>
      }
    >
      <div className="text-updater-node xyz" style={styleSet(data)}>
        <Handle type="source" className="" position={Position.Top} />
        <label>{data.label}</label>
        <Handle type="source" position="left" id="left" />
        <Handle type="target" position="right" />
        <Handle type="target" position={Position.Bottom} id="b" />
      </div>
    </OverlayTrigger>
  );
}

export default TextUpdaterNode;
