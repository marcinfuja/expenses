import React from 'react';
import styles from './Button.style';

const Button = ({children, type, onClick, activeClass}) => {
    const btnTypeStyle = styles[type];
    return ( 
        <button
            onClick={onClick}
            css={[styles.button, btnTypeStyle]}
            className={`btn  ${activeClass ? 'active' : ''}`}>{children}</button>
     );
}
 
export default Button;