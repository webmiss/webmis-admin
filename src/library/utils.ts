import Ui from '../library/ui';

/* Util */
export default class Util {

  /* Trim */
  public static Trim(str: any, glue: string='\\s'): string {
    const reg = new RegExp('(^'+glue+'*)|('+glue+'*$)', 'gi');
    return str.toString().replace(reg, '');
  }

  /* CopyText */
  public static CopyText(text: string): void {
    try{
      // @ts-ignore
      let plus = plus;
      let name: string = plus.os.name;
      switch(name){
      case 'iOS':
        //获取剪切板
        let UIPasteboard = plus.ios.importClass("UIPasteboard");
        let generalPasteboard = UIPasteboard.generalPasteboard();
        // 设置/获取文本内容
        generalPasteboard.setValueforPasteboardType(text+'', "public.utf8-plain-text");
        let value = generalPasteboard.valueForPasteboardType("public.utf8-plain-text");
        Ui.Toast('复制成功');
        break;
      case 'Android':
        let Context = plus.android.importClass("android.content.Context");
        let main = plus.android.runtimeMainActivity();
        let clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
        plus.android.invoke(clip,"setText",text+'');
        Ui.Toast('复制成功');
        break;
      }
    }catch(e){
      let but: any = document;
      let oInput: any = but.createElement('input');
      oInput.value = text+'';
      but.body.appendChild(oInput);
      oInput.select();
      but.execCommand("Copy"); 
      oInput.className = 'oInput';
      oInput.style.display = 'none';
      Ui.Toast('复制成功');
    }
  }

}