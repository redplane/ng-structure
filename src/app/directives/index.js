module.exports = function(ngModule){
    // Controllers import.
    require('./navigation-bar/navigation-bar.directive')(ngModule);
    require('./side-bar/side-bar.directive')(ngModule);
    require('./ui-view-css.directive')(ngModule);
};