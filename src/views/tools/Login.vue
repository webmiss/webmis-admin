<template>
  <div class="wm-login_popup" :style="{visibility:login.show?'inherit':'hidden'}">
    <wm-popup v-model:show="login.show" width="100%" height="100%" position="top" :time="600">
      <div class="wm-langs">
        <div>{{ langs.label }}</div>
        <div class="wm-langs_body">
          <span class="arrow"></span>
          <ul class="wm-langs_list">
            <li v-for="(v,k) in langsList" :key="k" :class="v.value==langs.value?'active':''" @click="changeLangs(v)">{{ v.label }}</li>
          </ul>
        </div>
      </div>
      <div class="wm-login_bg" :class="login.bg" v-show="login.show"></div>
      <div class="wm-login_mask"></div>
      <div class="wm-login_body">
        <div class="wm-login_ct">
          <div class="wm-login_logo" :style="{backgroundImage:'url('+(login.uname&&login.uname==login.local_uname&&login.img?login.img:require('@/assets/logo.svg'))+')', backgroundSize:login.uname&&login.uname==login.local_uname&&login.img?'100%':'60%'}"></div>
          <div class="wm-login_form" v-if="!login.is_passwd">
            <i class="ui ui_user ico"></i>
            <input ref="loginUname" type="text" class="input" v-model="login.uname" @keyup.enter="clickLogin()" maxlength="32" :placeholder="state.langs.login_uname">
          </div>
          <div class="wm-login_form" v-else-if="login.is_passwd&&!login.is_safety">
            <i class="ui ui_safety ico"></i>
            <form onsubmit="return false">
              <input ref="loginPasswd" type="password" class="input" v-model="login.passwd" @keyup.enter="clickLogin()" maxlength="32" :placeholder="state.langs.login_passwd" autocomplete="off">
            </form>
          </div>
          <div class="wm-login_form" v-else-if="login.is_safety">
            <i class="ui ui_safety ico"></i>
            <img class="vcode" :src="login.vcode_url" :alt="langs.login_refresh" @click="changeVcode()" />
            <input ref="loginVcode" type="text" class="input" v-model="login.vcode" @keyup.enter="clickLogin()" maxlength="4" :placeholder="state.langs.login_vcode">
          </div>
          <div class="wm-login_bottom">
            <span v-if="login.uname" class="flex">
              <i class="ui ui_arrow_left" @click="clearUser()"></i>
              <i class="ui ui_arrow_right" @click="clickLogin()"></i>
            </span>
            <span v-else>{{ copy }}</span>
          </div>
        </div>
      </div>
    </wm-popup>
  </div>
</template>

<style lang="less" scoped>
/* Language */
.wm-langs{position: absolute; z-index: 9; padding: 0 32px; top: 32px; right: 32px; height: 40px; line-height: 40px; border-radius: 20px; color: #FFF; background-color: #00000050; text-align: center;}
.wm-langs:hover .wm-langs_body{display: block;}
.wm-langs_body{display: none; position: absolute; left: 50%; transform: translateX(-50%);}
.wm-langs_body .arrow{position: absolute; top: 0; left: calc(50% - 5px); transform: translateX(-50%);}
.wm-langs_body .arrow::before{content: ''; position: absolute; width: 0px; height: 0px; border: 5px solid; border-color:transparent transparent #00000050 transparent;}
.wm-langs_list{padding: 8px 0; margin-top: 10px; background-color: #00000050; border-radius: 8px;}
.wm-langs_list li{cursor: pointer; margin: 1px 0; padding: 0 32px; line-height: 32px; white-space: nowrap; border-radius: 4px;}
.wm-langs_list li:hover{color: @Minor;}
.wm-langs_list .active{color: @Minor;}
/* Login */
.wm-login_popup{position: fixed; z-index: 9999; width: calc(100% + 1px); height: calc(100% + 1px); left: 0; top: 0;}
.wm-login_bg{position: absolute; z-index: 1; width: 100%; height: 100%; background-color: #323438; background-position: center; background-size: cover; background-repeat: no-repeat; transition: All 3s ease-in-out;}
.wm-login_bg.bg0{background-image: url('../../assets/bg/0.jpg');}
.wm-login_bg.bg1{background-image: url('../../assets/bg/1.jpg');}
.wm-login_bg.bg2{background-image: url('../../assets/bg/2.jpg');}
.wm-login_bg.bg3{background-image: url('../../assets/bg/3.jpg');}
.wm-login_bg.bg4{background-image: url('../../assets/bg/4.jpg');}
.wm-login_bg.bg5{background-image: url('../../assets/bg/5.jpg');}
.wm-login_bg.bg6{background-image: url('../../assets/bg/6.jpg');}
.wm-login_bg.bg7{background-image: url('../../assets/bg/7.jpg');}
.wm-login_bg.bg8{background-image: url('../../assets/bg/8.jpg');}
.wm-login_bg.bg9{background-image: url('../../assets/bg/9.jpg');}
.wm-login_mask{position: absolute; z-index: 2; width: 100%; height: 100%; background: -webkit-radial-gradient(50% 30% ,farthest-corner,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.9));}
.wm-login_body{position: absolute; z-index: 3; width: 100%; height: 100%; color: @Minor6;}
.wm-login_ct{position: absolute; min-width: 300px; left: 50%; top: 50%; transform: translate(-50%, -60%);}
.wm-login_logo{margin: 48px auto; width: 160px; height: 160px; border: rgba(0,0,0,0.8) 1px solid; background-color: rgba(0,0,0,0.7); border-radius: 50%; background-repeat: no-repeat; background-position: center; transition: All 0.5s ease-in-out;}
.wm-login_logo:hover{border-color: @Minor; background-color: rgba(0,0,0,0.7);}
.wm-login_form{position: relative;}
.wm-login_form input{width: 100%; padding: 0 16px 0 48px; height: 48px; line-height: 48px; color: @Minor8; font-size: 16px; border: transparent 1px solid; background-color: rgba(0,0,0,0.7); border-radius: 8px; box-sizing: border-box;}
.wm-login_form input:hover{border-color: @Minor; background-color: rgba(0,0,0,0.8);}
.wm-login_form input:focus{border-color: @Minor; background-color: rgba(0,0,0,0.8);}
.wm-login_form .ico{position: absolute; width: 48px; line-height: 48px; color: @Minor5; font-size: 20px; text-align: center;}
.wm-login_form .vcode{cursor: pointer; position: absolute; height: 40px; top: 50%; right: 4px; transform: translateY(-50%); border-radius: 4px;}
.wm-login_bottom{text-align: center; line-height: 64px; text-shadow: 0 0 2px rgba(0,0,0,0.3);}
.wm-login_bottom span{display: inline-block; line-height: 40px; padding: 0 16px; color: @Minor6;}
.wm-login_bottom i{cursor: pointer; display: inline-block; width: 40px; margin: 0 8px; border-radius: 50%;}
.wm-login_bottom i:hover{background-color: rgba(0,0,0,0.8); color: @Minor;}
</style>

<script lang="ts">
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
    show: {type: Boolean, default: false},   // 是否显示
  }
})
export default class Login extends Vue {
  // 参数
  show!: boolean;
  private animationTime: number = 10000;      // 动画切换间隔时间
  private verifyTokenTime: number = 30000;    // Token验证间隔时间
  // 状态
  private store: any = useStore();
  private state: any = this.store.state;
  copy: string = Env.copy;
  // 语言
  langs: any = {};
  langsList: Array<any> = Env.LangList();
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
    this.$watch('show', (val:Boolean)=>{
      this.login.show = !val;
      if(val) {
        // 验证Token
        clearInterval(this.tokenTime);
        this.tokenTime = setInterval(()=>{
          this.verifyToken();
        }, this.verifyTokenTime);
      } else {
        clearInterval(this.tokenTime);
        this.logout();
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
    // 默认语言
    const langs: string | null = Storage.getItem('langs');
    if(langs) this.langs = JSON.parse(langs);
    else {
      for(let v of this.langsList){
        if(Env.lang==v.value) {
          this.langs = v;
          break;
        }
      }
    }
    this.getLangs(this.langs);
    // 显示登录
    if(!this.state.isLogin) {
      this.login.show = true;
      this.bgAnimation();
    }
    // 验证登录
    const token: string | null = Storage.getItem('token');
    this.state.token = token?token:'';
    if(token) this.verifyToken(true);
  }

  /* 语言包 */
  getLangs(langs: any): void {
    import('@/config/langs/'+langs.value).then(m=>{
      this.state.lang = langs.value;
      this.state.langs = m.langs();
      // 清理菜单
      Storage.removeItem('MenusTabs');
      Storage.removeItem('MenusTmp');
    });
  }

  /* 切换语言 */
  changeLangs(v: any): void {
    this.langs = v;
    Storage.setItem('langs', JSON.stringify(v));
    this.getLangs(v);
    this.$router.push({path: '/'});
    location.reload();
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
    if(passwd.length<6) return Ui.Toast(this.state.langs.login_passwd);
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
    Request.Post('user/login?lang='+this.state.lang, {uname: uname, passwd: passwd, vcode:this.login.vcode}, (res:any)=>{
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
      if(load) load.clear();
      Ui.Toast(this.state.langs.network_err);
    });
  }

  /* 验证Token */
  verifyToken(uinfo: boolean=false): void {
    // 加载动画
    let load: any;
    if(uinfo) load= Ui.Loading();
    // 请求
    Request.Post('user/token', {token: this.state.token, uinfo: uinfo}, (res:any)=>{
      if(load) load.clear();
      const d: any = res.data;
      if(d.code==0 && d.data.token_time>0) {
        this.state.isLogin = true;
        // 修改密码
        if(!this.state.isPasswd && this.state.lang) this.state.isPasswd = d.data.isPasswd;
        // 用户信息
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
      if(load) load.clear();
      Ui.Toast(this.state.langs.network_err);
    });
  }

  /* 退出登录 */
  logout(): void {
    // 缓存信息
    this.state.isLogin = false;
    this.state.token = '';
    Storage.removeItem('token');
    Storage.removeItem('uinfo');
    Storage.removeItem('MenusTabs');
    Storage.removeItem('MenusTmp');
    // 激活密码框
    setTimeout(()=>{
      (this.$refs.loginPasswd as any).focus();
    }, 1000);
  }

}
</script>
