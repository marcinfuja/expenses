import React, { useState } from 'react';
import ChartIcon from '../../assets/icon-chart-bar.svg';
import HomeIcon from '../../assets/icon-home.svg';
import Image from '../../components/Image/Image';
import styles from './Navigation.style';
import {
    Link
  } from "react-router-dom";

const Navigation = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const unit = props.userName === 'Marcin' ? 'M' : 'A';

    return ( 
        <nav css={styles.main}>
            <Link to="/"><HomeIcon /></Link>
            <Image unit={unit} clickHandler={() => setShowMenu(!showMenu)} />
            <Link to="/expenses"><ChartIcon /></Link>
            {showMenu && 
                <div css={styles.menu}>
                    <button css={styles.button} onClick={() => {
                        props.logout()
                        setShowMenu(false);
                    }}>Log Out</button>
                </div>
            }
        </nav>
     );
}
 
export default Navigation;