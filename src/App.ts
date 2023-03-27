import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import Env from './env'
import Start from '@/library/Start'
/* JS组件 */
import Toast from '@/library/ui/toast'
import Post from '@/library/request/post'
import Loading from '@/library/ui/loading'
import Storage from '@/library/Storage'
import RegRight from '@/library/util/reg_right'
import NavigateTo from '@/library/ui/navigate_to'
import { DateTime, StrToTime, TimeSize, FormatTime } from '@/library/time/index'
/* UI组件 */
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmPopover from '@/components/popover/index.vue'
import wmPopup from '@/components/popup/index.vue'

export default defineComponent({
  name: 'APP',
  components: {wmInput,wmButton,wmPopover,wmPopup},
  data(){
    const store: any = useStore();
    const state: any = store.state;
    const router: any = this.$router;
    // 切换动画
    const transitionName: string = '';
    // 信息
    const info: any = {title: Env.title, version: Env.version, copy: Env.copy};
    // 登录
    const login: any = {uname:'',passwd:'',subText:'登 录',dis:false};
    // 菜单
    const sea: any = {show: false, key:'', isData: true, list:[]};
    const menusPos: any = [0,0,0];
    const menusChildren: any = [];
    const menusLately: any = [];
    // 语言
    const language: any = {
      num: 0,
      list: [
        {name:'php',val:'PHP( 8.1.7 )'},
        {name:'phalcon',val:'PHP( Phalcon4 )'},
        {name:'python',val:'Python3( Flask )'},
        {name:'java',val:'Java( SpringBoot )'},
        {name:'go',val:'GoLang( Gin )'},
      ]
    };
    return {state,router,transitionName,info,login,menusChildren,sea,menusPos,menusLately,language}
  },
  watch:{
    $route(to,from){
      // 页面切换动画
      if(to.path=='/' && from.path=='/') return ;
      this.transitionName = this.router.isBack?'slide-right':'slide-left';
      this.router.isBack = false;
    },
    // 清空密码
    isLogin(val){
      if(!val) this.login.passwd = '';
    },
  },
  computed:{
    // @ts-ignore
    mode(){ return this.state.mode; },
    // @ts-ignore
    isLogin(){ return this.state.isLogin; },
  },
  mounted(){
    // 启动服务
    setTimeout(()=>{ Start.init(); },400);
    // 用户名
    this.login.uname = Storage.getItem('uname');
    // Enter事件
    this._enter();
    // 获取菜单
    if(Storage.getItem('token')){
      this.getMenus();
      this.menusSetLately();
    }
    // 默认语言
    this.setLanguage();
  },
  methods:{

    /* 切换语言 */
    Language(index: number){
      let data = this.language.list[index];
      data.index = index;
      Storage.setItem('language',JSON.stringify(data));
      window.location.href = '';
    },
    setLanguage(){
      const lag: any = Storage.getItem('language');
      const lagData: any = lag?JSON.parse(lag):this.language.list[0];
      this.language.num = lagData.index || 0;
    },

    /* 登录 */
    loginSub(){
      // 验证
      let uname = this.login.uname;
      let passwd = this.login.passwd;
      let reg_passwd = RegRight('passwd',passwd);
      if(RegRight('uname',uname)!==true && RegRight('email',uname)!==true && RegRight('tel',uname)!==true) return Toast('请输入手机号码');
      else if(reg_passwd!==true) return Toast(reg_passwd);
      // 提交
      this.login.subText = '正在登录';
      this.login.dis = true;
      const load = Loading();
      Post('user/login',{uname:uname,passwd:passwd},(res: any)=>{
        load.clear();
        this.login.subText = '登 录';
        this.login.dis = false;
        const d: any = res.data;
        if(d.code==0){
          this.state.isLogin = true;
          this.state.uInfo = d.uinfo;
          Storage.setItem('token',d.token);
          Storage.setItem('uname',d.uinfo.uname);
          Storage.setItem('uinfo',JSON.stringify(d.uinfo));
          // 获取菜单
          Storage.removeItem('menusPos');
          this.getMenus();
          this.menusSetLately();
          // 刷新路由
          this.$router.replace({path:'/refresh'});
        }else{
          this.state.isLogin = false;
          this.state.uInfo = {};
          Storage.setItem('token','');
          Toast(d.msg);
        }
      },()=>{
        load.clear();
        Toast('网络加载失败!');
        this.login.subText = '登 录';
        this.login.dis = false;
      });
    },
    /* 退出 */
    logout(){
      this.state.isLogin = false;
      this.state.uInfo = {};
      Storage.setItem('token','');
      if(Env.socket.start && this.state.socket) this.state.socket.close();
    },
    /* Enter登录 */
    _enter(){
      document.onkeydown = (event)=>{
        let e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13 && !this.state.isLogin) this.loginSub();
      }
    },

    /* 用户菜单 */
    getMenus(){
      Post('sys_menus/getMenusPerm',{token:Storage.getItem('token')},(res: any)=>{
        let d = res.data;
        if(d.code==0){
          // 全部
          this.state.menus = d.menus;
          // 跳转位置
          let active: number[] = [];
          let pos = Storage.getItem('menusPos');
          active = pos?JSON.parse(pos):this.menusPos;
          this.menusClick(active);
          // 搜索内容
          let data = [];
          for(let x in this.state.menus){
            if(!this.state.menus[x].children) continue;
            for(let y in this.state.menus[x].children){
              if(!this.state.menus[x].children[y].children) continue;
              for(let z in this.state.menus[x].children[y].children){
                let arr: any = this.state.menus[x].children[y].children[z];
                data.push({label:arr.label, en:arr.en, value:[x,y,z], show: true});
              }
            }
          }
          this.sea.list = data;
        }
      },()=>{
        this.logout();
      });
    },
    /* 点击菜单 */
    menusClick(pos: number[], url: string='/'){
      // 位置
      this.menusPos = pos
      Storage.setItem('menusPos',JSON.stringify(pos));
      // 子菜单
      this.menusChildren = this.state.menus[pos[0]].children || [];
      this.state.menuTitle[0] = this.state.menus[pos[0]].label;
      if(pos[0]==0){
        return NavigateTo(url);
      }
      if(!this.menusChildren[pos[1]] || !this.menusChildren[pos[1]].children) return;
      let menu = this.menusChildren[pos[1]].children[pos[2]];
      this.state.menuAction = menu.value.action;
      this.state.menuTitle[1] = this.menusChildren[pos[1]].label;
      this.state.menuTitle[2] = menu.label;
      this.sea.show = false;
      // 最近浏览
      this.menusSetLately({label:menu.label, pos:pos});
      // 跳转
      NavigateTo(menu.value.url);
    },
    /* 最近浏览 */
    menusSetLately(data: any=null){
      let menus: any = Storage.getItem('menusLately');
      menus = menus?JSON.parse(menus):[];
      if(data){
        for(let i in menus){
          if(JSON.stringify(menus[i])==JSON.stringify(data) || parseInt(i)>=9){
            menus.splice(i, 1);
          }
        }
        menus.unshift(data);
        Storage.setItem('menusLately', JSON.stringify(menus));
      }
      this.menusLately = menus;
    },

    /* 搜索 */
    seaInput(){
      const reg =new RegExp(this.sea.key.toLowerCase());
      let label: string, en: string;
      let isData: boolean = false;
      let res: boolean = false;
      for(let i in this.sea.list){
        label = this.sea.list[i].label.toLowerCase();
        en = this.sea.list[i].en.toLowerCase();
        res = reg.test(label)||reg.test(en);
        this.sea.list[i].show = res;
        if(res) isData = res;
      }
      // 是否存在
      this.sea.isData = isData;
    },

    /* 消息 */
    msgData(){
      this.state.msg.show = true;
    },
    /* 消息-搜索 */
    msgInput(){
      const key: string = this.state.msg.key;
      if(!key) return this.state.msg.seaList=[];
      Post('msg/sea',{
        token: Storage.getItem('token'),
        key: key,
      },(res: any)=>{
        const d = res.data;
        if(d.code==0){
          this.state.msg.seaList = d.list;
        }
      });
    },
    /* 消息-搜索点击 */
    msgSeaClick(row: any){
      this.state.msg.key = '';
      const list: any = this.state.msg.list;
      for(let v of list){
        if(v.fid==row.uid){
          return this.msgClick(v);
        }
      }
      // 添加
      const data: any = {gid:0, fid:row.uid, title:row.name, img:row.img, list:[]}
      this.state.msg.list.unshift(data);
      return this.msgClick(data);
    },
    /* 消息-点击列表 */
    msgClick(row: any){
      const msg: any = this.state.msg;
      msg.gid = row.gid;
      msg.fid = row.fid;
      msg.title = row.title;
      this.msgToBottom();
      // 标记阅读
      let ids: any = [];
      for(let v of row.list){
        if(v.is_new){
          v.is_new = false;
          ids.push(v.id);
        }
      }
      this.msgRead(ids);
    },
    /* 消息-发送 */
    msgSub(){
      // 参数
      const msg: any = this.state.msg;
      const gid: string = msg.gid;
      const fid: string = msg.fid;
      const content: string = msg.content;
      const uid: string = this.state.uInfo.uid;
      const name: string = this.state.uInfo.name;
      const img: string = this.state.uInfo.img;
      if(!msg.gid && !msg.fid) return Toast('请选择联系人');
      if(!content) return Toast('请输入消息');
      // 添加
      for(let v of msg.list){
        if(fid==v.fid){
          v.msg = content;
          v.time = DateTime();
          v.list.push({gid:0, type:'msg', fid:fid, uid:uid, title:name, msg:content, time:v.time, img:img});
          let k: number = msg.list.indexOf(v);
          msg.list.unshift(v);
          msg.list.splice(k+1, 1);
          this.msgToBottom();
          break;
        }
      }
      if(gid=='1'){
        msg.content = '';
        return Toast('无法回复系统消息!');
      }
      // 发送
      this.state.socket.send(JSON.stringify({
        gid: gid,
        to: fid,
        uid: uid,
        type: 'msg',
        title: name,
        img: img,
        msg: content,
      }));
      // 清空
      msg.content = '';
    },
    /* 消息-标记阅读 */
    msgRead(ids: any=[]){
      if(ids.length==0) return;
      Post('msg/read',{
        token: Storage.getItem('token'),
        ids: JSON.stringify(ids),
      },(res: any)=>{
        const d = res.data;
        if(d.code==0){
          const msg: any = this.state.msg;
          msg.num -= ids.length;
          for(let v of msg.list){
            if(v.fid==msg.fid) return v.num=0;
          }
        }
      });
    },
    /* 消息-跳转底部 */
    msgToBottom(){
      setTimeout(()=>{
        document.querySelector('#msgBottom')?.scrollIntoView(true);
      }, 300);
    },
    /* 消息-时间 */
    getMsgDate(d: string){
      if(!d) return '';
      const day: string = DateTime('Y-m-d');
      const t1: number = StrToTime(day+' 00:00:00');
      const t2: number = StrToTime(d);
      let str: string = t2>=t1?d.substring(11, 16):d.substring(5, 10);
      return str;
    },
    /* 消息-时间 */
    getMsgTime(t1: string, t2: string){
      if(t1==t2) return FormatTime(t1);
      return TimeSize(t1, t2)>600?FormatTime(t1):'';
    },

  }
});