<template>
  <editor v-if="show" v-model="content" :init="defInit" :api-key="key"></editor>
</template>

<style lang="less">
.wm-table_form{width: 100%; border-collapse: collapse;}
.wm-table_form td{padding: 4px 8px; height: 32px; line-height: 1; white-space: nowrap; border: #FFF 1px solid;}
.wm-table_form .title td{color: @Minor4; font-weight: bold; font-size: 12px; background-color: #F4F6F8;}
.wm-table_form .label{max-width: 120px; text-align: right; color: @BrandText;}
</style>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Env from '../../config/Env';
import Editor from '@tinymce/tinymce-vue';

/* 参数 */
const props = defineProps({
  value: {type: String, default: ''},                 // 内容
  width: {type: String, default: '100%'},             // 宽
  height: {type: Number, default: 0},                 // 高
  language: {type: String, default: 'zh_CN'},         // 语言
  menubar: {type: Boolean, default: false},           // 菜单
  toolbarSize: {type: String, default: 'small'},      // 工具栏大小
  plugins: {type: String, default: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount'},
  toolbar1: {typp: String, default: 'undo redo | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | table image media | removeformat preview help'},
  upload: {type: Function, default: ()=>{}},          // 上传
});
const emit = defineEmits(['update:value']);
// 变量
const show = ref(false);
const key = ref((Env.tinymce() as any).key);
const content = ref('');
const defInit = ref(<any>{});

/* 监听 */
watch(()=>props.value, (val: string)=>{
  content.value = val;
},{ deep: true });
watch(()=>content.value, (val: string)=>{
  emit('update:value', val);
},{ deep: true });

/* 创建完成 */
onMounted(()=>{
  // 加载组件
  show.value = true;
  content.value = props.value;
  // 配置
  defInit.value = {
    width: props.width,
    height: props.height,
    menubar: menubar,
    branding: false,  // 水印
    elementpath: false, // 底部元素路径
    toolbar_items_size: props.toolbarSize,
    content_style: "img {max-width:100%;}",
    plugins: props.plugins,
    toolbar1: props.toolbar1,
    images_upload_handler: props.upload,
  }
  // 语言
  if(props.language) defInit.value.language = props.language;
});

</script>