<template>
  <wm-dialog v-model:show="infoShow" :title="title" width="720px" bottom="40px" :overflow="tabIndex==('action' || 'langs')?'hidden auto':'hidden'" @close="close()">
    <wm-main>
      <wm-tabs v-model:value="tabIndex" :columns="tabs">
        <!-- 基本信息 -->
        <template #base>
          <wm-table-form>
            <tr>
              <td class="label">{{ langs.status }}</td>
              <td colspan="3">
                <wm-switch v-model:value="form.status"></wm-switch>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_menus_fid }}</td>
              <td colspan="3">
                <wm-cascader v-model:value="form.fid" :options="menusAll" clearable></wm-cascader>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_menus_title }}</td>
              <td>
                <wm-input v-model:value="form.title" maxlength="16"></wm-input>
              </td>
              <td class="label">{{ langs.sys_menus_en }}</td>
              <td>
                <wm-input v-model:value="form.en" maxlength="16"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_menus_url }}</td>
              <td colspan="3">
                <wm-input v-model:value="form.url" maxlength="32"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_menus_controller }}</td>
              <td colspan="3">
                <wm-input v-model:value="form.controller" maxlength="32"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_menus_ico }}</td>
              <td>
                <wm-input v-model:value="form.ico" maxlength="32"></wm-input>
              </td>
              <td class="label">{{ langs.sys_menus_sort }}</td>
              <td>
                <wm-input v-model:value="form.sort" :placeholder="langs.sys_menus_sort_placeholder" maxlength="32"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.remark }}</td>
              <td colspan="3">
                <wm-input v-model:value="form.remark" type="textarea" :height="'80px'" maxlength="32"></wm-input>
              </td>
            </tr>
          </wm-table-form>
        </template>
        <!-- 基本信息 End -->
        <!-- 动作菜单 -->
        <template #action>
          <wm-table-form>
            <tr class="title">
              <td>{{ langs.name }}</td>
              <td>{{ langs.action }}</td>
              <td>{{ langs.sys_menus_perm }}</td>
              <td class="action">
                <wm-button effect="text" type="primary" @click="actionAdd()">{{ langs.add }}</wm-button>
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
                <wm-button effect="text" type="danger" @click="actionRemove(k)">{{ langs.remove }}</wm-button>
              </td>
            </tr>
          </wm-table-form>
        </template>
        <!-- 动作菜单 End -->
        <!-- 语言包 -->
        <template #langs>
          <wm-table-form>
            <tr>
              <td class="label">{{ langs.sys_menus_en_us }}</td>
              <td>
                <wm-input v-model:value="form.en_US" maxlength="32"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_menus_zh_cn }}</td>
              <td>
                <wm-input v-model:value="form.zh_CN" maxlength="32"></wm-input>
              </td>
            </tr>
          </wm-table-form>
        </template>
        <!-- 语言包 End -->
      </wm-tabs>
    </wm-main>
    <template #bottom>
      <wm-button height="40px" padding="0 32px" @click="submit()">{{ langs.confirm }}</wm-button>
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
import wmCascader from '@/components/form/cascader/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmTabs from '@/components/tabs/index.vue'

@Options({
  components: { wmMain, wmDialog, wmInput, wmButton, wmSwitch, wmCascader, wmTableForm, wmTabs },
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
  private store: any = useStore();
  state: any = this.store.state;
  // 语言
  langs: any = this.state.langs;
  // 变量
  infoShow: boolean = false;
  // Tabs
  tabIndex: string = 'base';
  tabs: Array<any> = [
    {label: this.langs.info, value: 'base', slot: 'base'},
    {label: this.langs.action, value: 'action', slot: 'action'},
    {label: this.langs.sys_menus_lang, value: 'langs', slot: 'langs'},
  ];
  // 数据
  form: any = {
    id: 0, fid: [], status: true, title: '', en: '', ico: '', sort: 0, url: '', controller: '', remark:'', action:[],
    en_US: '', zh_CN: '',
  }
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
        this.form.status = typeof this.data.status!='undefined'?this.data.status:true;
        this.form.title = this.data.title || '';
        this.form.en = this.data.en || '';
        this.form.ico = this.data.ico || '';
        this.form.sort = this.data.sort || 0;
        this.form.url = this.data.url || '';
        this.form.controller = this.data.controller || '';
        this.form.remark = this.data.remark || '';
        this.form.action = this.data.action || [];
        this.form.en_US = this.data.en_US || '';
        this.form.zh_CN = this.data.zh_CN || '';
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
    if(form.title.length<2 || form.title.length>32) return Ui.Toast(this.langs.sys_menus_verify_title);
    return form;
  }

  /* 提交 */
  submit(): void {
    // 验证
    const form = this.verify(this.form);
    if(!form) return;
    // 请求
    const load: any = Ui.Loading();
    Request.Post('sys_menus/save?lang='+this.state.lang, {
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
    Request.Post('sys_menus/get_menus_all?lang='+this.state.lang, {
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