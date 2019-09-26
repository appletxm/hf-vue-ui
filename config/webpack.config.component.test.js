const path = require('path')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const cfg = require('./component.config')
const isDev = true
const mode = 'development'
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: mode,
  performance: {
    hints: isDev ? false : 'warning'
  },
  entry: {
    [cfg.prefix]: path.resolve(cfg.sourcePath + '/index.js') 
  },
  devtool: false,
  output: {
    filename: `${cfg.prefix + (isDev ? '' : '.min')}.js`,
    path: path.resolve(cfg.distPath),
    publicPath: cfg.publicPath,
    pathinfo: isDev,
    libraryTarget:'umd',
    library: `${cfg.componentPrefix}`,
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'test')]
      },
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
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [path.join(__dirname, '..', 'src')]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        include: [path.join(__dirname, '..', 'src')]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss', '.css', '.html', '.json'],
    alias: {
      'vue': 'vue/dist/vue.min.js',
      'component-cfg': path.resolve('./config/component.config'),
      'components': path.join(__dirname, '../src/components/'),
      'theme': path.join(__dirname, '../src/theme/'),
      'locale': path.join(__dirname, '../src/locale/')
    }
  },
  plugins: [
    new CopyPlugin([{
      from: path.resolve(cfg.sourcePath + '/theme/font'),
      to: path.resolve(cfg.distPath + '/theme/font')
    }]),

    new MiniCssExtractPlugin({
      filename: `theme/${cfg.prefix}${isDev ? '' : '.min'}.css`
    })
  ],
  node: {
    buffer: false
  },
  stats: {
    chunks: false
  }
}
