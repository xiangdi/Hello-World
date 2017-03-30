import * as util from './util';
import heartBeat from './heartBeat';

let app = {
  CSRFProtection(xhr){
    let token = $('meta[name="csrf-token"]').attr('content');
    if (token){
      xhr.setRequestHeader('X-CSRF-Token', token);
    }
  },
  refreshCSRFTokens(){
    let csrfToken = $('meta[name=csrf-token]').attr('content');
    let csrfParam = $('meta[name=csrf-param]').attr('content');
    $('form input[name="' + csrfParam + '"]').val(csrfToken);
  },
  attachCSRF(){
    $.ajaxPrefilter( (options, originalOptions, xhr)=> {
      if (!options.crossDomain) {
        app.CSRFProtection(xhr);
      }
    });
    app.refreshCSRFTokens();
  },
  util: util.default,
  heartBeat,
  init(){
    app.attachCSRF();
    app.heartBeat();
  }
};

if ( !window['app'] ) {
  window['app'] = app;
  app.init();
}

export default app;
