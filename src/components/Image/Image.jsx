import React from 'react';
import styles from './Image.style';

const Image = (props) => {
    return (
        <div css={styles.avatar} onClick={props.clickHandler}>
            {props.unit}
        </div>
    );
}

export default Image;