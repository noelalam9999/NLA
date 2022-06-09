import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import "./flow.css";
import { Modal, Button } from "react-bootstrap";
import TextUpdaterNode from "../customNode/TextUpdaterNode";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  getSmoothStepPath,
  addEdge,
  useReactFlow,
  Background,
  getMarkerEnd,
  getEdgeCenter,
  Controls,
} from "react-flow-renderer";
const nodeTypes = { textUpdater: TextUpdaterNode };
const Flow = () => {
  const flowKey = "example-flow";
  const getNodeId = () => `randomnode_${+new Date()}`;
  const initialNodes = [
    // {
    //   id: "1",
    //   type: "input",
    //   data: { label: "Read File" },
    //   position: { x: 580, y: 200 },
    // },
    // {
    //   id: "2",
    //   type: "default",
    //   data: { label: "$ Pricing" },
    //   position: { x: 450, y: 50 },
    // },
  ];
  const saveclass = useRef("save-button");
  const initialEdges = [
    { id: "e1-2", source: "1", target: "2", type: "customedge" },
  ];
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);
  const [show, setShow] = useState(false);
  const myoutput = useRef(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { setViewport } = useReactFlow();

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, arrowHeadType: "arrowclosed", type: "customedge" },
          eds
        )
      ),
    [setEdges]
  );
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      saveclass.current = "save-button";
      // console.log("Current Flow is \n",flow);
      console.log("working");
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      console.log(flow);
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    restoreFlow();
  }, [setNodes, setViewport]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: "Added node" },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      //console.log("drop-called");
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const node_data = event.dataTransfer.getData("node_data");
      //alert(node_data);
      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = rfInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getNodeId(),
        type: "textUpdater",
        position,
        data: { label: `${node_data} ` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [rfInstance]
  );
  const customEdge = ({
    id,
    source,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style,
    target,
    arrowHeadType,
    markerEndId,
  }) => {
    const edgePath = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
    return (
      <>
        <path
          id={id}
          className="react-flow__edge-path "
          d={edgePath}
          markerEnd={markerEnd}
        />
        <foreignObject>
          <body></body>
        </foreignObject>
      </>
    );
  };

  const edgeTypes = {
    customedge: customEdge,
  };

  const graphStyles = { width: "100%", height: "530px" };

  useEffect(() => {
    if (performance.navigation.type === 1) {
      onRestore();
    } else {
      console.log("This page is not reloaded");
    }
  }, [performance.navigation.type]);
  useEffect(() => {
    //console.log("is moved");

    saveclass.current = "save-button-unsaved";
  }, [nodes, edges]);
  const onShowOutput = () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      myoutput.current = flow;
      handleShow();
    }
  };
  return (
    <>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setRfInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={graphStyles}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
          >
            <div className="save__controls">
              <button onClick={onSave}>save</button>
            </div>
            <Background variant="dots" gap={12} size={0.5} />
            <Controls className="flow-controls"></Controls>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Current Flow</Modal.Title>
        </Modal.Header>
        <Modal.Body>{JSON.stringify(myoutput.current)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
