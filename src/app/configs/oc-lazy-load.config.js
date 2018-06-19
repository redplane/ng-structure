module.exports = (ngModule) => {
    ngModule.config(($ocLazyLoadProvider) => {
        $ocLazyLoadProvider
            .config({
                debug: IS_DEVELOPMENT
            })
    });
};