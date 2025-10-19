// fileProcessorNode.js - Demonstrates file handling and processing options

import { Position } from 'reactflow';
import { BaseNode, createHandle, createField } from './BaseNode';

export const FileProcessorNode = ({ id, data }) => {
  const inputHandles = [
    createHandle('file', Position.Left),
    createHandle('config', Position.Left, { top: '60%' })
  ];

  const outputHandles = [
    createHandle('processed', Position.Right),
    createHandle('metadata', Position.Right, { top: '60%' })
  ];

  const fields = [
    createField('fileType', 'File Type', 'select', {
      options: [
        { value: 'csv', label: 'CSV' },
        { value: 'json', label: 'JSON' },
        { value: 'xml', label: 'XML' },
        { value: 'txt', label: 'Text' },
        { value: 'pdf', label: 'PDF' },
        { value: 'image', label: 'Image' }
      ],
      defaultValue: 'csv'
    }),
    createField('operation', 'Operation', 'select', {
      options: [
        { value: 'parse', label: 'Parse' },
        { value: 'validate', label: 'Validate' },
        { value: 'transform', label: 'Transform' },
        { value: 'extract', label: 'Extract Data' },
        { value: 'compress', label: 'Compress' }
      ],
      defaultValue: 'parse'
    }),
    createField('encoding', 'Encoding', 'select', {
      options: [
        { value: 'utf-8', label: 'UTF-8' },
        { value: 'ascii', label: 'ASCII' },
        { value: 'latin1', label: 'Latin-1' },
        { value: 'base64', label: 'Base64' }
      ],
      defaultValue: 'utf-8'
    }),
    createField('maxSize', 'Max Size (MB)', 'number', {
      defaultValue: 10,
      placeholder: 'Maximum file size'
    })
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="File Processor"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
      fields={fields}
      styles={{
        container: { backgroundColor: '#f1f8e9', minHeight: 150 },
        headerColor: '#689f38'
      }}
    />
  );
}
