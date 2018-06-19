module.exports = (ngModule) => {
    // Import routes.
    require('./authorized-layout/authorized-layout.route')(ngModule);
    require('./unauthorized-layout/unauthorized-layout.route')(ngModule);
};