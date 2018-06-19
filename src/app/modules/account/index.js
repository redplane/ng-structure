// Load module html templates.
module.exports = (ngModule) => {
    // Load routes.
    require('./login/login.route')(ngModule);
};
