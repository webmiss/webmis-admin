import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import Env from '../config/Env';

/* 请求 */
export default class Request {

  private static cfg: any = new Env();   // 配置信息

  /* Get请求 */
  public static Get(url: string, data: any={}, success?: any, fail?: any, config?: any): void {
    // 参数
    url = Request.getUrl(url);
    const cfg: AxiosRequestConfig = Request.getConfig(config);
    cfg.params = data;
    // 请求
    axios.get(url,cfg).then(success).catch(fail);
  }

  /*
  * Post请求
  * url: string 请求地址
  */
  public static Post(url: string, data: any={}, success?: any, fail?: any, config?: any) {
    // 参数
    url = Request.getUrl(url);
    const cfg: AxiosRequestConfig = Request.getConfig(config);
    // 进度
    if(config && config.onUploadProgress) cfg.onUploadProgress = config.onUploadProgress;
    // 请求
    return axios.post(url, data, cfg).then(success).catch(fail);
  }

  /* Put请求 */
  public static Put(url: string, data: any={}, success?: any, fail?: any, config?: any): void {
    // 参数
    url = Request.getUrl(url);
    const cfg: AxiosRequestConfig = Request.getConfig(config);
    cfg.params = data;
    // 表单
    let param = new FormData();
    for(let i in data) param.append(i,data[i]);
    // 请求
    axios.put(url,param,cfg).then(success).catch(fail);
  }

  /* Patch请求 */
  public static Patch(url: string, data: any={}, success?: any, fail?: any, config?: any): void {
    // 参数
    url = Request.getUrl(url);
    const cfg: AxiosRequestConfig = Request.getConfig(config);
    // 请求
    axios.patch(url, data, cfg).then(success).catch(fail);
  }

  /* Delete请求 */
  public static Delete(url: string, data: any={}, success?: any, fail?: any, config?: any): void {
    // 参数
    url = Request.getUrl(url);
    const cfg: AxiosRequestConfig = Request.getConfig(config);
    cfg.params = data;
    // 请求
    axios.delete(url, cfg).then(success).catch(fail);
  }

  /* 公共配置 */
  private static getConfig(config: any): AxiosRequestConfig {
    const cfg: AxiosRequestConfig = <AxiosRequestConfig>{
      headers: config&&config.headers?config.headers:Request.cfg.request.headers,
      responseType: config&&config.responseType?config.responseType:Request.cfg.request.responseType,
      timeout: Request.cfg.request.timeout,
    };
    return cfg;
  }

  /* Url处理 */
  private static getUrl(url: string): string {
    if(url.substring(0,4)=='http') url=url;
    else if(url.substring(0,1)=='/') url=Request.cfg.baseUrl+url.substring(1);
    else url=Request.cfg.apiUrl+url;
    return url;
  }

}
