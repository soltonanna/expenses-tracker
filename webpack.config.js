const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
    mode, 
    target, 
    devtool,
    devServer: {
        port: 3000,
        open: true,
        hot: true,
    },
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[name][ext]',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css  ',
        }),
    ],
    module: {
        rules: [
            // HTML
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            // Styles
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                  devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                  "css-loader",
                  {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [require('postcss-preset-env')],
                        }
                    }
                  },
                  "sass-loader",
                ],
            },
            // Fonts
            {
                test: /\.woff2?$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            // Images
            {
                test: /\.(jpe?g|png|webp|gif|svg|pdf)$/i,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ],
                type: 'asset/resource',
            },
            // JS
            {
                test: /\.m?js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            },
            // JSX
            {
                test: /\.m?jsx$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-react", "@babel/preset-env"]
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    }
};