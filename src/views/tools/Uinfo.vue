<template>
  <wmDialog v-model:show="uinfoShow" :title="state.langs.uinfo_title" width="560px" bottom="40px" @close="Close()">
    <wmMain>
      <wmTableForm>
        <tr>
          <td class="label">{{ state.langs.uinfo_nickname }}</td>
          <td colspan="2">
            <wmInput v-model:value="form.nickname" :placeholder="state.langs.uinfo_nickname_placeholder" maxlength="16"></wmInput>
          </td>
        </tr>
        <tr>
          <td class="label">{{ state.langs.uinfo_name }}</td>
          <td>
            <wmInput v-model:value="form.name" maxlength="16" disabled></wmInput>
          </td>
          <td>
            <wmRadio v-model:value="form.gender" :options="genderData"></wmRadio>
          </td>
        </tr>
        <tr>
          <td class="label">{{ state.langs.uinfo_birthday }}</td>
          <td colspan="2">
            <wmDatePicker v-model:value="form.birthday" :maxDate="maxDate"></wmDatePicker>
          </td>
        </tr>
        <tr>
          <td class="label">{{ state.langs.uinfo_department }}</td>
          <td colspan="2">
            <wmInput v-model:value="form.department" maxlength="16"></wmInput>
          </td>
        </tr>
        <tr>
          <td class="label">{{ state.langs.uinfo_position }}</td>
          <td colspan="2">
            <wmInput v-model:value="form.position" maxlength="16"></wmInput>
          </td>
        </tr>
      </wmTableForm>
    </wmMain>
    <template #bottom>
      <wmButton height="40px" padding="0 32px" @click="subUinfo()">{{ state.langs.confirm }}</wmButton>
    </template>
  </wmDialog>
</template>

<style lang="less" scoped>
.wm-table_form .label{width: 60px;}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../library/ui';
import Request from '../../library/request';
import Time from '../../library/time';
/* 组件 */
import wmMain from '../../components/container/main.vue';
import wmDialog from '../../components/dialog/index.vue';
import wmInput from '../../components/form/input/index.vue';
import wmButton from '../../components/form/button/index.vue';
import wmTableForm from '../../components/table/form.vue';
import wmRadio from '../../components/form/radio/index.vue';
import wmDatePicker from '../../components/datepicker/index.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},   // 是否显示
});
const emit = defineEmits(['update:show']);
// 状态
const store = useStore();
const state = store.state;
// 变量
let uinfoShow: boolean = false;
const form = ref({nickname: '', name: '', gender: '', birthday: '', department:'', position:''});
let maxDate: string = Time.Date('Y/m/d');
let genderData: Array<any> = [];

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  uinfoShow = val;
  if(val) {
    // 默认值
    const uinfo: any = state.uinfo;
    form.value.nickname = uinfo.nickname || '';
    form.value.name = uinfo.name || '';
    form.value.birthday = uinfo.birthday&&uinfo.birthday!='1970-01-01'?uinfo.birthday:Time.Date('Y/m/d');
    form.value.department = uinfo.department || '';
    form.value.position = uinfo.position || '';
    // 性别
    form.value.gender = uinfo.gender || '';
    genderData = [
      {label: state.langs.null, value: ''},
      {label: state.langs.uinfo_gender_boy, value: '男'},
      {label: state.langs.uinfo_gender_girl, value: '女'},
    ];
  }
},{ deep: true });

/* 提交 */
const subUinfo = (): void => {
  Close();
  // 请求
  const load: any = Ui.Loading();
  Request.Post('user/change_uinfo?lang='+state.lang, {token: state.token, uinfo: form}, (res:any)=>{
    load.clear();
    const {code, msg}: any = res.data;
    if(code==0) {
      state.uinfo.nickname = form.value.nickname;
      state.uinfo.name = form.value.name;
      state.uinfo.gender = form.value.gender;
      state.uinfo.birthday = form.value.birthday;
      state.uinfo.department = form.value.department;
      state.uinfo.position = form.value.position;
    }
    Ui.Toast(msg);
  });
}

/* 关闭 */
const Close = (): void => {
  emit('update:show', false);
}

</script>