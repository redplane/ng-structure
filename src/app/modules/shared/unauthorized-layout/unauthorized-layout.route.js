module.exports = function(ngModule){

    // Import html template.
    var ngModuleHtmlTemplate = require('./unauthorized-layout.html');

    // Route config.
    ngModule.config(function($stateProvider, urlStates){
      $stateProvider.state(urlStates.unauthorizedLayout.name, {
          controller: 'unauthorizedLayoutController',
          abstract: true,
          template: ngModuleHtmlTemplate,
          params:{
              cssClassNames: ['hold-transition', 'login-page']
          }
      })
  });
};