/**
 * Created by chaom on 2018/11/20.
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
//将打包后的内容用canvas以图形的方式展示出来，借助这个工具，我们可以知道每个chunk由哪些模块组成
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // entry:['./src/index.js','./src/index2.js'],
  entry:{
    'index':'./src/index.js',
    'index2':'./src/index2.js'
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    //filename前面我们可以使用一个变量[name],这个就表示获取entry里面的key作为文件名加在前面
    filename:'[name]-bundle[chunkhash:8].js'
  },
  plugins:[
    // new CleanWebpackPlugin(['dist'],
    // {
    //   root: __dirname, // 删除文件夹的根路径
    //   verbose: true, // 是否打开日志
    // }),
    new HtmlWebpackPlugin({
      chunks:['index'],
      filename:'index.html',
      template:'./src/index.html',
      title:'haha',
      hash:true,//hash为true的配置,它就会自动在引入的src地址后面增加一段hash值
      minify:{
        collapseWhitespace:true //折叠空白区域 也就是压缩代码
      }
    }),
    new HtmlWebpackPlugin({
      chunks:['index2'],
      filename:'index1.html',//指定生成的html名称
      template:'./src/index2.html',//调用模板名称
      title:'haha2',//模板的title
      hash:true,
      minify:{
        collapseWhitespace:true //折叠空白区域 也就是压缩代码
      }
    }),
    new BundleAnalyzerPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"), //静态文件根目录
    port: 9090, // 端口
    host: 'localhost',
    overlay: true,
    compress: true // 服务器返回浏览器的时候是否启动gzip压缩
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
    // minimizer: true,
    //webpack4 废弃了CommonsChunkPlugin 改为使用SplitChunksPlugin
    splitChunks: {
      cacheGroups: {
        // 注意: priority属性
        // 其次: 打包业务中公共代码
        common: {
          name: "common",
          chunks: "all",
          minSize: 1,
          priority: 0
        },
        // 首先: 打包node_modules中的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        }
      }
    }
  }

}
//webpack4把webpack拆分了 webpack webpack-cli
//由于webpack v4 extract-text-webpack-plugin不应该用于css。请改用mini-css-extract-plugin。