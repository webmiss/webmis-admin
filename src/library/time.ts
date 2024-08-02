
/* 请求 */
export default class Time {

  /* 当前时间戳 */
  public static Time(data: string=''): number {
    const t: any = data?new Date(data):new Date();
    const now: number = t.getTime();
    return Math.round(now/1000);
  }

}