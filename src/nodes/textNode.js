// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode, createHandle } from './BaseNode';

export const TextNode = ({ id, data, onDataChange }) => {
  const [textValue, setTextValue] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Function to extract variables from text using regex
  const extractVariables = (text) => {
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    
    while ((match = variableRegex.exec(text)) !== null) {
      const variableName = match[1].trim();
      if (!matches.includes(variableName)) {
        matches.push(variableName);
      }
    }
    
    return matches;
  };


  const splitTextForHighlighting = (text) => {
    const parts = [];
    let lastIndex = 0;
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push({
          text: text.slice(lastIndex, match.index),
          isVariable: false
        });
      }
      
      // Add the variable match
      parts.push({
        text: match[0], // Full match including {{ }}
        isVariable: true
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        text: text.slice(lastIndex),
        isVariable: false
      });
    }
    
    return parts;
  };

  // Function to calculate dynamic dimensions based on text content
  const calculateDimensions = (text) => {
    const lines = text.split('\n');
    const maxLineLength = Math.max(...lines.map(line => line.length));
    
    // Base dimensions
    const baseWidth = 200;
    const baseHeight = 80;
    const charWidth = 8; // Approximate character width
    const lineHeight = 20; // Approximate line height
    
    // Calculate dynamic width (minimum 200px, maximum 400px)
    const calculatedWidth = Math.max(baseWidth, Math.min(400, maxLineLength * charWidth + 40));
    
    // Calculate dynamic height based on number of lines
    const calculatedHeight = Math.max(baseHeight, lines.length * lineHeight + 60);
    
    return {
      width: calculatedWidth,
      height: calculatedHeight
    };
  };

  // Update variables when text changes
  useEffect(() => {
    const newVariables = extractVariables(textValue);
    setVariables(newVariables);
    
    // Notify parent component of data changes
    if (onDataChange) {
      onDataChange({
        text: textValue,
        variables: newVariables
      });
    }
  }, [textValue, onDataChange]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [textValue]);

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  // Create input handles for detected variables
  const inputHandles = variables.map((variable, index) => 
    createHandle(`input-${variable}`, Position.Left, {
      top: `${20 + (index * 20)}px`,
      background: '#ffffff',
      border: '2px solid #e5e7eb'
    })
  );

  // Create output handle
  const outputHandles = [
    createHandle('output', Position.Right, {
      background: '#ffffff',
      border: '2px solid #e5e7eb'
    })
  ];

  // Calculate dynamic dimensions
  const dimensions = calculateDimensions(textValue);

  // Custom field renderer for enhanced textarea
  const renderCustomTextarea = () => (
    <div className="space-y-2">
      <textarea
        ref={textareaRef}
        value={textValue}
        onChange={handleTextChange}
        placeholder="Enter text content. Use {{variableName}} for variables."
        className="w-full min-h-[60px] border border-gray-300 rounded px-2 py-2 text-xs font-mono resize-none outline-none bg-white"
        style={{ 
          lineHeight: '1.2',
          padding: '8px',
          fontSize: '12px'
        }}
      />
      
      {/* Variable Preview */}
      {textValue && (
        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border">
          <div className="font-semibold mb-1">Preview:</div>
          <div className="font-mono">
            {splitTextForHighlighting(textValue).map((part, index) => {
              if (part.isVariable) {
                return (
                  <span key={index} className="bg-green-100 border border-green-300 text-green-800 rounded px-1 py-0.5 text-xs font-medium shadow-sm">
                    {part.text}
                  </span>
                );
              }
              return part.text;
            })}
          </div>
        </div>
      )}
    </div>
  );

  // Custom header with variable count
  const renderCustomHeader = () => (
    <div className="font-bold mb-2 text-white text-sm flex items-center justify-between">
      <span>Text</span>
      {variables.length > 0 && (
        <span className="text-xs bg-white text-gray-800 px-2 py-1 rounded-full">
          {variables.length} var{variables.length !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );

  // Variable list component
  const renderVariableList = () => {
    if (variables.length === 0) return null;
    
    return (
      <div className="mt-2 text-xs text-gray-300">
        <div className="font-bold mb-1">Variables:</div>
        <div className="flex flex-wrap gap-1">
          {variables.map((variable, index) => (
            <div key={index} className="inline-block bg-white text-gray-800 px-2 py-1 rounded text-xs">
              {variable}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title=""
      inputHandles={inputHandles}
      outputHandles={outputHandles}
      fields={[]}
      onDataChange={onDataChange}
      styles={{
        container: { 
          width: dimensions.width,
          height: dimensions.height,
          transition: 'all 0.3s ease'
        },
        headerColor: '#ffffff'
      }}
      customHeader={renderCustomHeader}
      customContent={
        <div>
          {renderCustomTextarea()}
          {renderVariableList()}
        </div>
      }
    />
  );
};
