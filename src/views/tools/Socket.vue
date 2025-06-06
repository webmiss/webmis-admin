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
  console.log(d);
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
  const url: string = socketCfg.server+'?lang='+Env.lang+'&channel='+socketCfg.channel+'&token='+state.token;
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