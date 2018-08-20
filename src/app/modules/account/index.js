// Load module html templates.
module.exports = (ngModule) => {
    // Load routes.
    let login = require('./login');
    ngModule.config(($stateProvider) => login.LoginModule($stateProvider));
};
