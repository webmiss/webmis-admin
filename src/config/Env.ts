/* 配置文件 */
export default class Env {

  public mode: string = '';                 // 模式: 开发(dev)
  public title: string = 'WebMIS';          // 项目名称
  public version: string = '3.0.0';         // 版本
  public baseUrl: string = '';              // 网址
  public apiUrl: string = 'admin/';         // 接口地址
  public socketUrl: string = '';            // Socket地址
  public static copy: string = '©'+(new Date()).getFullYear()+' webmis.vip';
  public static lang: string = 'zh_CN'      // 语言

  /* 构造函数 */
  constructor() {
    if(this.mode=='dev') {
      this.baseUrl = 'http://localhost:9000/';
      this.socketUrl = 'ws://127.0.0.1:9001';
    } else {
      this.baseUrl = 'https://php.webmis.vip/';
      this.socketUrl = 'wss://php.webmis.vip/wss';
    }
    this.apiUrl = this.baseUrl+this.apiUrl;
  }

  /* 请求 */
  public request(): object {
    return {
      headers: {
        "Content-Type": "application/json;charset=utf-8"  // 表单方式
      },
      responseType: 'json', //返回类型
      timeout: 180000,      //超时设置
    }
  }

  /* Socket */
  public socket(): object {
    return {
      start: true,              // 启动
      server: this.socketUrl,   // 服务器
      channel: 'admin',         // 频道
      time: 3000,               // 重连时间
      heartbeat: 10000,         // 心跳时间
    }
  }

  /* TinyMce */
  public static tinymce(): object {
    return {
      key: 'dm9pn8sfmiyaalv1r49hvf8ww9x8denshvuhp1tf7z51k6jj',
    }
  }

  /* Language */
  public static LangList(): Array<any> {
    return [
      {label: 'English', value: 'en_US'},
      {label: '简体中文', value: 'zh_CN'},
    ]
  }

}