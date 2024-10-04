<template>
  <wm-dialog v-model:show="infoShow" :title="title || langs.mkdir" width="420px" bottom="40px" @close="close()">
    <wm-main lineHeight="60px">
      <wm-table-form>
        <tr>
          <td class="label">{{ langs.folder }}</td>
          <td>
            <wm-input v-model:value="data.name" maxlength="32"></wm-input>
          </td>
        </tr>
      </wm-table-form>
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
    title: {type: String, default: ''},             // 标题
    data: {type: Object, default: {}},              // 数据
  }
})
export default class ActionMkdir extends Vue {
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
    if(form.name.length<2 || form.name.length>32) return Ui.Toast(this.langs.sys_file_verify_name);
    if((this.$parent as any).isExist(form.name)) return Ui.Toast(this.langs.sys_file_verify_name_exist);
    return form;
  }

  /* 提交 */
  submit(): void {
    // 验证
    const form = this.verify(this.data);
    if(!form) return;
    // 请求
    const load: any = Ui.Loading();
    Request.Post('sys_file/mkdir?lang='+this.state.lang, {
      token: this.state.token,
      path: form.path,
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