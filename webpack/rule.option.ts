import {RuleSetRule} from "webpack";

export class RuleOption {

    //#region Constructor

    public constructor() {

    }

    //#endregion

    //#region Methods

    // Load ts-loader rule option.
    private loadTypescriptLoaderRule = (): RuleSetRule => {
        return {
            test: /\.tsx?$/,
            loader: "babel-loader!ts-loader"
        }
    };

    // Load babel-loader rule option.
    private loadBabelLoaderRule = (): RuleSetRule => {
        return {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
        }
    };

    // Load sass-loader rule.
    private loadScssLoaderRule = (): RuleSetRule => {
        return {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        };
    };

    // Load css-loader rule.
    private loadCssLoaderRule = (): RuleSetRule => {
        return {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        };
    };

    // Load asset loader rule.
    private loadAssetLoaderRule = (): RuleSetRule => {
        return {
            test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            ]
        };
    };

    // Load html loader rule.
    private loadHtmlLoaderRule = (): RuleSetRule => {
        return {
            test: /\.html$/, // Only .html files
            loader: 'html-loader', // Run html loader
            options: {
                minimize: true,
                removeComments: true
            }
        };
    };

    // Get available rules that configured to project.
    public getAvailableRules = (): Array<RuleSetRule> => {

        // Available rules in application.
        let availableRules = new Array<RuleSetRule>();

        // Ts-loader
        // All files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        availableRules
            .push(this.loadTypescriptLoaderRule());

        // Babel loader rule.
        availableRules.push(this.loadBabelLoaderRule());

        // Sass loader
        availableRules
            .push(this.loadScssLoaderRule());

        // Css loader.
        availableRules
            .push(this.loadCssLoaderRule());


        // Assets loader
        availableRules
            .push(this.loadAssetLoaderRule());


        // Html loader
        availableRules
            .push(this.loadHtmlLoaderRule());

        return availableRules;
    }

    //#endregion
}