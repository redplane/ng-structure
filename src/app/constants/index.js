module.exports = function (ngModule) {
    /*
    * Constants declaration.
    * */
    require('./app-settings.constant')(ngModule);
    require('./url-states.constant')(ngModule);
};