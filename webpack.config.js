const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let production = process.env.NODE_ENV === 'production';

let config = {
    entry: [
        "./src/index.js",
        "./src/assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
        "./src/assets/vendor/isotope-layout/isotope.pkgd.min.js",
        "./src/assets/vendor/waypoints/noframework.waypoints.js",        
        "./src/assets/js/main.js"
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: "html-loader"
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test:/\.(png|svg|jpg|jpeg|git)$/i,
                type: "asset/resource",
                generator:{
                    filename: "img/[hash][name][ext]"
                }
            } ,
        ]
    },
    mode: 'development',
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: "jquery"
        }),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
    ],
    devServer: {
        watchFiles: ["src/**/*"],
        static: "./dist",
    }

};

if (production) {
    config.mode = "production";
}

module.exports = config;