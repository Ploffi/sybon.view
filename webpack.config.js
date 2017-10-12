const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    entry:  [
        "react-hot-loader/patch",
        "./src/index.tsx",
    ],
    output: {
        filename: "bundle.js",
        path: __dirname + "/build"
    },

    devServer: {
        contentBase: './dist',
        hot: true
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    plugins: [
        new HtmlWebpackPlugin({
          title: 'Hot Module Replacement',
          template: 'index.template.ejs'
        }),
       new webpack.HotModuleReplacementPlugin()
      ],

    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                loaders: [
                    "awesome-typescript-loader", 
                ] 
            },
            { test: /\.css$/,  use: [ 'style-loader', 'css-loader' ]},
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};