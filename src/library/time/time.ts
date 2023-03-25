/* 当前时间戳 */
export default (data: string='')=>{
  let t: any = data?new Date(data):new Date();
  let now: number = t.getTime();
  return Math.round(now/1000);
}