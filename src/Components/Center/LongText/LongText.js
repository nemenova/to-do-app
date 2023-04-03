import React, {useEffect, useContext, useState} from 'react'
import './LongText.css'
import { TreeContext } from '../../../Contexts/TreeContext';

const LongText = ({ setHasChanges }) => {
    const { selectedNode } = useContext(TreeContext);
    const [text, setText] = useState(selectedNode.value.description ? selectedNode.value.description : '')
// console.log(field.value)
    const setValue = (value) => {
        selectedNode.value.description = value
        setText(value)
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