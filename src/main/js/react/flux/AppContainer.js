/**
 * Created by 'Carlos Dávila-Cordero'
 */

'use strict';

import {Container} from 'flux/utils';

import AppMain from '../views/AppMain.react';
import AppStore from '../flux/AppStore';
import AppActions from '../flux/AppActions';

function getStores() {
    return [
        AppStore
    ];
}

function getState() {
    return {
        // ==================== State ====================
        appState: AppStore.getState(),

        // =================== Actions ===================
        showLoginModal: AppActions.showLoginModal
    };
}

export default Container.createFunctional(AppMain, getStores, getState);