// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { DataTransformNode } from './nodes/dataTransformNode';
import { ApiCallNode } from './nodes/apiCallNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { FileProcessorNode } from './nodes/fileProcessorNode';
import { DelayNode } from './nodes/delayNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  dataTransform: DataTransformNode,
  apiCall: ApiCallNode,
  conditional: ConditionalNode,
  fileProcessor: FileProcessorNode,
  delay: DelayNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  deleteSelectedNodes: state.deleteSelectedNodes,
  deleteSelectedEdges: state.deleteSelectedEdges,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [selectedElements, setSelectedElements] = useState({ nodes: [], edges: [] });
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      deleteSelectedNodes,
      deleteSelectedEdges
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
          
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // Handle keyboard events for delete functionality
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Delete' || event.key === 'Backspace') {
                event.preventDefault();
                
                // Check if any nodes are selected
                const hasSelectedNodes = nodes.some(node => node.selected);
                const hasSelectedEdges = edges.some(edge => edge.selected);
                
                if (hasSelectedNodes) {
                    deleteSelectedNodes();
                } else if (hasSelectedEdges) {
                    deleteSelectedEdges();
                }
            }
        };

        // Add event listener
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [nodes, edges, deleteSelectedNodes, deleteSelectedEdges]);

    // Track selected elements
    useEffect(() => {
        const selectedNodes = nodes.filter(node => node.selected);
        const selectedEdges = edges.filter(edge => edge.selected);
        setSelectedElements({ nodes: selectedNodes, edges: selectedEdges });
    }, [nodes, edges]);

    // Handle delete button click
    const handleDeleteClick = () => {
        if (selectedElements.nodes.length > 0) {
            deleteSelectedNodes();
        } else if (selectedElements.edges.length > 0) {
            deleteSelectedEdges();
        }
    };

    return (
        <>
        <div ref={reactFlowWrapper} className="w-full" style={{height: 'calc(100vh - 60px)', backgroundColor: '#2D2E2E'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                className="workflow-editor"
                zoomOnScroll={false}
                panOnScroll={true}
                panOnScrollMode="free"
            >
                <Background 
                    color="white" 
                    gap={gridSize} 
                    size={1}
                    className="opacity-90"
                />
                <Controls 
                    position="bottom-left"
                    className="!bottom-4"
                />
                <MiniMap 
                   
                />
            </ReactFlow>
            
            {/* Delete Button - Shows when elements are selected */}
            {(selectedElements.nodes.length > 0 || selectedElements.edges.length > 0) && (
                <div className="absolute top-28 -translate-y-1/2">
                    <button 
                        onClick={handleDeleteClick}
                        className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
                        title={`Delete ${selectedElements.nodes.length > 0 ? `${selectedElements.nodes.length} node(s)` : `${selectedElements.edges.length} edge(s)`}`}
                    >
                        
                        Delete
                    </button>
                </div>
            )}
            
         
          
        </div>
        </>
    )
}
