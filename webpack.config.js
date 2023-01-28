const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtroctPlugin = require('mini-css-extract-plugin');

let production = process.env.NODE_ENV === 'production';

let config = {
    entry: {
        bundle:[
            "./index.js",
            "./assets/vendor/purecounter/purecounter_vanilla.js",
            "./assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
            "./assets/vendor/glightbox/js/glightbox.min.js",
            "./assets/vendor/isotope-layout/isotope.pkgd.min.js",
            "./assets/vendor/swiper/swiper-bundle.min.js",
            "./assets/vendor/waypoints/noframework.waypoints.js",
            "./assets/js/main.js",
        ],
    },
    output: {
        filename: '[name].js',
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
                    MiniCssExtroctPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test:/\.(png|svg|jpg|jpeg|git)$/,
                type: "asset/resource",
                generator:{
                    filename: "img/[hash][name][ext]"
                }
            }
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({ 
            inject: 'body',
            template: 'index.html' 
        }),
        new MiniCssExtroctPlugin(),
    ],
    devServer: {
        watchFiles: ["/**/*", "index.html"],
        static: "./dist"
    }

};

if (production) {
    config.mode = "production";
}

module.exports = config;