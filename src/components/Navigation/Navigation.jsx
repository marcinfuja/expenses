import React, { useState } from 'react';
import ChartIcon from '../../assets/icon-chart-bar.svg';
import Image from '../../components/Image/Image';
import './Navigation.scss';

const Navigation = () => {
    const [showMenu, setShowMenu] = useState(false);

    return ( 
        <nav className="navigation">
            <Image />
            <div className="menu-button">
                <ChartIcon />
            </div>
        </nav>
     );
}
 
export default Navigation;