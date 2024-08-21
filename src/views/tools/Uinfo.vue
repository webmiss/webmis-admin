<template>
  <wm-dialog v-model:show="form.show" title="基本信息" width="480px" bottom="40px" @close="Close()">
    <wm-main>
      <wm-table-form>
        <tr>
          <td class="lable">昵称</td>
          <td>
            <wm-input type="nickname" v-model:value="form.nickname" placeholder="用户昵称" maxlength="16"></wm-input>
          </td>
        </tr>
        <tr>
          <td class="lable">姓名</td>
          <td>
            <wm-input type="nickname" v-model:value="form.nickname" placeholder="真实姓名" maxlength="16" disabled></wm-input>
          </td>
        </tr>
        <tr>
          <td class="lable">部门</td>
          <td>
            <wm-input type="nickname" v-model:value="form.department" placeholder="部门" maxlength="16"></wm-input>
          </td>
        </tr>
        <tr>
          <td class="lable">职位</td>
          <td>
            <wm-input type="nickname" v-model:value="form.position" placeholder="职位" maxlength="16"></wm-input>
          </td>
        </tr>
      </wm-table-form>
    </wm-main>
    <template #bottom>
      <wm-button effect="dark" type="primary">确 认</wm-button>
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
import Safety from '@/library/safety';
import Request from '@/library/request'
/* 组件 */
import wmMain from '@/components/container/main.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmTableForm from '@/components/table/form.vue'

@Options({
  components: { wmMain, wmDialog, wmInput, wmButton, wmTableForm },
  props: {
    show: {type: Boolean, default: false},   // 是否显示
  }
})
export default class Passwd extends Vue {
  // 参数
  show!: boolean;
  // 状态
  store: any = useStore();
  state: any = this.store.state;
  // 变量
  form: any = {show: false, nickname: '', name: '', department:'', position:''}

  /* 创建成功 */
  created(): void {
    // 登录状态
    this.$watch('show', (val:Boolean)=>{
      this.form.show = val;
    }, { deep: true });
  }

  /* 关闭 */
  Close(): void {
    this.$emit('update:show', false);
  }

}
</script>