// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`
          ${type} 
          cursor-grab active:cursor-grabbing
          px-3 py-2 h-[60px]
          flex items-center justify-center flex-col
          rounded-lg  hover:bg-black/20
          transition-all duration-200 ease-in-out
          hover:shadow-sm hover:shadow-black/50
          hover:scale-105 group
         
        `}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <span className="text-white text-sm font-medium group-hover:text-amber-100 transition-colors">
            {label}
          </span>
      </div>
    );
  };
  