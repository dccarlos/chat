/**
 * Created by 'Carlos Dávila-Cordero'
 */

'use strict';

import AppActionType from "../flux/AppActionType";
import AppDispatcher from "../flux/AppDispatcher";

const EMUsersActions = {
    showLoginModal(flag) {
        AppDispatcher.dispatch({
            type: AppActionType.SHW_LOGIN_MODAL,
            flag
        });
    }
};

export default EMUsersActions;