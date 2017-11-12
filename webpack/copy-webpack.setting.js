// Import libraries.
var path = require('path');

// Import settings.
var settings = require('./webpack-setting');

exports = module.exports = {

    /*
    * Get copy-webpack-plugin configuration.
    * */
    get: function (root) {
        // Find application path.
        var app = settings.paths.getApplication(root);
        var dist = settings.paths.getDist(root);

        return [{
            from: path.resolve(app, 'assets'),
            to: path.resolve(dist, 'assets')
        }]
    }
};

return module.exports;