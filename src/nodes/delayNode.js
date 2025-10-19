// delayNode.js - Demonstrates simple utility node with minimal configuration

import { Position } from 'reactflow';
import { BaseNode, createHandle, createField } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const inputHandles = [
    createHandle('input', Position.Left)
  ];

  const outputHandles = [
    createHandle('output', Position.Right)
  ];

  const fields = [
    createField('delayMs', 'Delay (ms)', 'number', {
      defaultValue: 1000,
      placeholder: 'Delay in milliseconds'
    }),
    createField('delayType', 'Delay Type', 'select', {
      options: [
        { value: 'fixed', label: 'Fixed' },
        { value: 'random', label: 'Random' },
        { value: 'exponential', label: 'Exponential Backoff' }
      ],
      defaultValue: 'fixed'
    })
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Delay"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
      fields={fields}
      styles={{
        container: { 
          backgroundColor: '#fafafa',
          minHeight: 100,
          border: '1px dashed #9e9e9e'
        },
        headerColor: '#616161',
        headerSize: '14px'
      }}
    />
  );
}
