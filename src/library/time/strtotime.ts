/* 时间戳转换 */
export default (datetime: string='')=>{
  const arr = datetime.split(' ');
  const num: number = parseInt(arr[0]);
  let n = 0;
  switch (arr[1]) {
    case 'second': n=num*1; break;
    case 'minute': n=num*60; break;
    case 'hour': n=num*60*60; break;
    case 'day': n=num*60*60*24; break;
    case 'week': n=num*60*60*24*7; break;
    case 'month': n=num*60*60*24*7*30; break;
    case 'year': n=num*60*60*24*365; break;
  }
  let now: number = n!=0?new Date().getTime():new Date(datetime).getTime();
  now = Math.round(now/1000)+n;
  return now>0?now:0;
}