/**
 * util
 */
var url = require('url')
var queryString = require('querystring')
var _ = require('lodash')
var uuid = require('node-uuid')

var setting = require('../setting');

exports.setting = setting;

/**
 * uuid
 */
exports.uuid = function(){
  return uuid()
}
