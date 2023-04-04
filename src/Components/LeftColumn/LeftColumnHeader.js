import React, { useState, useContext } from 'react'
import './LeftColumn.css'
import { TreeContext } from '../../Contexts/TreeContext';

const LeftColumnHeader = () => {
    const { tree, setTree } = useContext(TreeContext);
    const [projectName, setProjectName] = useState(tree.MainNode.value.name ? tree.MainNode.value.name : 'Your best project')

    const handleProjectName = (e) => {
        setProjectName(e.target.value)
    }

    const saveProjectName = () => {
        tree.MainNode.value.name = projectName
        setTree({ ...tree })
    }

    return (
        <>
            <div className='LeftColumnHeader__container'>
                <input className='LeftColumnHeader__projectName' onChange={(e) => handleProjectName(e)} onBlur={() => saveProjectName()} value={projectName}></input>
            </div>
        </>
    )
}
export default LeftColumnHeader