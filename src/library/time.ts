
/* 请求 */
export default class Time {

  /* 当前时间戳 */
  public static Time(data: string=''): number {
    const t: any = data?new Date(data):new Date();
    const now: number = t.getTime();
    return Math.round(now/1000);
  }

  /* 日期格式 */
  public static Date(format: string='Y-m-d H:i:s', timestamp: number | Date=0): string {
    // 获取时间
    let time: Date;
    if(typeof timestamp == 'number') time = timestamp>0?new Date(timestamp*1000):new Date();
    else time = timestamp;
    // 获取时间
    const y: string = ''+time.getFullYear();
    const m: string = time.getMonth()+1<10?'0'+(time.getMonth()+1):''+(time.getMonth()+1);
    const d: string = time.getDate()<10?'0'+time.getDate():''+time.getDate();
    const h: string = time.getHours()<10?'0'+time.getHours():''+time.getHours();
    const i: string = time.getMinutes()<10?'0'+time.getMinutes():''+time.getMinutes();
    const s: string = time.getSeconds()<10?'0'+time.getSeconds():''+time.getSeconds();
    // 格式化
    let res: string = format;
    res = res.replace("Y", y);
    res = res.replace("m", m);
    res = res.replace("d", d);
    res = res.replace("H", h);
    res = res.replace("i", i);
    res = res.replace("s", s);
    return res;
  }

  /* 时间戳转换 */
  public static StrToTime(datetime: string=''): number {
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

  /* 获取星期几 */
  public static Week(date: string | number | Date): string {
    const now: Date = new Date(date);
    const week = ['日','一','二','三','四','五','六'];
    return week[now.getDay()];
  }

  /* 格式化-时间 */
  public static FormatTime(date: string): string {
    let time = date;
    // 现在
    const now: Date = new Date();
    const y: string = ''+now.getFullYear();
    const m: string = (now.getMonth()+1)<10?'0'+(now.getMonth()+1):''+(now.getMonth()+1);
    const d: string = now.getDate()<10?'0'+now.getDate():''+now.getDate();
    // 判断
    const tmp_y = date.substr(0,4);
    const tmp_m = date.substr(5,2);
    const tmp_d = date.substr(8,2);
    const tmp_t1 = date.substr(11,5);
    const tmp_t2 = date.substr(5,11);
    // 时
    const h = parseInt(date.substr(11,2));
    // 当天
    if(tmp_y==y && tmp_m==m && tmp_d==d){
      let str = '';
      if(h<6) str='凌晨';
      else if(h<9) str='早上';
      else if(h<12) str='上午';
      else if(h<14) str='中午';
      else if(h<17) str='下午';
      else if(h<20) str='晚上';
      time = str+' '+tmp_t1;
    }else if(tmp_y==y && tmp_m==m && tmp_d==''+(Number(d)-1)){
      // 本月
      time = '昨天 '+tmp_t1
    }else if(tmp_y==y && tmp_m==m){
      // 本月
      time = tmp_t2
    }
    return time;
  }

  /* 时间比较 */
  public static TimeSize(t1: number|string|Date, t2?: number|string|Date): number {
    const last = new Date(t1).getTime();
    const now = t2?new Date(t2).getTime():new Date().getTime();
    let t = now-last;
    return t!=0?t/1000:0;
  }

  /* 格式化-小时 */
  public static FormatHourEncode(time: number): string {
    let t1: string = '00';
    let t2: string = '00';
    let t3: string = '00';
    let t: number = 0;
    // 小时
    if(time >= 3600){
      t = Math.floor(time/3600);
      t1 = t>=10?t.toString():'0'+t;
      time -= t*3600;
    }
    // 分钟
    if(time >= 60){
      t = Math.floor(time/60);
      t2 = t>=10?t.toString():'0'+t;
      time -= t*60;
    }
    // 秒
    t = time;
    t3 = t>=10?t.toString():'0'+t;
    return t1+':'+t2+':'+t3;
  }
  public static FormatHourDecode(time: string): number {
    let arr: any = time.split(':')
    return parseInt(arr[0])*3600 + parseInt(arr[1])*60 + parseInt(arr[2]);
  }

}