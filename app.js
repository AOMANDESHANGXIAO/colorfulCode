const express = require('express') //需要安装 npm i express -S
const app = express()
// const path = require('path')

//下边三行代码，哪个都可以，具体区别查看文章顶部的参考文章
// app.use(express.static(path.join(__dirname, 'static')));
// app.use(express.static(__dirname + '/static'));
app.use(express.static('dist'))
const cors = require('cors')
app.use(cors())
app.listen(80, (err) => {
  if (err) return
  console.log('服务器启动')
})
