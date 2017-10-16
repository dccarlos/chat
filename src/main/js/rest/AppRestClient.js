/**
 * Created by 'Carlos Dávila-Cordero'
 */

'use strict';

var rest = require('rest');
var errorCode = require('rest/interceptor/errorCode');
var defaultRequest = require('rest/interceptor/defaultRequest');
var mime = require('rest/interceptor/mime');

var uriTemplateInterceptor = require('./uriTemplateInterceptor');
var baseRegistry = require('rest/mime/registry');
var registry = baseRegistry.child();

registry.register('text/uri-list', require('./uriListConverter'));
registry.register('application/json', require('rest/mime/type/application/json'));

/*
var client = rest
    .wrap(mime, {registry: registry})
    .wrap(uriTemplateInterceptor)
    .wrap(errorCode)
    .wrap(defaultRequest, {headers: {'Accept': 'application/json'}});
*/

module.exports = {
    /*
    sampleGetRequest: function () {
        return client({
            method: 'GET',
            path: '/entities/one'
        }).then(getResponse => {
            return getResponse.entity;
        }, error => {
            return error.entity;
        });
    }
    */
};