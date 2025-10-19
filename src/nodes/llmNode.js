// llmNode.js

import { Position } from 'reactflow';
import { BaseNode, createHandle, createField } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const inputHandles = [
    createHandle('system', Position.Left, { top: `${100/3}%` }),
    createHandle('prompt', Position.Left, { top: `${200/3}%` })
  ];

  const outputHandles = [
    createHandle('response', Position.Right)
  ];

  const fields = [
    createField('model', 'Model', 'select', {
      options: [
        { value: 'gpt-4', label: 'GPT-4' },
        { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
        { value: 'claude-3', label: 'Claude 3' }
      ],
      defaultValue: 'gpt-4'
    }),
    createField('temperature', 'Temperature', 'number', {
      defaultValue: 0.7,
      placeholder: '0.0 - 1.0'
    })
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
      fields={fields}
      styles={{
        container: { backgroundColor: '#fff3e0' },
        headerColor: '#f57c00'
      }}
    />
  );
}
