import React from 'react';
import Avatar from '../../assets/avatar.jpg';
import './Image.scss';

const Image = (props) => {
    return (
        <div className="avatar">
            <img src={Avatar} />
        </div>
    );
}

export default Image;