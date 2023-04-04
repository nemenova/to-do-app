import React, { useEffect, useContext, useState } from 'react'
import './LongText.css'
import { TreeContext } from '../../../Contexts/TreeContext';

const LongText = ({ setHasChanges }) => {
    const { selectedNode } = useContext(TreeContext);
    const [text, setText] = useState(selectedNode.value.description ? selectedNode.value.description : '')

    const setValue = (value) => {
        setText(value)
        selectedNode.value.unsavedDescription = value
        setHasChanges(true)
    }

    useEffect(() => {
        setText(selectedNode.value.description ? selectedNode.value.description : '')
    }, [selectedNode])

    return (
        <textarea className='longTextInput' placeholder={'Type text'} value={text} onChange={(e) => { setValue(e.target.value); }} />
    )
}

export default LongText