import * as  webpack from "webpack";
import * as path from "path";
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
import * as CopyWebpackPlugin from "copy-webpack-plugin";

if (process.env.WATCH === "TRUE") {
    console.log("WEBPACK SHOULD WATCH");
}
console.log("WEBPACK_MODE", process.env.WEBPACK_MODE);
const rules : webpack.RuleSetRule[] = [
    {
        test : /\.tsx?$/,
        //loader : `ts-loader?configFile=${__dirname}/src/client-public/tsconfig.json`,
        //loader : `ts-loader?configFile=${__dirname}/webpack-public-tsconfig.json`,
        loader : `ts-loader`,
        options : {
            configFile : `${__dirname}/webpack-public-tsconfig.json`,
            projectReferences : true,
            compilerOptions : {
                strict : true,
                alwaysStrict : true,
            },
            transpileOnly : true,
        },
        exclude : /node_modules/,
    },
    {
        test: /\.less$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
            'less-loader'
        ]
    },
    // this rule handles images
    {
        test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
    },

    // the following 3 rules handle font extraction
    {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    },

    {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
    },
    {
        test: /\.otf(\?.*)?$/,
        use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf'
    },
    {
        test: /\/gpt-tokenizer\/.+?\.js$/,
        use: [{
            loader: "babel-loader",
            options: {
                presets: ['babel-preset-expo'],
                env: {
                },
            }
        }]
    }
];
//TODO Is this even needed?
if (process.env.WEBPACK_MODE === "development") {
    rules.push({
        enforce : "pre",
        test : /\.js$/,
        loader : "source-map-loader",
    });
}

const rawClientPublicConfig = require("./client-public-config.json");
const clientPublicConfig = Object.keys(rawClientPublicConfig).reduce(
    (obj, key) => {
        obj[key] = JSON.stringify(rawClientPublicConfig[key]);
        return obj;
    },
    {}
);

const config : webpack.Configuration = {
    cache : true,
    entry : {
        main : `${__dirname}/src/client-public/main.tsx`,
    },
    output : {
        filename : "[name].js",
        chunkFilename: '[name].bundle.js',
        path : `${__dirname}/client-public/dist`,
    },
    devtool : (process.env.WEBPACK_MODE === "development") ?
        "source-map" :
        undefined,
    resolve : {
        extensions : [".ts", ".tsx", ".js", ".less"],
        alias: {
            '../../theme.config$': path.join(__dirname, 'my-semantic-theme/theme.config')
        }
    },
    module : {
        rules : rules,
    },
    externals : {
    },
    watch : (process.env.WATCH === "TRUE"),
    watchOptions : {
        poll : (process.env.WATCH === "TRUE"),
    },
    optimization : {
        splitChunks : {
            chunks : "all",
            cacheGroups : {
                commons : {
                    test : /node_modules/,
                    name : "vendors",
                    chunks : "all"
                }
            }
        }
    },
    plugins : [
        new webpack.DefinePlugin(clientPublicConfig),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyWebpackPlugin({
            patterns : [
                { from : "./node_modules/swipl-wasm/dist/swipl/swipl-web.js", to : "./swipl/swipl-web.js" },
                { from : "./node_modules/swipl-wasm/dist/swipl/swipl-web.wasm", to : "./swipl/swipl-web.wasm" },
                { from : "./node_modules/swipl-wasm/dist/swipl/swipl-web.data", to : "./swipl/swipl-web.data" },
            ],
        })
    ]
};

module.exports = config;
