var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const assetsDirectory = './src/main/resources/static/';

module.exports = {
    entry: ['./src/main/js/react/app.js'],
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: assetsDirectory + 'js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=1000000'}
        ]
    }
};