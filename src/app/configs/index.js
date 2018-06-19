module.exports = (ngModule) => {
    require('./oc-lazy-load.config')(ngModule);
    require('./angular-translate.config')(ngModule);
};