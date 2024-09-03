<template>
  <wm-dialog v-model:show="infoShow" :title="title" width="641px" bottom="32px" @close="close()">
    <wm-main>
      <wm-tabs :columns="tabs">
        <!-- 基本信息 -->
        <template #base>
          <wm-table-form>
            <tr>
              <td class="label">所属</td>
              <td colspan="3">
                <wm-cascader v-model:value="form.fid" :options="menusAll" bodyMinWidth="168px" clearable></wm-cascader>
              </td>
            </tr>
            <tr>
              <td class="label">菜单名称</td>
              <td>
                <wm-input v-model:value="form.title" placeholder="菜单名称" maxlength="16"></wm-input>
              </td>
              <td class="label">英文名</td>
              <td>
                <wm-input v-model:value="form.en" placeholder="英文名称" maxlength="16"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">前端路由</td>
              <td colspan="3">
                <wm-input v-model:value="form.url" placeholder="前端路由地址" maxlength="32"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">接口地址</td>
              <td colspan="3">
                <wm-input v-model:value="form.controller" placeholder="接口地址" maxlength="32"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">图标</td>
              <td>
                <wm-input v-model:value="form.ico" placeholder="字体图标" maxlength="32"></wm-input>
              </td>
              <td class="label">排序</td>
              <td>
                <wm-input v-model:value="form.sort" placeholder="排序, 如: 0, 1, 2" maxlength="32"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">备注</td>
              <td colspan="3">
                <wm-input v-model:value="form.controller" type="textarea" :height="'80px'" placeholder="备注信息" maxlength="32"></wm-input>
              </td>
            </tr>
          </wm-table-form>
        </template>
        <!-- 基本信息 End -->
        <!-- 动作菜单 -->
        <template #action>
          <wm-table-form>
            <tr class="title">
              <td>名称</td>
              <td>动作</td>
              <td>权限</td>
              <td class="action">
                <wm-button effect="text" type="primary" @click="actionAdd()">添加</wm-button>
              </td>
            </tr>
            <tr v-for="(v,k) in form.action" :key="k">
              <td>
                <wm-input v-model:value="v.name" maxlength="32"></wm-input>
              </td>
              <td>
                <wm-input v-model:value="v.action" maxlength="32"></wm-input>
              </td>
              <td>
                <wm-input v-model:value="v.perm" maxlength="32"></wm-input>
              </td>
              <td class="action">
                <wm-button effect="text" type="danger" @click="actionRemove(k)">移除</wm-button>
              </td>
            </tr>
          </wm-table-form>
        </template>
        <!-- 动作菜单 End -->
      </wm-tabs>
    </wm-main>
    <template #bottom>
      <wm-button effect="dark" type="primary" @click="submit()">确 认</wm-button>
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
import Time from '@/library/time'
/* 组件 */
import wmMain from '@/components/container/main.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmCascader from '@/components/form/cascader/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmTabs from '@/components/tabs/index.vue'

@Options({
  components: { wmMain, wmDialog, wmInput, wmButton, wmCascader, wmTableForm, wmTabs },
  props: {
    show: {type: Boolean, default: false},        // 是否显示
    title: {type: String, default: '添加菜单'},   // 标题
  }
})
export default class MenusAdd extends Vue {
  // 参数
  show!: boolean;
  title!: string;
  // 状态
  store: any = useStore();
  state: any = this.store.state;
  // 变量
  infoShow: boolean = false;
  tabs: Array<any> = [
    {label: '基本信息', value: 'base', slot: 'base', checked: true},
    {label: '动作菜单', value: 'action', slot: 'action'},
  ];
  form: any = {fid: [], title: '', en: '', ico: '', sort: 0, url: '', controller: '', action:[], remark:''}
  menusAll: any = [
  {label:'一级菜单', value:'m1', checked: false, children: [
    {label:'二级菜单 1-1', value:'m1_1', checked: false},
    {label:'二级菜单 1-2', value:'m1_2', checked: false, children:[
      {label:'三级菜单 1-2-1', value:'m1_2_1', checked: false},
      {label:'三级菜单 1-2-2', value:'m1_2_2', checked: false},
    ]},
  ]},
  {label:'一级菜单', value:'m2', checked: false, children:[
    {label:'二级菜单 2-1', value:'m2_1', checked: false},
    {label:'二级菜单 2-2', value:'m2_2', checked: false},
  ]},
  ];

  /* 创建成功 */
  created(): void {
    this.$watch('show', (val:boolean)=>{
      this.infoShow = val;
    }, { deep: true });
  }
  /* 创建完成 */
  public mounted(): void {
    this.form.fid = ['m2', 'm2_2'];
  }

  /* 动作菜单-添加 */
  actionAdd(): void {
    const action: Array<any> = this.form.action;
    if(action.length>0) action.push({name:'', action:'', perm:action[action.length-1].perm*2});
    else this.form.action = [{name:'', action:'', perm:1}];
  }
  /* 动作菜单-移除 */
  actionRemove(k: number): void {
    const action: Array<any> = this.form.action;
      action.splice(k, 1);
  }

  /* 关闭 */
  close(): void {
    this.$emit('update:show', false);
  }

  /* 验证 */
  verify(form: any): any {
    if(!form.title || form.title.length<2) return Ui.Toast('名称大于2个字符');
    return form;
  }

  /* 提交 */
  submit(): void {
    // 验证
    const form = this.verify(this.form);
    if(!form) return;
    console.log(form);
  }

}
</script>