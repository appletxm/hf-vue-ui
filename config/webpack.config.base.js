const path = require('path')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const componentCfg = require('./component.config')

module.exports = function (envKeyWord, env) {
  const isDev = envKeyWord === 'development'
  const mode = envKeyWord === 'production' ? 'production' : 'development'

  return {
    mode: mode,
    performance: {
      hints: isDev ? false : 'warning'
    },
    entry: {},
    output: {
      filename: isDev ? 'js/[name].js' : 'js/[name].min.[chunkhash:7].js',
      path: path.resolve(env.distPath),
      publicPath: env.publicPath,
      pathinfo: isDev
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
          include: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'test')]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            context: 'client',
            name: isDev ? '[path][name].[ext]' : 'assets/images/[name].[ext]',
            outputPath: isDev ? '' : 'assets/images/',
            publicPath: isDev ? '../' : '../'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            context: 'client',
            name: isDev ? '[path][name].[ext]' : 'assets/fonts/[name].[hash:7].[ext]',
            outputPath: isDev ? '' : 'assets/fonts/',
            publicPath: isDev ? '../' : '../'
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
          include: [path.resolve(env.sourcePath), path.resolve(componentCfg.sourcePath)]
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          include: [path.resolve(env.sourcePath)]
        },
        {
          test: /\.md$/,
          include: [path.resolve(env.sourcePath)],
          use: [
            {
              loader: 'vue-loader',
              options: {
                compilerOptions: {
                  preserveWhitespace: false
                }
              }
            },
            {
              loader: path.resolve('./loaders/md-loader/index.js')
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.vue', '.scss', '.css', '.html', '.json'],
      alias: {
        'vue': 'vue/dist/vue.min.js',
        'env.cfg': '',
        'pages': path.join(__dirname, '../examples/js/pages/'),
        'components-biz': path.join(__dirname, '../examples/js/components/'),
        'assets': path.join(__dirname, '../examples/assets/'),
        'common': path.join(__dirname, '../examples/js/common/'),
        'utils': path.join(__dirname, '../examples/js/utils/'),
        'store': path.join(__dirname, '../examples/js/store'),
        'docs': path.join(__dirname, '../examples/docs'),
        'hf-ui': path.join(__dirname, '../src/index.js'),
        'component-cfg': path.resolve('./config/component.config'),
        'components': path.join(__dirname, '../src/components/'),
        'theme': path.join(__dirname, '../src/theme/'),
        'locale': path.join(__dirname, '../src/locale/')
      }
    },
    plugins: [],
    optimization: {},
    node: {
      buffer: false
    }
  }
}
