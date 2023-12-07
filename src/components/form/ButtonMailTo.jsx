import React from 'react';

const ButtonMailTo = ({ email, subject, body, ...props }) => {
    const classes =  props.className ? `btn-mail ${props.className}` : `btn-mail`;

    return (
        <a className = { classes } href = { `mailto:${ email }?subject=${ subject || "" }&body=${ body || "" }` }>
            { props.children }
        </a>
    )
}

export default ButtonMailTo;