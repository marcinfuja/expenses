import React from 'react';
import './FormControl.scss';

const FormControl = (props) => {
    return ( 
        <input
            className="form-control"
            value={props.value}
            name={props.name}
            type={props.inputType}
            placeholder={props.placeholder}
            onChange={props.onChange}
            />
     );
}
 
export default FormControl;