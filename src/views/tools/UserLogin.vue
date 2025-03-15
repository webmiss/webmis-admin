<template>
  <div class="wm-login_popup" :style="{visibility:loginShow?'inherit':'hidden'}">
    <wmPopup v-model:show="loginShow" width="100%" height="100%" position="top" :time="600">
      <div class="wm-langs">
        <div>{{ langs.label }}</div>
        <div class="wm-langs_body">
          <span class="arrow"></span>
          <ul class="wm-langs_list">
            <li v-for="(v,k) in langsList" :key="k" :class="v.value==langs.value?'active':''" @click="changeLangs(v)">{{ v.label }}</li>
          </ul>
        </div>
      </div>
      <div class="wm-login_bg" :class="loginBG" v-show="loginShow"></div>
      <div class="wm-login_mask"></div>
      <div class="wm-login_body">
        <div class="wm-login_ct">
          <div class="wm-login_logo" :style="{backgroundImage: login.uname&&login.uname==login.local_uname&&login.img?'url('+(login.img)+')':'', backgroundSize:login.uname&&login.uname==login.local_uname&&login.img?'100%':'60%'}"></div>
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
            <img class="vcode" :src="login.vcode_url" :alt="state.langs.login_refresh" @click="changeVcode()" />
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
    </wmPopup>
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
.wm-login_logo{margin: 48px auto; width: 160px; height: 160px; border: rgba(0,0,0,0.8) 1px solid; background-color: rgba(0,0,0,0.7); background-image: url('../../assets/logo.svg'); border-radius: 50%; background-repeat: no-repeat; background-position: center; transition: All 0.5s ease-in-out;}
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

<script setup lang="ts">
import { ref, onMounted, watch, getCurrentInstance, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; 
import wmPopup from '../../components/popup/index.vue';
/* UI组件 */
import Env from '../../config/Env';
import Ui from '../../library/ui';
import Storage from '../../library/storage';
import Request from '../../library/request';
/* JS组件 */
import Time from '../../library/time';
/* 语言包 */
import { en_US } from '../../config/langs/en_US';
import { zh_CN } from '../../config/langs/zh_CN';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: true},          // 是否显示
});
const { proxy } = getCurrentInstance() as any ;
// 状态
const store = useStore();
const state = store.state;
const router = useRouter();
const copy = Env.copy;
/* 变量 */
const animationTime = ref(10000);       // 动画切换间隔时间
const verifyTokenTime = ref(30000);     // Token验证间隔时间
// 语言
const langs = ref(<any>{});
const langsList: Array<any> = Env.LangList();
// 登录
const loginShow = ref(false);           // 是否显示
const loginBG = ref('');                // 当前背景
const login = ref({is_passwd: false, is_safety: false, uname: '', local_uname:'', passwd: '', vcode: '', vcode_url: '', img:''});
const bg_class: Array<string> = ['bg0', 'bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8', 'bg9'];
// 定时
let time: any = null;
let tokenTime: any = null;

/* 监听-登录状态 */
watch(()=>state.isLogin, (val:Boolean)=>{
  if(val) {
    loginShow.value = false;
    // 验证Token
    clearInterval(tokenTime);
    tokenTime = setInterval(()=>{
      verifyToken();
    }, verifyTokenTime.value);
  } else {
    loginShow.value = true;
    clearInterval(tokenTime);
    logout();
  }
}, { deep: true });
watch(loginShow, (val:Boolean)=> {
  if (val) {
    // 用户信息
    showUser();
    // 背景动画
    bgAnimation();
    clearInterval(time);
    time = setInterval(()=>{
      bgAnimation();
    }, animationTime.value);
  } else {
    clearInterval(time);
  }
});

/* 创建完成 */
onMounted(()=>{
  // 默认语言
  let langsTmp: string | null = Storage.getItem('langs');
  if(langsTmp) langs.value = JSON.parse(langsTmp);
  else {
    for(let v of langsList){
      if(Env.lang==v.value) {
        langs.value = v;
        break;
      }
    }
  }
  getLangs(langs.value);
  // 验证登录
  state.isLogin = props.show;
  const token: string | null = Storage.getItem('token');
  state.token = token?token:'';
  if(token) verifyToken(true);
  else state.isLogin = false;
});

/* 语言包 */
const getLangs = (langs: any): void => {
  // 配置
  state.lang = langs.value;
  if(langs.value=='en_US') state.langs = en_US();
  else if(langs.value=='zh_CN') state.langs = zh_CN();
  // 清理菜单
  Storage.removeItem('MenusTabs');
  Storage.removeItem('MenusTmp');
}

/* 切换语言 */
const changeLangs = (v: any): void => {
  langs.value = v;
  Storage.setItem('langs', JSON.stringify(v));
  getLangs(v);
  router.push({path: '/'});
  location.reload();
}

/* 背景动画 */
const bgAnimation = (): void => {
  const n: number = Math.floor(Math.random()*10);
  loginBG.value = !loginBG.value?bg_class[0]:bg_class[n];
}

/* 用户-显示 */
const showUser = (): void => {
  const uname: string = Storage.getItem('uname') || '';
  const img: string = Storage.getItem('user_img') || '';
  const uinfo: string = Storage.getItem('uinfo') || '';
  if(!uname) return;
  login.value.uname = uname;
  login.value.local_uname = uname;
  login.value.img = img;
  login.value.is_passwd = true;
  state.uinfo = uinfo?JSON.parse(uinfo):{};
}

/* 用户-切换 */
const clearUser = (): void => {
  login.value.uname = '';
  login.value.passwd = '';
  login.value.vcode = '';
  login.value.is_passwd = false;
  login.value.is_safety = false;
  nextTick(()=>{
    proxy.$refs.loginUname.focus();
  });
}

/* 刷新验证码 */
const changeVcode = (): void => {
  let arr = login.value.vcode_url.split('?');
  login.value.vcode_url = arr[0]+'?'+Time.Time();
  // 激活输入框
  nextTick(()=>{
    (proxy.$refs.loginVcode as any).focus();
  });
}

/* 登录 */
const clickLogin = (): void => {
  const uname: string = login.value.uname;
  const passwd: string = login.value.passwd;
  // 输入密码
  if(uname.length>3 && !login.value.is_passwd) {
    login.value.is_passwd = true;
    // 激活输入框
    nextTick(()=>{
      (proxy.$refs.loginPasswd as any).focus();
    });
    return ;
  }
  // 验证密码
  if(passwd.length<6) return Ui.Toast(state.langs.login_passwd);
  // 验证码
  if(login.value.vcode.length!=4 && login.value.is_safety) {
    // 激活输入框
    nextTick(()=>{
      (proxy.$refs.loginVcode as any).focus();
    });
    return ;
  }
  // 请求
  const load: any = Ui.Loading();
  Request.Post('user/login?lang='+state.lang, {uname: uname, passwd: passwd, vcode:login.value.vcode}, (res:any)=>{
    load.clear();
    const {code, msg, data, vcode_url}: any = res.data;
    if(code==0){
      login.value.is_passwd = true;
      login.value.is_safety = false;
      login.value.passwd = '';
      login.value.vcode = '';
      login.value.img = data.uinfo.img;
      // 缓存信息
      state.isLogin = true;
      state.token = data.token;
      state.uinfo = data.uinfo;
      Storage.setItem('token', data.token);
      Storage.setItem('uname', data.uinfo.uname);
      Storage.setItem('uinfo', JSON.stringify(data.uinfo));
      Storage.setItem('user_img', data.uinfo.img);
    }else{
      // 验证
      login.value.vcode = '';
      if(vcode_url && code==4001){
        // 开启验证
        login.value.is_safety = true;
        login.value.vcode_url = vcode_url;
        nextTick(()=>{
          (proxy.$refs.loginVcode as any).focus();
        });
      }else if(vcode_url && code==4002){
        // 验证码错误
        changeVcode();
      }else{
        // 帐号密码错误
        login.value.passwd = '';
        login.value.vcode = '';
        login.value.is_passwd = true;
        login.value.is_safety = false;
        nextTick(()=>{
          (proxy.$refs.loginPasswd as any).focus();
        });
      }
      return Ui.Toast(msg);
    }
  },()=>{
    if(load) load.clear();
    Ui.Toast(state.langs.network_err);
  });
}

/* 验证Token */
const verifyToken = (uinfo: boolean=false): void => {
  // 加载动画
  let load: any;
  if(uinfo) load= Ui.Loading();
  // 请求
  Request.Post('user/token?lang='+state.lang, {token: state.token, uinfo: uinfo}, (res:any)=>{
    if(load) load.clear();
    const {code, msg, data}: any = res.data;
    if(code==0 && data.token_time>0) {
      state.isLogin = true;
      // 修改密码
      if(!state.isPasswd && state.lang) state.isPasswd = data.isPasswd;
      // 用户信息
      if(Object.keys(data.uinfo).length!=0) {
        state.uinfo = data.uinfo;
        Storage.setItem('uname', data.uinfo.uname);
        Storage.setItem('uinfo', JSON.stringify(data.uinfo));
        Storage.setItem('user_img', data.uinfo.img);
      }
    } else {
      Ui.Toast(msg);
      logout();
    }
  },()=>{
    if(load) load.clear();
    Ui.Toast(state.langs.network_err);
  });
}

/* 退出登录 */
const logout = (): void => {
  // 缓存信息
  state.isLogin = false;
  state.token = '';
  Storage.removeItem('token');
  Storage.removeItem('uinfo');
  Storage.removeItem('MenusTabs');
  Storage.removeItem('MenusTmp');
  // 激活密码框
  nextTick(()=>{
    if(proxy.$refs.loginUname) proxy.$refs.loginUname.focus();
    else proxy.$refs.loginPasswd.focus();
  });
}

/* 外部函数 */
defineExpose({  
  logout,
  verifyToken,
});

</script>
