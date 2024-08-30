/* UI */
export default class Ui {

  /* 提示 */
  public static Toast(text: string='提示', type: string="primary", time: number = 3000): void {
    // 创建对象
    let obj: HTMLDivElement = document.createElement('div');
    obj.setAttribute('class','wm-ui_toast');
    obj.innerHTML = '<span class="'+type+'">'+text+'</span>';
    // 追加
    document.body.appendChild(obj);
    // 动画
    setTimeout(()=>{
      obj.style.opacity = '1';
      obj.style.top = '30%';
    },100);
    // 3秒消失
    setTimeout(()=>{
      obj.style.opacity = '0';
      obj.style.top = '0%';
    },time);
    setTimeout(()=>{
      document.body.removeChild(obj);
    },time+1000);
  }

  /* 加载 */
  public static Loading(time: number=60000, alpha: number=0.2): object {
    // 清理
  let load = document.getElementsByClassName('wm-ui_load')[0];
  if(load) document.body.removeChild(load);
  // 创建对象
  let obj = document.createElement('div');
  obj.setAttribute('class','wm-ui_load');
  obj.setAttribute('style',`background-color: rgba(0,0,0,${alpha})`);
  obj.innerHTML = '<span><i class="ui ui_loading"></i></span>';
  // 追加
  document.body.appendChild(obj);
  // 60秒后清除
  const loadingTime = setTimeout(()=>{
    load = document.getElementsByClassName('wm-ui_load')[0];
    if(load) document.body.removeChild(load);
  },time);
  return {
    clear:()=>{
      setTimeout(()=>{
        try{ document.body.removeChild(obj); }catch(e){}
        clearTimeout(loadingTime);
      },300);
    }
  };
  }

}