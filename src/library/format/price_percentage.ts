/* 价格-比较(百分比) */
export default (n1: number, n2: number, fixed: number=2)=>{
  n1+=1; n2+=1;
  if(n1>=n2) return parseFloat(((n1-n2)/n2*100).toString()).toFixed(fixed);
  else return '-'+parseFloat(((n2-n1)/n1*100).toString()).toFixed(fixed);
}