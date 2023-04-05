import React, { useState, useContext, useEffect } from 'react'
import './Checkbox.css'
import { TreeContext } from '../../../Contexts/TreeContext';



const Checkbox = ({ setHasChanges }) => {
    const { selectedNode } = useContext(TreeContext);
    const [isChecked, setIsChecked] = useState(selectedNode.value.isDone);

    const handleCheck = (e) => {
        setIsChecked(e.target.checked)
        selectedNode.value.unsavedIsDone = e.target.checked
        if (selectedNode.value.isDone !== e.target.checked) {
            setHasChanges(true)
        }
    }

    useEffect(() => {
        setIsChecked(selectedNode.value.isDone)
    }, [selectedNode])

    return (
        <>

            <label className="checkbox__label">
                <input type="checkbox" className="checkbox" checked={isChecked} value={isChecked} onChange={(e) => { handleCheck(e) }} />
                <div className='checkbox__knobs'></div>
                <div className='checkbox__layer'></div>

            </label>


        </>
    )
}
export default Checkbox