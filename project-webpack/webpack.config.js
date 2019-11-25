var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var FilemanagerWebpackPlugin = require('filemanager-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname, './public/main'),
    output:{
        filename:'js/[name].js',
        path:path.resolve(__dirname,'./public/out'),
        // publicPath:'/assets'
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            chunks:['index'],
            template:'./index.html'
        }),
        // new HtmlWebpackPlugin({
        //     filename:'app.html',
        //     chunks:['app'],
        //     template:'./public/index.html'
        // }),
        new MiniCssExtractPlugin({
            filename:'css/index.css'
        }),
        new FilemanagerWebpackPlugin({
            onStart:{
                delete:['build']
            }
        })
    ],
    devServer:{
        port:3000
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test:/\.less$/,
                use:[MiniCssExtractPlugin.loader,'css-loader','less-loader']
            },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env','@babel/preset-react'],
                        "plugins": [
                            ["import", { libraryName: "antd-mobile", style: "css" }] // `style: true` 会加载 less 文件
                        ]
                    }
                }
            },
            {
                test:/\.(jpg|png|gif|svg)$/,
                use:{
                    loader:'file-loader',
                    options:{
                        name:'images/[name].[ext]'
                    }
                }
            }
        ]
    }
}