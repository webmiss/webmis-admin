<template>
</template>

<style lang="less" scoped>
</style>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Env from '../../config/Env';
import Ui from '../../library/ui';

// 状态
const store = useStore();
const state = store.state;
// 变量
let socketCfg: any = new Env().socket();
let socketInterval: any = null;
let heartbeatInterval: any = null;

/* 创建完成 */
onMounted(()=>{
  if(Env.isSocket) socketStart();
});

/* 路由 */
const router = (d: any): void => {
  if(d.type=='msg') msgData(d);
  if(d.type=='online') console.log('online', d);
}

/* 消息 */
const msgData = (d: any): void => {
  if(d.code!=0) return Ui.Toast(d.msg);
  // 加载状态(我的)
  let isUser: boolean = false;
  for(let v of state.msg.list) {
    if(v.loading===d.loading) {
      isUser = true;
      v.id = d.id;
      v.loading = 0;
      v.content = d.content;
      state.msg.readId = -1;
      break;
    }
  }
  // 追加消息(他人)
  let num: number = 0;
  if(!isUser) {
    if(state.msg.gid===d.gid && state.msg.fid===d.fid) {
      const id: number = d.id || 0;
      state.msg.list.push({id: id, gid: d.gid, fid: d.fid, uid: d.uid, is_new: false, time: d.time, format: d.format, title: d.title, img: d.img, content: d.content});
      if(id) state.msg.readId = id;
    } else {
      num = 1;
      state.msg.num += 1;
    }
  }
  // 列表
  const data: any = {gid: d.gid, fid: d.fid, num: d.num, time: d.time, format: d.format, title: d.title, img: d.img, content: d.content};
  for(let k in state.msg.group) {
    // 自己
    if(state.msg.group[k].gid==d.gid && state.msg.group[k].fid==d.uid) {
      data.fid = d.uid;
      data.title = state.msg.group[k].title;
      data.img = state.msg.group[k].img;
      data.num = state.msg.group[k].num + num;
      // 移除
      state.msg.group.splice(k, 1);
    } else if(state.msg.group[k].gid==d.gid && state.msg.group[k].fid==d.uid) {
      // 他人
      data.num = state.msg.group[k].num + num;
      // 移除
      state.msg.group.splice(k, 1);
    }
  }
  // 追加
  state.msg.group.unshift(data);
}

/* Socket-启动 */
const socketStart = (): void => {
  clearInterval(socketInterval);
  socketInterval = setInterval(()=>{
    if(state.isLogin && (!state.socket || state.socket.readyState!=1)) socketOpen();
  }, socketCfg.time);
}

/* Socket-连接 */
const socketOpen = (): void => {
  const url: string = socketCfg.server+'?lang='+state.lang+'&channel='+socketCfg.channel+'&token='+state.token;
  state.socket = new WebSocket(url);
  // 链接
  state.socket.onopen = ()=>{
    // 心跳包
    clearInterval(heartbeatInterval);
    heartbeatInterval = setInterval(()=>{
      try{
        state.socket.send(JSON.stringify({type:''}));
      }catch(e){
        socketClose();
      }
    }, socketCfg.heartbeat);
  }
  // 接收
  state.socket.onmessage = (res: any)=>{
    const d = JSON.parse(res.data);
    router(d);
  }
  // 关闭
  state.socket.onclose = ()=>{
    socketClose();
  }
}

/* Socket-关闭 */
const socketClose = (): void => {
  if(!state.socket) return;
  state.socket.close();
  state.socket = null;
}

</script>