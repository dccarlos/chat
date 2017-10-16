/**
 * Created by 'Carlos Dávila-Cordero'
 */

'use strict';

function isASCIIWithoutSpaces(str) {
    return /^[\x00-\x7F]\S*$/.test(str);
}

function EMException(message) {
    this.message = message;
    this.name = "EMException";
}

module.exports = {
    isValidUserName: function (userName) {
        return ((typeof userName === 'string') && userName != '' && isASCIIWithoutSpaces(userName));
    },

    isValidPassword: function (password) {
        return ((typeof password === 'string') && password != '' && isASCIIWithoutSpaces(password));
    },

    validateUserName: function (userName) {
        if (!isASCIIWithoutSpaces(userName)) throw new EMException('Missing or invalid field: \'userName\'');
    },

    validatePassword: function (password) {
        if (!isASCIIWithoutSpaces(password)) throw new EMException('Missing or invalid field: \'password\'');
    },

    isASCIIWithoutSpaces: isASCIIWithoutSpaces
};