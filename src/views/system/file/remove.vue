<template>
  <wm-dialog v-model:show="infoShow" :title="title" width="360px" bottom="40px" @close="close()">
    <wm-main lineHeight="60px">
      是否确认删除
    </wm-main>
    <template #bottom>
      <wm-button effect="dark" type="danger" height="40px" @click="submit()">确认删除</wm-button>
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
/* 组件 */
import wmMain from '@/components/container/main.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmButton from '@/components/form/button/index.vue'

@Options({
  components: { wmMain, wmDialog, wmButton },
  props: {
    show: {type: Boolean, default: false},        // 是否显示
    title: {type: String, default: '删除'},       // 标题
    data: {type: Object, default: {}},            // 数据
  }
})
export default class ActionRemove extends Vue {
  // 参数
  show!: boolean;
  title!: string;
  data!: any;
  // 状态
  store: any = useStore();
  state: any = this.store.state;
  // 变量
  infoShow: boolean = false;

  /* 创建成功 */
  created(): void {
    this.$watch('show', (val:boolean)=>{
      this.infoShow = val;
    }, { deep: true });
  }

  /* 验证 */
  verify(form: any): any {
    if(form.names.length<1) return Ui.Toast('无删除数据!');
    return form;
  }

  /* 提交 */
  submit(): void {
    // 验证
    const form = this.verify(this.data);
    if(!form) return;
    // 请求
    const load: any = Ui.Loading();
    Request.Post('sys_file/remove', {
      token: this.state.token,
      path: form.path,
      data: form.names,
    }, (res:any)=>{
      load.clear();
      const d: any = res.data;
      Ui.Toast(d.msg);
      this.$emit('submit', d.code==0);
    });
  }

  /* 关闭 */
  close(): void {
    this.$emit('update:show', false);
  }

}
</script>
