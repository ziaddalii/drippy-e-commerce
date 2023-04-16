const path = require('path')
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')


module.exports = {

    entry : './src/index.js',

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
        },
    plugins: [
          new Dotenv({
            path: path.resolve(__dirname, './.env'),
          }),
          new HtmlWebpackPlugin({
            template: './src/index.html'
        }),

    ],

    module: {
        rules: [
            {
                test: /.js$/,
                exclude:/node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(css)$/,
                use: ['style-loader','css-loader']
            }, 
            
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                   filename: 'images/[name][ext]'
                }
              },
        ]
    }



}