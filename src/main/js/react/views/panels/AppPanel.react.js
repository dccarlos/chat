/**
 * Created by 'Carlos Dávila-Cordero'
 */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Panel, Button, Table, Grid, Row, Col} from 'react-bootstrap';
import SockJS from 'sockjs-client';

import {Stomp} from '../../../util/stomp';

import {SimpleTextFormControl} from '../util/ViewsUtils.react';

var stompClient = null;
var isConnected = false;

function initStompClient(onConnectionCallback, onMessageCallback) {
    if (stompClient == null || !isConnected) {
        console.log('Starting STOMP over SocksJS...');

        var socket = new SockJS('/sample-chat');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
            console.log('STOMP Connection: ' + frame);

            stompClient.subscribe('/topic/chat', function (greeting) {
                onMessageCallback(greeting);
            });

            onConnectionCallback(true, onConnectionCallback);
        }, function (frame) {
            console.log('STOMP Disconnection error: ' + frame);
            onConnectionCallback(false, onConnectionCallback);
        });
    }

    return stompClient;
}

function disconnectStompClient(onConnectionCallback) {
    if (stompClient != null) {
        stompClient.disconnect(function () {
            console.log('STOMP Disconnection');

            onConnectionChange(false, onConnectionCallback);
        });
    }
}

function onConnectionChange(connected, callback) {
    isConnected = connected;
    callback(connected);
}

function sendMessage(message) {
    stompClient.send("/app/chat", {}, JSON.stringify({'content': message}));
}

let AppPanel = (function () {


    return class AppPanel extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                response: '',
                request: '',
                messages: [],
                isConnected: false
            };

            this.connectChat = this.connectChat.bind(this);
            this.disconnectChat = this.disconnectChat.bind(this);
            this.onChangeRequestMessage = this.onChangeRequestMessage.bind(this);
            this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this);
            this.canExecuteRequest = this.canExecuteRequest.bind(this);
            this.executeRequest = this.executeRequest.bind(this);
            this.onResponseReceived = this.onResponseReceived.bind(this);
            this.setConnected = this.setConnected.bind(this);
        }

        connectChat() {
            initStompClient(
                this.setConnected,
                this.onResponseReceived
            );
        }

        disconnectChat() {
            disconnectStompClient((isConnected) => {
                this.setState({
                    isConnected: isConnected
                });
            });
        }

        setConnected(isConnected) {
            this.setState({
                isConnected: isConnected
            });
        }

        onChangeRequestMessage(e) {
            this.setState({
                request: e.target.value
            });
        }

        onResponseReceived(message) {
            var msg = {text: JSON.parse(message.body).content, id: message.headers["message-id"]};
            let messages = this.state.messages;

            this.setState({
                messages: messages.concat(msg)
            });
        }

        handleEnterKeyPress(e) {
            if (e.key === 'Enter') {
                this.executeRequest();
            }
        }

        canExecuteRequest() {
            return (this.state.isConnected && this.state.request && this.state.request.trim().length > 0);
        }

        executeRequest() {
            if (this.canExecuteRequest()) {
                sendMessage(this.state.request.trim());
                this.setState({
                    request: ''
                });
            }
        }

        componentWillMount() {
            this.connectChat();
        }

        render() {

            let messages = this.state.messages.map(message => {
                return (
                    <tr key={message.id}>
                        <td>{message.text}</td>
                    </tr>
                );
            });

            let messageList = (
                <Panel>
                    <div style={{overflowY:"scroll", height: "500px"}}>
                        <Table bordered condensed hover responsive striped
                               style={{wordWrap: "break-word", tableLayout: "fixed"}}>
                            <tbody>
                            <tr>
                                <th style={{width: "100%"}}>Messages</th>
                            </tr>
                            {messages}
                            </tbody>
                        </Table>
                    </div>
                </Panel>
            );

            return (
                <Grid fluid={true}>
                    <Row className="show-grid">
                        <Col md={4} xs={9}>
                            <Panel>
                                <Button onClick={this.connectChat} disabled={this.state.isConnected}>
                                    Connect
                                </Button>
                                <Button onClick={this.disconnectChat} disabled={!this.state.isConnected}>
                                    Disconnect
                                </Button>
                                <SimpleTextFormControl
                                    readOnly={!this.state.isConnected}
                                    field={this.state.request}
                                    placeholder="Send message"
                                    handleFieldChange={this.onChangeRequestMessage}
                                    onKeyPress={this.handleEnterKeyPress}
                                />
                                <Button onClick={this.executeRequest} disabled={!this.canExecuteRequest()}>
                                    Send message
                                </Button>
                            </Panel>
                        </Col>
                        <Col md={8} xs={9}>
                            {messageList}
                        </Col>
                    </Row>
                </Grid>
            );
        }
    }
}());

export default AppPanel;