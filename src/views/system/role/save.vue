<template>
  <wm-dialog v-model:show="infoShow" :title="title" width="640px" bottom="40px" @close="close()">
    <wm-main paddingY="0">
      <wm-tabs :columns="tabs">
        <!-- 基本信息 -->
        <template #base>
          <wm-table-form>
            <tr>
              <td class="label">状态</td>
              <td colspan="3">
                <wm-switch v-model:value="form.status"></wm-switch>
              </td>
            </tr>
            <tr>
              <td class="label">名称</td>
              <td>
                <wm-input v-model:value="form.name" placeholder="角色名称" maxlength="16"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">备注</td>
              <td colspan="3">
                <wm-input v-model:value="form.remark" type="textarea" :height="'80px'" placeholder="备注信息" maxlength="32"></wm-input>
              </td>
            </tr>
          </wm-table-form>
        </template>
        <!-- 基本信息 End -->
         <!-- 权限 -->
        <template #perm>
          <wm-tree @update:value="updatePerm" :options="selectAll.perm"></wm-tree>
        </template>
        <!-- 权限 End -->
      </wm-tabs>
    </wm-main>
    <template #bottom>
      <wm-button effect="dark" type="primary" height="40px" padding="0 32px" @click="submit()">确 认</wm-button>
    </template>
  </wm-dialog>
</template>

<style lang="less" scoped>
.wm-table_form .label{width: 70px;}
.wm-table_form .action{width: 60px; text-align: center;}
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
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmSwitch from '@/components/form/switch/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmTabs from '@/components/tabs/index.vue'
import wmTree from '@/components/tree/index.vue'

@Options({
  components: { wmMain, wmDialog, wmInput, wmButton, wmSwitch, wmTableForm, wmTabs, wmTree },
  props: {
    show: {type: Boolean, default: false},        // 是否显示
    title: {type: String, default: ''},           // 标题
    data: {default: []},                          // 数据
  }
})
export default class ActionSave extends Vue {
  // 参数
  show!: boolean;
  title!: string;
  data!: any;
  // 状态
  store: any = useStore();
  state: any = this.store.state;
  // 变量
  infoShow: boolean = false;
  // Tabs
  tabs: Array<any> = [
    {label: '基本信息', value: 'base', slot: 'base', checked: true},
    {label: '权限', value: 'perm', slot: 'perm'},
  ];
  // 数据
  form: any = {id: 0, status: true, name: '', remark: '', perm: ''}
  // 全部分类
  selectAll: any = {perm: []};

  /* 创建成功 */
  created(): void {
    this.$watch('show', (val:boolean)=>{
      this.infoShow = val;
      if(val){
        // 默认值
        this.form.id = this.data.id || 0;
        this.form.name = this.data.name || '';
        this.form.status = this.data.status || true;
        this.form.remark = this.data.remark || '';
        // 获取权限
        this.form.perm = this.data.perm || '';
        this.getPerm();
      }
    }, { deep: true });
  }
  /* 创建完成 */
  public mounted(): void {
  }

  /* 获取权限 */
  getPerm(): void {
    Request.Post('sys_role/get_perm', {
      token: this.state.token,
      perm: this.form.perm,
    }, (res:any)=>{
      const d: any = res.data;
      if(d.code==0) this.selectAll.perm = d.data;
    });
    
  }
  /* 权限-合成 */
  updatePerm(val: any): void {
    let perm: any = {};
    let arr: Array<string> = [];
    for(let v of val) {
      arr = v.split(':');
      if(perm[arr[0]]) perm[arr[0]] += parseInt(arr[1]);
      else perm[arr[0]] = parseInt(arr[1]);
    }
    // 字符串
    let str: string = '';
    for(let k in perm) str += k+':'+perm[k].toString()+' ';
    this.form.perm = str.trim();
  }

  /* 验证 */
  verify(form: any): any {
    // 用户名
    if(form.name.length<2) {
      return Ui.Toast('角色名称2～16字符');
    }
    return form;
  }

  /* 提交 */
  submit(): void {
    // 验证
    const form = this.verify(this.form);
    if(!form) return;
    // 请求
    const load: any = Ui.Loading();
    Request.Post('sys_role/save', {
      token: this.state.token,
      data: form,
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