import {PluginOption} from './webpack/plugin.option';
import * as webpack from "webpack";
import * as path from "path";
import {RuleOption} from "./webpack/rule.option";
import {BaseOption} from "./webpack/base-option";

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const config = (): webpack.Configuration => {

    // Read arguments that have been passed to webpack console.
    const argv: { [key: string]: any } = require('yargs').argv;

    // True if built is set to production mode.
    // False if built is set to development mode.
    const bProductionMode = 'production' === argv.mode.toLowerCase();
    const bSourceMap = (argv['source-map'] === true || bProductionMode === false);
    const baseOptions = new BaseOption(__dirname);

    // Build path options.
    let paths = {
        root: __dirname,
        source: baseOptions.loadSourceCodeFullPath(),
        app: baseOptions.loadAppFullPath(),
        dist: baseOptions.loadDistributedFolderPath()
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
                },
                extractComments: true
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
            rules: new RuleOption().loadRules()
        },
        plugins: new PluginOption().loadOptions(argv, bProductionMode, paths),
        output: {
            path: path.resolve(paths.dist),
            filename: '[name].[hash].js'
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },

    };
};

export default config;

