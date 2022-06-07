import React, { memo, FC } from "react";

import { Handle, Position, NodeProps } from "react-flow-renderer";
// const nodeStyles: CSSProperties = {
//   padding: "10px 15px",
//   border: "1px solid #ddd",
// };
const customNode = () => {
  return (
    <div>
      <Handle type="source" id="left" position={Position.Left} />
      <Handle type="source" id="right" position={Position.Right} />
      <Handle type="source" id="top" position={Position.Top} />
      <Handle type="source" id="bottom" position={Position.Bottom} />
    </div>
  );
};

export default customNode;
