const webpack = require('webpack'); //访问内置的插件
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const environment = process.env.NODE_ENV;

const mainEntry = ['./src/index.tsx'];
const themes = require('./antd.themes.js');

const outDir = require('./webpack.config.constant').outDir;

const webpackConfig = {
  mode: environment,
  entry: {
    main: environment === 'development' ? mainEntry.concat(['webpack-hot-middleware/client?noInfo=true&reload=true']) : mainEntry,
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
              eslintPath: require.resolve('eslint'),             
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'),
      },
      { 
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                noEmit: false,
              }
            }
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'),
        use: [
          // {
          //   loader: 'cache-loader',
          // },
          // {
          //   loader: 'babel-loader?cacheDirectory',
          // },
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: environment === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            // loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              // localIdentName: '[path][name]__[local]--[hash:base64:5]',
              localIdentName: '[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'less-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ]
      },
      {
        test: /\.(css|less)$/,
        exclude: /(src)/,
        use: [
          {
            loader: environment === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                ...themes.theme1,
              },
              javascriptEnabled: true,
            },
          },
        ]
      }, 
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
              name: '[name][contentHash:8].[ext]',
              outputPath: 'assets/images/',
            }
          },
        ],
      }, 
      {
        test: /\.(woff|woff2|eot|ttf|otf|mp3)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'img:data-src', 'audio:src'],
            minimize: true,
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'json'],
  },
  optimization: {
    splitChunks: {
      name: 'common', 
      chunks: 'all', 
      minSize: 10000,
      maxInitialRequests: 5, // 首页最大并行下载数
      cacheGroups: {
        // react: {
        //   test: (module) => {
        //     return /[\\/]*node_modules[\\/].*(react|redux).*/.test(module.context);
        //   },
        //   name: 'react',
        //   priority: 1,
        //   reuseExistingChunk: true,
        // },
        antd: {
          test: (module) => {
            return /[\\/]*node_modules[\\/].*(antd|ant-design).*/.test(module.context);
          },
          name: 'antd',
          priority: 1,
          reuseExistingChunk: true,
        },
      },
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/images/favicon.ico',
      minify: true,
    }),
    new webpack
        .optimize
        .OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HashedModuleIdsPlugin(),
  ],
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    //__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
    path: path.resolve(__dirname, outDir),
    publicPath: '/',
  },
}

if (environment === 'development') {
  webpackConfig.devtool = 'source-map';
}

module.exports = webpackConfig;