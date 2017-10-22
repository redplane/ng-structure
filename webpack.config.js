var path = require('path');
var webpack = require('webpack');

/*
* Module export.
* */
module.exports = {
    context: path.resolve(__dirname, 'app'),
    entry: {
        bundle: './app.js',
        vendor: ['angular', 'angular-route', '@uirouter/angularjs']
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', minChunks: Infinity})
    ],
    output: {
        path: path.resolve(__dirname, 'app/dist'),
        filename: '[name].js'
    }
};