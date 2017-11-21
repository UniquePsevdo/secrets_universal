import {AngularCompilerPlugin} from '@ngtools/webpack';
module.exports = {
    entry: {
        server: './src/app/app.server.module.ts'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: 'node',
    output: {
        path: path.join(__dirname, "dist/server"),
        filename: 'server.js'
    },
    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack',
                sourcemap: true
            }
        ]
    },
    plugins: [
        new AngularCompilerPlugin({
            tsConfigPath: './src/tsconfig.server.json',
            entryModule: './src/app/app.server.module#AppServerModule'
        })
    ]
}

/*
const ngtools = require('@ngtools/webpack');
const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        server: './src/app/app.server.module.ts'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: 'node',
    output: {
        path: path.join(__dirname, "dist/server"),
        filename: 'server.js'
    },
    plugins: [
        new ngtools.AotPlugin({
            tsConfigPath: './tsconfig.json'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(scss|html|png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: 'raw-loader'
            },
            { test: /\.ts$/,  loader: require.resolve('@ngtools/webpack') },
            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=512&&name=[path][name].[ext]?[hash]'
            },
            { test: /\.scss$/, use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }] }
        ]
    }
}*/
