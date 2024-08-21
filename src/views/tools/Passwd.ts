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
  store: any = useStore();
  state: any = this.store.state;
  // 变量
  time: any;
  form: any = {show: false, uname: '', passwd1: '', passwd2: '', is_vcode: false, vcode: '', text: '获取验证码', num: 60}

  /* 创建成功 */
  created(): void {
    // 登录状态
    this.$watch('show', (val:Boolean)=>{
      this.form.show = val;
      if(val) {
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
    else return Ui.Toast('无效帐号!');
    // 获取验证码
    const load: any = Ui.Loading();
    Request.Post('user/get_vcode', {type: type, uname:this.form.uname}, (res:any)=>{
      load.clear();
      const d: any = res.data;
      if(d.code==0) {
        this.vcodeTime();
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
      this.form.text = this.form.num+'秒后重试';
      if(this.form.num<=0) {
        clearInterval(this.time);
        this.form.num = 60;
        this.form.text = '重新发送';
      }
    }, 1000);
  }

  /* 修改密码 */
  changePwd(): void {
    // 验证码
    if(this.form.vcode.length!=4) return Ui.Toast('请填写验证码');
    this.form.is_vcode = true;
    // 新密码
    if(!Safety.IsRight('passwd', this.form.passwd1)) return Ui.Toast('英文字母开头，6～16位字符!');
    if(this.form.passwd1!==this.form.passwd2) return Ui.Toast('两次密码不一致!');
    // 提交
    const load: any = Ui.Loading();
    Request.Post('user/change_passwd', {uname: this.form.uname, passwd: this.form.passwd1, vcode: this.form.vcode}, (res:any)=>{
      load.clear();
      const d: any = res.data;
      if(d.code==0){
        this.state.isLogin = false;
      }else{
        return Ui.Toast(d.msg);
      }
    });
  }

  /* 关闭 */
  Close(): void {
    this.$emit('update:show', false);
  }

}