<template>
  <wm-dialog v-model:show="infoShow" :title="title || langs.download" width="420px" bottom="40px" @close="close()">
    <wm-main lineHeight="60px">
      <b>{{ data.filename }}</b>
    </wm-main>
    <template #bottom>
      <wm-button height="40px" padding="0 32px" @click="submit()">{{ langs.confirm }}</wm-button>
    </template>
  </wm-dialog>
</template>

<style lang="less" scoped>
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '@/library/ui'
import Request from '@/library/request'
import Files from '@/library/files'
/* 组件 */
import wmMain from '@/components/container/main.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmButton from '@/components/form/button/index.vue'

@Options({
  components: { wmMain, wmDialog, wmButton },
  props: {
    show: {type: Boolean, default: false},      // 是否显示
    title: {type: String, default: ''},         // 标题
    data: {type: Object, default: {}},          // 数据
  }
})
export default class ActionDown extends Vue {
  // 参数
  show!: boolean;
  title!: string;
  data!: any;
  // 状态
  store: any = useStore();
  state: any = this.store.state;
  // 语言
  langs: any = this.state.langs;
  // 变量
  infoShow: boolean = false;

  /* 创建成功 */
  created(): void {
    this.$watch('show', (val:boolean)=>{
      this.infoShow = val;
    }, { deep: true });
  }

  /* 提交 */
  submit(): void {
    // 请求
    const load: any = Ui.Loading();
    Request.Post('sys_file/down?lang='+this.state.lang, {
      token: this.state.token,
      path: this.data.path,
      filename: this.data.filename,
    }, (res:any)=>{
      load.clear();
      Files.DownBlob(res.data, this.data.filename);
      // 事件
      this.$emit('submit', true);
    },()=>{
      Ui.Toast(this.langs.network_err);
    },{
      responseType:'blob',
    });
  }

  /* 关闭 */
  close(): void {
    this.$emit('update:show', false);
  }

}
</script>