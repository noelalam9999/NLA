import { Handle, Position } from "react-flow-renderer";

function TextUpdaterNode({ data }) {
  return (
    <div className="text-updater-node xyz">
      <Handle type="source" className="" position={Position.Top} />
      <label>{data.label}</label>
      <Handle type="source" position="left" id="left" />
      <Handle type="target" position="right" />
      <Handle type="target" position={Position.Bottom} id="b" />
    </div>
  );
}

export default TextUpdaterNode;
