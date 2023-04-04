import React, { useState, useContext, useRef } from 'react'
import './LeftColumn.css'
import Menu from './LeftColumnMenu/Menu';
import LeftColumnList from './LeftColumnList';
import { TreeContext } from '../../Contexts/TreeContext'
import { useDrag } from 'react-dnd'


const LeftColumnGroup = ({ position, setPosition, element, path }) => {
    const [isGroupOpened, setIsGroupOpened] = useState(false)
    const [isMenuOpened, setIsMenuOpened] = useState(false)
    const { selectedNode, setSelectedNode } = useContext(TreeContext);

    const closeMenu = () => {
        if (isMenuOpened) {
            setIsMenuOpened(false)
        }
    }

    const toggleGroup = (element, e) => {
        e.stopPropagation()
        setSelectedNode(element);
        closeMenu();
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'all',
        item: {
            ...element,
            path
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }), [element])

    const ref = useRef(null);
    drag(ref);

    const handleDrag = (e) => {
        // console.log('Dragging element with id', element.id)
        e.stopPropagation()
    }

    return (
        <>


            <div
                onDrag={(e) => handleDrag(e)}
                ref={ref}
                style={{
                    zIndex: 2,
                    cursor: 'grab',
                    margin: '-5px 0',
                    opacity: isDragging ? .3 : '',
                }}
                onClick={(e) => { closeMenu() }}>
                <div className={`LeftColumn__nav-btn__container ${selectedNode && selectedNode.id === element.id ? 'active-tab' : ''} ${element.value.isDone ? 'done' : ''}`} onMouseDown={() => setSelectedNode(element)} >
                    <div className={`LeftColumn__item-arrow ${isGroupOpened && element.children.length > 0 ? 'opened' : element.children.length > 0 ? 'closed' : ''}`} onClick={element.children.length > 0 ? (e) => { toggleGroup(element, e); setIsGroupOpened(prev => !prev) } : null} />

                    <li onClick={(e) => { toggleGroup(element, e); closeMenu() }}
                        className={`LeftColumn__list-item`}>
                        {element.value.name ? element.value.name : element.value.displayName}</li>
                    <div className='LeftColumn__menuBtn' onClick={(e) => { setIsMenuOpened(true); setPosition(e); setSelectedNode(element) }} > </div>
                    {isMenuOpened && <Menu position={position} selectedNode={element} setIsListOpened={setIsGroupOpened} />}
                </div>
                {element.children.length > 0 && isGroupOpened &&
                    <LeftColumnList currentTreeList={element} position={position} setPosition={setPosition} buttonId={element.id} />
                }
            </div>



        </>
    )
}
export default LeftColumnGroup