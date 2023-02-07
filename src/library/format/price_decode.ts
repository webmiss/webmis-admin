/* 价格-解密 */
export default (price: string, fixed: number=2)=>{
  return parseFloat(price.replace(/,/g,'')).toFixed(fixed);
}