const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const path = require('path');

exports = module.exports = {

    //#region Methods

    get: (argv, bProductionMode, paths) => {

        // Plugins list.
        let plugins = [];

        // Clean plugin
        // List of directories to be cleaned.
        const oCleanedItems = [paths.dist];
        const pCleanOption = {
            // Absolute path to your webpack root folder (paths appended to this)
            // Default: root of your package
            root: paths.source,

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
            exclude: null,

            // allow the plugin to clean folders outside of the webpack root.
            // Default: false - don't allow clean folder outside of the webpack root
            allowExternal: true
        };

        if (oCleanedItems.length > 0)
            plugins.push(new CleanWebpackPlugin(oCleanedItems, pCleanOption));

        // Clean obsolete chunks
        plugins.push(new CleanObsoleteChunks({verbose: true}));

        // Copy plugin
        const ngOptions = require('../angular');
        const assets = ngOptions.assets;

        let oCopiedItems = [];
        if (assets && assets.length) {
            for (let item of assets) {
                oCopiedItems.push({
                    from: path.resolve(paths.app, item),
                    to: path.resolve(paths.dist, item)
                });
            }
        }
        if (oCopiedItems.length > 0)
            plugins.push(new CopyWebpackPlugin(oCopiedItems));

        // Html plugin
        //Automatically inject chunks into html files.
        plugins.push(new HtmlWebpackPlugin({
            template: path.resolve(paths.source, 'index.html'),
            chunksSortMode: 'dependency'
        }));

        // Get environment configuration.
        const environment = ngOptions.environment;
        const defaultEnvironment = environment.default || {};

        if (bProductionMode) {
            const productionEnvironment = Object.assign({}, defaultEnvironment, environment.production);
            plugins.push(new webpack.DefinePlugin(productionEnvironment));
        } else {
            const developmentEnvironment = Object.assign({}, defaultEnvironment, environment.development);
            plugins.push(new webpack.DefinePlugin(developmentEnvironment));

            // Browser sync plugin
            let host = argv.host;
            if (!host || !host.length) {
                host = 'localhost';
            }

            // Get port number from argv.
            let port = parseInt(argv.port);
            if (!port || port < 1024) {
                port = 8000;
            }

            // BrowserSync options can be found here: https://browsersync.io/docs/options

            // Whether https protocol enabled or not.
            const https = argv.https !== undefined;

            // Whether browser should be opened or not.
            const bOpenBrowser = argv.open !== undefined;

            // Require original index file.
            let browserSyncPlugin = new BrowserSyncPlugin({
                https: https,
                host: host,
                port: port,
                open: bOpenBrowser,
                files: [
                    path.resolve(paths.source, 'index.html')
                ],
                server: {
                    baseDir: [
                        paths.dist
                    ]
                },
                ghostMode: false
            });

            // Push plugins into list.
            plugins.push(browserSyncPlugin);
        }

        return plugins;

    }

    //#endregion
};