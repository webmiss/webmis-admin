import App from '@/main';
import Storage from '@/library/Storage'
import Post from '@/library/request/post'
import Notify from '@/library/plus/notify'

/* Msg */
export default {

  /* 消息路由 */
  router(socket: any, d: any){
    if(d.type=='msg') this.msg(socket,d); //消息
    else if(d.type=='notify') this.notify(socket,d);  //通知
  },

  /* 消息 */
  msg(socket: any, d: any){
    const msg: any = App.$store.state.msg;
    const data: any = {id:d.id, fid:d.fid, uid:d.uid, format:0, title:d.title, content:d.content, time:d.time, img:d.img};
    // 存在列表
    let in_arr: boolean = false;
    for(let v of msg.list){
      if(v.fid==d.fid){
        in_arr = true;
        // 数据
        v.time = d.time;
        v.msg = d.msg;
        if(msg.show && msg.fid==d.fid){
          v.num += 0;
          data.is_new = false;
          this.msgRead([d.id]);
        }else{
          v.num += 1;
          data.is_new = true;
          msg.num += 1;
          Notify(d.title, d.content);
        }
        v.list.push(data);
        // 调换位置
        let k: number = msg.list.indexOf(v);
        msg.list[k].content = d.content;
        msg.list.unshift(v);
        msg.list.splice(k+1, 1);
        this.msgToBottom();
        break;
      }
    }
    // 添加数据
    if(!in_arr){
      msg.num += 1;
      data.is_new = true;
      msg.list.unshift({gid:d.gid, fid:d.fid, num:1, title:d.title, time:d.time, content:d.content, img:d.img, list:[data]});
      Notify(d.title, d.content);
    }
  },
  /* 消息-标记阅读 */
  msgRead(ids: any=[]){
    if(ids.length==0) return;
    const msg: any = App.$store.state.msg;
    Post('msg/read',{
      token: Storage.getItem('token'),
      ids: JSON.stringify(ids),
    },(res: any)=>{
      const d = res.data;
      if(d.code==0) msg.num -= 0;
    });
  },
  /* 消息-跳转底部 */
  msgToBottom(){
    setTimeout(()=>{
      document.querySelector('#msgBottom')?.scrollIntoView(true);
    }, 300);
  },

  /* 通知 */
  notify(socket: any, d: any){
    // console.log(socket,d);
  },

}