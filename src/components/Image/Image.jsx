import React from 'react';
import Avatar from '../../assets/avatar.jpg';
import styles from './Image.style';

const Image = (props) => {
    return (
        <div css={styles.avatar}>
            <img src={Avatar} />
        </div>
    );
}

export default Image;