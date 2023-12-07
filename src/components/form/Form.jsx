import React from 'react';

const Form = (props) => {
  const classes =  props.className ? `form ${props.className}` : `form`;

  return (
    <form className={ classes } {...props}>
        { props.children }
    </form>
  )
}

export default Form;