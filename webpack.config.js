/**
 * Created by chaom on 2018/11/20.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry:['./src/index.js','./src/index2.js'],
  entry:{
    'index':'./src/index.js',
    'index2':'./src/index2.js'
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name]-bundle.js'
  },
  plugins:[
    new HtmlWebpackPlugin({
      chunks:['index'],
      filename:'index.html',
      template:'./src/index.html',
      title:'haha',
      hash:true,
      minify:{
        collapseWhitespace:true //折叠空白区域 也就是压缩代码
      }
    }),
    new HtmlWebpackPlugin({
      chunks:['index2'],
      filename:'index1.html',
      template:'./src/index2.html',
      title:'haha2',
      hash:true,
      minify:{
        collapseWhitespace:true //折叠空白区域 也就是压缩代码
      }
    })
  ]

}