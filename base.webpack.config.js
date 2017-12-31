const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const output_directory = "build";

var plugins = [
    new CleanWebpackPlugin([output_directory]),
    new HtmlWebpackPlugin({
        title: 'Sybon Admin',
        template: 'index.template.ejs'
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
    }),
];

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'material-ui'],
        app: ["./src/index.tsx"],
    },

    output: {
        filename: "bundle.js",
        path: __dirname + '/' + output_directory
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", '.jsx', ".json"]
    },

    plugins: plugins,

    module: {
        rules: [

            {
                test: /\.tsx?$/,
                use: [
                    'react-hot-loader/webpack', 'babel-loader', 'awesome-typescript-loader'
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
};