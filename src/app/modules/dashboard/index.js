module.exports = (ngModule) => {

    // Import controllers.
    require('./main/main.controller')(ngModule);

    // Import routes.
    require('./main/main.route')(ngModule);
};