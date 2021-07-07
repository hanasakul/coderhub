const app = require('./app');

// 应用全局配置
const config = require('./app/config')



app.listen(config.APP_PORT,()=>{
  console.log('----------------------------------------------------');
  console.log('\033[30;32m[coderHub]  Server started successfully on port'+ ` ${config.APP_PORT}` +'\033[0m')
})