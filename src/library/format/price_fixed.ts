/* 价格-不四舍五入 */
export default (price: number, fixed: number=2)=>{
  let tmp: string = '';
  for(let i=0; i<fixed; i++) tmp+='0';
  let m: number = parseInt('1'+tmp);
  return Math.floor(price*m)/m;
}