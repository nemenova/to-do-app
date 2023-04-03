import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import { TreeContext } from '../../Contexts/TreeContext';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import LeftColumn from '../LeftColumn/LeftColumn';
import LeftColumnList from '../LeftColumn/LeftColumnList';
import Center from '../Center/Center';

import Tree from '../Tree/Tree'
import leftColumnConfig from '../../Constants/LeftColumnConfig';


var isTreeEmpty = true
function App() {
  const [modalElement, setModalElement] = useState(undefined);
  const [currentTreeList, setCurrentTreeList] = useState(undefined)
  const [tree, setTree] = useState(undefined);
  const [selectedNode, setSelectedNode] = useState(undefined);
  const [error, setError] = useState({ type: undefined, message: '', status: false });
  // const [errorText, setErrorText] = useState('');
  const [isListOpened, setIsListOpened] = useState(false)

  // console.log(activeZone)
  // console.log(currentTreeList)


  useEffect(() => {
    if (!tree) {
      // const mainNodeConfig = leftColumnConfig.find('MainNode')
      // console.log(mainNodeConfig)
      const tree = new Tree('MainNode')
      const node = tree.MainNode
      console.log(node)
      setTree(tree)
      node.hasChildren.map(button => node.AddChild(button))
    } else {
      setTree(tree)
    }
  }, [tree])

  console.log(tree)
  // console.log(isError)

  const copyStructure = (node, parentNode) => {
    console.log(node)
    console.log(parentNode)
    if (!node || !node.SectionType) {
      setError({ type: 'tree', message: "Something went wrong! Contact with technical support", status: true })
      console.log('ERROR! now node is', node)
      setTree({})
    }
    parentNode.AddChild(node.SectionType, node.id)


    const newNode = parentNode.children.find(element => element.id == node.id)
    console.log(newNode)
    if (newNode) {
      console.log(newNode.value)
      newNode.value.title = node.Name
      newNode.value.Name = node.Name
      newNode.value.Description = node.Description
      newNode.value.Date = node.Date
      newNode.value.Gallery = node.Gallery
      newNode.isValid = node.IsValid
      newNode.value.Preview = node.Preview
    }
    if (node.Sections && node.Sections.length > 0) {
      node.Sections.forEach(element => {
        copyStructure(element, newNode)
      });
    }
  }

  return (
    tree &&
    <>
      <TreeContext.Provider value={{ tree, setTree, selectedNode, setSelectedNode }}>
        <DndProvider backend={HTML5Backend}>

          <div className='app'>
            <Routes>
              <Route path='/'
                element={
                  <>
                    {/* {tree.MainNode.children.length > 0 &&
                      <LeftColumnList
                        currentTreeList={tree.MainNode}
                        buttonId={tree.MainNode.id}
                        />
                    } */}
                    <LeftColumn isListOpened={isListOpened} setIsListOpened={setIsListOpened} />
                    <Center setIsListOpened={setIsListOpened} />
                  </>} />
            </Routes>
          </div>
        </DndProvider>
      </TreeContext.Provider>

    </>

  );
}

export default App;
