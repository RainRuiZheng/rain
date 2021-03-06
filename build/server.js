/* eslint import/no-extraneous-dependencies: ["off"] */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const assets = require('./assets');
const ENV_CONF = require('./env.config').dev;

const basePath = fs.realpathSync(process.cwd());
const PORT = 3000;

new WebpackDevServer(webpack({
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server',
    path.join(basePath, 'build/index.js')
  ],
  output: {
    publicPath:'./',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.ORIGIN_ENV': JSON.stringify(ENV_CONF.origin) }),
    new CaseSensitivePathsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        title: 'react-redux-cli',
        template: path.join(basePath, 'build/index.html'),
        inject: true,
        favicon: path.join(basePath, 'favicon.ico'),
        loading: {
          html: fs.readFileSync(path.join(path.join(basePath, './build'), assets.prod.loading.html)),
          css: '<style>' + fs.readFileSync(path.join(path.join(basePath, './build'), assets.prod.loading.css)) + '</style>'
        }
      })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    plugins: [
      // Adds support for installing with Plug'n'Play, leading to faster installs and adding
      // guards against forgotten dependencies and such.
      PnpWebpackPlugin
    ],
      alias: {
        '@': path.resolve(basePath, 'app'),
      },
  },

  resolveLoader: {
    plugins: [
      // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
      // from the current package.
      PnpWebpackPlugin.moduleLoader(module),
    ]
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        loader: 'babel-loader',
        include: [
          path.join(basePath, './app'),
          path.join(basePath, './build')
        ]
      },
      // {
      //   test: /\.(c|le)ss$/,
      //   use: ['style-loader', 'css-loader', "postcss-loader"]
      // },
      {
        test: /\.(c|le)ss$/,
        use: ['style-loader', 'css-loader', "postcss-loader", 'less-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader : 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        type: "asset",
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 10*1024,
        //     },
        //   },
        // ],
      },
      {
        test: /\.md$/,
        loader : 'raw-loader'
      }
    ]
  }
}), {
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
  stats: { colors: true }
}).listen(PORT, error => {
  if (error) {
    throw error;
  }
});
