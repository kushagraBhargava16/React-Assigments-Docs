import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary/Auxillary'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        //Here we have to use constructor instead of componentDidMount because we need to include axios interceptors before sending any request, which are doing in the WrappedComponent(See statefull lifeCycle)
        constructor(props) {
            super(props);
            this.state = {
                error: null,
            }
            //Note:- here we need the axios object to determine wether an error has occured or the req was succesful and update the state accordingly
            this.reqInterceptor = axios.interceptors.request.use(
                req => {
                    this.setState({ error: null });
                    return req;
                }
            );

            this.resInterceptor = axios.interceptors.response.use(
                res => res,
                error => {
                    this.setState({ error });
                }
            );
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    {/* We need both modal and WrappedComponent on the same level so that we can display then according to the condition */}
                    <Modal
                        modalClosed={this.errorConfirmedHandler}
                        display={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;