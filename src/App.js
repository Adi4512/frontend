import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';

function App() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
  