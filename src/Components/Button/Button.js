import React from 'react'
import './Button.css'

const Button = ({ buttonText, onClickAction, isActive }) => {


    return (
        <div className={`button${isActive? '_active' : ''}`} onClick={() => onClickAction()}>{buttonText}</div>
    )
}
export default Button