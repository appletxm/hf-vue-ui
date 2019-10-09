const path = require('path')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin   = require('optimize-css-assets-webpack-plugin')
const FixStyleOnlyEntries = require('webpack-fix-style-only-entries')
const CopyPlugin = require('copy-webpack-plugin')
const autoprefixer = require('autoprefixer')
const cfg = require('./component.config')
const envKeyWord = 'development'
const isDev = envKeyWord === 'development'
const mode = envKeyWord === 'test' || envKeyWord === 'production' ? 'production' : 'development'
const srcPath = './themes'
const destPath = './dist/user-theme'

module.exports = {
  mode: mode,
  performance: {
    hints: isDev ? false : 'warning'
  },
  entry: {
    [cfg.prefix]: path.resolve(`${srcPath}/index.scss`)
  },
  devtool: false,
  output: {
    // filename: `${cfg.prefix + (isDev ? '' : '.min')}.css`,
    path: path.resolve(destPath),
    publicPath: cfg.publicPath,
    pathinfo: isDev
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          context: 'client',
          name: '[name].[ext]',
          outputPath: 'theme/font/'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          context: 'client',
          name: '[name].[ext]',
          outputPath: 'theme/font/'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            },
          },
          'css-loader', 
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [autoprefixer({ overrideBrowserslist: ['iOS >= 7', 'Android >= 4.1'] })]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.less', '.scss', '.css'],
    alias: {}
  },
  plugins: [
    new CopyPlugin([{
      from: path.resolve(`${srcPath}/font`),
      to: path.resolve(`${destPath}/font`)
    }]),
    new FixStyleOnlyEntries(),
    new MiniCssExtractPlugin({
      filename: `[name].min.css`
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin()
    ],
  },
  node: {
    buffer: false
  },
  stats: 'normal'
}
