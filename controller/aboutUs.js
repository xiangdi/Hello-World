'use strict'

const logger = require('log4js').getLogger('aboutUs')

const aboutUs=async (ctx,next)=>{
		ctx.render('/aboutus.company')
}


module.exports=aboutUs