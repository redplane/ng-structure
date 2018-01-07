module.exports = function (ngModule) {
    require('./authentication.service')(ngModule);
    require('./ui.service')(ngModule);
};