/* 文件 */
export default class Files {

  /* 选择文件 */
  public static Select(cfg: Object={}, callback: any): void {
    // 参数
    let param: any = {
      multiple: false,    // 多选
      ext: ['image/jpeg', 'image/png', 'image/gif'],
      ...cfg
    }
    // 文件对象
    const fileObj: any = document.createElement('input');
    fileObj.setAttribute('type','file');
    fileObj.setAttribute("style",'display: none');
    if(param.multiple) fileObj.setAttribute('multiple','multiple');
    document.body.appendChild(fileObj);
    fileObj.click();
    fileObj.onchange = ()=>{
      let files: Array<any> = [];
      // 过滤
      for(let i=0; i<fileObj.files.length; i++){
        if(param.ext.length>0 && !param.ext.includes(fileObj.files[i].type)){
          continue;
        }
        files.push(fileObj.files[i]);
        console.log(param.ext, fileObj.files[i].type, param.ext.includes(fileObj.files[i].type));
      }
      // 返回
      if(param.multiple) callback(files);
      else if(files.length>0) callback(files[0]);
      else callback(null);
    }
  }

  /* 文件对象 to Base64 */
  public static FileToBase64(fileObj: any, callback?: any): void {
    let ready = new FileReader();
    ready.readAsDataURL(fileObj);
    ready.onloadend = function(){
      callback(this.result);
    }
  }

  /* Base64 to 文件对象 */
  public static Base64ToFile(base64: string, fileName: string, callback?: any): void {
    const arr:any = base64.split(',')
    const type:string = arr[0].match(/:(.*?);/)[1];
    const bstr:any = atob(arr[1]);
    let n:number = bstr.length;
    const u8arr:any = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], fileName, {type: type});
    callback(file);
  }

}