const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Extract = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'indexFile': path.join(__dirname, 'src', 'js', 'index.js'),
        'background': path.join(__dirname, 'src', 'js', 'background.js'),

    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'js/[name].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: Extract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: false,
        }),
        new CleanWebpackPlugin(["build"]),
        new CopyWebpackPlugin([
            {
                from: "manifest.json"
            },
            {
                from: "img/**"
            },
            {
                from: "src/pages/**",
                to: 'pages',
                flatten: true
            }
        ]),
        new Extract('css/main.css', {
            allChunks: true,
        }),
    ]
}
