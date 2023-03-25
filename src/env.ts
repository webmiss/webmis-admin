import Storage from './library/Storage'

/* 模式: dev(开发) */
const mode: string = '';

/* 接口 */
const language: string = Storage.getItem('language') || '';
const lag: any = language?JSON.parse(language):'';
let baseUrl: string, socket: string;
if(lag && lag.name=='python'){
  if(mode=='dev'){
    baseUrl = 'http://localhost:9010/';
    socket = 'ws://localhost:9011/';
  }else{
    baseUrl = 'https://python.webmis.vip/';
    socket = 'wss://python.webmis.vip/wss';
  }
}else if(lag && lag.name=='java'){
  if(mode=='dev'){
    baseUrl = 'http://localhost:9020/';
    socket = 'ws://localhost:9020/websocket';
  }else{
    baseUrl = 'https://java.webmis.vip/';
    socket = 'wss://java.webmis.vip/websocket';
  }
}else if(lag && lag.name=='go'){
  if(mode=='dev'){
    baseUrl = 'http://localhost:9030/';
    socket = 'ws://localhost:9031/websocket';
  }else{
    baseUrl = 'https://go.webmis.vip/';
    socket = 'wss://go.webmis.vip/websocket';
  }
}else if(lag && lag.name=='phalcon'){
  if(mode=='dev'){
    baseUrl = 'http://localhost:9040/';
    socket = 'ws://localhost:9041/websocket';
  }else{
    baseUrl = 'https://phalcon.webmis.vip/';
    socket = 'wss://phalcon.webmis.vip/websocket';
  }
}else{
  if(mode=='dev'){
    baseUrl = 'http://localhost:9000/';
    socket = 'ws://localhost:9001/';
  }else{
    baseUrl = 'https://php.webmis.vip/';
    socket = 'wss://php.webmis.vip/wss';
  }
}

/* 配置 */
const now = new Date();
export default {
  title: 'WebMIS',            // 应用名称
  version: '1.0.0',           // 应用版本
  copy: 'Copyright © WebMIS.vip ' + now.getFullYear(),  // 版权信息
  baseUrl: baseUrl,           //数据地址
  apiUrl: baseUrl+'admin/',   //数据接口地址
  tinymceKey: 'dm9pn8sfmiyaalv1r49hvf8ww9x8denshvuhp1tf7z51k6jj',
  /* Token */
  token: '',
  /* 请求 */
  request: {
    headers: {
      "Content-Type": "application/json;charset=utf-8"  // 表单方式
    },
    responseType: 'json', //返回类型
    timeout: 10000, //超时设置
  },
  /* 状态栏 */
  statusBar:{
    height: 48, //默认高度
    color: '#333',  //字体颜色
    bgColor:'#FFF'  //背景颜色
  },
  /* Login */
  login: {
    start: true,  //Token验证
    api: 'user/token',  //验证接口
    uinfo: 'uinfo', //用户信息
    time: 30000, //间隔时间
  },
  /* 高德地图 */
  amap: {
    start: true,  //开启定位
    jsapi_key: 'd956f0c3e15489a1b5bf291e5d133c8a',
  },
  /* Socket */
  socket: {
    channel: 'admin',
    start: true, //启动
    server: socket, //链接地址
    time: 3000, //重连时间
    heartbeat: 10000, //心跳检测时间
  },
  /* 消息 */
  msg: {
    content: 'content',  //阅读：title(标题)、content(内容)
    browser: true,  //浏览器信息
  },
}
