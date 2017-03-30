/**
 * routers
 */
const Router = require('koa-router')

const home = require('./home')
const mobile = require('./mobile')
const aboutUs=require('./aboutUs')

function webRouter(){
  const router = new Router()
  // home
  router
    .get('/', home)
    .get('/home/:id', home.getId)
    .post('/home/user', home.postData)
    .get('/mobile', mobile)
    .get('/aboutus',aboutUs)

  return router
}

/**
 * mobile router
 */
function mobileRouter(){
  const router = new Router()
  // true/false for input blur check

  return router
}

/**
 *aboutUs router
 */
 function aboutUsRouter(){
  const router=new Router()
 
  return router
 }

/**
 * API router
 */
function apiRouter(){
  const router = new Router()
  // true/false for input blur check
  router
    .get('/', home.apiHome)

  return router
}


module.exports = function(config){
  const state = config.state || 'web'
  if ( state === 'api' ) {
    return apiRouter()
  }
  return webRouter()
}
