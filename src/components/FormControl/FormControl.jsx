import React from 'react';
import styles from './FormControl.style';

const FormControl = (props) => {
    return ( 
        <>
            {props.name === 'expenseName' ?
                <input
                    css={styles.formControl}
                    value={props.value}
                    name={props.name}
                    type={props.inputType}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    ref={props.nameInputRef}
                    />
                    :
                    
                <input
                    css={styles.formControl}
                    value={props.value}
                    name={props.name}
                    type={props.inputType}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    min={1}
                    onKeyUp={() => props.enterOnPriceTriggerSubmit(event)}
                    />
            }
        </>
     );
}
 
export default FormControl;