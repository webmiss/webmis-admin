import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
import wmPopup from '@/components/popup/index.vue'
/* UI组件 */
import Ui from '@/library/ui'
import Storage from '@/library/storage'
import Time from '@/library/time'

@Options({
  components: { wmPopup },
  props: {
  }
})
export default class Login extends Vue {

  // 状态
  store: any = useStore();
  state: any = this.store.state;
  // 登录
  login: any = {
    show: false,
    is_passwd: false,
    is_safety: false,
    uname: '',
    passwd: '',
    vcode: '',
    vcode_url: '',
  };

  /* 创建成功 */
  created(): void {
    // 登录状态
    this.$watch('state.isLogin', (val:Boolean)=>{
      this.login.show = !val;
    }, { deep: true });
  }

  /* 创建完成 */
  mounted(): void {
    if(!this.state.isLogin) this.login.show = true;
  }

  /* 切换用户 */
  clearUser(): void {
    this.login.uname = '';
    this.login.passwd = '';
    this.login.vcode = '';
    this.login.is_passwd = false;
  }

  /* 刷新验证码 */
  changeVcode(): void {
    let arr = this.login.vcode_url.split('?');
    this.login.vcode_url = arr[0]+'?'+Time.Time();
    // 激活输入框
    const pwd: any = this.$refs.loginVcode;
    pwd.focus();
  }

  /* 登录 */
  clickLogin(): void {
    // 输入密码 loginPasswd
    if(this.login.uname.length>3 && !this.login.is_passwd) {
      this.login.is_passwd = true;
      // 激活输入框
      this.$nextTick(()=>{
        const pwd: any = this.$refs.loginPasswd;
        pwd.focus();
      });
      return ;
    }
    // 验证密码
    if(this.login.passwd.length<6) return Ui.Toast('请输入密码');
    // 验证码
    this.login.is_safety = true;
    this.login.vcode_url = 'https://api.cszb.vip/admin/user/vcode/admin?'+Time.Time();
    if(this.login.vcode.length!=4 && this.login.is_safety){
      // 激活输入框
      this.$nextTick(()=>{
        const pwd: any = this.$refs.loginVcode;
        pwd.focus();
      });
      return ;
    }

    // 登录成功
    if(this.login.uname=='admin' && this.login.passwd=='123456') {
      this.state.isLogin = true;
      this.login.is_passwd = true;
      this.login.is_safety = false;
      this.login.passwd = '';
      this.login.vcode = '';
    } else {
      this.login.is_passwd = true;
      this.login.is_safety = false;
      this.login.passwd = '';
      this.login.vcode = '';
      Ui.Toast('帐号或密码错误!');
      // 激活密码框
      this.$nextTick(()=>{
        const pwd: any = this.$refs.loginPasswd;
        pwd.focus();
      });
    }
  }

}