import React from 'react';
import './Button.scss';

const Button = ({children, type, onClick, activeClass}) => {
    return ( 
        <button
            onClick={onClick}
            className={`btn ${type} ${activeClass ? 'active' : ''}`}>{children}</button>
     );
}
 
export default Button;