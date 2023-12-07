import React from 'react';

const ItemBlock = (props) => {
    const classes =  props.className ? `form__item ${props.className}` : `form__item`;
    
    return (
        <div className = { classes }>
            { props.label && ( 
                <label htmlFor = { props.htmlFor }>
                    { props.label }
                </label>
                )
            }
            
            <input 
                type = { props.type } 
                id = { props.id } 
                placeholder = { props.placeholder }
                name = { props.name } 
                value = { props.value } 
                required = { props.required } 
                onChange = { props.onChange } 
            />

            { props.icon && ( 
                <i onClick = { props.onIconClick }>
                    { props.icon }
                </i>
            )
            }
        </div>
    )
}

export default ItemBlock;