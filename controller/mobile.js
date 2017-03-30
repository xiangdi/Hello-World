'use strict';

const logger = require('log4js').getLogger('mobile')

const mobile = async (ctx, next) => {
  ctx.render('mobile/home')
}

module.exports = mobile
