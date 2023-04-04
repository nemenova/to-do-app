import React, { useContext, useState } from 'react'
import './LeftColumn.css'
import LeftColumnGroup from './LeftColumnGroup';
import { TreeContext } from '../../Contexts/TreeContext'
import DropZone from './DropZone';


const LeftColumnList = ({ currentTreeList, buttonId, path }) => {
  // console.log(activeTab)
  // console.log(path)
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const { tree, setTree, selectedNode, setSelectedNode } = useContext(TreeContext);
  function handleMousePosition(event) {
    setPosition({
      top: event.pageY,
      left: event.pageX,
    });
  }
  const handleDrop = (dropZone, item) => {
    console.log('dropZone', dropZone)
    console.log('item', item)

    const splitDropZonePath = dropZone.path.split("-");
    const targetIndex = splitDropZonePath[splitDropZonePath.length - 1]
    const targetId = dropZone.dropableId
    const draggingChild = item.parent.children.find(child => child.id === item.id)
    const currentIndex = item.parent.children.indexOf(draggingChild)
    console.log(currentIndex)
    console.log(item.parent.id)
    console.log(targetId)
    console.log(targetIndex)
    console.log(item.index)
    if (item.parent.id == targetId) { // if same parent
      const newChildren = item.parent.children
      if (targetIndex > currentIndex) {
        newChildren.splice(currentIndex, 1)
        newChildren.splice(targetIndex - 1, 0, draggingChild)
      } else {
        newChildren.splice(currentIndex, 1)
        newChildren.splice(targetIndex, 0, draggingChild)
      }
      // console.log(item.index)
      // console.log(' i dont change parent')
      // console.log(newChildren)
      // selectedNode.parent.children = newChildren
      console.log(tree)
      setSelectedNode({ ...item })
      // setTree({...tree})
      return
    }
    // if other parent
    // console.log('start search by id', targetId)
    // console.log(tree)
    const newParent = tree.MainNode.tree.FindNodeById(targetId)
    draggingChild.ChangeParent(newParent, targetIndex)
    console.log('i have changed parent')
    setTree({ ...tree })
  }

  const renderGroup = (element, index) => {
    return (
      <LeftColumnGroup
        key={element.id}
        setPosition={handleMousePosition}
        element={element}
        position={position}
        onDrop={handleDrop} 
        path={`${path}-${index}`}
        />
    );
  };

  return (
    <ul className={`LeftColumn__list ${selectedNode && selectedNode.id === buttonId ? 'active-list' : ''}`} >
      {currentTreeList.children.map((element, index) => {
        const currentPath = `${path}-${index}`
        return (
          <React.Fragment key={element.id}>
            <DropZone
              data={{
                path: currentPath,
                childrenCount: currentTreeList.children.length,
                dropableId: currentTreeList.id,
              }}
              onDrop={handleDrop}
              path={currentPath}
            />
            {renderGroup(element, index)}
          </React.Fragment>
        )
      })}
      {currentTreeList.children.length > 0 && <DropZone
        data={{
          path: `${path}-${currentTreeList.children.length}`,
          childrenCount: currentTreeList.children.length,
          dropableId: currentTreeList.id,
        }}
        onDrop={handleDrop}
      />}
    </ul>
  )
}
export default LeftColumnList