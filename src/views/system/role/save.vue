<template>
  <wmDialog v-model:show="infoShow" :title="title" width="640px" bottom="40px" :overflow="tabIndex=='perm'?'hidden auto':'hidden'" @close="close()">
    <wmMain paddingY="0">
      <wmTabs v-model:value="tabIndex" :columns="tabs">
        <!-- 基本信息 -->
        <template #base>
          <wmTableForm>
            <tr>
              <td class="label">{{ langs.status }}</td>
              <td colspan="3">
                <wmSwitch v-model:value="form.status"></wmSwitch>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.name }}</td>
              <td>
                <wmInput v-model:value="form.name" maxlength="16"></wmInput>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.remark }}</td>
              <td colspan="3">
                <wmInput v-model:value="form.remark" type="textarea" :height="'80px'" maxlength="32"></wmInput>
              </td>
            </tr>
          </wmTableForm>
        </template>
        <!-- 基本信息 End -->
         <!-- 权限 -->
        <template #perm>
          <wmTree @update:value="updatePerm" :options="selectAll.perm"></wmTree>
        </template>
        <!-- 权限 End -->
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
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
/* 组件 */
import wmMain from '../../../components/container/main.vue';
import wmDialog from '../../../components/dialog/index.vue';
import wmInput from '../../../components/form/input/index.vue';
import wmButton from '../../../components/form/button/index.vue';
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
  {label: langs.sys_role_perm, value: 'perm', slot: 'perm'},
]);
// 数据
const form = ref({id: 0, status: true, name: '', remark: '', perm: ''});
// 全部分类
const selectAll = ref({perm: <any>[]});

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
  if(val){
    // 默认值
    form.value.id = props.data.id || 0;
    form.value.name = props.data.name || '';
    form.value.status = typeof props.data.status!='undefined'?props.data.status:true;
    form.value.remark = props.data.remark || '';
    // 获取权限
    form.value.perm = props.data.perm || '';
    getPerm();
  }
},{ deep: true });

/* 获取权限 */
const getPerm = (): void => {
  Request.Post('sys_role/get_perm?lang='+state.lang, {
    token: state.token,
    perm: form.value.perm,
  }, (res:any)=>{
    const {code, data}: any = res.data;
    if(code==0) selectAll.value.perm = data;
  });
}
/* 权限-合成 */
const updatePerm = (val: any): void => {
  let perm: any = {};
  let arr: Array<string> = [];
  for(let v of val){
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
  if(form.name.length<2 || form.name.length>16) return Ui.Toast(langs.sys_role_verify_name);
  return form;
}

/* 提交 */
const submit = (): void => {
  // 验证
  const data = verify(form.value);
  if(!data) return;
  // 请求
  const load: any = Ui.Loading();
  Request.Post('sys_role/save?lang='+state.lang, {
    token: state.token,
    data: data,
  }, (res:any)=>{
    load.clear();
    const {code, msg, data}: any = res.data;
    Ui.Toast(msg);
    emit('submit', code==0);
  });
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

</script>