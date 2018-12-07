const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => {
    const path = require('path');
    const moduleRuleOption = require('./webpack/rule.option');
    const modulePluginOption = require('./webpack/plugin.option');

    // Import webpack settings.
    const webpackOption = require('./webpack/option');

    // True if built is set to production mode.
    // False if built is set to development mode.
    const bProductionMode = 'production' === argv.mode.toLowerCase();
    const bSourceMap = (argv['source-map'] === true || bProductionMode === false);

    // Build path options.
    let paths = {
        root: __dirname,
        source: webpackOption.paths.getSource(__dirname),
        app: webpackOption.paths.getApplication(__dirname),
        dist: webpackOption.paths.getDist(__dirname)
    };

    //#region Code minimizer

    let minimizer = [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                mangle: false,
                output: {
                    beautify: false,

                }
            },
            sourceMap: bSourceMap
        })
    ];

    if (!bProductionMode)
        minimizer = [];

    //#endregion

    /*
    * Module export.
    * */
    return {
        context: paths.root,
        devtool: bSourceMap ? 'source-map' : false,
        entry: {
            'app': [path.resolve(paths.app, 'app.ts')]
        },
        optimization: {
            runtimeChunk: 'single',
            minimize: bProductionMode,
            minimizer: minimizer,
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
            rules: moduleRuleOption.loadRules()
        },
        plugins: modulePluginOption.get(argv, bProductionMode, paths),
        output: {
            path: path.resolve(paths.dist),
            filename: '[name].[hash].js'
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },

    };
};