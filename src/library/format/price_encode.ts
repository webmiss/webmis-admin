/* 价格-加密 */
export default (price: string, fixed: number=2)=>{
  return (parseFloat(price).toFixed(fixed).toString()).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
}