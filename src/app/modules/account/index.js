// Load module html templates.
module.exports = (ngModule) => {
    // Load routes.
    const {LoginModule} = require('./login');
    ngModule.config(($stateProvider) => new LoginModule($stateProvider));
};
