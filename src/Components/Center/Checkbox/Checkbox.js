import React, { useState, useContext } from 'react'
import './Checkbox.css'
import { TreeContext } from '../../../Contexts/TreeContext';



const Checkbox = ({ setHasChanges }) => {
    const { selectedNode } = useContext(TreeContext);

    const [isChecked, setIsChecked] = useState(selectedNode.value.isDone ? true : false);

    const handleCheck = (e) => {
        // setIsChecked(e.target.checked)
        selectedNode.value.isDone = e.target.checked
        if (selectedNode.value.isDone !== e.target.isChecked) {
            setHasChanges(true)

        }
    }

    return (
        <>

            <label className="checkbox__label">
                <input type="checkbox" className="checkbox" defaultChecked={false} onChange={(e) => { handleCheck(e) }} />
                <div className='checkbox__knobs'></div>
                <div className='checkbox__layer'></div>

            </label>


        </>
    )
}
export default Checkbox