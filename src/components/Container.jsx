import React from 'react'

const Container = (props) => {
    const classes = props.className ? `container ${props.className}` : `container`;
    
    return (
        <div className={classes}>
            {props.children}
        </div>
    )
}

export default Container