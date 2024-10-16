<template>
  <div class="wm-msg_body" :style="{visibility:msgShow?'inherit':'hidden'}">
    <wm-popup width="980px" height="700px" v-model:show="msgShow" @close="close()">
      <div class="wm-msg_content flex">
        <div class="wm-msg_left">
          <!-- Uinfo  -->
          <div class="wm-msg_uinfo flex">
            <div class="img" :style="{backgroundImage: this.state.uinfo.img?'url('+this.state.uinfo.img+')':''}">
              <i class="ui ui_image" v-if="!this.state.uinfo.img"></i>
            </div>
            <div class="name nowrap">{{ this.state.uinfo.nickname }}</div>
            <div class="more" tabindex="0" @blur="more=false" @focus="more=true">
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
            <wm-button padding="0 32px" @click="msgSend()">发送</wm-button>
          </div>
        </div>
      </div>
    </wm-popup>
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

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
/* UI组件 */
import Env from '@/config/Env';
import Ui from '@/library/ui'
import Request from '@/library/request'
import Time from '@/library/time'
/* 组件 */
import wmPopup from '@/components/popup/index.vue'
import wmButton from '@/components/form/button/index.vue'

@Options({
  components: { wmPopup, wmButton },
  props: {
    show: {type: Boolean, default: false},   // 是否显示
  }
})
export default class Msg extends Vue {
  // 参数
  show!: boolean;
  // 状态
  private store: any = useStore();
  state: any = this.store.state;
  // 变量
  msgShow: boolean = false;
  more: boolean = false;
  sea: any = {show: false, key:'', list:[]};
  // 发送内容
  sendGid: number | string = '';
  sendFid: number | string = '';
  sendTitle: string = '';
  sendContent: string = '';
  sendImg: string = '';
  sendList: Array<any> = [];
  // Socket
  private socketCfg: any = new Env().socket();
  private socketInterval: any = null;
  private heartbeatInterval: any = null;
  // 消息间隔时间
  private msgTime: number = 600;

  /* 创建成功 */
  created(): void {
    this.$watch('show', (val:boolean)=>{
      this.msgShow = val;
    }, { deep: true });
  }

  /* 创建完成 */
  mounted(): void {
    if(this.socketCfg.start) this.socketStart();
  }

  /* 搜索 */
  search(): void {
    const key: string = this.sea.key.trim();
    if(key.length>0) {
      this.sea.show = true;
      Request.Post('msg/sea?lang='+this.state.lang, {
        token: this.state.token,
        key: key,
      }, (res:any)=>{
        const d = res.data;
        if(d.code==0) this.sea.list=d.data;
      });
    } else {
      this.sea.show = false;
    }
  }
  /* 搜索-点击 */
  searchClick(row: any): void {
    this.sea.show = false;
    // 已存在
    for(let v of this.state.msg.list) {
      if(v.gid==row.gid && v.fid==row.fid) {
        return this.msgClick(v);
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
    this.state.msg.list.unshift(data);
    return this.msgClick(data);
  }

  /* 消息 */
  msg(d: any): void {
    if(d.code!=0) return Ui.Toast(d.msg);
    const row: any = d.data;
    // 已存在列表
    for(let v of this.state.msg.list) {
      if(v.gid==d.gid && v.fid==d.fid) {
        // 是否新信息
        if(d.gid==this.sendGid && d.fid==this.sendFid) {
          v.num += 0;
          row.is_new = false;
          this.msgRead([row.id]);
        } else {
          v.num += 1;
          row.is_new = true;
          this.state.msg.num += 1;
        }
        // 是否提示
        if(!this.msgShow) Ui.Toast(row.content);
        // 加载中
        let n: number = v.list.length;
        if(n>0 && v.list[n-1].loading) v.list.splice(n-1, 1);
        // 追加数据
        v.time = row.time;
        v.content = row.content;
        v.img = row.img;
        v.list.push(row);
        // 调换位置
        this.msgToTop(v);
        // 调转底部
        this.msgToBottom();
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
    this.state.msg.num += 1;
    this.state.msg.list.unshift(data);
    Ui.Toast(row.content);
  }

  /* 消息-列表 */
  msgList(): void {
    Request.Post('msg/list?lang='+this.state.lang, {token: this.state.token}, (res:any)=>{
      const d: any = res.data;
      if(d.code==0) {
        if(this.state.msg.list.length==0) this.state.msg.list = d.data.list;
        this.state.msg.num = d.data.num;
      }
    },()=>{
      Ui.Toast(this.state.langs.network_err);
    });
  }
  /* 消息-点击 */
  msgClick(row: any): void {
    this.sendGid = row.gid;
    this.sendFid = row.fid;
    this.sendTitle = row.title;
    this.sendContent = row.sendContent || '';
    this.sendImg = row.img;
    this.sendList = row.list;
    this.msgToBottom();
    // 标记阅读
    let ids: any = [];
    for(let v of row.list) {
      if(v.is_new){
          v.is_new = false;
          ids.push(v.id);
        }
    }
    row.num = 0;
    this.msgRead(ids);
  }
  /* 消息-内容 */
  msgInput(): void {
    if(!this.sendTitle) return;
    for(let v of this.state.msg.list) {
      if(v.gid==this.sendGid && v.fid==this.sendFid) v.sendContent = this.sendContent;
    }
  }
  /* 消息-调转顶部 */
  msgToTop(v: any) {
    let k: number = this.state.msg.list.indexOf(v);
    this.state.msg.list.unshift(v);
    this.state.msg.list.splice(k+1, 1);
  }
  /* 消息-调转底部 */
  msgToBottom(): void {
    setTimeout(()=>{
      document.querySelector('#msgBottom')?.scrollIntoView(true);
    }, 300);
  }
  /* 消息-换行 */
  msgCtrlEnter(): void {
    this.sendContent += '\n';
  }
  /* 消息-发送 */
  msgSend(event: any=null): void {
    // 禁止换行
    if(event) event.preventDefault();
    if(!this.sendTitle || this.sendContent.trim()=='') return ;
    // 参数
    const gid: number|string = this.sendGid;
    const fid: number|string = this.sendFid;
    const uid: number|string = this.state.uinfo.uid;
    const title: string = this.state.uinfo.nickname;
    const content: string = this.sendContent.trim();
    const img: string = this.state.uinfo.img;
    // 追加
    let row: any = {};
    for(let v of this.state.msg.list) {
      if(v.gid==gid && v.fid==fid) {
        row = v;
        // 时间
        const time: string = Time.Date('Y-m-d H:i:s');
        const tmp: any = {gid:gid, fid:uid, uid:fid, format:0, is_new: false, title:title, time:time, img:img, content:content, loading: gid==1?false:true};
        // 预发送
        v.time = time;
        v.content = content;
        v.list.push(tmp);
        // 系统消息
        if(gid==1) v.list.push({gid:gid, fid:0, uid:uid, format:0, is_new: false, title:title, time:time, img:this.sendImg, content:'...', loading: true});
        // 调换位置
        this.msgToTop(v);
        // 调转底部
        this.msgToBottom();
        break;
      }
    }
    // 数据
    const msg: string = JSON.stringify({
      type: 'msg',
      gid: gid,
      uid: fid || uid,
      data: {
        format: 0,
        title: this.state.uinfo.name,
        content: content,
        img: img,
      }
    });
    // 发送
    this.state.socket.send(msg);
    // 清空内容
    this.sendContent = '';
    row.sendContent = '';
  }
  /* 消息-标记阅读 */
  msgRead(ids: any=[]): void {
    if(ids.length==0) return;
    Request.Post('msg/read?lang='+this.state.lang, {
      token: this.state.token,
      ids: ids,
    }, (res:any)=>{
      const d: any = res.data;
      if(d.code==0) {
        this.state.msg.num -= ids.length;
      }
    });
  }

  /* 日期转换 */
  getMsgDate(d: string): string {
    const day: string = Time.Date('Y-m-d');
    const t1: number = Time.StrToTime(day+' 00:00:00');
    const t2: number = Time.StrToTime(d);
    let str: string = t2>=t1?d.substring(11, 16):d.substring(5, 10);
    return str;
  }
  /* 时间转换 */
  getMsgTime(t1: string, t2: string): string {
    if(t1==t2) return Time.FormatTime(t1);
    return Time.TimeSize(t1, t2)>this.msgTime?Time.FormatTime(t2):'';
  }

  /* 关闭 */
  close(): void {
    this.$emit('update:show', false);
  }

  /* 路由 */
  router(d: any): void {
    if(d.type=='msg') this.msg(d);
    if(d.type=='online') console.log('online', d);
  }

  /* Socket-启动 */
  socketStart(): void {
    clearInterval(this.socketInterval);
    this.socketInterval = setInterval(()=>{
      if(this.state.isLogin && (!this.state.socket || this.state.socket.readyState!=1)) this.socketOpen();
    }, this.socketCfg.time);
  }

  /* Socket-连接 */
  socketOpen(): void {
    const url: string = this.socketCfg.server+'?lang='+this.state.lang+'&channel='+this.socketCfg.channel+'&token='+this.state.token;
    this.state.socket = new WebSocket(url);
    // 链接
    this.state.socket.onopen = ()=>{
      // 心跳包
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = setInterval(()=>{
        try{
          this.state.socket.send(JSON.stringify({type:''}));
        }catch(e){
          this.socketClose();
        }
      }, this.socketCfg.heartbeat);
      // 消息列表
      this.msgList();
    }
    // 接收
    this.state.socket.onmessage = (res: any)=>{
      const d = JSON.parse(res.data);
      this.router(d);
    }
    // 关闭
    this.state.socket.onclose = ()=>{
      this.socketClose();
    }
  }

  /* Socket-关闭 */
  socketClose(): void {
    if(!this.state.socket) return;
    this.state.socket.close();
    this.state.socket = null;
  }

}
</script>