module.exports = function(ngModule){
    // Controllers import.
    require('./authorized-layout/authorized-layout.controller')(ngModule);
    require('./unauthorized-layout/unauthorized-layout.controller')(ngModule);

    // Import routes.
    require('./authorized-layout/authorized-layout.route')(ngModule);
    require('./unauthorized-layout/unauthorized-layout.route')(ngModule);
};