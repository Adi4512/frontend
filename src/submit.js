// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useToast, Toast } from './toast';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const { toast, showToast, hideToast } = useToast();

    const handleSubmit = async () => {
        try {
            // Prepare pipeline data
            const pipelineData = {
                nodes: nodes,
                edges: edges
            };

            // Send to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Create beautiful toast message
            const dagStatus = result.is_dag ? 'Yes' : 'No';
            const dagIcon = result.is_dag ? '✅' : '❌';
            const statusMessage = result.is_dag ? 'Great! Your pipeline is valid.' : 'Warning: Your pipeline contains cycles.';
            
            const toastMessage = (
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-white/10 rounded-lg p-3">
                            <div className="text-2xl font-bold text-white">{result.num_nodes}</div>
                            <div className="text-xs opacity-80">Nodes</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                            <div className="text-2xl font-bold text-white">{result.num_edges}</div>
                            <div className="text-xs opacity-80">Edges</div>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-lg">{dagIcon}</span>
                            <span className="font-medium">DAG Status: {dagStatus}</span>
                        </div>
                        <div className="text-sm opacity-90">{statusMessage}</div>
                    </div>
                </div>
            );
            
            showToast(toastMessage, result.is_dag ? 'success' : 'warning');

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            showToast('Error submitting pipeline. Please check if the backend server is running.', 'error');
        }
    };

    return (
        <>
            <div className="flex items-center justify-center">
                <button 
                    onClick={handleSubmit}
                    className="px-3 py-1 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors" 
                    type="button"
                >
                    Submit
                </button>
            </div>
            
            {/* Toast Component */}
            <Toast 
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={hideToast}
            />
        </>
    );
}
