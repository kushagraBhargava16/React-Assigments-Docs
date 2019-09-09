import React from 'react';

import styles from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Brackdrop'
import Aux from '../../../hoc/Auxillary/Auxillary'

const SideDrawer = props => {

    let attachedClassed = [styles.SideDrawer, styles.Close];

    if (props.open) {
        attachedClassed = [styles.SideDrawer, styles.Open];
    }

    return (
        <Aux>
            <Backdrop
                display={props.open}
                clicked={props.closed} />
            <div className={attachedClassed.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default SideDrawer;