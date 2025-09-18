import Ui from '../library/ui';

/* Util */
export default class Util {

  /* Trim */
  public static Trim(str: any, glue: string='\\s'): string {
    const reg = new RegExp('(^'+glue+'*)|('+glue+'*$)', 'gi');
    return str.toString().replace(reg, '');
  }
  public static LTrim(str: any, glue: string='\\s'): string {
    const reg = new RegExp('(^'+glue+'*)', 'gi');
    return str.toString().replace(reg, '');
  }
  public static RTrim(str: any, glue: string='\\s'): string {
    const reg = new RegExp('('+glue+'*$)', 'gi');
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

  /* 随机数 */
  public static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random()*(max-min+1))+min;
  }

  /* 二维对象数组排序 */
  public static sort2DArray(arr: Array<any>, fields: any, asc: Boolean=true): Array<any> {
    const result = JSON.parse(JSON.stringify(arr));
    const sortFields = Array.isArray(fields)?fields:[fields];
    return result.sort((a: any, b: any) => {
      for (const field of sortFields) {
        const valueA = field.split('.').reduce((o: any, k: any) => o?.[k], a);
        const valueB = field.split('.').reduce((o: any, k: any) => o?.[k], b);
        if (valueA !== valueB) {
          const compareResult = 
            typeof valueA === 'string' 
              ? valueA.localeCompare(valueB)
              : valueA - valueB;
          return asc ? compareResult : -compareResult;
        }
      }
      return 0;
    });
  }

}