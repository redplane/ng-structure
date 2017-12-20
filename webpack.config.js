var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Import webpack settings.
var settings = require('./webpack/webpack-setting');
var options = {
    clean: require('./webpack/clean-webpack.setting').get(__dirname),
    copy: require('./webpack/copy-webpack.setting').get(__dirname)
};

// True if built is set to production mode.
// False if built is set to development mode.
var bProductionMode = false;

// Get environment variable.
var env = process.env.NODE_ENV;
if (env && 'production' == env.trim().toLowerCase()) {
    bProductionMode = true;
}

// Build path options.
var paths = {
    source: settings.paths.getSource(__dirname),
    app: settings.paths.getApplication(__dirname),
    dist: settings.paths.getDist(__dirname)
};

/*
* Plugins import.
* */
var plugins = [];

/*
* Enlist plugins which should be run on production mode.
* */
if (bProductionMode) {
    // Clean fields before publishing packages.
    plugins.push(new CleanWebpackPlugin(options.clean.paths, options.clean.options));

    //Automatically add annotation to angularjs modules.
    // Bundling can affect module initialization.
    plugins.push(new ngAnnotatePlugin({add: true}));

    // Bundle source files.
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: true}
    }));
}

/*
* Not in production mode
* */
if (!bProductionMode) {
    // Require original index file.
    var browserSyncPlugin = new BrowserSyncPlugin({
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        host: 'localhost',
        port: 8000,
        files: [
            path.resolve(paths.source, 'index.html')
        ],
        server: {
            baseDir: [
                paths.dist
            ]
        }
    });

    // Push plugins into list.
    plugins.push(browserSyncPlugin);
}

/*
* Enlist default plugins.
* */
// Copy files.
plugins.push(new CopyWebpackPlugin(options.copy));

// Using bluebird promise instead of native promise.
plugins.push(new webpack.ProvidePlugin({
    Promise: 'bluebird'
}));


//Using this plugin to split source code into chunks
//This is for improving loading process.
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity
}));

//Automatically inject chunks into html files.
plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(paths.source, 'index.html'),
    chunksSortMode: function (a, b) {
        //let order = ['app','angular-plugins', 'jquery-plugins'];
        var order = ['vendor', 'app'];
        return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
    }
}));

/*
* Module export.
* */
module.exports = {
    context: settings.paths.getSource(__dirname),
    entry: {
        'vendor': ['jquery', 'bootstrap', 'admin-lte',
            'angular', '@uirouter/angularjs', 'angular-block-ui', 'angular-toastr',
            'angular-translate', 'angular-translate-loader-static-files', 'bluebird'],
        'app': path.resolve(paths.app, 'app.js')
    },
    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.html$/, // Only .html files
                loader: 'html-loader' // Run html loader
            }
        ]
    },
    plugins: plugins,
    output: {
        path: path.resolve(paths.dist),
        filename: '[name].js'
    }
};


// Return module configurations.
return module.exports;