<template>
  <div class="wm-msg_body" :style="{visibility:msgShow?'inherit':'hidden'}">
    <wmPopup width="980px" height="700px" v-model:show="msgShow" @close="close()">
      <div class="wm-msg_content flex">
        <div class="wm-msg_left">
          <!-- Uinfo  -->
          <div class="wm-msg_uinfo flex">
            <div class="img" :style="{backgroundImage: state.uinfo.img?'url('+state.uinfo.img+')':''}">
              <i class="ui ui_image" v-if="!state.uinfo.img"></i>
            </div>
            <div class="name nowrap">{{ state.uinfo.nickname }}</div>
            <div class="more" tabindex="0" @blur="more=false" @focus="more=false">
              <i class="ui ui_more"></i>
              <ul class="config" v-if="more">
                <li class="flex_left" @click="state.isUinfo=true">
                  <i class="ui ui_user"></i><span>{{ state.langs.uinfo_title }}</span>
                </li>
                <li class="flex_left" @click="state.isPasswd=true">
                  <i class="ui ui_safety"></i><span>{{ state.langs.passwd_title }}</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- Search -->
          <div class="wm-msg_search">
            <i class="sea ui ui_search"></i>
            <input type="text" v-model="sea.key" :placeholder="state.langs.msg_seach" @input="search()" />
            <div class="user_list_body" v-if="sea.show">
              <div class="arrow arrow_up"></div>
              <ul class="user_list">
                <template v-if="sea.list.length>0">
                  <li class="flex" v-for="(v,k) in sea.list" :key="k" @click="searchClick(v)">
                    <div class="img" :style="{backgroundImage: v.img?'url('+v.img+')':''}">
                      <i class="ui ui_image" v-if="!v.img"></i>
                    </div>
                    <div class="name nowrap">{{ v.title }}</div>
                  </li>
                </template>
                <li class="null" v-else></li>
              </ul>
            </div>
          </div>
          <!-- List -->
          <div class="wm-msg_left_ct scrollbar">
            <ul class="wm-msg_list" v-if="state.msg.list.length>0">
              <li class="flex" v-for="(v,k) in state.msg.list" :key="k" :class="v.gid==sendGid&&v.fid==sendFid?'active':''" @click="msgClick(v)">
                <div class="img" :style="{backgroundImage: v.img?'url('+v.img+')':''}">
                  <span class="redNum" v-if="v.num>0">{{ v.num }}</span>
                  <i class="ui ui_image" v-if="!v.img"></i>
                </div>
                <div class="msg_text">
                  <div class="flex">
                    <div class="title nowrap">{{ v.title }}</div>
                    <div class="time">{{ getMsgDate(v.time) }}</div>
                  </div>
                  <div class="text nowrap">{{ v.content }}</div>
                </div>
              </li>
            </ul>
            <div class="msg_null" v-else>{{ state.langs.msg_null }}</div>
          </div>
          <!-- List End -->
        </div>
        <div class="wm-msg_right">
          <!-- Title -->
          <div class="wm-msg_title">{{ sendTitle}}</div>
          <!-- Msg -->
          <div class="wm-msg_ct scrollbar">
            <template v-if="sendList.length>0">
              <template v-for="(v,k) in sendList" :key="k">
                <!-- Time -->
                <div class="time">{{ getMsgTime(sendList[k-1]?sendList[k-1].time:v.time, v.time) }}</div>
                <!-- Msg Left -->
                <div class="msg_left flex_left" v-if="v.fid!=state.uinfo.uid">
                  <div class="img" :style="{backgroundImage: v.img?'url('+v.img+')':''}">
                    <i class="ui ui_image" v-if="!v.img"></i>
                  </div>
                  <div class="msg_body flex_left">
                    <div class="content">
                      <span class="arrow"></span>
                      <span class="red" v-if="v.loading"></span>
                      <pre>{{ v.content }}</pre>
                    </div>
                  </div>
                </div>
                <!-- Msg Right -->
                <div class="msg_right flex_right" v-else>
                  <div class="msg_body flex_right">
                    <div class="content">
                      <span class="arrow"></span>
                      <span class="red" v-if="v.loading"></span>
                      <pre>{{ v.content }}</pre>
                    </div>
                  </div>
                  <div class="img" :style="{backgroundImage: v.img?'url('+v.img+')':''}">
                    <i class="ui ui_image" v-if="!v.img"></i>
                  </div>
                </div>
                <!-- Msg Right End -->
              </template>
            </template>
            <div class="msg_null" v-else>{{ state.langs.msg_null }}</div>
            <div id="msgBottom"></div>
          </div>
          <!-- Msg End -->
          <ul class="wm-msg_tools flex_flex">
            <li><i class="ui ui_folder"></i></li>
          </ul>
          <textarea class="wm-msg_area scrollbar" v-model="sendContent" @input="msgInput()" @keyup.ctrl.enter="msgCtrlEnter()" @keydown.enter.exact="msgSend"></textarea>
          <div class="wm-msg_action flex_right">
            <span>按下Ctrl+Enter换行</span>
            <wmButton padding="0 32px" @click="msgSend()">发送</wmButton>
          </div>
        </div>
      </div>
    </wmPopup>
  </div>
  
  
</template>

<style lang="less" scoped>
.wm-msg_body{position: fixed; z-index: 99; width: 100%; height: 100%;}
.wm-msg_content{overflow: hidden; width: 100%; height: 100%; border-radius: 4px;}
.wm-msg_content .msg_null{position: absolute; color: #999; left: 50%; top: 50%; transform: translate(-50%, -50%);}
.wm-msg_content .img{position: relative; text-align: center; background-color: #F2F2F2; border-radius: 4px; background-repeat: no-repeat; background-size: cover;}
/* Left */
.wm-msg_left{width: 260px; height: 100%; background-color: #242628; color: #FFF;}
.wm-msg_uinfo{position: relative; height: 40px; line-height: 40px; padding: 12px 16px 8px;}
.wm-msg_uinfo .img{overflow: hidden; width: 40px; height: 40px;}
.wm-msg_uinfo .img i{color: @Info; font-size: 20px;}
.wm-msg_uinfo .name{width: calc(100% - 40px - 30px); padding: 0 10px; font-size: 16px; box-sizing: border-box;}
.wm-msg_uinfo .more{width: 30px; text-align: center;}
.wm-msg_uinfo .more i{cursor: pointer; width: 40px; text-align: center; color: @Info; font-size: 20px;}
.wm-msg_uinfo .more i:hover{color: @Info3;}
.wm-msg_uinfo .config{overflow: hidden; position: absolute; z-index: 1; top: 50px; right: 16px; background-color: #FFF; color: @BrandText; border-radius: 4px; box-shadow: 0 0 8px rgba(0,0,0,0.3);}
.wm-msg_uinfo .config li{cursor: pointer; padding-right: 24px;}
.wm-msg_uinfo .config li:hover{background-color: #F2F2F2;}
.wm-msg_search{position: relative; padding: 8px 16px 8px; line-height: 36px;}
.wm-msg_search .sea{position: absolute; margin-top: 2px; width: 36px; text-align: center; color: #949698; font-size: 20px;}
.wm-msg_search input{border: transparent 1px solid; padding: 0 10px 0 36px; width: 100%; line-height: 36px; background-color: #040608; color: #FFF; font-size: 14px; border-radius: 20px; box-sizing: border-box;}
.wm-msg_search input:focus{outline: none; border-color: @Minor; box-shadow: none;}
.wm-msg_search .user_list_body{position: absolute; z-index: 1; padding-top: 8px; width: calc(100% - 32px);}
.wm-msg_search .user_list_body .arrow{position: absolute; left: 50%; top: -3px; transform: translateX(-50%);}
.wm-msg_search .user_list{padding: 4px; background-color: #FFF; border-radius: 4px; box-shadow: 0 0 8px rgba(0,0,0,0.3);}
.wm-msg_search .user_list li{cursor: pointer; line-height: 32px; padding: 4px;}
.wm-msg_search .user_list li:hover{background-color: #F2F2F2;}
.wm-msg_search .user_list .img{width: 32px; height: 32px; line-height: 32px;}
.wm-msg_search .user_list .img i{color: @Info; font-size: 16px;}
.wm-msg_search .user_list .name{width: calc(100% - 32px); padding: 0 10px; font-size: 14px; color: @BrandText; box-sizing: border-box;}
.wm-msg_left_ct{position: relative; overflow-y: auto; height: calc(100% - 60px - 56px);}
.wm-msg_list{overflow: hidden; padding: 10px 0;}
.wm-msg_list li{cursor: pointer; line-height: 40px; padding: 10px 16px; border-radius: 4px;}
.wm-msg_list li:hover{background-color: #2E3238;}
.wm-msg_list .active{background-color: #2E3238;}
.wm-msg_list .img{width: 40px; height: 40px;}
.wm-msg_list .img i{color: @Info; font-size: 20px;}
.wm-msg_list .msg_text{width: calc(100% - 40px); padding-left: 10px; box-sizing: border-box;}
.wm-msg_list .msg_text div{line-height: 20px;}
.wm-msg_list .msg_text .title{width: calc(100% - 40px);}
.wm-msg_list .msg_text .time{width: 40px; text-align: right; color: @Info; font-size: 12px;}
.wm-msg_list .msg_text .text{color: @Info; font-size: 12px;}
/* Right */
.wm-msg_right{width: calc(100% - 260px); height: 100%; background-color: #F2F2F2;}
.wm-msg_title{height: 56px; line-height: 56px; text-align: center; font-size: 16px;}
/* Msg */
.wm-msg_ct{scroll-behavior: smooth; position: relative; overflow-y: scroll; padding: 10px 16px; height: calc(100% - 20px - 56px - 40px - 84px - 54px); border: #DADCDF 1px solid; border-left: none; border-right: none;}
.wm-msg_ct .time{line-height: 48px; color: #999; text-align: center; font-size: 12px;}
.wm-msg_ct .img{width: 48px; height: 48px; line-height: 48px; text-align: center; background-color: #FFF; border-radius: 4px;}
.wm-msg_ct .img i{font-size: 24px; color: @BaseBorder;}
.wm-msg_ct .content{position: relative; max-width: calc(100% - 30px); line-height: 24px; padding: 10px 16px; border-radius: 4px; color: #000; word-break: break-all;}
.wm-msg_ct .content pre{white-space: pre-wrap;}
.wm-msg_ct .arrow{position: absolute; width: 8px; height: 8px; top: 20px; transform: rotate(45deg);}
.wm-msg_ct .red{position: absolute; width: 8px; height: 8px; top: 20px; background-color: @Danger; border-radius: 50%;}
.wm-msg_ct .msg_left{padding: 10px 0;}
.wm-msg_ct .msg_left .msg_body{margin-left: 10px; width: calc(100% - 116px);}
.wm-msg_ct .msg_left .content{background-color: #FFF;}
.wm-msg_ct .msg_left .arrow{left: -4px; background-color: #FFF;}
.wm-msg_ct .msg_left .red{right: -16px;}
.wm-msg_ct .msg_right{padding: 10px 0;}
.wm-msg_ct .msg_right .msg_body{margin-right: 10px; width: calc(100% - 116px);}
.wm-msg_ct .msg_right .content{background-color: #B2E281;}
.wm-msg_ct .msg_right .arrow{right: -4px; background-color: #B2E281;}
.wm-msg_ct .msg_right .red{left: -16px;}
/* Tools */
.wm-msg_tools{overflow: hidden; padding: 0 10px;}
.wm-msg_tools li{cursor: pointer; width: 40px; height: 40px; line-height: 40px; text-align: center; color: @Info;}
.wm-msg_tools li:hover{color: @BrandText;}
.wm-msg_tools i{font-size: 20px;}
/* Action */
.wm-msg_area{width: 100%; height: 84px; line-height: 24px; padding: 0 16px; border: none; background: none; resize: none; box-sizing: border-box;}
.wm-msg_area:focus{outline: none;}
.wm-msg_action{height: 32px; line-height: 32px; padding: 10px 16px;}
.wm-msg_action span{padding: 0 8px; color: @Info;}
</style>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Env from '../../config/Env';
import Ui from '../../library/ui';
import Request from '../../library/request';
import Time from '../../library/time';
/* 组件 */
import wmPopup from '../../components/popup/index.vue';
import wmButton from '../../components/form/button/index.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},   // 是否显示
});
const emit = defineEmits(['update:show']);
// 状态
const store = useStore();
const state = store.state;
// 变量
const msgShow = ref(false);
const more = ref(false);
const sea = ref({show: false, key:'', list:<any>[]});
// 发送内容
let sendGid = ref<number | string>('');
let sendFid = ref<number | string>('');
let sendTitle = ref('');
let sendContent = ref('');
let sendImg = ref('');
let sendList = ref(<any>[]);
// Socket
let socketCfg: any = new Env().socket();
let socketInterval = ref<any>(null);
let heartbeatInterval = ref<any>(null);
// 消息间隔时间
let msgTime = ref(600);

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  msgShow.value = val;
},{ deep: true });

/* 创建完成 */
onMounted(()=>{
  if(socketCfg.start) socketStart();
});

/* 搜索 */
const search = (): void => {
  const key: string = sea.value.key.trim();
  if(key.length>0) {
    sea.value.show = true;
    Request.Post('msg/sea?lang='+state.lang, {
      token: state.token,
      key: key,
    }, (res:any)=>{
      const d = res.data;
      if(d.code==0) sea.value.list=d.data;
    });
  } else {
    sea.value.show = false;
  }
}
/* 搜索-点击 */
const searchClick = (row: any): void => {
  sea.value.show = false;
  // 已存在
  for(let v of state.msg.list) {
    if(v.gid==row.gid && v.fid==row.fid) {
      return msgClick(v);
    }
  }
  // 追加
  const data: any = {
    gid: row.gid,
    fid: row.fid,
    title: row.title,
    content: '',
    img: row.img,
    time: Time.Date('Y-m-d H:i:s'),
    list: [],
  }
  state.msg.list.unshift(data);
  return msgClick(data);
}

/* 消息 */
const msgData = (d: any): void =>{
  if(d.code!=0) return Ui.Toast(d.msg);
  const row: any = d.data;
  // 已存在列表
  for(let v of state.msg.list) {
    if(v.gid==d.gid && v.fid==d.fid) {
      // 是否新信息
      if(d.gid==sendGid.value && d.fid==sendFid.value) {
        v.num += 0;
        row.is_new = false;
        msgRead([row.id]);
      } else {
        v.num += 1;
        row.is_new = true;
        state.msg.num += 1;
      }
      // 是否提示
      if(!msgShow) Ui.Toast(row.content);
      // 加载中
      let n: number = v.list.length;
      if(n>0 && v.list[n-1].loading) v.list.splice(n-1, 1);
      // 追加数据
      v.time = row.time;
      v.content = row.content;
      v.img = row.img;
      v.list.push(row);
      // 调换位置
      msgToTop(v);
      // 调转底部
      msgToBottom();
      return ;
    }
  }
  // 追加
  row.is_new = true;
  const data: any = {
    type: d.type,
    gid: row.gid,
    fid: row.fid,
    num: 1,
    time: row.time,
    title: row.title,
    content: row.content,
    img: row.img,
    list: [row],
  }
  state.msg.num += 1;
  state.msg.list.unshift(data);
  Ui.Toast(row.content);
}

/* 消息-列表 */
const msgList = (): void => {
  Request.Post('msg/list?lang='+state.lang, {token: state.token}, (res:any)=>{
    const {code, data}: any = res.data;
    if(code==0) {
      if(state.msg.list.length==0) state.msg.list = data.list;
      state.msg.num = data.num;
    }
  },()=>{
    Ui.Toast(state.langs.network_err);
  });
}
/* 消息-点击 */
const msgClick = (row: any): void => {
  sendGid.value = row.gid;
  sendFid.value = row.fid;
  sendTitle.value = row.title;
  sendContent.value = row.sendContent || '';
  sendImg.value = row.img;
  sendList.value = row.list;
  msgToBottom();
  // 标记阅读
  let ids: any = [];
  for(let v of row.list) {
    if(v.is_new){
        v.is_new = false;
        ids.push(v.id);
      }
  }
  row.num = 0;
  msgRead(ids);
}
/* 消息-内容 */
const msgInput = (): void => {
  if(!sendTitle.value) return;
  for(let v of state.msg.list) {
    if(v.gid==sendGid.value && v.fid==sendFid.value) v.sendContent = sendContent.value;
  }
}
/* 消息-调转顶部 */
const msgToTop = (v: any) => {
  let k: number = state.msg.list.indexOf(v);
  state.msg.list.unshift(v);
  state.msg.list.splice(k+1, 1);
}
/* 消息-调转底部 */
const msgToBottom = (): void => {
  nextTick(()=>{
    document.querySelector('#msgBottom')?.scrollIntoView(true);
  });
}
/* 消息-换行 */
const msgCtrlEnter = (): void => {
  sendContent.value += '\n';
}
/* 消息-发送 */
const msgSend = (event: any=null): void => {
  // 禁止换行
  if(event) event.preventDefault();
  if(!sendTitle.value || sendContent.value.trim()=='') return ;
  // 参数
  const uid: number|string = state.uinfo.uid;
  const title: string = state.uinfo.nickname;
  const content: string = sendContent.value.trim();
  const img: string = state.uinfo.img;
  // 追加
  let row: any = {};
  for(let v of state.msg.list) {
    if(v.gid==sendGid.value && v.fid==sendFid.value) {
      row = v;
      // 时间
      const time: string = Time.Date('Y-m-d H:i:s');
      const tmp: any = {gid:sendGid.value, fid:uid, uid:sendFid.value, format:0, is_new: false, title:title, time:time, img:img, content:content, loading: sendGid.value==1?false:true};
      // 预发送
      v.time = time;
      v.content = content;
      v.list.push(tmp);
      // 系统消息
      if(sendGid.value==1) v.list.push({gid:sendGid.value, fid:0, uid:uid, format:0, is_new: false, title:title, time:time, img:sendImg.value, content:'...', loading: true});
      // 调换位置
      msgToTop(v);
      // 调转底部
      msgToBottom();
      break;
    }
  }
  // 数据
  const msg: string = JSON.stringify({
    type: 'msg',
    gid: sendGid.value,
    uid: sendFid.value || uid,
    data: {
      format: 0,
      title: state.uinfo.name,
      content: content,
      img: img,
    }
  });
  // 发送
  state.socket.send(msg);
  // 清空内容
  sendContent.value = '';
  row.sendContent = '';
}
/* 消息-标记阅读 */
const msgRead = (ids: any=[]): void => {
  if(ids.length==0) return;
  Request.Post('msg/read?lang='+state.lang, {
    token: state.token,
    ids: ids,
  }, (res:any)=>{
    const {code}: any = res.data;
    if(code==0) {
      state.msg.num -= ids.length;
    }
  });
}

/* 日期转换 */
const getMsgDate = (d: string): string => {
  const day: string = Time.Date('Y-m-d');
  const t1: number = Time.StrToTime(day+' 00:00:00');
  const t2: number = Time.StrToTime(d);
  let str: string = t2>=t1?d.substring(11, 16):d.substring(5, 10);
  return str;
}
/* 时间转换 */
const getMsgTime = (t1: string, t2: string): string => {
  if(t1==t2) return Time.FormatTime(t1);
  return Time.TimeSize(t1, t2)>msgTime.value?Time.FormatTime(t2):'';
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

/* 路由 */
const router = (d: any): void => {
  if(d.type=='msg') msgData(d);
  if(d.type=='online') console.log('online', d);
}

/* Socket-启动 */
const socketStart = (): void => {
  clearInterval(socketInterval.value);
  socketInterval.value = setInterval(()=>{
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
    clearInterval(heartbeatInterval.value);
    heartbeatInterval.value = setInterval(()=>{
      try{
        state.socket.send(JSON.stringify({type:''}));
      }catch(e){
        socketClose();
      }
    }, socketCfg.heartbeat);
    // 消息列表
    msgList();
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