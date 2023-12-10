import React from 'react';

const Button = (props) => {
    const classes =  props.className ? `btn ${props.className}` : `btn`;

    return (
        <button className = { classes } disabled={props.disabled}  >
            { props.children }
        </button>
    )
}

export default Button;