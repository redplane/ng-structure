var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

/*
* Module export.
* */
module.exports = {
    context: path.resolve(__dirname, 'src/app'),
    entry: {
        'vendor': ['jquery', 'angular', 'angular-route', '@uirouter/angularjs', 'bootstrap'],
        'app': path.resolve(__dirname, 'src/app/app.js')
    },
    module: {
        rules: [
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
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['./src/dist'], {
            // Absolute path to your webpack root folder (paths appended to this)
            // Default: root of your package
            root: __dirname,

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
            allowExternal: false
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/app/assets'),
                to: path.resolve(__dirname, 'src/dist/assets')
            }
        ]),
        new ngAnnotatePlugin({
            add: true
            // other ng-annotate options here
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            chunksSortMode: function (a, b) {
                //let order = ['app','angular-plugins', 'jquery-plugins'];
                var order = ['vendor', 'app'];
                return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: '[name].js'
    }
};