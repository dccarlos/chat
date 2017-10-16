/**
 * Created by 'Carlos Dávila-Cordero'
 */

'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../flux/AppDispatcher';
import AppActionType from '../flux/AppActionType';

let AppStore = (function () {

    let stateCallbacks = (function () {
        function showLoginModal(state, action) {
            return Object.assign({}, state, {showLoginModal: action.flag});
        }

        return {
            [Symbol.for(AppActionType.SHW_LOGIN_MODAL)]: showLoginModal
        }
    }());

    return class EMUsersStore extends ReduceStore {
        constructor() {
            super(AppDispatcher);
        }

        getInitialState() {
            return {
                showLoginModal: false
            };
        }

        reduce(state, action) {
            if (stateCallbacks[Symbol.for(action.type)]) {
                return stateCallbacks[Symbol.for(action.type)](state, action);
            }
            else {
                return state;
            }
        }
    }
}());

export default new AppStore();