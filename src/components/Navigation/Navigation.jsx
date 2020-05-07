import React, { useState } from 'react';
import ChartIcon from '../../assets/icon-chart-bar.svg';
import Image from '../../components/Image/Image';
import styles from './Navigation.style';

const Navigation = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const unit = props.userName === 'Marcin' ? 'M' : 'A';

    return ( 
        <nav css={styles.main}>
            <div className="menu-button">
                <ChartIcon />
            </div>
            <Image unit={unit} clickHandler={() => setShowMenu(true)} />
            {showMenu && 
                <div css={styles.menu}>
                    <button css={styles.button} onClick={props.logout}>Log Out</button>
                </div>
            }
        </nav>
     );
}
 
export default Navigation;