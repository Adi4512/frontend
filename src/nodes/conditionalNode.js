// conditionalNode.js - Demonstrates branching logic and complex styling

import { Position } from 'reactflow';
import { BaseNode, createHandle, createField } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const inputHandles = [
    createHandle('condition', Position.Left),
    createHandle('trueValue', Position.Left, { top: '40%' }),
    createHandle('falseValue', Position.Left, { top: '70%' })
  ];

  const outputHandles = [
    createHandle('result', Position.Right),
    createHandle('trueOut', Position.Right, { top: '30%' }),
    createHandle('falseOut', Position.Right, { top: '70%' })
  ];

  const fields = [
    createField('operator', 'Operator', 'select', {
      options: [
        { value: 'equals', label: 'Equals (==)' },
        { value: 'notEquals', label: 'Not Equals (!=)' },
        { value: 'greater', label: 'Greater Than (>)' },
        { value: 'less', label: 'Less Than (<)' },
        { value: 'contains', label: 'Contains' },
        { value: 'isEmpty', label: 'Is Empty' }
      ],
      defaultValue: 'equals'
    }),
    createField('expectedValue', 'Expected Value', 'text', {
      defaultValue: '',
      placeholder: 'Value to compare against'
    }),
    createField('caseSensitive', 'Case Sensitive', 'select', {
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
      ],
      defaultValue: 'false'
    })
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Conditional"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
      fields={fields}
      styles={{
        container: { 
          backgroundColor: '#fff8e1', 
          minHeight: 160,
          border: '2px solid #ff9800',
          borderRadius: 12
        },
        headerColor: '#f57c00',
        headerSize: '16px'
      }}
    />
  );
}
