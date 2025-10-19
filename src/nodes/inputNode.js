// inputNode.js

import { Position } from 'reactflow';
import { BaseNode, createHandle, createField } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const inputHandles = [
    createHandle('value', Position.Right)
  ];

  const fields = [
    createField('inputName', 'Name', 'text', { 
      defaultValue: id.replace('customInput-', 'input_'),
      placeholder: 'Enter input name'
    }),
    createField('inputType', 'Type', 'select', {
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' }
      ],
      defaultValue: 'Text'
    })
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      inputHandles={[]}
      outputHandles={inputHandles}
      fields={fields}
      styles={{
        container: { backgroundColor: '#e3f2fd' },
        headerColor: '#1976d2'
      }}
    />
  );
}
