import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import { TreeContext } from '../../Contexts/TreeContext';

import { useCookies } from 'react-cookie';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import LeftColumn from '../LeftColumn/LeftColumn';
import Center from '../Center/Center';

import Tree from '../Tree/Tree'



function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['tree', 'searchLine'])

  const [tree, setTree] = useState(undefined);
  const [selectedNode, setSelectedNode] = useState(undefined);
  const [request, setRequest] = useState(cookies.searchLine ? cookies.searchLine : '')

  useEffect(() => {
    if (tree) {
      setCookie('tree', stringify(tree), { maxAge: 60 * 60 * 1000 });
    }
    console.log(tree)
  }, [tree, selectedNode])

  useEffect(() => {
    if (request) {
      setCookie('searchLine', request, { maxAge: 60 * 60 * 1000 });
    } else if (cookies.searchLine && !request) {
      removeCookie('searchLine')
    }
  }, [request])

  // console.log(cookies.tree)
  // console.log(request)

  function stringify(obj) {
    let cache = [];
    let str = JSON.stringify(obj, function (key, value) {
      if (typeof (value) === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          return;
        }
        cache.push(value);
      }
      return value;
    });
    cache = null;
    return str;
  }

  useEffect(() => {
    if (!tree) {
      const tree = new Tree('MainNode')
      const node = tree.MainNode
      setTree(tree)
      if (cookies.tree) {
        cookies.tree.MainNode.children.forEach(child => copyStructure(child, node))
        node.value.name = cookies.tree.MainNode.value.name
      }
    }
  }, [tree])

  // console.log(tree)

  const copyStructure = (node, parentNode) => {
    parentNode.AddChild(node.value.type)
    const newNode = parentNode.children.at(-1)

    if (newNode) {
      newNode.value = node.value
    }
    if (node.children && node.children.length > 0) {
      node.children.forEach(element => {
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
                    <LeftColumn setRequest={setRequest} request={request} />
                    <Center />
                  </>} />
            </Routes>
          </div>
        </DndProvider>
      </TreeContext.Provider>

    </>

  );
}

export default App;
