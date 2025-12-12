<template>
  <wmDialog v-model:show="form.show" :title="state.langs.passwd_title" width="420px" bottom="40px" @close="Close()">
    <wmMain>
      <wmTableForm>
        <template v-if="!form.is_vcode">
          <tr>
            <td>
              <wmInput v-model:value="form.uname" disabled maxlength="32" icon="ui ui_user" padding="0 10px 0 40px"></wmInput>
            </td>
          </tr>
          <tr>
            <td>
              <wmInput v-model:value="form.vcode" :placeholder="state.langs.passwd_code_placeholder" maxlength="4" icon="ui ui_safety" padding="0 10px 0 40px" :text="form.text" @textClick="getVcode()"></wmInput>
            </td>
          </tr>
        </template>
        <template v-else>
            <tr>
              <td class="label">{{ state.langs.passwd_new }}</td>
              <td>
                <form onsubmit="return false">
                  <wmInput type="password" v-model:value="form.passwd1" maxlength="16"></wmInput>
                </form>
              </td>
            </tr>
            <tr>
              <td class="label">{{ state.langs.passwd_confirm }}</td>
              <td>
                <form onsubmit="return false">
                  <wmInput type="password" v-model:value="form.passwd2" maxlength="16"></wmInput>
                </form>
              </td>
            </tr>
        </template>
      </wmTableForm>
    </wmMain>
    <template #bottom>
      <wmButton effect="plain" type="primary" height="40px" padding="0 32px" v-if="!form.is_vcode" @click="submitPwd()">{{ state.langs.next }}</wmButton>
      <wmButton effect="plain" type="primary" height="40px" padding="0 32px" v-if="form.is_vcode" @click="form.is_vcode=false">{{ state.langs.prev }}</wmButton>
      <wmButton effect="dark" type="primary" height="40px" padding="0 32px"  v-if="form.is_vcode" @click="submitPwd()">{{ state.langs.confirm }}</wmButton>
    </template>
  </wmDialog>
</template>

<style lang="less" scoped>
.wm-table_form .label{width: 70px;}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../library/ui';
import Safety from '../../library/safety';
import Request from '../../library/request';
/* 组件 */
import wmMain from '../../components/container/main.vue';
import wmDialog from '../../components/dialog/index.vue';
import wmInput from '../../components/form/input/index.vue';
import wmButton from '../../components/form/button/index.vue';
import wmTableForm from '../../components/table/form.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},   // 是否显示
});
const emit = defineEmits(['update:show']);
// 状态
const store = useStore();
const state = store.state;
// 变量
let time: any;
const form = ref({show: false, uname: '', passwd1: '', passwd2: '', is_vcode: false, vcode: '', text: '', num: 60});

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  form.value.show = val;
  if(val){
    // 获取验证码
    form.value.text = state.langs.passwd_code_get;
    // 帐号
    if(state.uinfo.tel) form.value.uname = state.uinfo.tel;
    else if(state.uinfo.email) form.value.uname = state.uinfo.email;
    else if(state.uinfo.uname) form.value.uname = state.uinfo.uname;
  }
},{ deep: true });

/* 获取验证码 */
const getVcode = (): void => {
  if(form.value.num!=60) return;
  // 类型
  let type: string='';
  if(Safety.IsRight('tel', form.value.uname)) type='tel';
  else if(Safety.IsRight('email', form.value.uname)) type='email';
  else return Ui.Toast(state.langs.passwd_verify_null);
  // 获取验证码
  const load: any = Ui.Loading();
  Request.Post('user/get_vcode?lang='+state.lang, {type: type, uname:form.value.uname}, (res:any)=>{
    load.clear();
    const {code, msg, data}: any = res.data;
    if(code==0){
      vcodeTime();
      form.value.vcode = data.toString();
    }else if(code==4001){
      form.value.num = data;
      vcodeTime();
    }
    return Ui.Toast(msg);
  });
}
/* 验证码倒计时 */
const vcodeTime = (): void => {
  clearInterval(time);
  time = setInterval(()=>{
    form.value.num--;
    form.value.text = state.langs.passwd_code_time(form.value.num);
    if(form.value.num<=0){
      clearInterval(time);
      form.value.num = 60;
      form.value.text = state.langs.passwd_code_resend;
    }
  }, 1000);
}

/* 提交 */
const submitPwd = (): void => {
  // 验证码
  if(form.value.vcode.length!=4) return Ui.Toast(state.langs.passwd_verify_code);
  form.value.is_vcode = true;
  // 新密码
  if(!Safety.IsRight('passwd', form.value.passwd1)) return Ui.Toast(state.langs.passwd_verify_passwd1);
  if(form.value.passwd1!==form.value.passwd2) return Ui.Toast(state.langs.passwd_verify_passwd1);
  // 请求
  const load: any = Ui.Loading();
  Request.Post('user/change_passwd?lang='+state.lang, {uname: form.value.uname, passwd: form.value.passwd1, vcode: form.value.vcode}, (res:any)=>{
    load.clear();
    const {code, msg}: any = res.data;
    if(code==0){
      state.isLogin = false;
      Close();
    }else{
      return Ui.Toast(msg);
    }
  });
}

/* 关闭 */
const Close = (): void => {
  form.value.is_vcode = false;
  form.value.vcode = '';
  form.value.passwd1 = '';
  form.value.passwd2 = '';
  emit('update:show', false);
}

</script>