/**
 * Created by 'Carlos Dávila-Cordero'
 */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import AppContainer from './flux/AppContainer';
import AppLoginForm from './views/forms/AppLoginForm.react';

ReactDOM.render(
    (<Router>
            <div>
                <Route exact path="/" component={AppContainer}/>
                <Route path="/login" component={AppLoginForm}/>
            </div>
        </Router>),
    document.getElementById('simple-chat-app'));