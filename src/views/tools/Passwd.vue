<template>
  <wm-dialog v-model:show="form.show" :title="state.langs.passwd_title" width="420px" bottom="40px" @close="Close()">
    <wm-main>
      <wm-table-form>
        <template v-if="!form.is_vcode">
          <tr>
            <td>
              <wm-input v-model:value="form.uname" disabled maxlength="32" icon="ui ui_user" padding="0 10px 0 40px"></wm-input>
            </td>
          </tr>
          <tr>
            <td>
              <wm-input v-model:value="form.vcode" :placeholder="state.langs.passwd_code_placeholder" maxlength="4" icon="ui ui_safety" padding="0 10px 0 40px" :text="form.text" @textClick="getVcode()"></wm-input>
            </td>
          </tr>
        </template>
        <template v-else>
            <tr>
              <td class="label">{{ state.langs.passwd_new }}</td>
              <td>
                <form onsubmit="return false">
                  <wm-input type="password" v-model:value="form.passwd1" maxlength="16"></wm-input>
                </form>
              </td>
            </tr>
            <tr>
              <td class="label">{{ state.langs.passwd_confirm }}</td>
              <td>
                <form onsubmit="return false">
                  <wm-input type="password" v-model:value="form.passwd2" maxlength="16"></wm-input>
                </form>
              </td>
            </tr>
        </template>
      </wm-table-form>
    </wm-main>
    <template #bottom>
      <wm-button effect="plain" type="primary" padding="0 32px" v-if="!form.is_vcode" @click="submitPwd()">{{ state.langs.next }}</wm-button>
      <wm-button effect="plain" type="primary" padding="0 32px" v-if="form.is_vcode" @click="form.is_vcode=false">{{ state.langs.prev }}</wm-button>
      <wm-button effect="dark" type="primary" padding="0 32px"  v-if="form.is_vcode" @click="submitPwd()">{{ state.langs.confirm }}</wm-button>
    </template>
  </wm-dialog>
</template>

<style lang="less" scoped>
.wm-table_form .label{width: 70px;}
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
  private store: any = useStore();
  state: any = this.store.state;
  // 变量
  time: any;
  form: any = {show: false, uname: '', passwd1: '', passwd2: '', is_vcode: false, vcode: '', text: '', num: 60}

  /* 创建成功 */
  created(): void {
    // 登录状态
    this.$watch('show', (val:Boolean)=>{
      this.form.show = val;
      if(val) {
        // 获取验证码
        this.form.text = this.state.langs.passwd_code_get;
        // 帐号
        if(this.state.uinfo.tel) this.form.uname = this.state.uinfo.tel;
        else if(this.state.uinfo.email) this.form.uname = this.state.uinfo.email;
      }
    }, { deep: true });
  }

  /* 创建完成 */
  mounted(): void {
  }

  /* 获取验证码 */
  getVcode(): void {
    if(this.form.num!=60) return;
    // 类型
    let type: string='';
    if(Safety.IsRight('tel', this.form.uname)) type='tel';
    else if(Safety.IsRight('email', this.form.uname)) type='email';
    else return Ui.Toast(this.state.langs.passwd_verify_null);
    // 获取验证码
    const load: any = Ui.Loading();
    Request.Post('user/get_vcode?lang='+this.state.lang, {type: type, uname:this.form.uname}, (res:any)=>{
      load.clear();
      const d: any = res.data;
      if(d.code==0) {
        this.vcodeTime();
        this.form.vcode = d.data.toString();
      }else if(d.code==4001) {
        this.form.num = d.data;
        this.vcodeTime();
      }
      return Ui.Toast(d.msg);
    });
  }
  /* 验证码倒计时 */
  private vcodeTime(): void {
    clearInterval(this.time);
    this.time = setInterval(()=>{
      this.form.num--;
      this.form.text = this.state.langs.passwd_code_time(this.form.num);
      if(this.form.num<=0) {
        clearInterval(this.time);
        this.form.num = 60;
        this.form.text = this.state.langs.passwd_code_resend;
      }
    }, 1000);
  }

  /* 提交 */
  submitPwd(): void {
    // 验证码
    if(this.form.vcode.length!=4) return Ui.Toast(this.state.langs.passwd_verify_code);
    this.form.is_vcode = true;
    // 新密码
    if(!Safety.IsRight('passwd', this.form.passwd1)) return Ui.Toast(this.state.langs.passwd_verify_passwd1);
    if(this.form.passwd1!==this.form.passwd2) return Ui.Toast(this.state.langs.passwd_verify_passwd1);
    // 请求
    const load: any = Ui.Loading();
    Request.Post('user/change_passwd?lang='+this.state.lang, {uname: this.form.uname, passwd: this.form.passwd1, vcode: this.form.vcode}, (res:any)=>{
      load.clear();
      const d: any = res.data;
      if(d.code==0){
        this.state.isLogin = false;
        this.Close();
      }else{
        return Ui.Toast(d.msg);
      }
    });
  }

  /* 关闭 */
  Close(): void {
    this.form.is_vcode = false;
    this.form.vcode = '';
    this.form.passwd1 = '';
    this.form.passwd2 = '';
    this.$emit('update:show', false);
  }

}
</script>