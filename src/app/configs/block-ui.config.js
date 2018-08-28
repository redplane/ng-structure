module.exports = (ngModule) => {
    ngModule.config((blockUIConfig) => {
        blockUIConfig.autoInjectBodyBlock = false;
    });
};