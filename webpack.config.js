var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin  = require('clean-webpack-plugin');

/*
* Module export.
* */
module.exports = {
    context: path.resolve(__dirname, 'src/app'),
    entry: {
        app: './app.js',
        vendor: ['jquery', 'angular', 'angular-route', '@uirouter/angularjs', 'bootstrap']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
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
    plugins:[
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
            watch: true,

            // Instead of removing whole path recursively,
            // remove all path's content with exclusion of provided immediate children.
            // Good for not removing shared files from build directories.
            exclude: null,

            // allow the plugin to clean folders outside of the webpack root.
            // Default: false - don't allow clean folder outside of the webpack root
            allowExternal: false
        }),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', minChunks: Infinity}),
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