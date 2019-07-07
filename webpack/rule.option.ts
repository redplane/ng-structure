export class RuleOption {

    //#region Methods

    public loadRules(): { [key: string]: any }[] {

        let moduleRules = [];

        //#region Ts loader

        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        moduleRules.push({
            test: /\.tsx?$/,
            loader: "babel-loader!ts-loader"
        });

        //#endregion

        //#region Babel loader

        moduleRules.push({
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
            }
        });

        //#endregion

        //#region Import jquery

        // JQuery
        moduleRules.push({
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            }, {
                loader: 'expose-loader',
                options: '$'
            }]
        });

        moduleRules.push({
            test: require.resolve('moment'),
            use: [{
                loader: 'expose-loader',
                options: 'moment'
            }]
        });

        //#endregion

        //#region Sass loader

        moduleRules.push({
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        });

        //#endregion

        //#region Css

        moduleRules.push({
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        });

        //#endregion

        //#region Assets

        moduleRules.push({
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

        moduleRules.push({
            test: /\.html$/, // Only .html files
            loader: 'html-loader', // Run html loader
            options: {
                minimize: true,
                removeComments: true
            }
        });

        //#endregion

        return moduleRules;
    }

    //#endregion
}
