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
  applyNodeChanges,
  // InteractiveMinimap,
  // MiniMapProps,
} from "react-flow-renderer";
import useUndo from "use-undo";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import allActions from "../../store/index";

import Api from "../../services/Api";

// -----------------------------------------------------------
const nodeTypes = { textUpdater: TextUpdaterNode };

const Flow = () => {
  const dispatch = useDispatch();
  const project_id = useParams().id;
  const dataCheck = useSelector((data) => data.getNodesReducer);
  // console.log("project_id from Flow: ", dataCheck);

  // UseEffect:

  // useEffect(() => {
  //   if (project_id) {
  //     // console.log("modelData: ", data);
  //     // dispatch(allActions.getNodesAction.getNodesState(project_id));
  //     // dispatch(nodeState(project_id));

  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     async function fetchProjects() {
  //       let { data } = await Api("GET", `api/get/model/${project_id}`, config);
  //       // console.log("GetNodeAction from Action: ", data);
  //       const nodesData = {
  //         edges: data?.output_file?.edges,
  //         nodes: data?.output_file?.nodes,
  //         viewport: data?.output_file?.viewport,
  //       };
  //       if (data === "Empty nodes") {
  //         console.log("Empty nodes");
  //         localStorage.removeItem("nodesFromDatabase");
  //       } else {
  //         console.log("nodesData ", nodesData);
  //         localStorage.setItem("nodesFromDatabase", JSON.stringify(nodesData));
  //       }
  //     }

  //     fetchProjects();
  //   }
  // }, [project_id]);

  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  // -------------------------------
  const flowKey = "example-flow";
  // const flowKey = "nodesFromDatabase";

  const getNodeId = () => `randomnode_${+new Date()}`;

  // const prevNodesOfProject = JSON.parse(
  //   localStorage.getItem("nodesFromDatabase")
  // );

  // console.log("prevNodes: ", prevNodes);

  const initialNodes = [
    // {
    //   id: prevNodes[0]?.nodes.node_id,
    //   data: { label: prevNodes[0]?.nodes.name },
    //   position: {
    //     x: prevNodes[0]?.nodes.position_x,
    //     y: prevNodes[0]?.nodes.position_y,
    //   },
    // },
    // { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 200 } },
    // { id: "3", data: { label: "Node 3" }, position: { x: 100, y: 300 } },
  ];
  const saveclass = useRef("save-button");
  const initialEdges = [
    // { id: "e1-2", source: "1", target: "2", type: "customedge" },
  ];
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [nodesData, setNodesData] = useState({});

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
      localStorage.setItem("nodesFromDatabase", JSON.stringify(flow));
      // console.log("flow: ", flow);
      // localStorage.setItem("nodes_data", JSON.stringify(flow));
      saveclass.current = "save-button";
    }
  }, [rfInstance]);
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem("nodesData_from_database"));

      setNodesData(flow);
      // console.log("This is flow from onRestore: ", nodesData);
      // console.log("This is from localstorage: ", flow);
      // const flow = JSON.parse(localStorage.getItem(flowKey));
      // console.log("flowKey: ", flow.nodes);
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
      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = rfInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const getNodeIdCust1 = () => `randomnode_${+new Date()}`;
      const getNodeIdCust2 = () => `randomnode_${+new Date() + 20}`;
      const getNodeIdCust3 = () => `randomnode_${+new Date() + 40}`;
      const custId1 = getNodeIdCust1();
      const custId2 = getNodeIdCust2();
      const custId3 = getNodeIdCust3();
      const customNode = [
        {
          width: 150,
          height: 39,
          id: custId1,
          type: "textUpdater",
          position: {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          },
          data: {
            label: "Read File",
          },
          selected: false,
          positionAbsolute: {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          },
          dragging: false,
          name: "cluster",
        },
        {
          width: 150,
          height: 39,
          id: custId2,
          type: "textUpdater",
          position: {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top + 100,
          },
          data: {
            label: "Price",
          },
          selected: false,
          positionAbsolute: {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top + 100,
          },
          dragging: false,
          name: "cluster",
        },
        {
          width: 150,
          height: 39,
          id: custId3,
          type: "textUpdater",
          position: {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top + 200,
          },
          data: {
            label: "Write File",
          },
          selected: true,
          positionAbsolute: {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top + 200,
          },
          dragging: false,
          name: "cluster",
        },
      ];
      const customEdge = [
        {
          source: custId2,
          sourceHandle: null,
          target: custId1,
          targetHandle: "b",
          arrowHeadType: "arrowclosed",
          type: "customedge",
          id: "reactflow__edge-" + custId2 + "-" + custId1,
        },
        {
          source: custId3,
          sourceHandle: null,
          target: custId2,
          targetHandle: "b",
          arrowHeadType: "arrowclosed",
          type: "customedge",
          id: "reactflow__edge-" + custId3 + "-" + custId2,
        },
      ];

      if (node_data === "Price Elasticity") {
        setNodes((nds) => nds.concat(customNode));
        setEdges((eds) => eds.concat(customEdge));
      } else {
        const newNode = {
          id: getNodeId(),
          type: "textUpdater",
          position,
          data: { label: `${node_data} ` },
        };
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [rfInstance]
  );
  // console.log(nodes);
  // console.log(edges);
  useEffect(() => {
    const ab = document.getElementsByClassName("selectable");
    for (var i = 0; i < ab.length; i++) {
      ab[i].classList.remove("selected");
    }
  }, []);
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
  useEffect(() => {
    onSave();
  }, [nodes, edges]);
  let newArray = ["Read File", "Write File", "Price"];
  newArray.map((e) => localStorage.setItem(e + " Counter", 0));
  useEffect(() => {
    // localStorage.setItem("writeFileCounter", 1);
    for (let k = 0; k < newArray.length; k++) {
      for (let i = 0; i < nodes.length; i++) {
        // if (k !== 0 && i !== 0) {
        if (nodes[i].data.label.includes(newArray[k])) {
          let counter = parseInt(
            localStorage.getItem(newArray[k] + " Counter")
          );
          nodes[i].data.label = newArray[k] + " (" + counter + ")";
          localStorage.setItem(newArray[k] + " Counter", counter + 1);
        }
        // }
      }
    }
    // console.log(nodes?.data?.label?.indexOf("Read File"));
    // if(nodes.filter(node=>node.data.label.includes("Read File").length>0){
    // }
    // if (nodes.filter((e) => e.data.label === "Read File ").length > 0) {
    //   console.log("Working");
    // }
    // const newArray = nodes.filter(nodes =>
    //   return nodes.data.label.includes("Read File")
    // );
    // for (let j = 0; j < nodes.length; j++) {
    //   if (j !== 0) {
    //     if (nodes[j].data.label.includes("Write File")) {
    //       let writeFileCounter = parseInt(
    //         localStorage.getItem("writeFileCounter")
    //       );
    //       nodes[j].data.label = "Write File (" + writeFileCounter + ")";
    //       localStorage.setItem("writeFileCounter", writeFileCounter + 1);
    //     }
    //   }
    // }
  }, [nodes]);

  return (
    <>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          {nodes.length === 0 ? (
            <>
              <div className="empty">So Empty</div>
            </>
          ) : null}
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
            onNodeClick={(e, node) => {
              // console.log("Working", node);
              dispatch(
                allActions.getNodeClickStateAction.getNodeStateResponse(
                  node.data.label
                )
              );
            }}
          >
            <div className="save__controls">
              {/* <button onClick={onSave}>save</button> */}
              {/* <button onClick={onRestore}>restore</button> */}
            </div>

            <MiniMap
              nodeStrokeColor={(n) => {
                // if (n.data.label === "Read File ") {
                //   return "#0041d0";
                // } else if (n.data.label === "Write File ") return "green";
                // else if (n.data.label === "Price ") return "#ff0072";
                // else {
                //   return "#000";
                // }
                return "rgb(23, 79, 115)";
              }}
              nodeColor={(n) => {
                // if (n.data.label === "Read File") return "green";
                return "#fff";
              }}
              maskColor="rgb(0,0,0, 0.1)"
              // nodeStrokeColor="#000"
              // draggable={true}
              // zoomable={true}
              // clickable={true}
            />
            <Background variant="dots" gap={12} size={0.5} />
            <Controls className="flow-controls"></Controls>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Current Flow</Modal.Title>
        </Modal.Header>
        <Modal.Body>{JSON.stringify(myoutput.current)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
