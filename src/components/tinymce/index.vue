<template>
  <editor v-if="show" v-model="content" :init="defInit" :api-key="key"></editor>
</template>

<style lang="less">
.wm-table_form{width: 100%; border-collapse: collapse;}
.wm-table_form td{padding: 4px 8px; height: 32px; line-height: 1; white-space: nowrap; border: #FFF 1px solid;}
.wm-table_form .title td{color: @Minor4; font-weight: bold; font-size: 12px; background-color: #F4F6F8;}
.wm-table_form .label{max-width: 120px; text-align: right; color: @BrandText;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Env from '@/config/Env';
import Editor from '@tinymce/tinymce-vue'
@Options({
  components: { Editor },
  props: {
    value: {type: String, default: ''},                 // 内容
    width: {type: String, default: '100%'},             // 宽
    height: {type: Number, default: 0},                 // 高
    language: {type: String, default: 'zh_CN'},         // 语言
    menubar: {type: Boolean, default: false},           // 菜单
    toolbarSize: {type: String, default: 'small'},      // 工具栏大小
    plugins: {type: String, default: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount'},
    toolbar1: {typp: String, default: 'undo redo | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | table image media | removeformat preview help'},
    upload: {type: Function, default: ()=>{}},          // 上传
  }
})
export default class TableForm extends Vue {

  // 参数
  value!: string;
  width!: string;
  height!: number;
  language!: string;
  menubar!: boolean;
  toolbarSize!: string;
  plugins!: string;
  toolbar1!: string;
  upload!: any;
  // 变量
  show: boolean = false;
  key: string = (Env.tinymce() as any).key;
  content: string = '';
  defInit: any = {};

  /* 创建成功 */
  created(): void {
    this.$watch('value', (val: string)=>{
      this.content = val;
    }, { deep: true });
    this.$watch('content', (val: string)=>{
      this.$emit('update:value', val);
    }, { deep: true });
  }
  /* 创建完成 */
  mounted(): void {
    // 加载组件
    this.show = true;
    this.content = this.value;
    // 配置
    this.defInit = {
      width: this.width,
      height: this.height,
      menubar: this.menubar,
      branding: false,  // 水印
      elementpath: false, // 底部元素路径
      toolbar_items_size: this.toolbarSize,
      content_style: "img {max-width:100%;}",
      plugins: this.plugins,
      toolbar1: this.toolbar1,
      images_upload_handler: this.upload,
    }
    // 语言
    if(this.language) this.defInit.language = this.language;
  }
  
}
</script>