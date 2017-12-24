const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const output_directory = "build";

var plugins = [
    new CleanWebpackPlugin([output_directory]),
    new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
        template: 'index.template.ejs'
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
    }),
];

if (isProduction) {
    plugins = plugins.concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        new webpack.optimize.UglifyJsPlugin({
            parallel: true,
            uglifyOptions: {
                ie8: false,
            }
        })
    ]);
};


module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'material-ui-next'],
        app: ["./src/index.tsx"],
    },

    output: {
        filename: "bundle.js",
        path: __dirname + '/' + output_directory
    },

    devServer: {
        contentBase: './dist',
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", '.jsx', ".json"]
    },

    plugins: plugins,

    module: {
        rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                },
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loaders: [
                    "awesome-typescript-loader",
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
};