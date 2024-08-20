/* 验证类 */
export default class Safety {

  /* 正则-公共 */
  public static IsRight(name: string, val: any): boolean {
    const reg: any = {
      uname: /^[a-zA-Z][a-zA-Z0-9\_\@\-\*\&]{3,15}$/,
      passwd: /^[a-zA-Z][a-zA-Z0-9\_\@\-\*\&]{6,16}$/,
      tel: /^1\d{10}$/,
      email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
      idcard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
    };
    return reg[name].test(val);
  }

  /* 正则-验证 */
  public static Test(reg: RegExp, val: any): boolean {
    return reg.test(val);
  }

}