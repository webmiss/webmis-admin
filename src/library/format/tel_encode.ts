/* 电话号码 */
export default (tel: string, delimiter: string=' ')=>{
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