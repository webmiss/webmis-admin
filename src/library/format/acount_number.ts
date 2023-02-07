/* 银行卡号 */
export default (num: string, delimiter: string=' ')=>{
  // 验证
  const reg: RegExp = /^\d+$/;
  if(!reg.test(num)) return num;
  // 拼接
  let res: string = '';
  for(let i=0; i<num.length; i++){
    if(i==4 || i==8 || i==12 || i==16) res += delimiter;
    res += num.substring(i,i+1);
  }
  return res;
}