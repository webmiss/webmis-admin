<template>
  <!-- Total -->
  <wm-total :time="total.time" @refresh="loadData()">
    <span v-html="langs.sys_file_total(list.data.dirNum, list.data.fileNum, list.data.size)"></span>
  </wm-total>
  <!-- Action -->
  <div class="app_action flex">
    <div class="flex">
      <wm-button effect="text" type="primary" padding="0 8px" v-if="list.path=='/'" disabled>{{ langs.sys_file_rootdir }}</wm-button>
      <wm-button effect="text" type="primary" padding="0 8px" v-else @click="backDir()">{{ langs.sys_file_back }}</wm-button>
      <span class="line">|</span>
      <wm-button effect="text" type="primary" padding="0 8px" v-if="!list.check" @click="selectAll(true)">{{ langs.select_all }}</wm-button>
      <wm-button effect="text" type="primary" padding="0 8px" v-else @click="selectAll(false)">{{ langs.select_not }}</wm-button>
      <span class="line">|</span>
      <span class="text">{{ list.path }}</span>
    </div>
    <div class="flex">
      <wm-button icon="ui ui_add" padding="0 16px 0 8px" @click="mkdirData()">{{ langs.mkdir }}</wm-button>
      <wm-button icon="ui ui_edit" padding="0 16px 0 8px" @click="renameData()">{{ langs.rename }}</wm-button>
      <wm-button effect="plain" type="danger" icon="ui ui_del" padding="0 16px 0 8px" @click="removeData()">{{ langs.del }}</wm-button>
      <span class="line">|</span>
      <wm-button effect="dark" type="primary" icon="ui ui_upload" padding="0 16px 0 8px" @click="uploadData()">{{ langs.upload }}</wm-button>
    </div>
  </div>
  <!-- Action End -->
  <!-- Content -->
  <div class="app_ct none_search file_body scrollbar">
    <ul class="flex_left" v-if="list.data.folder.length!=0 || list.data.files.length!=0">
      <!-- 文件夹 -->
      <li v-for="(v,k) in list.data.folder" :key="'dir'+k" :class="v.check?'file_active':'file_state'">
        <div class="file_center">
          <div class="file_click" @click="v.check=!v.check"><i class="check"></i></div>
          <div class="file">
            <div class="file_ct" @click="openFolder(v.name)">
              <i class="ui ui_folder"></i>
            </div>
            <div class="name nowrap" :title="v.name">{{ v.name }}</div>
          </div>
        </div>
      </li>
      <!-- 文件 -->
      <li v-for="(v,k) in list.data.files" :key="'file'+k" :class="v.check?'file_active':'file_state'">
        <div class="file_center">
          <div class="file_click" @click="v.check=!v.check"><i class="check"></i></div>
          <div class="file">
            <div class="file_ct" @click="openFile(v.name)">
              <div class="file_img bgImg" v-if="isImg(v.ext)" :style="{backgroundImage:'url('+list.url+list.data.path+v.name+')'}"></div>
              <i class="ui ui_file" v-else></i>
            </div>
            <div class="name nowrap" :title="v.name">{{ v.name }}</div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="null"></div>
  </div>

  <!-- 新建文件夹 -->
  <action-mkdir v-model:show="mkdir.show" :data="mkdir.data" @submit="mkdirSubmit($event)"></action-mkdir>
  <!-- 重命名 -->
  <action-rename v-model:show="rename.show" :data="rename.data" @submit="renameSubmit($event)"></action-rename>
  <!-- 删除 -->
  <action-remove v-model:show="remove.show" :data="remove.data" @submit="removeSubmit($event)"></action-remove>
  <!-- 下载 -->
  <action-down v-model:show="down.show" :data="down.data" @submit="downSubmit($event)"></action-down>
  <!-- 上传 -->
  <action-upload v-model:show="upload.show" :data="upload.data" @submit="uploadSubmit($event)"></action-upload>
  <!-- 图片预览 -->
  <wmImgView v-model:show="imgView.show" :index="imgView.index" :options="imgView.imgs"></wmImgView>

</template>

<style lang="less" scoped>
/* 列表 */
.file_body{overflow-y: auto;}
.file_body ul{overflow: hidden; width: 100%;}
.file_body li{width: calc(100% / 12); box-sizing: border-box; padding: 5px 16px;}
.file_center{position: relative; width: 128px; margin: 0 auto;}
.file{width: 128px; height: 128px; border: #FFF 1px solid; border-radius: 5px;}
.file:hover{background-color: #F2F4F6;}
.file .name{line-height: 24px; text-align: center; padding: 8px 5px;}
/* 选择 */
.check{position: absolute; left: 6px; top: 6px; width: 18px; height: 18px; background-color: #24292E; border-radius: 50%;}
.check:after{content: ""; position: absolute; width: 4px; height: 6px; border: 2px solid #fff; border-left: 0; border-top: 0; left: 6px; top: 4px; transform-origin: center; transform: rotate(45deg) scaleY(1);}
.file_click{position: absolute; z-index: 10; opacity: 0; color: @Minor; width: 32px; height: 32px; line-height: 32px; font-size: 20px; text-align: center;}
.file_state:hover .file_click{opacity: 0.7;}
.file_active .file_click{opacity: 1;}
.file_active .file_click .check{background-color: @Minor;}
.file_active:hover .file_click{opacity: 1;}
.file_active .file{border-color: @Minor; background-color: #F2F4F6;}
/* 文件夹 */
.file_ct{cursor: pointer; width: 100%; height: 84px; line-height: 84px; text-align: center;}
.file_ct .ui{font-size: 64px; color: #A9B9C6;}
.file_ct .ui_folder{color: #FFD65D;}
.file_ct .ui_folder{color: #FFD65D;}
.folder_null{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); color: #999;}
/* 图片 */
.file_img{width: 100%; height: 100%; background-color: #F2F4F6;}
.file_img.bgImg{background-size: contain;}
/* 响应式布局 */
@media screen and ( max-width: 1920px ){
  .file_body li{width: calc(100% / 9);}
}
@media screen and ( max-width: 1600px ){
  .file_body li{width: calc(100% / 8);}
}
@media screen and ( max-width: 1366px ){
  .file_body li{width: calc(100% / 7);}
}
@media screen and ( max-width: 1280px ){
  .file_body li{width: calc(100% / 6);}
}
@media screen and ( max-width: 1024px ){
  .file_body li{width: calc(100% / 5);}
}
@media screen and ( max-width: 640px ){
  .file_body li{width: calc(100% / 4);}
}
@media screen and ( max-width: 320px ){
  .file_body li{width: calc(100% / 3);}
}
</style>

<script setup lang="ts">
import { ref, onMounted, onActivated } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Ui from '../../../library/ui'
import Request from '../../../library/request'
/* 组件 */
import wmButton from '../../../components/form/button/index.vue'
import wmImgView from '../../../components/image/view.vue'
/* 动作 */
import wmTotal from '../../tools/Total.vue'
import actionMkdir from './mkdir.vue'
import actionRename from './rename.vue'
import actionRemove from './remove.vue'
import actionDown from './down.vue'
import actionUpload from './upload.vue'

// 是否加载
const isLoad = ref(false);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
// 列表
const total = ref({time: '', list: {}});
const list = ref({url: '', path: '/', check: false, data: {path:'', dirNum: 0, fileNum: 0, size: 0, folder: <any>[], files: <any>[]}});
// 新建文件夹、重命名、删除、下载、上传
const mkdir = ref({show: false, data:{path: '', name: ''}});
const rename = ref({show: false, data:{path: '', name: '', rename: ''}});
const remove = ref({show: false, data:{path: '', names: []}});
const down = ref({show: false, data:{path: '', filename: ''}});
const upload = ref({show: false, data:{url: '', path: '', files: []}});
  // 图片预览
const imgView = ref({show: false, imgs: <any>[], index: 0});

/* 创建完成 */
onMounted(()=>{
  isLoad.value = true;
});
onActivated(()=>{
  if(isLoad) loadData();
});

/* 加载数据 */
const loadData = (): void => {
  // 请求
  const load: any = Ui.Loading();
  Request.Post('sys_file/list?lang='+state.lang, {
    token: state.token,
    path: list.value.path,
  }, (res:any)=>{
    load.clear();
    const {code, msg, time, data}: any = res.data;
    if(code==0) {
      total.value.time = time;
      list.value.check = false;
      list.value.url = data.url;
      list.value.data = data.list;
    } else {
      Ui.Toast(msg);
    }
  });
}

/* 全选/不选 */
const selectAll = (check: boolean): void => {
  list.value.check = check;
  // 文件夹
  const folder = list.value.data.folder;
  for(let i in folder) folder[i].check=check;
  // 文件
  const files = list.value.data.files;
  for(let i in files) files[i].check=check;
}

/* 返回上级 */
const backDir = (): void => {
  const data: any = list.value.path.split("/").filter((d: any)=>d);
  if(data.length<=1){
    list.value.path = '/';
  }else{
    list.value.path = '/';
    for(let i=0; i<data.length-1; i++){
      list.value.path += data[i]+'/';
    }
  }
  // 加载数据
  loadData();
}

/* 打开文件夹 */
const openFolder = (name: string): void => {
  list.value.path += name+'/';
  // 加载数据
  loadData();
}

/* 打开文件 */
const openFile = (filename: string): void => {
  const ext = getExt(filename);
  // 下载
  if(!isImg(ext)) {
    down.value.show = true;
    down.value.data = {path: list.value.path, filename: filename};
    return ;
  }
  // 图片
  let index: number = 0;
  let imgs: Array<any> = [];
  let i: number = 0;
  for(let v of list.value.data.files) {
    if(isImg(v.ext)) {
      if(filename==v.name) index=i;
      imgs.push({
        label: v.name,
        value: list.value.url+list.value.path+v.name,
        size: v.size,
      });
      i++;
    }
  }
  // 预览
  if(imgs.length>0) {
    imgView.value.show = true;
    imgView.value.index = index;
    imgView.value.imgs = imgs;
  }
}

/* 新建文件夹 */
const mkdirData = (): void => {
  mkdir.value.show = true;
  mkdir.value.data.path = list.value.path;
}
/* 新建文件夹-回调 */
const mkdirSubmit = (val: boolean): void => {
  if(!val) return;
  mkdir.value.show = false;
  loadData();
}

/* 重命名 */
const renameData = (): void => {
  // 文件名
  const names: any = getCheckName();
  if(!names) return Ui.Toast(langs.select);
  // 数据
  rename.value.show = true;
  rename.value.data.path = list.value.path;
  rename.value.data.name = names[0];
  rename.value.data.rename = names[0];
}
/* 重命名-回调 */
const renameSubmit = (val: boolean): void => {
  if(!val) return;
  rename.value.show = false;
  loadData();
}

/* 删除 */
const removeData = (): void => {
  // 文件名
  const names: any = getCheckName();
  if(!names) return Ui.Toast(langs.select);
  // 数据
  remove.value.show = true;
  remove.value.data.path = list.value.path;
  remove.value.data.names = names;
}
/* 删除-回调 */
const removeSubmit = (val: boolean): void => {
  if(!val) return;
  remove.value.show = false;
  loadData();
}

/* 下载-回调 */
const downSubmit = (val: boolean): void => {
  if(!val) return;
  down.value.show = false;
  loadData();
}

/* 上传 */
const uploadData = (): void => {
  // 数据
  upload.value.show = true;
  upload.value.data.url = list.value.url;
  upload.value.data.path = list.value.path;
}
/* 上传-回调 */
const uploadSubmit = (val: boolean): void => {
  if(!val) return;
  loadData();
}

/* 获取后缀 */
const getExt = (filename: string): string => {
  const index1 = filename.lastIndexOf('.')+1;
  const index2 = filename.length;
  return filename.substring(index1,index2);
}

/* 获取选中 */
const getCheckName = (): Array<any> | boolean => {
  let name: any = [];
  // 文件夹
  for(let v of list.value.data.folder) if(v.check) name.push(v.name);
  // 文件
  for(let v of list.value.data.files) if(v.check) name.push(v.name);
  // 返回
  return name.length>0?name:false;
}

/* 是否图片 */
const isImg = (ext: string): boolean => {
  const arr = ['png','jpg','jpeg','gif','svg'];
  const index = arr.indexOf(ext);
  return index>=0?true:false;
}

/* 是否存在 */
const isExist = (name: string): boolean => {
  // 文件夹
  for(let v of list.value.data.folder){
    if(v.name==name) return true;
  }
  // 文件
  for(let v of list.value.data.files){
    if(v.name==name) return true;
  }
  return false;
}

</script>