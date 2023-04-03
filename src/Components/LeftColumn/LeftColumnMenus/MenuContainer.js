import React, { useEffect, useContext } from 'react'
import './Menus.css'
import { TreeContext } from '../../../Contexts/TreeContext'
import leftColumnConfig from '../../../Constants/LeftColumnConfig'


const MenuContainer = ({ position, setIsListOpened }) => {

    // console.log(selectedNode)
    // console.log(selectedNode.value.type)
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
                        <div className='leftColumnMenu__title'>Создать</div>
                        {selectedNode.hasChildren.map((creature, index) => {
                            const item = leftColumnConfig.find(item => item.type === creature)
                            return <div key={index} className={`leftColumnMenu__item leftColumnMenu__${creature}`} onClick={() => createChild(creature)}>
                                {/* <img src={item.icon.active} alt='' className={`leftColumnMenu__icon`} style={{ width: 12, height: 12, }}></img> */}
                                {item.displayName}</div>
                        })}
                    </>
                }
                {selectedNode.hasMethods &&
                    selectedNode.hasMethods.map((action, index) => (
                        <div key={index} className={`leftColumnMenu__${action} leftColumnMenu__actionBorder`} onClick={() => onClickAction(action)}>{action}</div>
                    ))
                }
                {/* {setCreationType(selectedNode.value.type)} */}
            </div>

        </>
    )
}
export default MenuContainer