import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
import wmPopup from '@/components/popup/index.vue'
/* UI组件 */
import Env from '@/config/Env';
import Ui from '@/library/ui'
import Storage from '@/library/storage'
import Request from '@/library/request'
/* JS组件 */
import Time from '@/library/time'

@Options({
  components: { wmPopup },
  props: {
  }
})
export default class Login extends Vue {
  // 参数
  private animationTime: number = 10000;      // 动画切换间隔时间
  private verifyTokenTime: number = 30000;    // Token验证间隔时间
  // 状态
  private store: any = useStore();
  private state: any = this.store.state;
  copy: string = Env.copy;
  // 登录
  login: any = {show: false, is_passwd: false, is_safety: false, uname: '', local_uname:'', passwd: '', vcode: '', vcode_url: '', img:'', bg:''};
  bg_class: Array<string> = ['bg0', 'bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8', 'bg9'];
  // 动画时间
  private time: any = null;
  // Token
  private tokenTime: any = null;

  /* 创建成功 */
  created(): void {
    // 登录状态
    this.$watch('state.isLogin', (val:Boolean)=>{
      this.login.show = !val;
      if(val) {
        // 验证Token
        clearInterval(this.tokenTime);
        this.tokenTime = setInterval(()=>{
          this.verifyToken();
        }, this.verifyTokenTime);
      } else {
        clearInterval(this.tokenTime);
      }
    }, { deep: true });
    // 背景状态
    this.$watch('login.show', (val:Boolean)=>{
      if(val) {
        // 背景动画
        clearInterval(this.time);
        this.time = setInterval(()=>{
          this.bgAnimation();
        }, this.animationTime);
        // 用户信息
        this.showUser();
      } else {
        clearInterval(this.time);
      }
    }, { deep: true });
  }

  /* 创建完成 */
  mounted(): void {
    // 显示登录
    if(!this.state.isLogin) {
      this.login.show = true;
      this.bgAnimation();
    }
    // 验证登录
    const token: string | null = Storage.getItem('token');
    this.state.token = token?token:'';
    if(token) this.verifyToken();
  }

  /* 背景动画 */
  bgAnimation(): void {
    const n: number = Math.floor(Math.random()*10);
    this.login.bg = !this.login.bg?this.bg_class[0]:this.bg_class[n];
  }

  /* 用户-显示 */
  showUser(): void {
    const uname: string | null = Storage.getItem('uname');
    const img: string | null = Storage.getItem('user_img');
    const uinfo: string | null = Storage.getItem('uinfo');
    if(!uname) return;
    this.login.uname = uname;
    this.login.local_uname = uname;
    this.login.img = img;
    this.login.is_passwd = true;
    this.state.uinfo = uinfo?JSON.parse(uinfo):{};
  }

  /* 用户-切换 */
  clearUser(): void {
    this.login.uname = '';
    this.login.passwd = '';
    this.login.vcode = '';
    this.login.is_passwd = false;
    this.login.is_safety = false;
    this.$nextTick(()=>{
      (this.$refs.loginUname as any).focus();
    });
  }

  /* 刷新验证码 */
  changeVcode(): void {
    let arr = this.login.vcode_url.split('?');
    this.login.vcode_url = arr[0]+'?'+Time.Time();
    // 激活输入框
    this.$nextTick(()=>{
      (this.$refs.loginVcode as any).focus();
    });
  }

  /* 登录 */
  clickLogin(): void {
    const uname: string = this.login.uname;
    const passwd: string = this.login.passwd;
    // 输入密码
    if(uname.length>3 && !this.login.is_passwd) {
      this.login.is_passwd = true;
      // 激活输入框
      this.$nextTick(()=>{
        (this.$refs.loginPasswd as any).focus();
      });
      return ;
    }
    // 验证密码
    if(passwd.length<6) return Ui.Toast('请输入密码');
    // 验证码
    if(this.login.vcode.length!=4 && this.login.is_safety) {
      // 激活输入框
      this.$nextTick(()=>{
        (this.$refs.loginVcode as any).focus();
      });
      return ;
    }
    // 请求
    const load: any = Ui.Loading();
    Request.Post('user/login', {uname: uname, passwd: passwd, vcode:this.login.vcode}, (res:any)=>{
      load.clear();
      const d: any = res.data;
      if(d.code==0){
        this.login.is_passwd = true;
        this.login.is_safety = false;
        this.login.passwd = '';
        this.login.vcode = '';
        this.login.img = d.data.uinfo.img;
        // 缓存信息
        this.state.isLogin = true;
        this.state.token = d.data.token;
        this.state.uinfo = d.data.uinfo;
        Storage.setItem('token', d.data.token);
        Storage.setItem('uname', d.data.uinfo.uname);
        Storage.setItem('uinfo', JSON.stringify(d.data.uinfo));
        Storage.setItem('user_img', d.data.uinfo.img);
      }else{
        // 验证
        this.login.vcode = '';
        const vcode_url: string = d.vcode_url || '';
        if(vcode_url && d.code==4001){
          // 开启验证
          this.login.is_safety = true;
          this.login.vcode_url = vcode_url;
          this.$nextTick(()=>{
            (this.$refs.loginVcode as any).focus();
          });
        }else if(vcode_url && d.code==4002){
          // 验证码错误
          this.changeVcode();
        }else{
          // 帐号密码错误
          this.login.passwd = '';
          this.login.vcode = '';
          this.login.is_passwd = true;
          this.login.is_safety = false;
          this.$nextTick(()=>{
            (this.$refs.loginPasswd as any).focus();
          });
        }
        return Ui.Toast(d.msg);
      }
    },()=>{
      load.clear();
      Ui.Toast('无法连接服务器!');
    });
  }

  /* 验证Token */
  verifyToken(uinfo: boolean=false): void {
    Request.Post('user/token', {token: this.state.token, uinfo: uinfo}, (res:any)=>{
      const d: any = res.data;
      if(d.code==0 && d.data.token_time>0) {
        this.state.isLogin = true;
        if(Object.keys(d.data.uinfo).length!=0) {
          this.state.uinfo = d.data.uinfo;
          Storage.setItem('uname', d.data.uinfo.uname);
          Storage.setItem('uinfo', JSON.stringify(d.data.uinfo));
          Storage.setItem('user_img', d.data.uinfo.img);
        }
      } else {
        Ui.Toast(d.msg);
        this.logout();
      }
    },()=>{
      Ui.Toast('无法连接服务器!');
    });
  }

  /* 退出登录 */
  logout(): void {
    // 缓存信息
    this.state.isLogin = false;
    this.state.token = '';
    Storage.setItem('token', '');
    Storage.setItem('uinfo', '');
    Storage.setItem('MenusTabs', '');
    // 激活密码框
    setTimeout(()=>{
      (this.$refs.loginPasswd as any).focus();
    }, 1000);
  }

}