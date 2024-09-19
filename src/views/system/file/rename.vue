<template>
  <wm-dialog v-model:show="infoShow" :title="title" width="420px" bottom="40px" @close="close()">
    <wm-main lineHeight="60px">
      <wm-table-form>
        <tr>
          <td class="label">名称</td>
          <td>
            <wm-input v-model:value="data.name" placeholder="文件夹名称" maxlength="32"></wm-input>
          </td>
        </tr>
      </wm-table-form>
    </wm-main>
    <template #bottom>
      <wm-button height="40px" padding="0 32px" @click="submit()">确 认</wm-button>
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
import wmTableForm from '@/components/table/form.vue'
import wmInput from '@/components/form/input/index.vue'

@Options({
  components: { wmMain, wmDialog, wmButton, wmTableForm, wmInput },
  props: {
    show: {type: Boolean, default: false},          // 是否显示
    title: {type: String, default: '重命名'},       // 标题
    data: {type: Object, default: {}},              // 数据
  }
})
export default class ActionRename extends Vue {
  // 参数
  show!: boolean;
  title!: string;
  data!: any;
  // 状态
  store: any = useStore();
  state: any = this.store.state;
  // 变量
  infoShow: boolean = false;
  // 数据
  form: any = {path: '', name: ''}

  /* 创建成功 */
  created(): void {
    this.$watch('show', (val:boolean)=>{
      this.infoShow = val;
    }, { deep: true });
  }

  /* 验证 */
  verify(form: any): any {
    if(form.name.length<2 || form.name.length>32) return Ui.Toast('文件夹名称2～32字符');
    if((this.$parent as any).isExist(form.name)) return Ui.Toast('文件夹已存在');
    return form;
  }

  /* 提交 */
  submit(): void {
    // 验证
    const form = this.verify(this.data);
    if(!form) return;
    // 请求
    const load: any = Ui.Loading();
    Request.Post('sys_file/rename', {
      token: this.state.token,
      path: form.path,
      rename: form.rename,
      name: form.name,
    }, (res:any)=>{
      load.clear();
      const d: any=res.data;
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