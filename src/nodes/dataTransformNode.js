// dataTransformNode.js - Demonstrates complex field types and multiple inputs/outputs

import { Position } from 'reactflow';
import { BaseNode, createHandle, createField } from './BaseNode';

export const DataTransformNode = ({ id, data }) => {
  const inputHandles = [
    createHandle('data', Position.Left),
    createHandle('schema', Position.Left, { top: '70%' })
  ];

  const outputHandles = [
    createHandle('transformed', Position.Right),
    createHandle('errors', Position.Right, { top: '70%' })
  ];

  const fields = [
    createField('operation', 'Operation', 'select', {
      options: [
        { value: 'filter', label: 'Filter' },
        { value: 'map', label: 'Map' },
        { value: 'reduce', label: 'Reduce' },
        { value: 'sort', label: 'Sort' }
      ],
      defaultValue: 'filter'
    }),
    createField('condition', 'Condition', 'textarea', {
      defaultValue: 'item.value > 0',
      placeholder: 'Enter transformation condition'
    }),
    createField('batchSize', 'Batch Size', 'number', {
      defaultValue: 100,
      placeholder: 'Items per batch'
    })
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Data Transform"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
      fields={fields}
      styles={{
        container: { backgroundColor: '#e1f5fe', minHeight: 120 },
        headerColor: '#0277bd'
      }}
    />
  );
}
