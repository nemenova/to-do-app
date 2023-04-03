import React, { useState, useContext, useEffect } from 'react'
import './ShortText.css'
import { TreeContext } from '../../../Contexts/TreeContext';

const ShortText = ({ setHasChanges }) => {
    const { selectedNode } = useContext(TreeContext);

    const [text, setText] = useState(selectedNode.value.name ? selectedNode.value.name : '')
    // console.log(field)

    const setValue = (value) => {
        setText(value)
        selectedNode.value.name = value
        selectedNode.value.title = value
        setHasChanges(true)
    }
    useEffect(() => {
        setText(selectedNode.value.name ? selectedNode.value.name : '')
    }, [selectedNode])

    return (
        <>
            <input className='center__block__input' type='text' id='ShortText' name='ShortText'
                placeholder={'Type name'}
                onChange={(e) => setValue(e.target.value)}
                value={text}
            />
        </>
    )
}

export default ShortText