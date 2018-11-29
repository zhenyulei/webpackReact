const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const EssayWebpackUpload = require('essay-webpack-upload');
const path = require('path');
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');
const config = require('./package.json');
const isUpload = process.env.NODE_ENV === 'upload';
const isDev = process.env.NODE_ENV === 'dev';
const isBuild = process.env.NODE_ENV === 'build';
const publicPathUpload = isDev?'/':config.publicPath;

module.exports = {
    entry: {
        vender: [
            'babel-polyfill',
            'classnames',
            'react',
            'react-dom',
            'axios',
            'react-router',
            'react-router-dom'
        ],
       send:path.resolve(__dirname,"./src/send/js/index.js"), 
       detail:__dirname + "/src/detail/js/index.js"
    },
    output: {
        path:path.resolve(__dirname,"build"),//打包后的文件存放的地方
        filename: "js/[name].[chunkhash].js",//打包后输出文件的文件名
        publicPath: publicPathUpload//devserver的时候改为 /，如果本地打包的时候就要增加misc等前缀
    },
    performance: {
      hints: false
    },
    resolve:{
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
            {
                test: /.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        {
                          loader: 'postcss-loader',
                          options:{
                            minimize:true
                          }
                          
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|webp)$/,
                loader: 'url-loader',
                options: {
                    limit: 30000,
                    name: 'src/i/[name].[ext]',
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin('build/', {
              root: __dirname,
              verbose: true,
              dry: false
        }),
        new HtmlWebpackPlugin({
            template:__dirname + "/src/send/html/index.html",
            filename:__dirname + "/build/index.html",
            chunks:['send','vender']
        }),
        new HtmlWebpackPlugin({
            template:__dirname + "/src/detail/html/detail.html",
            filename:__dirname + "/build/detail.html",
            chunks:['detail','vender']
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vender',
          //filename:'[name].[chunkhash].js',
          minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename:'css/[name].css'
        })

    ]

}
if(isUpload || isBuild){
    let plugins =[];
    plugins.push(
            new UglifyJsPlugin({
                uglifyOptions: {
                  output: {
                    comments: false
                  },
                  compress: {
                      warnings: false,
                      drop_debugger: true,
                      drop_console: true//压缩后，删除console的代码
                  }
                }
            })
    );
    if (isUpload) {
        plugins.push(
            new EssayWebpackUpload({
                host: '192.168.181.73',
                port: '3000',
                source: 'build',
                cdnDir: config.ftpServer,
                previewDir: config.previewDir
            })
        );
       
    }
     module.exports.plugins = (module.exports.plugins||[]).concat(plugins)
}












