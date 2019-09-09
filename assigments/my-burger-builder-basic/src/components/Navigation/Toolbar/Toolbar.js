import React from 'react'

import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NaviationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = props => {
    return (
        <header className={styles.Toolbar}>
            <DrawerToggle
                clicked={props.toggle} />
            {/* <div>Menu</div> */}
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav className={styles.DesktopOnly}>
                <NaviationItems />
            </nav>

        </header>
    );
}

export default Toolbar