import React, { useState } from 'react';
import ChartIcon from '../../assets/icon-chart-bar.svg';
import Image from '../../components/Image/Image';
import { colors } from '../../constants';
/** @jsx jsx */  import { jsx, css } from '@emotion/core';

const style = css`
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

const Navigation = () => {
    const [showMenu, setShowMenu] = useState(false);

    return ( 
        <nav css={style}>
            <div className="menu-button">
                <ChartIcon />
            </div>
            <Image />
        </nav>
     );
}
 
export default Navigation;