import React from "react";
// import classNames from "classnames";
import { useDrop } from "react-dnd";
// import { COMPONENT, SIDEBAR_ITEM, ROW, COLUMN } from "./constants";

// const ACCEPTS = [SIDEBAR_ITEM, COMPONENT, ROW, COLUMN];

const DropZone = ({ data, onDrop }) => {
  // console.log(element.hasChildren)
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'all',
    drop: (item, monitor) => {
      onDrop(data, item);
      console.log('item is dropped')
      // console.log(item)
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
