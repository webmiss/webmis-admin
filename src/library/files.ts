/* 文件 */
export default class Files {

  /* 选择文件 */
  public static Select(cfg: Object, success: Function=()=>{}, error: Function=()=>{}): void {
    // 参数
    let param: any = {
      multiple: false,    // 多选
      mimeType: ['image/jpeg', 'image/png', 'image/gif'],
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
        if(param.mimeType.length>0 && !param.mimeType.includes(fileObj.files[i].type)) continue;
        files.push(fileObj.files[i]);
      }
      // 返回
      if(param.multiple) success(files);
      else if(files.length>0) success(files[0]);
      else error('只允许文件类型:'+param.mimeType.join(','));
    }
  }

  /* 文件对象 to Base64 */
  public static FileToBase64(fileObj: any, success: Function=()=>{}, type: string='base64'): void {
    let ready = new FileReader();
    if(type=='base64') ready.readAsDataURL(fileObj);
    else if(type=='blob') ready.readAsBinaryString(fileObj);
    else if(type=='text') ready.readAsText(fileObj);
    ready.onloadend = function(){
      return success(this.result);
    }
  }

  /* Base64 to 文件对象 */
  public static Base64ToFile(base64: string, fileName: string, success: Function=()=>{}, error: Function=()=>{}): void {
    const arr:any = base64.split(',');
    const type:string = arr[0].match(/:(.*?);/)[1];
    const bstr:any = atob(arr[1]);
    let n:number = bstr.length;
    const u8arr:any = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], fileName, {type: type});
    // 返回
    return file?success(file):error('文件转换失败!');
  }

  /* 获取后缀名 */
  public static GetTypeExt(type: string): string {
    switch(type) {
      case 'image/jpeg': return 'jpg';
      case 'image/png': return 'png';
      case 'image/gif': return 'gif';
      default : return '';
    }
  }

  /* 图片压缩 */
  public static ImageCompress(file: string, cfg: Object, success: Function=()=>{}, error: Function=()=>{}): void {
    // 参数
    let param: any = {
      width: 0,             // 宽
      height: 0,            // 高
      cut: true,            // 裁切
      quality: 0.8,         // 质量
      type: 'image/jpeg',   // 文件类型
      mimeType: ['image/jpeg', 'image/png', 'image/gif'],
      ...cfg
    }
    // 是否图片
    if(!param.mimeType.includes(param.type)) return error('只允许图片类型:'+param.mimeType.join(','));
    // 变量
    let w:number=1, h:number=1;
    let dst_x:number=0, dst_y:number=0;
    let dst_size:number=1;
    let src_size:number = w/h;
    // 图片信息
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const context: any = canvas.getContext('2d');
    const img: HTMLImageElement = new Image();
    img.src = file;
    img.onload = function () {
      const self: any = this;
      src_size = self.width/self.height;
      // 宽、高、不缩放、等比例
      if(param.width>0 && param.height==0){
        w = param.width<self.width?param.width:self.width;
        h = param.width<self.width?Math.round(param.width/src_size):Math.round(self.width/src_size);
        param.width = w;
        param.height = h;
      }else if(param.width==0 && param.height>0){
        w = param.height<self.height?Math.round(param.height*src_size):Math.round(self.height*src_size);
        h = param.height<self.height?param.height:self.height;
        param.width = w;
        param.height = h;
      }else if(param.width==0 && param.height==0){
        w = self.width;
        h = self.height;
        param.width = w;
        param.height = h;
      }else{
        // 比例
        dst_size = param.width/param.height;
        if(src_size > dst_size){
          if(param.width<self.width){
            w = param.cut?Math.round(param.height*src_size):param.width;
            h = param.cut?param.height:Math.round(param.width/src_size);
          }else{
            w = param.cut?Math.round(self.height*src_size):self.width;
            h = param.cut?self.height:Math.round(self.width/src_size);
          }
        }else{
          if(param.height<self.height){
            w = param.cut?param.width:Math.round(param.height*src_size);
            h = param.cut?Math.round(param.width/src_size):param.height;
          }else{
            w = param.cut?self.width:Math.round(self.height*src_size);
            h = param.cut?Math.round(self.width/src_size):self.height;
          }
        }
      }
      // 画板高宽
      canvas.width = param.width;
      canvas.height = param.height;
      dst_x = Math.round(param.width-w)/2;
      dst_y = Math.round(param.height-h)/2;
      context.drawImage(this, dst_x, dst_y, w, h);
      let data = canvas.toDataURL(param.type, param.quality);
      return success(data);
    }
  }

  /* 下载 */
  public static Down(url: string, filename: string='down.txt'): void {
    // 创建对象
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    // 点击
    a.click();
    // 移除
    document.body.removeChild(a);
  }

  /* 下载-Blob */
  public static DownBlob(data: any, filename: string='down.txt'): void {
    // 转blob对象
    const blob: Blob = new Blob([data],{
      type: "application/octet-stream",
    });
    const blobURL = window.URL.createObjectURL(blob);
    // 创建连接
    const dom: any = document.createElement('a');
    dom.style.display = 'none';
    dom.href = blobURL;
    dom.setAttribute('download', filename);
    if(typeof dom.download === 'undefined'){
      dom.setAttribute('target', '_blank');
    }
    document.body.appendChild(dom);
    dom.click();
    // 清除
    document.body.removeChild(dom);
    window.URL.revokeObjectURL(blobURL);
  }

}