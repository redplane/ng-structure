// Import library.
var settings = require('./webpack-setting');

exports = module.exports = {
    /*
    * Get configuration options.
    * */
    get: function (root) {
        var setting = {};
        setting.paths = [settings.paths.getDist(root)];
        setting.options = {
            // Absolute path to your webpack root folder (paths appended to this)
            // Default: root of your package
            root: root,

            // Write logs to console.
            verbose: true,

            // Use boolean "true" to test/emulate delete. (will not remove files).
            // Default: false - remove files
            dry: false,

            // If true, remove files on recompile.
            // Default: false
            watch: false,

            // Instead of removing whole path recursively,
            // remove all path's content with exclusion of provided immediate children.
            // Good for not removing shared files from build directories.
            exclude: ['index.html'],

            // allow the plugin to clean folders outside of the webpack root.
            // Default: false - don't allow clean folder outside of the webpack root
            allowExternal: false
        };

        return setting;
    }
};