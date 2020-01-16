const path = require('path')
const autoprefixer = require('autoprefixer')
const cfg = require('./component.config')
const isDev = true
const mode = 'development'

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
    publicPath: cfg.publicPath
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'test')],
        exclude: [path.resolve('src/utils/popper.js')]
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
          'style-loader',
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
        test: /components-collection\.js$/,
        loader: path.resolve('./loaders/version-loader/index.js'),
        include: [path.join(__dirname, '..', 'src')],
        exclude: /node_modules/
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
  ],
  node: {
    buffer: false
  },
  stats: {
    chunks: false
  }
}
