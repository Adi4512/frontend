// apiCallNode.js - Demonstrates API configuration and authentication

import { Position } from 'reactflow';
import { BaseNode, createHandle, createField } from './BaseNode';

export const ApiCallNode = ({ id, data }) => {
  const inputHandles = [
    createHandle('trigger', Position.Left),
    createHandle('params', Position.Left, { top: '60%' })
  ];

  const outputHandles = [
    createHandle('response', Position.Right),
    createHandle('error', Position.Right, { top: '60%' })
  ];

  const fields = [
    createField('url', 'API URL', 'text', {
      defaultValue: 'https://api.example.com/data',
      placeholder: 'Enter API endpoint'
    }),
    createField('method', 'Method', 'select', {
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' }
      ],
      defaultValue: 'GET'
    }),
    createField('authType', 'Auth Type', 'select', {
      options: [
        { value: 'none', label: 'None' },
        { value: 'bearer', label: 'Bearer Token' },
        { value: 'basic', label: 'Basic Auth' },
        { value: 'apiKey', label: 'API Key' }
      ],
      defaultValue: 'none'
    }),
    createField('timeout', 'Timeout (ms)', 'number', {
      defaultValue: 5000,
      placeholder: 'Request timeout'
    })
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="API Call"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
      fields={fields}
      styles={{
        container: { backgroundColor: '#fce4ec', minHeight: 140 },
        headerColor: '#c2185b'
      }}
    />
  );
}
