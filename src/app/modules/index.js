module.exports = (ngModule) => {
    require('./shared/index')(ngModule);

    const {DashboardModule} = require('./dashboard');
    ngModule.config(($stateProvider) => new DashboardModule($stateProvider));

    require('./account/index')(ngModule);
};