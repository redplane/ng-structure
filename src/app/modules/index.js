module.exports = function(ngModule){
    require('./shared/index')(ngModule);
    require('./dashboard/index')(ngModule);
    require('./account/index')(ngModule);
};