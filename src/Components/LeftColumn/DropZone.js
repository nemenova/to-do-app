import React from "react";
import { useDrop } from "react-dnd";


const DropZone = ({ data, onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'all',
    drop: (item, monitor) => {
      onDrop(data, item);
      console.log('item is dropped')
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  });

  const isActive = isOver && canDrop;
  return (
    <div
      className={`dropZone ${isActive ? 'active': ''}`}
      ref={drop}
    />
  );
};
export default DropZone;
