// Load module html templates.
var ngLoginHtml = require('./login/login.html');

module.exports = function(ngModule){

    // Load controllers.
    require('./login/login.controller')(ngModule);

    // Load routes.
    require('./login/login.route')(ngModule);
};
