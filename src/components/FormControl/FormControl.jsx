import React from 'react';
import styles from './FormControl.style';

const FormControl = (props) => {
    return ( 
        <input
            css={styles.formControl}
            value={props.value}
            name={props.name}
            type={props.inputType}
            placeholder={props.placeholder}
            onChange={props.onChange}
            />
     );
}
 
export default FormControl;