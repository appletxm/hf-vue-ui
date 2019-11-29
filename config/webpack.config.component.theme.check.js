const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin   = require('optimize-css-assets-webpack-plugin')
const FixStyleOnlyEntries = require('webpack-fix-style-only-entries')
const autoprefixer = require('autoprefixer')
const cfg = require('./component.config')
let envKeyWord = process.env.NODE_ENV
const isDev = envKeyWord === 'development'

module.exports = {
    "mode": "production",
    "performance": {
        "hints": "warning"
    },
    "entry": {
        "hf-ui": "E:\\test-publish\\hf-vue-ui-1.0.2-nv-1574943628916\\tmp\\themes\\192.168.10.17\\index.scss"
    },
    "devtool": false,
    "output": {
        "path": "E:\\test-publish\\hf-vue-ui-1.0.2-nv-1574943628916\\tmp\\themes-out\\192.168.10.17",
        "publicPath": "",
        "pathinfo": false
    },
    "module": {
        "rules": [
             {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                limit: 8192,
                context: 'client',
                name: '[name].[ext]',
                outputPath: 'images'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                limit: 8192,
                context: 'client',
                name: '[name].[ext]',
                outputPath: 'font'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                limit: 8192,
                context: 'client',
                name: '[name].[ext]',
                outputPath: 'font'
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
    "resolve": {
        "extensions": [
            ".less",
            ".scss",
            ".css"
        ],
        "alias": {}
    },
    plugins: [
        new FixStyleOnlyEntries(),
        new MiniCssExtractPlugin({
            filename: `[name].min.css`
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCSSAssetsPlugin()
        ]
    },
    "node": {
        "buffer": false
    },
    "stats": "normal"
}
