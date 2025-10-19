// outputNode.js

import { Position } from 'reactflow';
import { BaseNode, createHandle, createField } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const inputHandles = [
    createHandle('value', Position.Left)
  ];

  const fields = [
    createField('outputName', 'Name', 'text', { 
      defaultValue: id.replace('customOutput-', 'output_'),
      placeholder: 'Enter output name'
    }),
    createField('outputType', 'Type', 'select', {
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'Image' }
      ],
      defaultValue: 'Text'
    })
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      inputHandles={inputHandles}
      outputHandles={[]}
      fields={fields}
      styles={{
        container: { backgroundColor: '#f3e5f5' },
        headerColor: '#7b1fa2'
      }}
    />
  );
}
