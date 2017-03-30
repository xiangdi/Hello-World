'use strict'

var path = require('path')
const koa = require('koa')
const app = new koa()
const Pug = require('koa-pug')
const koaBody = require('koa-body')
const serveStatic = require('koa-static')
const log4js = require('log4js')
const logger = log4js.getLogger('app')
const convert = require('koa-convert')
const csrf = require('koa-csrf').default
const validate = require('koa-validate')

const session = require('./lib/getToken')
const config = require('./setting.js')
const router = require('./controller')(config)
const proxy = require('./lib/proxy')
const middleware = require('./lib/middleware')
const pug = new Pug(config.view)

//init config
app.proxy = true
app.keys = config.keys
const port = config.port
// pug template
pug.use(app)

app.use(convert(session(config.session)))
log4js.configure(config.loggerConfig)
validate(app)
app.use(middleware.addError)
// state
app.use(middleware.state);

app.use(async (ctx, next) =>{
  ctx.proxy = proxy
  await next()
})

app.use(koaBody())

//csrf
// app.use(new csrf({
//   invalidSessionSecretMessage: 'Invalid session secret',
//   invalidSessionSecretStatusCode: 403,
//   invalidTokenMessage: 'Invalid CSRF token',
//   invalidTokenStatusCode: 403,
//   excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
//   disableQuery: false
// }))
app.use(new csrf())
app.use(middleware.csrf)

// router
app
  .use(router.routes())
  .use(router.allowedMethods())

// static must after router
app.use(serveStatic( __dirname + '/static' ))

app.listen(port, ()=>{
  console.log('listen' + port)
})
