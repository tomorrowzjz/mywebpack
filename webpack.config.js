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
    //filename前面我们可以使用一个变量[name],这个就表示获取entry里面的key作为文件名加在前面
    filename:'[name]-bundle[chunkhash:8].js'
  },
  plugins:[
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
    })
  ]

}