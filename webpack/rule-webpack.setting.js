// Import library.
exports = module.exports = {
    /*
    * Get configuration options.
    * */
    get: function () {

        var rules = [];

        //#region Import jquery

        rules.push({
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            }, {
                loader: 'expose-loader',
                options: '$'
            }]
        });

        //#endregion

        //#region Css

        rules.push({
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        });

        //#endregion

        //#region Assets

        rules.push({
            test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            ]
        });

        //#endregion

        //#region Html

        rules.push({
            test: /\.html$/, // Only .html files
            loader: 'html-loader' // Run html loader
        });

        //#endregion

        return rules;
    }
};