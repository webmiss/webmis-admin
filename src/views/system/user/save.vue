<template>
  <wm-dialog v-model:show="infoShow" :title="title" width="720px" bottom="40px" @close="close()">
    <wm-main paddingY="0">
      <wm-tabs :columns="tabs">
        <!-- 帐号信息 -->
        <template #base>
          <wm-table-form>
            <tr>
              <td class="label">状态</td>
              <td colspan="3">
                <wm-switch v-model:value="form.state"></wm-switch>
              </td>
            </tr>
            <tr>
              <td class="label">帐号</td>
              <td>
                <wm-input v-model:value="form.uname" placeholder="用户名\手机号码\邮箱" maxlength="16"></wm-input>
              </td>
              <td class="label">密码</td>
              <td>
                <wm-input v-model:value="form.passwd" placeholder="默认密码" maxlength="32"></wm-input>
              </td>
            </tr>
            <tr>
              <td colspan="4" class="c_info"><b>基本信息</b></td>
            </tr>
            <tr>
              <td class="label">类型</td>
              <td colspan="3">
                <wm-select v-model:value="form.type" :options="selectAll.type"></wm-select>
              </td>
            </tr>
            <tr>
              <td class="label">昵称</td>
              <td>
                <wm-input v-model:value="form.nickname" placeholder="用户昵称" maxlength="16"></wm-input>
              </td>
              <td class="label">姓名</td>
              <td>
                <wm-input v-model:value="form.name" placeholder="真实姓名" maxlength="16"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">部门</td>
              <td>
                <wm-input v-model:value="form.department" placeholder="所在部门" maxlength="16"></wm-input>
              </td>
              <td class="label">职位</td>
              <td>
                <wm-input v-model:value="form.position" placeholder="职务、职称" maxlength="16"></wm-input>
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
        <!-- 帐号信息 End -->
        <!-- 系统角色 -->
        <template #sole>
          <wm-radio v-model:value="form.role" :options="selectAll.role"></wm-radio>
        </template>
        <!-- 系统角色 End -->
         <!-- 私有权限 -->
        <template #perm>
          <wm-tree @update:value="updatePerm" :options="selectAll.perm"></wm-tree>
        </template>
        <!-- 私有权限 End -->
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
import Safety from '@/library/safety';
/* 组件 */
import wmMain from '@/components/container/main.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmSelect from '@/components/form/select/index.vue'
import wmRadio from '@/components/form/radio/index.vue'
import wmSwitch from '@/components/form/switch/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmTabs from '@/components/tabs/index.vue'
import wmTree from '@/components/tree/index.vue'

@Options({
  components: { wmMain, wmDialog, wmInput, wmButton, wmSelect, wmRadio, wmSwitch, wmTableForm, wmTabs, wmTree },
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
    {label: '帐号信息', value: 'base', slot: 'base', checked: true},
    {label: '角色', value: 'sole', slot: 'sole'},
    {label: '私有', value: 'perm', slot: 'perm'},
  ];
  // 数据
  form: any = {id: 0, state: true, uname: '', passwd: '', type: '', nickname: '', name: '', department: '', position: '', remark: '', role: '', perm: ''}
  // 全部分类
  selectAll: any = {type: [], role: [], perm: []};

  /* 创建成功 */
  created(): void {
    this.$watch('show', (val:boolean)=>{
      this.infoShow = val;
      if(val){
        // 默认值
        this.form.id = this.data.id || 0;
        this.form.state = this.data.state || true;
        this.form.uname = this.data.uname || this.data.tel || this.data.email || '';
        this.form.passwd = this.data.passwd || '';
        this.form.nickname = this.data.nickname || '';
        this.form.name = this.data.name || '';
        this.form.department = this.data.department || '';
        this.form.position = this.data.position || '';
        this.form.remark = this.data.remark || '';
        // 类型、角色
        this.form.type = typeof this.data.type!='undefined'?[this.data.type]:'';
        this.form.role = this.data.role || '';
        this.form.perm = this.data.perm || '';
        // 获取权限
        this.getPerm();
      }
    }, { deep: true });
  }
  /* 创建完成 */
  public mounted(): void {
    if(this.state.token){
      this.getSelect();
    }
  }

  /* 获取权限 */
  getPerm(): void {
    Request.Post('sys_user/get_perm', {
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
    if(!Safety.IsRight('uname', form.uname) && !Safety.IsRight('tel', form.uname) && !Safety.IsRight('email', form.uname)) {
      return Ui.Toast('请输入用户名、手机号码、邮箱');
    }
    if(!form.id || form.passwd) {
      if(!Safety.IsRight('passwd', form.passwd)) return Ui.Toast('密码为英文字母开头6～16位');
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
    Request.Post('sys_user/save', {
      token: this.state.token,
      data: form,
    }, (res:any)=>{
      load.clear();
      const d: any = res.data;
      Ui.Toast(d.msg);
      this.$emit('submit', d.code==0);
    });
  }

  /* 选项 */
  getSelect(): void {
    Request.Post('sys_user/get_select', {
      token: this.state.token,
    }, (res:any)=>{
      const d: any = res.data;
      if(d.code==0) {
        this.selectAll.type = d.data.type;
        this.selectAll.role = d.data.role;
        // this.selectAll.perm = [
        //   {label:'首页', value:'1'},
        //   {label:'系统', value:'2', children: [
        //     {label:'系统管理', value:'2:3', children: [
        //       {label:'菜单管理', value:'2:3:5', children: [
        //         {label:'列表', value:'2:3:5:1'},
        //         {label:'更新', value:'2:3:5:2'},
        //         {label:'删除', value:'2:3:5:4'},
        //       ]},
        //       {label:'系统用户', value:'2:3:6', children: [
        //         {label:'列表', value:'2:3:6:1'},
        //         {label:'更新', value:'2:3:6:2'},
        //       ]},
        //     ]},
        //     {label:'基础数据', value:'2:4'},
        //   ]},
        //   {label:'网站', value:'7'},
        // ];
      }
      else Ui.Toast(d.msg);
    });
  }

  /* 关闭 */
  close(): void {
    this.$emit('update:show', false);
  }

}
</script>