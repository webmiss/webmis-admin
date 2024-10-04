<template>
  <wm-dialog v-model:show="infoShow" :title="title || langs.export" width="360px" bottom="40px" @close="close()">
    <wm-main lineHeight="60px">
      <span v-html="langs.export_warn(num)"></span>
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
    num: {type: Number, default: 0},            // 数量
    data: {type: Object, default: {}},          // 数据
    order: {type: String, default: ''},         // 排序
  }
})
export default class ActionExport extends Vue {
  // 参数
  show!: boolean;
  title!: string;
  num!: number;
  data!: any;
  order!: string;
  // 状态
  private store: any = useStore();
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
    Request.Post('sys_menus/export?lang='+this.state.lang, {
      token: this.state.token,
      data: this.data,
      order: this.order,
    }, (res:any)=>{
      load.clear();
      const d: any = res.data;
      Ui.Toast(d.msg);
      if(d.code==0){
        Files.Down(d.data.path+d.data.filename, d.data.filename);
      }
      // 事件
      this.$emit('submit', d.code==0);
    });
  }

  /* 关闭 */
  close(): void {
    this.$emit('update:show', false);
  }

}
</script>
