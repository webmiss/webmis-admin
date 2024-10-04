<template>
  <div class="file_up" :style="{visibility:infoShow?'inherit':'hidden'}">
    <wm-popup height="100%" width="320px" v-model:show="infoShow" position="right" bgColor="#F2F4F8" @close="close()">
      <div class="file_up_top flex_center">
        <wm-button effect="text" type="primary" padding="0 8px" @click="selectFile()">{{ langs.sys_file_select_file }}</wm-button>
        <span>|</span>
        <wm-button effect="text" type="danger" padding="0 8px" @click="removeAll()" :disabled="this.listData.length==0">{{ langs.clear }}</wm-button>
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
    </wm-popup>
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

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '@/library/ui'
import Request from '@/library/request'
import Files from '@/library/files'
/* 组件 */
import wmPopup from '@/components/popup/index.vue'
import wmButton from '@/components/form/button/index.vue'

@Options({
  components: { wmPopup, wmButton },
  props: {
    show: {type: Boolean, default: false},        // 是否显示
    title: {type: String, default: ''},           // 标题
    data: {type: Object, default: {}},            // 数据
  }
})
export default class ActionUpload extends Vue {
  // 参数
  show!: boolean;
  title!: string;
  data!: any;
  // 状态
  private store: any = useStore();
  state: any = this.store.state;
  // 语言
  langs: any = this.state.langs;
  // 变量
  infoShow: boolean = false;
  listData: Array<any> = [];

  /* 创建成功 */
  created(): void {
    this.$watch('show', (val:boolean)=>{
      this.infoShow = val;
      if(val) this.listData = this.data.files;
    }, { deep: true });
  }

  /* 选择文件 */
  selectFile(): void {
    let k: number = 0;
    Files.Select({multiple:true, mimeType:[]}, (res: any)=>{
      for(let v of res) {
        if(!this.isExist(v.name)){
          k = this.listData.length;
          this.listData.push({path: this.data.path, name: v.name, state: 0, load:0});
          this.upFile(k, v);
        }
      }
    });
  }

  /* 上传文件 */
  upFile(k: number, fileObj: any): void {
    // 表单数据
    let form = new FormData();
    form.append('token', this.state.token);
    form.append('path', this.data.path);
    form.append('file', fileObj);
    // 请求
    Request.Post('sys_file/upload?lang='+this.state.lang, form, (res: any)=>{
      const d: any = res.data;
      if(d.code==0) {
        this.listData[k].state = 1;
        this.$emit('submit', true);
      } else {
        this.listData[k].state = 2;
        this.$emit('submit', false);
      }
    }, ()=>{
      Ui.Toast(this.langs.network_err);
    }, {
      headers: {
        "Content-Type": "multipart/form-data;charset=utf-8"  // 表单方式
      },
      onUploadProgress:(event: any) => {
        let complete = (event.loaded/event.total*100 | 0);
        this.listData[k].load = complete;
      }
    });
  }

  /* 是否存在 */
  isExist(name: string): boolean {
    for(let v of this.listData){
      if(v.name==name) return true;
    }
    return false;
  }

  /* 移除 */
  remove(k: number): void {
    this.listData.splice(k, 1);
  }
  /* 移除全部 */
  removeAll(): void {
    if(this.listData.length==0) return;
    this.listData.splice(0, this.listData.length);
  }

  /* 关闭 */
  close(): void {
    this.$emit('update:show', false);
  }

}
</script>