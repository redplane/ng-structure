module.exports = (ngModule) => {
    ngModule.config(($translateProvider) => {
        // Translation config.
        $translateProvider.useStaticFilesLoader({
            prefix: './assets/dictionary/',
            suffix: '.json'
        });

        // en-US is default selection.
        $translateProvider.use('en-US');

    });
};