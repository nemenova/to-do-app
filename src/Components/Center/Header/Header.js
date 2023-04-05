import React, { useState, useContext, useEffect } from 'react'
import './Header.css'
import { TreeContext } from '../../../Contexts/TreeContext'

const Header = () => {
    const { selectedNode} = useContext(TreeContext);
    const [title, setTitle] = useState(selectedNode ? selectedNode.value.name ? selectedNode.value.name : selectedNode.value.displayName : '')

    useEffect(() => {
        setTitle(selectedNode ? selectedNode.value.name ? selectedNode.value.name : selectedNode.value.displayName : '')
    }, [selectedNode])

    return (

        <div className='header'>
            {selectedNode &&
                <h2>{title}</h2>
            }
        </div>
    )
}
export default Header