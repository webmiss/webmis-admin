import App from '@/main';

/* UI-跳转页面 */
export default (url: string, parm: any=''): (void)=>{
  // 跳转
  App.$router.push({path:url, query:parm});
}