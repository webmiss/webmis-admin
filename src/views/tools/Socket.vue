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
  // 内容
  let isNull: boolean = false;
  for(let v of state.msg.list) {
    if(v.loading===d.loading) {
      v.id = d.id;
      v.loading = 0;
      v.content = d.content;
      state.msg.readId = -1;
      isNull = true;
      break;
    }
  }
  // 列表
  const id: number = d.id || 0;
  const gid: number = d.gid;
  const fid: number = d.fid==state.uinfo.uid?d.uid:d.fid;
  const data: any = {gid: gid, fid: fid, num: 1, time: d.time, format: d.format, title: d.title, img: d.img, content: d.content};
  for(let k in state.msg.group) {
    if(state.msg.group[k].gid===gid && state.msg.group[k].fid===fid) {
      data.title = state.msg.group[k].title;
      data.img = state.msg.group[k].img;
      // 数量
      if(gid===state.msg.gid && fid===state.msg.fid) {
        data.num = 0;
        // 追加
        d.loading = 0;
        if(!isNull) state.msg.list.push(d);
        if(id) state.msg.readId = id;
      } else {
        data.num = state.msg.group[k].num + 1;
        state.msg.num += 1;
      }
      // 移除
      state.msg.group.splice(k, 1);
      break;
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