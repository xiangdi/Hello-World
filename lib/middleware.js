'use strict';

const logger = require('log4js').getLogger('home')
const util = require('./util')
const config = util.setting

exports.csrf = (ctx, next) => {
  if (![ 'GET', 'POST' ].includes(ctx.method))
    return next()
  if (ctx.method === 'GET') {
    ctx.state.csrf = ctx.csrf
    return next()
  }
  return next()
}

exports.addError = async (ctx, next) => {
  ctx.addError = function(k, v){
    if ( !ctx.errors ) {
      ctx.errors = []
    }
    var e = {}
    e[k] = v
    ctx.errors.push(e)
    return ctx
  }
  await next()
}
exports.state = async (ctx, next) => {
  const session = ctx.session
  ctx.state = {
    debug: config.debug,
    isLogin: false,
    user: null,
    session: session,
    csrf: ctx.csrf,
    path: ctx.path
  };
  // debug
  if (config.debug) {
    ctx.state._request = ctx.request
  }
  if ( session.isLogin ) {
    ctx.state.isLogin = true
    ctx.state.user = session.user
  }
  await next()
}
