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
            <input type="text" v-model="sea.key" :placeholder="state.langs.msg_seach" @input="serachVal()" />
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
            <ul class="wm-msg_list" v-if="state.msg.group.length>0">
              <li class="flex" v-for="v in state.msg.group" :class="v.gid===state.msg.gid && v.fid===state.msg.fid ?'active':''" @click="msgClick(v)">
                <div class="img" :style="{backgroundImage: v.img?'url('+v.img+')':''}">
                  <span class="redNum" v-if="v.num>0">{{ v.num }}</span>
                  <i class="ui ui_image" v-if="!v.img"></i>
                </div>
                <div class="msg_text">
                  <div class="flex">
                    <div class="title nowrap">{{ v.title }}</div>
                    <div class="time">{{ getMsgDate(v.time) }}</div>
                  </div>
                  <div class="text nowrap" v-if="v.sendContent">[草稿]{{ v.sendContent }}</div>
                  <div class="text nowrap" v-if="v.format===1">[{{ isImgage(v.content.type)?'图片':'文件' }}] {{ v.content.name }}</div>
                  <div class="text nowrap" v-else>{{ v.content }}</div>
                </div>
              </li>
            </ul>
            <div class="msg_null" v-else>{{ state.langs.msg_null }}</div>
          </div>
          <!-- List End -->
        </div>
        <div class="wm-msg_right" @dragover.prevent @drop="msgDragFile">
          <!-- Title -->
          <div class="wm-msg_title">{{ state.msg.title }}</div>
          <!-- Msg -->
          <div class="wm-msg_ct scrollbar">
            <template v-if="state.msg.list.length>0">
              <div class="history" v-if="!scroll.finished" @click="onLoad()">历史消息</div>
              <template v-for="(v,k) in state.msg.list" :key="k">
                <!-- Time -->
                <div class="time">{{ getMsgTime(state.msg.list[k-1]?state.msg.list[k-1].time:v.time, v.time) }}</div>
                <!-- Msg Left -->
                <div class="msg_left flex_left" v-if="v.fid!=state.uinfo.uid">
                  <div class="img" :style="{backgroundImage: v.img?'url('+v.img+')':''}">
                    <i class="ui ui_image" v-if="!v.img"></i>
                  </div>
                  <div class="msg_body flex_left">
                    <div class="content msg_ct" v-if="v.format===0">
                      <span class="arrow"></span>
                      <span class="red" v-if="v.loading"></span>
                      <pre>{{ v.content }}</pre>
                    </div>
                    <div class="content file_ct" v-else-if="v.format===1">
                      <span class="arrow"></span>
                      <div class="img_ct" v-if="isImgage(v.content.type)">
                        <div class="wm-ui_load" v-if="v.loading"><span><i class="ui ui_loading"></i></span></div>
                        <img :src="v.base64?v.base64:v.content.url+v.content.file" @click="msgImgView(v.content.url+v.content.file)">
                      </div>
                      <div class="other_ct" v-else>
                        <i class="ui ui_file"></i>
                        <div class="text_body">
                          <h2 class="nowrap">{{ v.content.name }}</h2>
                          <div class="text">
                            {{ Format.FileSize(v.content.size) }}&nbsp;&nbsp;|&nbsp;&nbsp;
                            <a v-if="v.loading">取消</a>
                            <a v-else @click="msgDownload(v.content.url+v.content.file, v.content.name)">下载</a>
                          </div>
                          <div v-if="v.loading" class="load" :style="{backgroundImage: 'linear-gradient(to right, #6FB737, #6FB737 '+v.load+'%, #F2F2F2 '+v.load+'%, #F2F2F2 100%)'}"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Msg Right -->
                <div class="msg_right flex_right" v-else>
                  <div class="msg_body flex_right">
                    <div class="content msg_ct" v-if="v.format===0">
                      <span class="arrow"></span>
                      <span class="red" v-if="v.loading"></span>
                      <pre>{{ v.content }}</pre>
                    </div>
                    <div class="content file_ct" v-else-if="v.format===1">
                      <span class="arrow"></span>
                      <div class="img_ct" v-if="isImgage(v.content.type)">
                        <div class="wm-ui_load" v-if="v.loading"><span><i class="ui ui_loading"></i></span></div>
                        <img :src="v.base64?v.base64:v.content.url+v.content.file" @click="msgImgView(v.content.url+v.content.file)">
                      </div>
                      <div class="other_ct" v-else>
                        <i class="ui ui_file"></i>
                        <div class="text_body">
                          <h2 class="nowrap">{{ v.content.name }}</h2>
                          <div class="text">
                            {{ Format.FileSize(v.content.size) }}&nbsp;&nbsp;|&nbsp;&nbsp;
                            <a v-if="v.loading">取消</a>
                            <a v-else @click="msgDownload(v.content.url+v.content.file, v.content.name)">下载</a>
                          </div>
                          <div v-if="v.loading" class="load" :style="{backgroundImage: 'linear-gradient(to right, #6FB737, #6FB737 '+v.load+'%, #F2F2F2 '+v.load+'%, #F2F2F2 100%)'}"></div>
                        </div>
                      </div>
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
            <li @click="msgOpenFile()"><i class="ui ui_folder"></i></li>
          </ul>
          <textarea class="wm-msg_area scrollbar" v-model="msgData.content" @input="msgInput()" @paste="msgCtrlV" @keyup.ctrl.enter="msgCtrlEnter()" @keydown.enter.exact="msgSend" :disabled="!state.msg.title" enterkeyhint="send"></textarea>
          <div class="wm-msg_action flex_right">
            <span>按下Ctrl+Enter换行</span>
            <wmButton padding="0 32px" @click="msgSend()">发送</wmButton>
          </div>
        </div>
      </div>
    </wmPopup>
  </div>
  <!-- 图片预览 -->
  <wmImg-view v-model:show="imgView.show" :index="imgView.index" :options="imgView.imgs"></wmImg-view>
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
.wm-msg_ct .history{cursor: pointer; line-height: 48px; text-align: center; color: @Primary; border-radius: 8px;}
.wm-msg_ct .history:hover{background-color: #FFF;}
.wm-msg_ct .time{line-height: 48px; color: #999; text-align: center; font-size: 12px;}
.wm-msg_ct .img{width: 48px; height: 48px; line-height: 48px; text-align: center; background-color: #FFF; border-radius: 4px;}
.wm-msg_ct .img i{font-size: 24px; color: @BaseBorder;}
.wm-msg_ct .content{position: relative; max-width: calc(100% - 30px); border-radius: 4px; color: #000; word-break: break-all;}
.wm-msg_ct .content pre{white-space: pre-wrap;}
.wm-msg_ct .arrow{position: absolute; width: 10px; height: 10px; top: 18px; transform: rotate(45deg);}
.wm-msg_ct .red{position: absolute; width: 8px; height: 8px; top: 20px; background-color: @Danger; border-radius: 50%;}
.wm-msg_ct .msg_left{padding: 10px 0;}
.wm-msg_ct .msg_left .arrow{left: -4px; background-color: #FFF;}
.wm-msg_ct .msg_left .msg_body{margin-left: 10px; width: calc(100% - 116px);}
.wm-msg_ct .msg_right{padding: 10px 0;}
.wm-msg_ct .msg_right .arrow{right: -4px; background-color: #B2E281;}
.wm-msg_ct .msg_right .msg_body{margin-right: 10px; width: calc(100% - 116px);}
/* Msg-Text */
.wm-msg_ct .msg_left .msg_ct{background-color: #FFF; line-height: 24px; padding: 10px 16px;}
.wm-msg_ct .msg_left .msg_ct .red{right: -16px;}
.wm-msg_ct .msg_right .msg_ct{background-color: #B2E281; line-height: 24px; padding: 10px 16px;}
.wm-msg_ct .msg_right .msg_ct .red{left: -16px;}
/* Msg-File */
.wm-msg_ct .file_ct{position: relative; background-color: #FFF;}
.wm-msg_ct .file_ct .img_ct{position: relative; overflow: hidden; border: #FFF 1px solid; border-radius: 4px;}
.wm-msg_ct .file_ct .img_ct img{cursor: pointer; max-width: 360px; max-height: 240px;}
.wm-msg_ct .file_ct .other_ct{position: relative; padding: 10px; background-color: #FFF; display: flex; justify-content: space-between;}
.wm-msg_ct .file_ct .other_ct i{width: 72px; height: 72px; font-size: 48px; color: @IconColor; background-color: #F2F2F2; border-radius: 4px; display: flex; justify-content: center; align-items: center;}
.wm-msg_ct .file_ct .other_ct .text_body{position: relative; padding: 0 10px; max-width: 160px;}
.wm-msg_ct .file_ct .other_ct .text_body h2{line-height: 40px; font-size: 14px;}
.wm-msg_ct .file_ct .other_ct .text_body .text{line-height: 24px; white-space: nowrap;}
.wm-msg_ct .file_ct .other_ct .load{position: absolute; bottom: 0; width: calc(100% - 20px); height: 4px; background-color: #F2F2F2; border-radius: 2px;}
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
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../library/ui';
import Request from '../../library/request';
import Time from '../../library/time';
import Files from '../../library/files';
import Format from '../../library/format';
/* 组件 */
import wmPopup from '../../components/popup/index.vue';
import wmButton from '../../components/form/button/index.vue';
import wmImgView from '../../components/image/view.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},   // 是否显示
});
const emit = defineEmits(['update:show']);
// 状态
const store = useStore();
const state = store.state;
// 变量
const scroll = ref({refreshing: false, loading: false, finished: false});
const msgShow = ref(false);
const more = ref(false);
// 消息
const sea = ref({show:false, key:'', list:<any>[]});
const page = ref({num:1, limit:12});
const msgData = ref({content:''});
// 间隔时间
let msgTime = ref(600);
// 图片预览
const imgView = ref({show: false, index:0, imgs:[]});

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  msgShow.value = val;
  if(val) loadData();
},{ deep: true });
/* 监听-新信息 */
watch(()=>state.msg.readId, (val: number)=>{
  if(val>0) msgRead([val], false);
  msgToBottom(1000);
  state.msg.readId = 0;
},{ deep: true });

/* 创建完成 */
onMounted(()=>{
  loadData();
});

/* 搜索 */
const serachVal = (): void => {
  const key: string = sea.value.key.trim();
  if(key) {
    sea.value.show = true;
    Request.Post('msg/sea?lang='+state.lang, {
      token: state.token,
      key: key,
    }, (res:any)=>{
      const d = res.data;
      if(d.code==0) sea.value.list = d.data;
    });
  } else {
    sea.value.show = false;
    sea.value.list = [];
  }
}
/* 搜索-点击 */
const searchClick = (row: any): void => {
  sea.value.show = false;
  // 已存在
  for(let v of state.msg.group) {
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
    num: 0,
  }
  state.msg.group.unshift(data);
  return msgClick(data);
}

/* 下拉刷新 */
const onRefresh = (): void => {
  page.value.num = 1;
  scroll.value.finished = false;
  state.msg.list = [];
  loadMsg();
}
/* 上拉加载 */
const onLoad = (): void => {
  if(scroll.value.finished ) {
    if(state.msg.list.length>0) return Ui.Toast('已无历史消息!');
    return;
  }
  page.value.num += 1;
  loadMsg();
}

/* 加载数据 */
const loadData = (): void => {
  // 请求
  Request.Post('msg/list', {token: state.token}, (res:any)=>{
    const {code, msg, data} = res.data;
    if(code===0) {
      state.msg.group = data.list;
      state.msg.num = data.num;
    }
  });
}
/* 加载消息 */
const loadMsg = (): void => {
  // 请求
  Request.Post('msg/show', {
    token: state.token,
    gid: state.msg.gid,
    fid: state.msg.fid,
    page: page.value.num,
    limit: page.value.limit,
  }, (res:any)=>{
    const {code, msg, data} = res.data;
    if(code===0) {
      // 数据
      if(data.length>0) {
        state.msg.list.unshift(...data);
        // 标记已读
        let ids: Array<any> = [];
        for(let v of data) {
          if(v.is_new) ids.push(v.id);
        }
        msgRead(ids);
      } else {
        scroll.value.finished = true;
        onLoad();
      }
      // 底部
      if(page.value.num===1) msgToBottom();
    } else return Ui.Toast(msg);
  });
}

/* 消息-点击 */
const msgClick = (row: any): void => {
  state.msg.gid = row.gid;
  state.msg.fid = row.fid;
  state.msg.title = row.title;
  state.msg.img = row.img;
  // 缓存
  msgData.value.content = row.sendContent || '';
  // 刷新
  onRefresh();
}
/* 消息-调转底部 */
const msgToBottom = (time: number=300): void => {
  setTimeout(()=>{
    document.querySelector('#msgBottom')?.scrollIntoView(true);
    state.msg.isBottom = false;
  }, time);
}
/* 消息-标记已读 */
const msgRead = (ids: any=[], isNum: boolean=true): void => {
  if(ids.length==0) return;
  // 扣减数量
  if(isNum) {
    state.msg.num -= ids.length;
    for(let v of state.msg.group) {
      if(v.gid===state.msg.gid && v.fid===state.msg.fid) {
        v.num -= ids.length;
        if(v.num<0) v.num = 0;
      }
    }
  }
  // 提交
  Request.Post('msg/read?lang='+state.lang, {
    token: state.token,
    ids: ids,
  }, (res:any)=>{
    const {code, msg}: any = res.data;
    if(code!==0) Ui.Toast(msg);
  });
}

/* 消息-输入 */
const msgInput = (): void => {
  // 缓存消息
  for(let v of state.msg.group) {
    if(v.gid===state.msg.gid && v.fid===state.msg.fid) v.sendContent = msgData.value.content;
  }
}
/* 消息-换行 */
const msgCtrlEnter = (): void => {
  msgData.value.content += '\n';
}
/* 消息-粘贴图片 */
const msgCtrlV = async (e: any): Promise<void> => {
  const items = e.clipboardData?.items;
  if(!items) return;
  for(const item of items) {
    if (item.type.includes('image')) {
      const blob = item.getAsFile();
      msgUploadFile(blob);
    }
  }
}
/* 消息-拖拽文件 */
const msgDragFile = (e: any): void => {
  e.preventDefault();
  if(!state.msg.title) return ;
  // 获取文件
  const dt = e.dataTransfer;
  const files = dt.files;
  for(let v of files) {
    msgUploadFile(v);
  }
}
/* 消息-打开文件 */
const msgOpenFile = (): void => {
  if(!state.msg.title) return ;
  // 选择文件
  Files.Select({multiple: true, mimeType:[]}, (files:any)=>{
    for(let v of files) msgUploadFile(v);
  }, (err: string)=>{
    Ui.Toast(err);
  });
}
/* 消息-上传文件 */
const msgUploadFile = async (fileObj: any): Promise<void> => {
  // 压缩图片
  const {blob, base64}: any = await imgCompress(fileObj);
  // 获取签名
  Request.Post('msg/oss_sgin?lang='+state.lang, {
    token: state.token,
    filename: fileObj.name,
  }, (res:any)=>{
    const {code, msg, data}: any = res.data;
    if(code!==0) return Ui.Toast(msg);
    // 本地
    const loading: number = Time.TimeMicro();
    const time: string = Time.Date('Y-m-d H:i:s');
    const msgData: any = {
      gid: state.msg.gid,
      fid: parseInt(state.uinfo.uid),
      uid: state.msg.fid,
      is_new: false,
      time: time,
      format: 1,
      title: state.uinfo.name,
      img: state.uinfo.img,
      content: {
        name: fileObj.name,
        type: fileObj.type,
        size: fileObj.size,
        ext: data.ext,
        url: data.host,
        file: data.key,
      },
      loading: loading,
      load: 0,
      base64: base64,
    };
    state.msg.list.push(msgData);
    const k: number = state.msg.list.length-1;
    // 底部
    msgToBottom();
    // 签名直传
    let formData = new FormData();
    formData.append('OSSAccessKeyId', data.accessid);
    formData.append('policy', data.policy);
    formData.append('Signature', data.signature);
    formData.append('key', data.key);
    formData.append('file', blob);
    Request.Post(data.host, formData, (res: any)=>{
      if(res.data) Ui.Toast(res.data);
    }, (e:any)=>{
      Ui.Toast('文件上传失败');
    }, {
      headers: {
        "Content-Type": "multipart/form-data;charset=utf-8"  // 表单方式
      },
      onUploadProgress:(event: any) => {
        let complete = (event.loaded/event.total*100 | 0);
        state.msg.list[k].load = complete;
        // 发送
        if(complete===100) {
          msgData['type'] = 'msg';
          msgData['base64'] = '';
          state.socket.send(JSON.stringify(msgData));
        }
      }
    });
  });
}
/* 消息-下载文件 */
const msgDownload = (file: string, filename: string): void => {
  Files.Down(file, filename);
}
/* 消息-消息 */
const msgImgView = (img: string): void => {
  let i: number = 0;
  let imgs: any = [];
  for (let v of state.msg.list) {
    if (v.format!==1 || !isImgage(v.content.type)) continue;
    if (v.content.url+v.content.file == img) imgView.value.index = i;
    imgs.push({label: v.content.name, value: v.content.url+v.content.file});
    i++;
  }
  imgView.value.show = true;
  imgView.value.imgs = imgs;
}

/* 消息-发送 */
const msgSend = (event: any=null): void => {
  // 禁止换行
  if(event) event.preventDefault();
  if(!state.msg.title || msgData.value.content.trim()=='') return ;
  // 本地
  const loading: number = Time.TimeMicro();
  const time: string = Time.Date('Y-m-d H:i:s');
  const data: any = {
    gid: state.msg.gid,
    fid: parseInt(state.uinfo.uid),
    uid: state.msg.fid,
    is_new: false,
    time: time,
    format: 0,
    title: state.uinfo.name,
    img: state.uinfo.img,
    content: msgData.value.content.trim(),
    loading: loading,
  };
  state.msg.list.push(data);
  // 发送
  if(state.socket) {
    data['type'] = 'msg';
    state.socket.send(JSON.stringify(data));
  }
  // AI助理
  if(state.msg.gid===1) {
    state.msg.list.push({
      fid: state.msg.fid,
      uid: 0,
      format: 0,
      is_new: false,
      time: time,
      title: state.msg.title,
      img: state.msg.img,
      content: '...',
      loading: loading+1,
    });
  }
  // 底部
  msgToBottom();
  // 清空
  msgClear();
}
/* 消息-清空 */
const msgClear = (): void => {
  msgData.value.content = '';
  for(let v of state.msg.group) {
    if(v.gid===state.msg.gid && v.fid===state.msg.fid) v.sendContent = '';
  }
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
  if(t1===t2) return '';
  if(!t1) return Time.FormatTime(t2);
  return Time.TimeSize(t1, t2)>msgTime.value?Time.FormatTime(t2):'';
}

/* 图片-判断 */
const isImgage = (type: string): boolean => {
  const arr: Array<string> = ['image/jpeg', 'image/png', 'image/gif'];
  return arr.includes(type);
}
/* 图片-压缩 */
const imgCompress = (fileObj: any): any => {
  return new Promise((resolve) => {
    // 是否图片
    if(!isImgage(fileObj.type)) return resolve({blob: fileObj, base64: ''});
    // 压缩
    Files.FileToBase64(fileObj, (base64: any)=>{
      Files.ImageCompress(base64, {width:1024, type:fileObj.type}, (imgBase64: any)=>{
        Files.Base64ToFile(imgBase64, fileObj.name, (blob:any)=>{
          return resolve({blob: blob, base64: imgBase64});
        }, (err: string)=>{
          Ui.Toast(err);
        });
      }, (err: string)=>{
        Ui.Toast(err);
      });
    });
  });
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

</script>