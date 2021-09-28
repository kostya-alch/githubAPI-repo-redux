import { resolve as _resolve } from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';

export const mode = 'development';
export const entry = ['@babel/polyfill', './src/index.jsx'];
export const output = {
  path: _resolve(__dirname, 'dist'),
  filename: '[name].[hash].js',
};
export const devServer = {
  port: 3000,
  historyApiFallback: true,
  publicPath: '/',
};
export const resolve = {
  extensions: ['.js', '.jsx'],
};
export const plugins = [
  new HTMLWebpackPlugin({ template: './src/index.html' }),
  new CleanWebpackPlugin(),
];
export const module = {
  rules: [
    {
      test: /\.(css|less)$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
    },
    {
      test: /\.(jpg|jpeg|png|svg)/,
      use: ['file-loader'],
    },
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
    {
      test: /\.m?jsx$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    },
  ],
};
