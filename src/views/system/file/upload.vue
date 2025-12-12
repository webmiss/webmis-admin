<template>
  <div class="file_up" :style="{visibility:infoShow?'inherit':'hidden'}">
    <wmPopup height="100%" width="320px" v-model:show="infoShow" position="right" bgColor="#F2F4F8" @close="close()">
      <div class="file_up_top flex_center">
        <wmButton effect="text" type="primary" padding="0 8px" @click="selectFile()">{{ langs.sys_file_select_file }}</wmButton>
        <span>|</span>
        <wmButton effect="text" type="danger" padding="0 8px" @click="removeAll()" :disabled="listData.length==0">{{ langs.clear }}</wmButton>
      </div>
      <div class="file_up_body scrollbar">
        <ul class="file_up_list" v-if="listData.length>0">
          <li class="flex" v-for="(v,k) in listData" :key="k">
            <div class="load" :style="{width: v.load+'%'}"></div>
            <div class="img">
              <div v-if="v.state==1" :style="{backgroundImage: 'url('+data.url+v.path+v.name+')'}"></div>
              <i v-else class="ui ui_image"></i>
            </div>
            <div class="text nowrap">{{ v.name }}</div>
            <i class="ui close" :class="v.state==1?'ui_close':'ui_more'" title="移除" @click="remove(k)"></i>
          </li>
        </ul>
        <div class="null" v-else></div>
      </div>
    </wmPopup>
  </div>
</template>

<style lang="less" scoped>
.file_up{position: absolute; top: 0; right: 0; width: 100%; height: calc(100% - 0px);}
.file_up_top{height: 50px; line-height: 50px; text-align: center; color: @Minor5; background-color: #FFF;}
.file_up_top span{padding: 0 10px; color: @Minor5;}
.file_up_body{overflow: hidden; overflow-y: auto; height: calc(100% - 50px);}
.file_up_list{overflow: hidden; padding: 0 8px;}
.file_up_list li{overflow: hidden; position: relative; margin: 8px 0; height: 40px; line-height: 40px; background-color: #FFF; border-radius: 4px;}
.file_up_list .load{position: absolute; left: 0; bottom: 0; height: 3px; background-color: @Minor;}
.file_up_list .img{width: 40px; text-align: center;}
.file_up_list .img i{color: @Minor5; font-size: 24px;}
.file_up_list .img div{width: 100%; height: 100%; background-position: center; background-repeat: no-repeat; background-size: cover;}
.file_up_list .text{width: calc(100% - 40px - 40px); padding-left: 8px; border-left: #F2F2F2 1px solid; box-sizing: border-box;}
.file_up_list .close{width: 40px; text-align: center; color: @Minor5;}
.file_up_list .ui_close{cursor: pointer; font-size: 12px;}
.file_up_list .ui_close:hover{color: @Danger; background-color: @Danger6;}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
import Files from '../../../library/files';
/* 组件 */
import wmPopup from '../../../components/popup/index.vue';
import wmButton from '../../../components/form/button/index.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},        // 是否显示
  title: {type: String, default: ''},           // 标题
  data: {type: Object, default: {}},            // 数据
});
const emit = defineEmits(['update:show', 'submit']);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
// 变量
const infoShow = ref(false);
const listData = ref(<any>[]);

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
  if(val) listData.value = props.data.files;
},{ deep: true });

/* 选择文件 */
const selectFile = (): void => {
  let k: number = 0;
  Files.Select({multiple:true, mimeType:[]}, (res: any)=>{
    for(let v of res){
      if(!isExist(v.name)){
        k = listData.value.length;
        listData.value.push({path: props.data.path, name: v.name, state: 0, load:0});
        upFile(k, v);
      }
    }
  });
}

/* 上传文件 */
const upFile = (k: number, fileObj: any): void => {
  // 表单数据
  let form = new FormData();
  form.append('token', state.token);
  form.append('path', props.data.path);
  form.append('file', fileObj);
  // 请求
  Request.Post('sys_file/upload?lang='+state.lang, form, (res: any)=>{
    const {code}: any = res.data;
    if(code==0){
      listData.value[k].state = 1;
      emit('submit', true);
    } else {
      listData.value[k].state = 2;
      emit('submit', false);
    }
  }, (e:any)=>{
    Ui.Toast(langs.network_err);
  }, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8"  // 表单方式
    },
    onUploadProgress:(event: any) => {
      let complete = (event.loaded/event.total*100 | 0);
      listData.value[k].load = complete;
    }
  });
}

/* 是否存在 */
const isExist = (name: string): boolean => {
  for(let v of listData.value){
    if(v.name==name) return true;
  }
  return false;
}

/* 移除 */
const remove = (k: number): void => {
  listData.value.splice(k, 1);
}
/* 移除全部 */
const removeAll = (): void => {
  if(listData.value.length==0) return;
  listData.value.splice(0, listData.value.length);
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

</script>