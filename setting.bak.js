'use strict'

var path = require('path');

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;
var state = process.env.STATE || 'web'; // web/mobile/api
var host = process.env.HOST || '0.0.0.0';
var view_tpl_path = path.resolve(__dirname, './tpl');

var DEBUG = (env !== 'production');

// global locals
var global_view_locals = {
  site_name: '',
  site_title: '',
  site_keywords: '',
  site_description: ''
};

var redis_session = {
  host: '192.168.1.21',
  port: 6379,
  db: 3,
  options: {
    auth_pass: 'CHongZh1',
  },
  keySchema: 'session',
  ttl: 24 * 60 * 60
};

var redis_set = {
  host: '127.0.0.1',
  port: '6379',
  db: 1
};

var redis_get = {
  host: '127.0.0.1',
  port: '6379',
  db: 0
};

var loggerConfig = {
  appenders: [
    {
      "type": "dateFile",
      "filename": "./logs/log_date/date",
      "alwaysIncludePattern": true,
      "pattern": "-yyyy-MM-dd-hh.log"
    }
  ]
}

if ( DEBUG ) {
  loggerConfig = {
    appenders: [
      { type: 'console' }
    ]
  }
}

module.exports = {
  name: 'web',
  keys: ['hoomsun', 'by koa2'], // signed cookie keys
  env: env,
  debug: DEBUG,
  port: port,
  host: host,
  state: state,
  session: {store: redis_session },
  redis: redis_get,
  redisMaster: redis_set,
  static: path.join(__dirname, 'static'),
  loggerConfig: loggerConfig,
  view: {
    viewPath: view_tpl_path,
    debug: DEBUG,
    pretty: DEBUG,
    compileDebug: DEBUG,
    helperPath: [
      {'UIHelper': path.resolve(__dirname, './lib/helper.js')},
      { _: require('lodash') }
    ],
    locals: global_view_locals
  },
  upload:{
    uploadDir: path.resolve(__dirname, './static/upload'),
    limit: 5 * 1024 * 1024
  },
  apiBase: 'http://192.168.1.24/rrcp/',
  snsApi: 'http://192.168.1.24/sns-api/'
};
