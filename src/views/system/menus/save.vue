<template>
  <wm-dialog v-model:show="infoShow" :title="title" width="720px" bottom="40px" :overflow="tabIndex=='action'?'hidden auto':'hidden'" @close="close()">
    <wm-main>
      <wm-tabs v-model:value="tabIndex" :columns="tabs">
        <!-- 基本信息 -->
        <template #base>
          <wm-table-form>
            <tr>
              <td class="label">归属</td>
              <td colspan="3">
                <wm-cascader v-model:value="form.fid" :options="menusAll" clearable></wm-cascader>
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
                <wm-input v-model:value="form.remark" type="textarea" :height="'80px'" placeholder="备注信息" maxlength="32"></wm-input>
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
      <wm-button height="40px" padding="0 32px" @click="submit()">确 认</wm-button>
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
import wmCascader from '@/components/form/cascader/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmTabs from '@/components/tabs/index.vue'

@Options({
  components: { wmMain, wmDialog, wmInput, wmButton, wmCascader, wmTableForm, wmTabs },
  props: {
    show: {type: Boolean, default: false},        // 是否显示
    title: {type: String, default: ''},           // 标题
    data: {default: []},                          // 数据
  }
})
export default class ActionSave extends Vue {
  // 参数
  show!: boolean;
  type!: string;
  title!: string;
  data!: any;
  // 状态
  store: any = useStore();
  state: any = this.store.state;
  // 变量
  infoShow: boolean = false;
  // Tabs
  tabIndex: string = 'base';
  tabs: Array<any> = [
    {label: '基本信息', value: 'base', slot: 'base'},
    {label: '动作菜单', value: 'action', slot: 'action'},
  ];
  // 数据
  form: any = {id:0, fid: [], title: '', en: '', ico: '', sort: 0, url: '', controller: '', remark:'', action:[]}
  // 全部分类
  fid: Array<any> = [];
  menusAll: any = [];

  /* 创建成功 */
  created(): void {
    this.$watch('show', (val:boolean)=>{
      this.infoShow = val;
      if(val) {
        // 默认值
        this.form.id = this.data.id || 0;
        this.form.title = this.data.title || '';
        this.form.en = this.data.en || '';
        this.form.ico = this.data.ico || '';
        this.form.sort = this.data.sort || 0;
        this.form.url = this.data.url || '';
        this.form.controller = this.data.controller || '';
        this.form.remark = this.data.remark || '';
        this.form.action = this.data.action || [];
        // Fid
        if(typeof this.data.fid != 'undefined') this.getFid(this.data.fid);
        else this.form.fid = [];
      }
    }, { deep: true });
  }
  /* 创建完成 */
  public mounted(): void {
    if(this.state.token){
      this.getMenus();
    }
  }

  /* 获取Fid */
  private getFid(fid: number): void {
    // 一级
    for(let v1 of this.menusAll) {
          if(v1.value==fid) { this.form.fid = [v1.value]; break; }
          if(!v1.children) continue;
          // 二级
          for(let v2 of v1.children) {
            if(v2.value==fid) { this.form.fid = [v1.value, v2.value]; break; }
            if(!v2.children) continue;
            // 三级
            for(let v3 of v2.children) {
              if(v3.value==fid) { this.form.fid = [v1.value, v2.value, v3.value]; break; }
              if(!v3.children) continue;
              // 四级
              for(let v4 of v3.children) {
                if(v4.value==fid) { this.form.fid = [v1.value, v2.value, v3.value, v4.value]; break; }
              }
            }
          }
        }
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
    // 请求
    const load: any = Ui.Loading();
    Request.Post('sys_menus/save', {
      token: this.state.token,
      data: form,
    }, (res:any)=>{
      load.clear();
      const d: any = res.data;
      Ui.Toast(d.msg);
      if(d.code==0) this.getMenus();
      this.$emit('submit', d.code==0);
    });
  }

  /* 全部菜单 */
  getMenus(): void {
    Request.Post('sys_menus/get_menus_all', {
      token: this.state.token,
    }, (res:any)=>{
      const d: any = res.data;
      if(d.code==0) this.menusAll = d.data;
      else Ui.Toast(d.msg);
    });
  }

  /* 关闭 */
  close(): void {
    this.$emit('update:show', false);
  }

}
</script>