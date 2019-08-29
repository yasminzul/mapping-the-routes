const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

module.exports = {
    entry: {
        index: __dirname + "/src/index.js",
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: ''
    },
    resolve: {
        modules: ['node_modules'],
        alias: {
            'TweenLite': 'gsap/src/minified/TweenLite.min.js',
            'TweenMax': 'gsap/src/minified/TweenMax.min.js',
            'TimelineLite': 'gsap/src/minified/TimelineLite.min.js',
            'TimelineMax': 'gsap/src/minified/TimelineMax.min.js',
            'ScrollMagic': 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
            'animation.gsap': 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
            'debug.addIndicators': 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js',
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [
                    /node_modules/
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },{
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use:['url-loader']
            },{
                test: /\.(gif|jpe?g|svg)$/i,
                use: [
                  'file-loader',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      //bypassOnDebug: true, // webpack@1.x
                      //disable: true, // webpack@2.x and newer
                      mozjpeg: {
                        progressive: true,
                        quality: 65
                      },
                    },
                  },
                ],
            }
        ]
    },
    plugins: [
        new cleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/public/index.html",
            inject: 'body'
        }),
        new ScriptExtHtmlWebpackPlugin({
            //sync: /index/,
            defaultAttribute: 'defer'
        }),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        // }),
        new CopyWebpackPlugin([
            // './favicon.ico',
            './README.md',
            {from: './src/public/assets', to: 'assets'}
            // './favicon.png',
        ], {}) // options
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        usedExports: true
    },
    devServer: {
        contentBase: './src/public',
        port: 7700,
    }
};