module.exports = (env, argv) => {
    let path = require('path');
    let webpack = require('webpack');
    let CleanWebpackPlugin = require('clean-webpack-plugin');
    let CopyWebpackPlugin = require('copy-webpack-plugin');
    let HtmlWebpackPlugin = require('html-webpack-plugin');
    let ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
    let BrowserSyncPlugin = require('browser-sync-webpack-plugin');

    // Import webpack settings.
    let settings = require('./webpack/webpack-setting');
    let options = {
        clean: require('./webpack/clean-webpack.setting').get(__dirname),
        copy: require('./webpack/copy-webpack.setting').get(__dirname)
    };

    // True if built is set to production mode.
    // False if built is set to development mode.
    const bProductionMode = 'production' === argv.mode.toLowerCase();

    // Build path options.
    let paths = {
        source: settings.paths.getSource(__dirname),
        app: settings.paths.getApplication(__dirname),
        dist: settings.paths.getDist(__dirname)
    };

    /*
    * Plugins import.
    * */
    let plugins = [];

    // Remove obsoleted chunks.
    let CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
    plugins.push(new CleanObsoleteChunks({verbose: true}));

    // Clean fields before publishing packages.
    plugins.push(new CleanWebpackPlugin(options.clean.paths, options.clean.options));

    /*
    * Enlist plugins which should be run on production mode.
    * */
    if (bProductionMode) {
        //Automatically add annotation to angularjs modules.
        // Bundling can affect module initialization.
        plugins.push(new ngAnnotatePlugin({add: true}));
    }

    /*
    * Not in production mode
    * */
    if (!bProductionMode) {
        // Require original index file.
        let browserSyncPlugin = new BrowserSyncPlugin({
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
        Promise: 'bluebird',
        moment: 'moment'
    }));


    //Automatically inject chunks into html files.
    plugins.push(new HtmlWebpackPlugin({
        template: path.resolve(paths.source, 'index.html'),
        chunksSortMode: 'dependency'
    }));

    let moduleRuleOption = require('./webpack/rule-webpack.setting');

    /*
    * Module export.
    * */
    return {
        context: settings.paths.getSource(__dirname),
        entry: {
            'jQueryVendors': ['jquery', 'bluebird', 'bootstrap', 'admin-lte', 'moment'],
            'angularVendors': [
                'angular', '@uirouter/angularjs', 'angular-block-ui', 'angular-toastr',
                'angular-translate', 'angular-translate-loader-static-files', 'angular-moment', 'angular-moment-picker'],
            'app': path.resolve(paths.app, 'app.js')
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    default: {
                        enforce: true,
                        priority: 1
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: 2,
                        name: 'vendors',
                        enforce: true,
                        chunks: 'async'
                    }
                }
            }
        },
        module: {
            rules: moduleRuleOption.get()
        },
        plugins: plugins,
        output: {
            path: path.resolve(paths.dist),
            filename: '[name].[hash].js'
        },
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: [".ts", ".tsx", ".js"]
        },

    };
};