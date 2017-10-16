/**
 * Created by 'Carlos Dávila-Cordero'.
 */
'use strict';

import React from 'react';
import {FormGroup, ControlLabel, FormControl, Modal, Button} from 'react-bootstrap';
import {isValidUserName, isValidPassword} from '../../../util/AppUtils';

let AppLoginForm = (function () {
    // Username text field
    let UserNameTextForm = (function () {
        return class UserNameTextForm extends React.Component {
            constructor(props) {
                super(props);
                this.state = {userName: ''};
                this.handleUserNameChange = this.handleUserNameChange.bind(this);
            }

            getLoginUserNameValidationState() {
                if (isValidUserName(this.state.userName)) return 'success';
                else return 'error';
            }

            handleUserNameChange(e) {
                this.setState({
                    userName: e.target.value
                });
            }

            render() {
                return (
                    <div>
                        <FormGroup validationState={this.getLoginUserNameValidationState()}>
                            <ControlLabel>User name</ControlLabel>
                            <FormControl
                                name="username"
                                type="text"
                                value={this.state.userName}
                                placeholder="Enter username (any username)"
                                onChange={this.handleUserNameChange}/>
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                );
            }
        }
    }());

    // Password text field
    let PasswordTextForm = (function () {
        return class PasswordTextForm extends React.Component {
            constructor(props) {
                super(props);
                this.state = {password: ''};
                this.handlePasswordChange = this.handlePasswordChange.bind(this);
            }

            getPasswordValidationState() {
                if (isValidPassword(this.state.password)) return 'success';
                else return 'error';
            }

            handlePasswordChange(e) {
                this.setState({
                    password: e.target.value
                });
            }

            render() {
                return (
                    <div>
                        <FormGroup validationState={this.getPasswordValidationState()}>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                name="password"
                                type="password"
                                value={this.state.password}
                                placeholder="Enter password ((choosen username) + x)"
                                onChange={this.handlePasswordChange}/>
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                );
            }
        }
    }());

    return class AppLoginModal extends React.Component {
        constructor(props) {
            super(props);
            // this.onClickCloseLoginModal = this.onClickCloseLoginModal.bind(this);
        }

        onClickCloseLoginModal() {
            console.log('Button is working!');
        }

        render() {
            return (
                <Modal
                    show={true}>
                    <Modal.Header>
                        <Modal.Title>Spring/React/Security Sample Login</Modal.Title>
                    </Modal.Header>
                    <form action="login" method="POST">
                        <Modal.Body>
                            <UserNameTextForm ref="UserNameTextForm"/>
                            <PasswordTextForm ref="PasswordTextForm"/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">Login</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            );
        }
    }

}()); // In this case we'll need a function for the router, so '()' is removed

export default AppLoginForm;