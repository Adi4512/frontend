// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    deleteSelectedNodes: () => {
      const { nodes, edges } = get();
      const selectedNodeIds = nodes.filter(node => node.selected).map(node => node.id);
      
      if (selectedNodeIds.length > 0) {
        // Remove selected nodes
        const updatedNodes = nodes.filter(node => !node.selected);
        
        // Remove edges connected to deleted nodes
        const updatedEdges = edges.filter(edge => 
          !selectedNodeIds.includes(edge.source) && 
          !selectedNodeIds.includes(edge.target)
        );
        
        set({
          nodes: updatedNodes,
          edges: updatedEdges,
        });
      }
    },
    deleteSelectedEdges: () => {
      const { edges } = get();
      const selectedEdgeIds = edges.filter(edge => edge.selected).map(edge => edge.id);
      
      if (selectedEdgeIds.length > 0) {
        set({
          edges: edges.filter(edge => !edge.selected),
        });
      }
    },
  }));
