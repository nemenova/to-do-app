import React, { useContext } from 'react'
import './Menu.css'
import { TreeContext } from '../../../Contexts/TreeContext'
import leftColumnConfig from '../../../Constants/LeftColumnConfig'


const Menu = ({ position, setIsListOpened }) => {
    const { tree, setTree, selectedNode, setSelectedNode } = useContext(TreeContext);

    const createChild = (value) => {
        console.log('calling add record')
        selectedNode.AddChild(value)
        setIsListOpened(true)
        setTree({ ...tree })
    }


    const deleteChild = () => {
        const parent = selectedNode.parent
        console.log('backend deleted a child')
        setSelectedNode(selectedNode.parent)
        parent.DeleteChildNode(selectedNode)
        // console.log(parent)
        checkListState(parent)

    }
    const copyNode = () => {
        const parent = selectedNode.parent
        parent.CopyNode(selectedNode)
        setSelectedNode(parent.children[parent.children.length - 1])
    }
    const checkListState = (parent) => {
        if (parent.children.length < 1) {
            setIsListOpened(false)
        }
    }
    const onClickAction = (action) => {
        if (action == 'delete') {
            deleteChild()
        } else if (action == 'copy') {
            copyNode()
        }
    }
    return (
        selectedNode &&
        <>
            <div className='leftColumnMenu' style={{ top: position.top, left: position.left }}>
                {selectedNode.hasChildren.length > 0 &&
                    <>
                        {selectedNode.hasChildren.map((creature, index) => {
                            const item = leftColumnConfig.find(item => item.type === creature)
                            return <div key={index} className={`leftColumnMenu__item leftColumnMenu__${creature}`} onClick={() => createChild(creature)}>
                                {item.displayName}</div>
                        })}
                    </>
                }
                {selectedNode.hasMethods &&
                    selectedNode.hasMethods.map((action, index) => (
                        <div key={index} className={`leftColumnMenu__item`} onClick={() => onClickAction(action)}>{action}</div>
                    ))
                }
            </div>

        </>
    )
}
export default Menu