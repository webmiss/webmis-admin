/* 格式化 */
export default class Format {

  /* 不四舍五入 */
  public static Fixed(price: number, fixed: number=2): number {
    let tmp: string = '';
    for(let i=0; i<fixed; i++) tmp+='0';
    let m: number = parseInt('1'+tmp);
    return Math.floor(price*m)/m;
  }

  /* 金额 */
  public static priceEncode(price: string, fixed: number=2): string {
    return (parseFloat(price).toFixed(fixed).toString()).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
  }
  public static priceDecode(price: string, fixed: number=2): string {
    return parseFloat(price.replace(/,/g,'')).toFixed(fixed);
  }
  public static PriceQoq(n1: number = 0, n2: number = 0, index: number = 2): string {
    if (n1 - n2 == 0) {
      return '0'
    } else if (n1 == 0) {
      return '-100'
    } else if (n2 == 0) {
      return '100'
    } else {
      return (parseFloat(String((n1 - n2) / n2 * 100)).toFixed(index).toString()).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    }
  }

  /* 手机号码 */
  public static telEncode(tel: string, delimiter: string=' '): string {
    // 验证
    const reg: RegExp = /^[1]\d{10}$/;
    if(!reg.test(tel)) return tel;
    // 拼接
    let res: string = '';
    for(let i=0; i<tel.length; i++){
      if(i==3 || i==7) res += delimiter;
      res += tel.substring(i,i+1);
    }
    return res;
  }
  public static telDecode(tel: string, delimiter: string=' '): string {
    const reg: RegExp = new RegExp('/'+delimiter+'/g');
    return tel.replace(reg, '');
  }

  /* 银行卡号 */
  public static cardEncode(num: string, delimiter: string=' '): string {
    // 验证
    const reg: RegExp = /^\d+$/;
    if(!reg.test(num)) return num;
    // 拼接
    let res: string = '';
    for(let i=0; i<num.length; i++){
      if(i%4===0) res += delimiter;
      res += num.substring(i,i+1);
    }
    return res;
  }
  public static cardDecode(num: string, delimiter: string=' '): string {
    const reg: RegExp = new RegExp('/'+delimiter+'/g');
    return num.replace(reg, '');
  }

}
