const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const CompressionPlugin = isProd ? require('compression-webpack-plugin') : null;
require('dotenv').config();

module.exports = {
  entry: './src/index.tsx',
  cache: {
    type: 'filesystem',
  },
  module: {
    rules: [
      { test: /\.svg$/, use: 'svg-inline-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.tsx?$/,
        loader: isProd ? 'esbuild-loader' : 'ts-loader',
        exclude: /node_modules/,
        options: isProd
          ? {
              loader: {
                loader: 'tsx',
                target: 'es2015',
              },
            }
          : { transpileOnly: true },
      },
      { test: /\.(png|jpe?g|gif|webp|svg)$/i, type: 'asset/resource' },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_BACKEND_URL': JSON.stringify(process.env.REACT_APP_BACKEND_URL || ''),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: '' }],
    }),
    new ForkTsCheckerWebpackPlugin(),
    ...(isProd
      ? [
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 8192,
            minRatio: 0.8,
          }),
        ]
      : []),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
  },
  mode: isProd ? 'production' : 'development',
  devtool: false,
  optimization: {
    minimize: isProd,
    minimizer: isProd
      ? [
          new (require('esbuild-loader').ESBuildMinifyPlugin)({
            target: 'es2015',
          }),
        ]
      : [],
    splitChunks: {
      chunks: 'all',
    },
  },
};
