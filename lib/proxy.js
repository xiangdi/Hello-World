/**
 * proxy
 */
var QueryString = require('querystring');

var _ = require('lodash');
var request = require('co-request');
const logger = require('log4js').getLogger('proxy')

var util = require('./util');

var uuid = util.uuid;

var rquery = (/\?/);

var CONF = {
  'getTest': {
    uri: 'http://httpbin.org/get',
    method: 'get'
  },
  'listPost': {
    uri: 'http://httpbin.org/post',
    method: 'post'
  }
};

var proxy = module.exports = function(){
  var args = _.slice(arguments)
  return new Promise((resolve, reject) => {
    var ret = request.apply(null, args)
    try {
      resolve(ret)
    } catch(e) {
      reject(e)
      return
    }
  })
}

_.forEach(CONF, function(v, k){
  proxy[k] = function(data, opt){
    // default timeout for http
    var args = _.assign({timeout: 10000}, v);
    var cacheURL = args.uri || args.url;
    var form;
    var uri;
    var requestid;

    if( args.method && ( args.method === 'post' || args.method === 'put' || args.method === 'patch' ) ){
      requestid = uuid();
      if ( data ) {
        data._requestid = requestid;
        form = {form: data};
      }
      if ( opt ) {
        // application/x-www-form-urlencoded
        opt.form && (opt.form._requestid = requestid);
        // multipart/form-data
        opt.formData && (opt.formData._requestid = requestid);
      }
      console.log('[INFO] proxy - [%s] - %s', requestid, cacheURL, args.method);
      _.assign(args, form, opt);
    }
    if( !args.method || args.method === 'get' ){
      uri = [cacheURL, (rquery.test(cacheURL)) ? '&' : '?', QueryString.stringify(data)].join('');
      _.assign(args, {uri: uri}, opt);
    }
    logger.info(args, form, uri);
    return proxy(args);
  };
});
