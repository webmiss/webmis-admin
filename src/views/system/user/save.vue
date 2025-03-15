<template>
  <wmDialog v-model:show="infoShow" :title="title" width="720px" bottom="40px" :overflow="tabIndex=='perm'?'hidden auto':'hidden'" @close="close()">
    <wmMain paddingY="0">
      <wmTabs v-model:value="tabIndex" :columns="tabs">
        <!-- 帐号信息 -->
        <template #base>
          <wmTableForm>
            <tr>
              <td class="label">{{ langs.status }}</td>
              <td colspan="3">
                <wmSwitch v-model:value="form.status"></wmSwitch>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_user_uname }}</td>
              <td>
                <wmInput v-model:value="form.uname" :placeholder="langs.sys_user_uname_placeholder" maxlength="16"></wmInput>
              </td>
              <td class="label">{{ langs.sys_user_passwd }}</td>
              <td>
                <wmInput v-model:value="form.passwd" :placeholder="langs.sys_user_passwd_placeholder" maxlength="32"></wmInput>
              </td>
            </tr>
            <tr>
              <td colspan="4" class="c_info"><b>{{ langs.sys_user_base }}</b></td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_user_type }}</td>
              <td colspan="3">
                <wmSelect v-model:value="form.type" :options="selectAll.type_name"></wmSelect>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_user_nickname }}</td>
              <td>
                <wmInput v-model:value="form.nickname" maxlength="16"></wmInput>
              </td>
              <td class="label">{{ langs.sys_user_name }}</td>
              <td>
                <wmInput v-model:value="form.name" maxlength="16"></wmInput>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_user_department }}</td>
              <td>
                <wmInput v-model:value="form.department" maxlength="16"></wmInput>
              </td>
              <td class="label">{{ langs.sys_user_position }}</td>
              <td>
                <wmInput v-model:value="form.position" maxlength="16"></wmInput>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.remark }}</td>
              <td colspan="3">
                <wmInput v-model:value="form.remark" type="textarea" :height="'120px'" maxlength="32"></wmInput>
              </td>
            </tr>
          </wmTableForm>
        </template>
        <!-- 帐号信息 End -->
        <!-- 系统角色 -->
        <template #sole>
          <wmRadio v-model:value="form.role" :options="selectAll.role_name"></wmRadio>
        </template>
        <!-- 系统角色 End -->
         <!-- 私有权限 -->
        <template #perm>
          <wmTree @update:value="updatePerm" :options="selectAll.perm"></wmTree>
        </template>
        <!-- 私有权限 End -->
      </wmTabs>
    </wmMain>
    <template #bottom>
      <wmButton height="40px" padding="0 32px" @click="submit()">{{ langs.confirm }}</wmButton>
    </template>
  </wmDialog>
</template>

<style lang="less" scoped>
.wm-table_form .label{width: 70px;}
.wm-table_form .action{width: 60px; text-align: center;}
</style>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
import Safety from '../../../library/safety';
/* 组件 */
import wmMain from '../../../components/container/main.vue';
import wmDialog from '../../../components/dialog/index.vue';
import wmInput from '../../../components/form/input/index.vue';
import wmButton from '../../../components/form/button/index.vue';
import wmSelect from '../../../components/form/select/index.vue';
import wmRadio from '../../../components/form/radio/index.vue';
import wmSwitch from '../../../components/form/switch/index.vue';
import wmTableForm from '../../../components/table/form.vue';
import wmTabs from '../../../components/tabs/index.vue';
import wmTree from '../../../components/tree/index.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},        // 是否显示
  title: {type: String, default: ''},           // 标题
  data: {type: Object, default: {}},            // 数据
});
const emit = defineEmits(['update:show', 'submit']);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
// 变量
const infoShow = ref(false);
// Tabs
const tabIndex = ref('base');
const tabs = ref([
  {label: langs.info, value: 'base', slot: 'base'},
  {label: langs.sys_user_role, value: 'sole', slot: 'sole'},
  {label: langs.sys_user_perm, value: 'perm', slot: 'perm'},
]);
// 数据
const form = ref({
  id: 0, status: true, uname: '', passwd: '', type: <any>'', role: <any>'', nickname: '', name: '', department: '', position: '', remark: '',
  perm: '',
});
// 全部分类
const selectAll = ref({type_name: <any>[], role_name: <any>[], perm: <any>[]});

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
  if(val){
    // 默认值
    form.value.id = props.data.id || 0;
    form.value.status = typeof props.data.status!='undefined'?props.data.status:true;
    form.value.uname = props.data.uname || props.data.tel || props.data.email || '';
    form.value.passwd = props.data.passwd || '';
    form.value.nickname = props.data.nickname || '';
    form.value.name = props.data.name || '';
    form.value.department = props.data.department || '';
    form.value.position = props.data.position || '';
    form.value.remark = props.data.remark || '';
    // 选项
    getSelect();
    // 类型、角色
    form.value.type = typeof props.data.type!='undefined'?[props.data.type]:[];
    form.value.role = props.data.role || '';
    // 获取权限
    form.value.perm = props.data.perm || '';
    getPerm();
  }
},{ deep: true });

/* 选项 */
const getSelect = (): void => {
  Request.Post('sys_user/get_select?lang='+state.lang, {
    token: state.token,
  }, (res:any)=>{
    const {code, msg, data}: any = res.data;
    if(code==0) {
      selectAll.value.type_name = data.type_name;
      selectAll.value.role_name = data.role_name;
      // 默认值
      nextTick(()=>{
        form.value.type = typeof props.data.type!='undefined'?[parseInt(props.data.type)]:[];
        form.value.role = props.data.role || '';
      });
    } else Ui.Toast(msg);
  });
}

/* 私有权限-获取 */
const getPerm = (): void => {
  Request.Post('sys_user/get_perm?lang='+state.lang, {
    token: state.token,
    perm: form.value.perm,
  }, (res:any)=>{
    const {code, data}: any = res.data;
    if(code==0) selectAll.value.perm = data;
  });
}
/* 私有权限-合成 */
const updatePerm = (val: any): void => {
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
  form.value.perm = str.trim();
}

/* 验证 */
const verify = (form: any): any => {
  // 用户名
  if(!Safety.IsRight('uname', form.uname) && !Safety.IsRight('tel', form.uname) && !Safety.IsRight('email', form.uname)) {
    return Ui.Toast(langs.sys_user_verify_uname);
  }
  if(!form.id || form.passwd) {
    if(!Safety.IsRight('passwd', form.passwd)) return Ui.Toast(langs.sys_user_verify_passwd);
  }
  return form;
}

/* 提交 */
const submit = (): void => {
  // 验证
  const data = verify(form.value);
  if(!data) return;
  // 请求
  const load: any = Ui.Loading();
  Request.Post('sys_user/save?lang='+state.lang, {
    token: state.token,
    data: data,
  }, (res:any)=>{
    load.clear();
    const {code, msg}: any = res.data;
    Ui.Toast(msg);
    emit('submit', code==0);
  });
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

</script>