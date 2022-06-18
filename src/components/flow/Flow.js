import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useSelector } from "react-redux";
import "./flow.css";
import useUndoable from "use-undoable";
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
  MiniMap,
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
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
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

  const onDragOver = useCallback((event, node) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  // const [toolTip, setToolTip] = useState(false);
  // const mouseEnterEvent = () => {
  //   setToolTip(true);
  // };
  // const mouseLeaveEvent = () => {
  //   setToolTip(false);
  // };
  const onDrop = useCallback(
    (event, node) => {
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
    saveclass.current = "save-button-unsaved";
  }, [nodes, edges]);
  const onShowOutput = () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      myoutput.current = flow;
      handleShow();
    }
  };
  // const [elements, setElements, { undo, canUndo, redo, canRedo }] =
  //   useUndoable(nodes);
  // useEffect(() => {
  //   setElements(nodes);
  // }, [nodes]);
  // useEffect(() => {
  //   // console.log(nodes);
  //   if (elements.length === 0 && !canUndo) {
  //     setNodes([]);
  //   }
  // }, [elements]);
  const onEdgeUpdate = () => {
    console.log("working");
    onSave();
  };
  const nodeDragEvent = (ev, node) => {
    // setElements((els) =>
    //   els.map((e) => {
    //     if (e.id === node.id) {
    //       let n = {
    //         ...elements.filter((e) => e.id === node.id)[0],
    //         position: node.position,
    //       };
    //       return n;
    //     }
    //     return e;
    //   })
    // );
  };
  // const undoHandler = () => {
  //   undo();
  // };
  useEffect(() => {
    onSave();
  }, [nodes, edges]);
  return (
    <>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          {/* <button onClick={undoHandler} disabled={!canUndo}>
            undo
          </button>
          <button onClick={() => redo()} disabled={!canRedo}>
            redo
          </button> */}
          <ReactFlow
            // nodes={elements}
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
            // elements={elements}
            // onEdgeUpdateEnd={onEdgeUpdate}
            onNodeDragStop={nodeDragEvent}
            // onNodeMouseEnter={mouseEnterEvent}
            // onNodeMouseLeave={mouseLeaveEvent}
          >
            <div className="save__controls">
              <button onClick={onSave}>save</button>
              {/* <button onClick={onRestore}>restore</button> */}
            </div>
            <MiniMap
              nodeStrokeColor={(n) => {
                if (n.data.label === "Read File ") {
                  return "#0041d0";
                }
                if (n.data.label === "Write File ") return "green";
                if (n.data.label === "Price Elasticity ") return "#ff0072";
              }}
              nodeColor={(n) => {
                if (n.data.label === "Read File") return "green";
                return "#fff";
              }}
              maskColor="rgb(0,0,0, 0.1)"
              // nodeStrokeColor="#000"
            />
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
