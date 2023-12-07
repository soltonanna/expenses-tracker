import React from 'react';

const Button = (props) => {
    const classes =  props.className ? `btn ${props.className}` : `btn`;

    return (
        <button className = { classes } {...props} >
            { props.children }
        </button>
    )
}

export default Button;