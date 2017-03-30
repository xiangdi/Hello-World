'use strict'

const logger = require('log4js').getLogger('home')
const util = require('../lib/util')
const _ = require('lodash')

const home = async (ctx, next) => {
  const _json = {'token': 12, 'de': 'aed'}
  const _data = {}
  logger.debug(ctx.header)

  ctx.session.count = 1
  ctx.render('home.pug')
  //ctx.body = _json
}

home.getId = async (ctx, next) => {
  const _id = ctx.checkParams('id').isInt('不是数字').trim().notEmpty().value
  var _render = function(){
    ctx.state.errors = ctx.errors
    ctx.render('list.pug')
  }
  logger.debug('gitId.id', _id)
  if ( ctx.errors ){
    _render()
    return next()
  }
  ctx.session.count = _id
  ctx.body = _id
}

home.postData = async (ctx, next) => {
  const _userName = ctx.checkBody('userName').value
  if( ctx.errors ){
    return next()
  }
  logger.info('home.postData+', _userName)
}

home.apiHome = async (ctx, next) => {
  const _json = {'token': 12, 'de': 'aed'}
  const _data = {
    userId: 1
  }
  await ctx.proxy.getTest(_data)
    .then(function(val){
      logger.debug('apihome.proxy', val.body)
      _.extend(_json, {
        result: val
      })
    }, function(err){
      logger.debug('apihome.proxy.error', err)
    })
  await ctx.proxy.listPost(_data)
    .then(function(value){
      logger.debug('apihome.proxy.post', value.body)
    }, function(err){
      logger.debug('apihome.proxy.post.err', err)
    })
  ctx.body = _json
}

module.exports = home
