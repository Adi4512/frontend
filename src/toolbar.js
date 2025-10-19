// toolbar.js

import { Link } from 'react-router-dom';
import { DraggableNode } from './draggableNode';
import { SubmitButton } from './submit';

export const PipelineToolbar = () => {

    return (
        <div className="w-full border-b border-gray-600 px-4 py-3 bg-[#414244]" >
            <div className="flex items-center justify-between">
            
                 <div className="flex items-center gap-10">
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='llm' label='LLM' />
                    <DraggableNode type='customOutput' label='Output' />
                    <DraggableNode type='text' label='Text' />
                    <DraggableNode type='dataTransform' label='Data Transform' />
                    <DraggableNode type='apiCall' label='API Call' />
                    <DraggableNode type='conditional' label='Conditional' />
                    <DraggableNode type='fileProcessor' label='File Processor' />
                    <DraggableNode type='delay' label='Delay' />
                </div>
                 
                 <div className="flex items-center gap-3">
                     <SubmitButton />
                     <Link to='/'>  
                     <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg">
                         Home
                     </button>
                     </Link>
                 </div>
            </div>
        </div>
    );
};
