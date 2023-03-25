/* 当前时间戳 */
export default (data: string='')=>{
  let now: any = new Date(data?data:'').getTime();
  return Math.round(now/1000);
}