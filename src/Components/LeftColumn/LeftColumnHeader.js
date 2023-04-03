import React, { useState } from 'react'
import './LeftColumn.css'


const LeftColumnHeader = ({ tree}) => {

   
    return (
        <>
       <div className='LeftColumnHeader__container'>
           <div className='LeftColumnHeader__projectName'>{tree.MainNode.value.Name? tree.MainNode.value.Name : 'Your Best Project'}</div>
       </div>

        </>
    )
}
export default LeftColumnHeader