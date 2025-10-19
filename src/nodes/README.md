# Node Abstraction Documentation

## Overview

The node abstraction system provides a reusable `BaseNode` component that eliminates code duplication and makes it easy to create new pipeline nodes. This abstraction handles common functionality like styling, state management, field rendering, and handle positioning.

## BaseNode Component

### Core Features

1. **Unified Styling**: Consistent container styling with customizable overrides
2. **Field Management**: Automatic state management for form fields
3. **Handle Rendering**: Configurable input/output handles with positioning
4. **Type Safety**: Support for different field types (text, textarea, select, number)
5. **Customization**: Flexible styling and behavior customization

### Props

```javascript
<BaseNode
  id={string}                    // Unique node identifier
  data={object}                  // Node data from ReactFlow
  title={string}                 // Display title
  inputHandles={array}           // Input handle configurations
  outputHandles={array}          // Output handle configurations
  fields={array}                 // Field configurations
  styles={object}                // Custom styling overrides
  onDataChange={function}        // Callback when data changes
/>
```

## Helper Functions

### createHandle(name, position, style)
Creates handle configurations for input/output connections.

```javascript
createHandle('value', Position.Right, { top: '50%' })
```

### createField(name, label, type, options)
Creates field configurations for form inputs.

```javascript
createField('name', 'Name', 'text', { 
  defaultValue: 'default',
  placeholder: 'Enter name'
})
```

## Field Types

- **text**: Single-line text input
- **textarea**: Multi-line text input
- **select**: Dropdown selection
- **number**: Numeric input

## Example Usage

### Simple Node
```javascript
export const SimpleNode = ({ id, data }) => {
  const fields = [
    createField('name', 'Name', 'text', { defaultValue: 'default' })
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Simple"
      fields={fields}
    />
  );
};
```

### Complex Node with Multiple Handles
```javascript
export const ComplexNode = ({ id, data }) => {
  const inputHandles = [
    createHandle('data', Position.Left),
    createHandle('config', Position.Left, { top: '70%' })
  ];

  const outputHandles = [
    createHandle('result', Position.Right),
    createHandle('error', Position.Right, { top: '70%' })
  ];

  const fields = [
    createField('operation', 'Operation', 'select', {
      options: [
        { value: 'add', label: 'Add' },
        { value: 'subtract', label: 'Subtract' }
      ]
    })
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Complex"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
      fields={fields}
      styles={{
        container: { backgroundColor: '#f0f0f0' },
        headerColor: '#333'
      }}
    />
  );
};
```

## Demonstration Nodes Created

### 1. DataTransformNode
- **Purpose**: Data processing and transformation
- **Features**: Multiple inputs/outputs, complex field types
- **Styling**: Blue theme with increased height

### 2. ApiCallNode
- **Purpose**: HTTP API integration
- **Features**: URL configuration, authentication options, timeout settings
- **Styling**: Pink theme with comprehensive form fields

### 3. ConditionalNode
- **Purpose**: Branching logic and conditionals
- **Features**: Multiple input/output paths, comparison operators
- **Styling**: Orange theme with dashed border and larger header

### 4. FileProcessorNode
- **Purpose**: File handling and processing
- **Features**: File type selection, encoding options, size limits
- **Styling**: Green theme with file-focused configuration

### 5. DelayNode
- **Purpose**: Timing and flow control
- **Features**: Simple delay configuration with different delay types
- **Styling**: Minimal gray theme with dashed border

## Benefits of the Abstraction

### Code Reduction
- **Before**: ~40 lines per node with significant duplication
- **After**: ~15-25 lines per node with zero duplication

### Consistency
- Unified styling and behavior across all nodes
- Consistent field handling and state management
- Standardized handle positioning and styling

### Maintainability
- Changes to common functionality only need to be made in one place
- New field types can be added to BaseNode and used by all nodes
- Styling updates apply consistently across the entire system

### Extensibility
- Easy to add new field types
- Simple to create new node variants
- Flexible styling system allows for node-specific customization

## Migration from Original Nodes

All original nodes (Input, Output, LLM, Text) have been refactored to use the BaseNode abstraction:

- **InputNode**: Now uses BaseNode with name/type fields and blue styling
- **OutputNode**: Now uses BaseNode with name/type fields and purple styling  
- **LLMNode**: Now uses BaseNode with model/temperature fields and orange styling
- **TextNode**: Now uses BaseNode with textarea field and green styling

## Future Enhancements

1. **Validation**: Add field validation support
2. **Custom Components**: Support for custom field components
3. **Dynamic Fields**: Fields that change based on other field values
4. **Themes**: Predefined styling themes
5. **Accessibility**: Enhanced accessibility features
6. **Testing**: Built-in testing utilities for node components
