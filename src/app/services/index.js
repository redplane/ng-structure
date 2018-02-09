module.exports = function (ngModule) {
    require('./authentication.service')(ngModule);
    require('./validation.service')(ngModule);
};