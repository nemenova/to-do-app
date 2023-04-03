import React, { useState, useEffect, useRef, useContext, useCallback } from 'react'
import './LeftColumn.css'
import LeftColumnHeader from './LeftColumnHeader'
import LeftColumnList from './LeftColumnList'
import SearchInput from './SearchInput/SearchInput'
import { TreeContext } from '../../Contexts/TreeContext'

const LeftColumn = ({ }) => {
   
    const [isMenuOpened, setIsMenuOpened] = useState(false)
    const [fakeValue, setFakeValue] = useState(0);

    const { tree, setTree, selectedNode, setSelectedNode } = useContext(TreeContext);

    const closeMenu = () => {
        if (isMenuOpened) {
            setIsMenuOpened(false)
        }
    }
    const activateButton = (button) => {
        if (button.value.isAvailable) {
            setSelectedNode(button)
            // setDraggingNode(button)
            // console.log(button)
        }
    }
    useEffect(() => {
        console.log(selectedNode)
        // console.log(preview)
        setFakeValue(fakeValue + 1)
    }, [selectedNode])


    return (
        <>
            <div className='LeftColumn__container' onClick={closeMenu}>
                <LeftColumnHeader tree={tree} />
                <div className='LeftColumn__content'>
                                <LeftColumnList
                                    currentTreeList={tree.MainNode}
                                    
                                    buttonId={tree.MainNode.id}
                                    path={`${1}`} />

                    {/* <SearchInput /> */}
                </div>
            </div>

        </>
    )
}
export default LeftColumn