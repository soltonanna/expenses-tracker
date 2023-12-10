import React from 'react';

const ItemBlock = React.forwardRef((props, ref) => {
    const classes =  props.className ? `form__item ${props.className}` : `form__item`;
    
    return (
        <div className = { classes }>
            { props.label && ( 
                <label htmlFor = { props.htmlFor }>
                    { props.label }
                </label>
                )
            }
            <span>
                <input
                    ref={ref}
                    type={props.type}
                    autoComplete={props.autoComplete}
                    onChange={props.onChange}
                    value={props.value}
                    placeholder={props.placeholder}
                    name={props.name}
                    required={props.required}
                    aria-invalid={props['aria-invalid']}
                    aria-describedby={props['aria-describedby']}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                />
                { props.icon && ( 
                    <i onClick = { props.onIconClick }>
                        { props.icon }
                    </i>
                )
                }
            </span>
            
            { props.errorMessage && (
                <p id={props.errorId} className={props.iconClassName}>
                {props.iconContent}{props.errorMessage}
              </p>
            )}
            
            
        </div>
    )
});

export default ItemBlock;