import React, { Component } from 'react'

import styles from './Modal.module.css'
import Aux from '../../../hoc/Auxillary'
import Backdrop from '../../../components/UI/Backdrop/Brackdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.display !== this.props.display;
    }

    render() {
        return (
            <Aux>
                <Backdrop display={this.props.display} clicked={this.props.modalClosed} />
                <div
                    className={styles.Modal}
                    style={{
                        transform: this.props.display ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.display ? 1 : 0
                    }}>
                    {this.props.children}
                </div>
            </Aux >
        );
    }
}

export default Modal;