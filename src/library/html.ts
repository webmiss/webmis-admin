/* Html */
export default class Html {

  /* 监听-添加 */
  public static addEvent(name: string, fun: any): void {
    window.addEventListener(name, fun);
  }

  /* 监听-移除 */
  public static removeEvent(name: string, fun: any): void {
    window.removeEventListener(name, fun);
  }

  /* 监听容器 */
  public static observer(target: any, callback: Function, options: MutationObserverInit = {attributes: true, childList: true, subtree: true}): void {
    let MutationObserver = window.MutationObserver;
    let obs = new MutationObserver((mutationList)=>{
      callback(mutationList);
    });
    obs.observe(target, options);
  }

  /* 获取值 */
  public static getPropertyValue(elt: Element, property:string): string {
    return getComputedStyle(elt).getPropertyValue('width');
  }

  /* 加载Css和JS */
  public static loadFile(files: Array<string>, reload: boolean=false, type: string=''): void {
    let ext: string[] = [];
    let isLoad = false;
    for(let file of files){
      // 是否存在
      isLoad = this._isInclude(file, type);
      if(reload) isLoad=false;
      ext = file.split('.');
      // JS
      if(ext[ext.length-1]=='js' || type=='js'){
        if(!isLoad){
          let box = document.createElement('script');
          box.setAttribute('src',file);
          document.body.appendChild(box);
        }
      // CSS
      }else if(ext[ext.length-1]=='css' || type=='css'){
        if(!isLoad){
          let box = document.createElement('link');
          box.setAttribute('rel','stylesheet');
          box.setAttribute('href',file);
          document.body.appendChild(box);
        }
      }
    }
  }
  // 是否存在
  private static _isInclude(name: string, type: string=''): boolean {
    let js: boolean = type=='js' || /js$/i.test(name);
    const es=document.getElementsByTagName(js?'script':'link');
    for(let val of es){
      let url: string = js?'src':'href';
      if((val as any)[url].indexOf(name)!=-1) return true;
    }
    return false;
  }

}