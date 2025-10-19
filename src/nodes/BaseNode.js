// BaseNode.js - Abstract base component for all pipeline nodes

import { useState, useEffect } from 'react';
import { Handle } from 'reactflow';

/**
 * BaseNode - Abstract component that provides common functionality for all pipeline nodes
 * 
 * @param {Object} props
 * @param {string} props.id - Unique node identifier
 * @param {Object} props.data - Node data from ReactFlow
 * @param {string} props.title - Display title for the node
 * @param {Array} props.inputHandles - Array of input handle configurations
 * @param {Array} props.outputHandles - Array of output handle configurations
 * @param {Array} props.fields - Array of field configurations for the node
 * @param {Object} props.styles - Custom styling overrides
 * @param {Function} props.onDataChange - Callback when node data changes
 */
export const BaseNode = ({ 
  id, 
  data, 
  title, 
  inputHandles = [], 
  outputHandles = [], 
  fields = [],
  styles = {},
  onDataChange,
  customHeader,
  customContent,
  className = ""
}) => {
  // Initialize field states from data or defaults
  const initializeFieldStates = () => {
    const fieldStates = {};
    fields.forEach(field => {
      const defaultValue = field.defaultValue || '';
      fieldStates[field.name] = data?.[field.name] || defaultValue;
    });
    return fieldStates;
  };

  const [fieldStates, setFieldStates] = useState(initializeFieldStates);

  // Update parent when field values change
  useEffect(() => {
    if (onDataChange) {
      onDataChange(fieldStates);
    }
  }, [fieldStates, onDataChange]);

  // Generic field change handler
  const handleFieldChange = (fieldName, value) => {
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Render a field based on its type
  const renderField = (field) => {
    const { name, label, type, options = [], placeholder } = field;
    const value = fieldStates[name];

    switch (type) {
      case 'text':
        return (
          <label key={name}>
            {label}:
            <input
              type="text"
              value={value}
              placeholder={placeholder}
              onChange={(e) => handleFieldChange(name, e.target.value)}
            />
          </label>
        );
      
      case 'textarea':
        return (
          <label key={name}>
            {label}:
            <textarea
              value={value}
              placeholder={placeholder}
              onChange={(e) => handleFieldChange(name, e.target.value)}
              rows={3}
            />
          </label>
        );
      
      case 'select':
        return (
          <label key={name}>
            {label}:
            <select value={value} onChange={(e) => handleFieldChange(name, e.target.value)}>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        );
      
      case 'number':
        return (
          <label key={name}>
            {label}:
            <input
              type="number"
              value={value}
              placeholder={placeholder}
              onChange={(e) => handleFieldChange(name, e.target.value)}
            />
          </label>
        );
      
      default:
        return null;
    }
  };

  // Render handles
  const renderHandles = (handles, type) => {
    return handles.map((handle, index) => (
      <Handle
        key={`${type}-${index}`}
        type={type}
        position={handle.position}
        id={handle.id || `${id}-${handle.name}`}
        style={{
          background: '#ffffff',
          border: '2px solid #1f2937',
          width: '12px',
          height: '12px',
          ...handle.style
        }}
      />
    ));
  };

  // Default container styles
  const defaultStyles = {
    width: 200,
    height: 'auto',
    minHeight: 80,
    border: '2px solid #1f2937',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#1f2937',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    ...styles.container
  };

  return (
    <div style={defaultStyles} className={className}>
      {/* Input Handles */}
      {renderHandles(inputHandles, 'target')}
      
      {/* Node Header */}
      {customHeader ? (
        customHeader
      ) : (
        <div style={{ 
          fontWeight: 'bold', 
          marginBottom: 8, 
          color: styles.headerColor || '#333',
          fontSize: styles.headerSize || '14px',
          ...styles.header 
        }}>
          {title}
        </div>
      )}
      
      {/* Node Content */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 6,
        ...styles.content 
      }}>
        {customContent ? customContent : fields.map(renderField)}
      </div>
      
      {/* Output Handles */}
      {renderHandles(outputHandles, 'source')}
    </div>
  );
};

/**
 * Helper function to create handle configurations
 */
export const createHandle = (name, position, style = {}) => ({
  name,
  position,
  style
});

/**
 * Helper function to create field configurations
 */
export const createField = (name, label, type, options = {}, defaultValue = '') => ({
  name,
  label,
  type,
  options,
  defaultValue,
  ...options
});
