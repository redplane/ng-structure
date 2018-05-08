module.exports = (ngModule) => {
    // Controllers import.
    require('./navigation-bar/navigation-bar')(ngModule);
    require('./side-bar/side-bar')(ngModule);
    require('./ui-view-css')(ngModule);
};