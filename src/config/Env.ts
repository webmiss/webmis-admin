/* 配置文件 */
export default class Env {

  public mode: string = '';                 // 模式: 开发(dev)
  public title: string = 'WebMIS';          // 项目名称
  public version: string = '3.0.0';         // 版本
  public baseUrl: string = '';              // 网址
  public apiUrl: string = 'admin/';         // 接口地址
  public static copy: string = '©'+(new Date()).getFullYear()+' webmis.vip';

  /* 构造函数 */
  constructor() {
    if(this.mode=='dev') this.baseUrl='http://localhost:9000/';
    else this.baseUrl='https://php.webmis.vip/';
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

}