import { Options } from 'vue-class-component';
import { useRoute,useRouter } from 'vue-router'
import { useStore } from 'vuex';
/* UI组件 */
import Base from '@/service/Base'
import Env from '@/config/Env';
import Request from '@/library/request'
import Storage from '@/library/storage'
import Ui from '@/library/ui'
import Files from '@/library/files'
/* 组件 */
import Login from '@/views/tools/Login.vue'
import Uinfo from '@/views/tools/Uinfo.vue'
import Passwd from '@/views/tools/Passwd.vue'
import wmPopup from '@/components/popup/index.vue'
import wmDialog from '@/components/dialog/index.vue'

@Options({
  components: {Login, Uinfo, Passwd, wmPopup, wmDialog},
})
export default class App extends Base {

  // private cfg: any = new Env();          // 配置信息
  // private route: any = useRoute();       // 路由信息
  // private router: any = useRouter();     // 路由
  // 状态
  store: any = useStore();
  state: any = this.store.state;
  copy: string = Env.copy;
  // 用户
  public uinfo: any = {show: false};
  // 菜单
  public tabs: any = {active:'/', list:[]};
  public menus: any = {
    'show':false, key:'',
    list:[], seaList:[], tmpList:[],
  };
  public is_menus: Boolean = true;
  // 登录
  login: any = {show: false, passwd: false};

  /* 创建成功 */
  created(): void {
    // 监听
    this.$watch('$route', (to: any, from: any)=>{
      this.tabs.active = to.path;
    }, { deep: true });
    // 登录
    this.$watch('state.isLogin', (val: boolean)=>{
      if(val) this.MenusList();
    }, { deep: true });
    // 菜单
    this.$watch('menus.list', (val: Array<any>)=>{
      let title: string = '';
      const url: string = (this.$route as any).path;
      for(let v1 of val) {
        if(!v1.children) continue;
        for(let v2 of v1.children) {
          if(!v2.children) continue;
          for(let v3 of v2.children) {
            if(v3.value.url==url) {
              title=v3.label; break;
            }
          }
        }
      }
      // 点击当前页
      if(title && url) {
        this.$nextTick(()=>{ this.MenusClick(title, url); });
        // setTimeout(()=>{ this.MenusClick(title, url); }, 500);
      }
    }, { deep: true });
  }

  /* 创建完成 */
  mounted(): void {
    // 菜单导航
    this.is_menus = Storage.getItem('IsMenus')?true:false;
    const tabs: string|null = Storage.getItem('MenusTabs');
    this.tabs.list = tabs?JSON.parse(tabs):[];
    // 最近访问
    let menus: any = Storage.getItem('MenusTmp');
    this.menus.tmpList = menus?JSON.parse(menus):[];
  }

  /* 获取菜单 */
  MenusList(): void {
    // 请求
    Request.Post('sys_menus/get_menus_perm', {token: this.state.token}, (res:any)=>{
      const d: any = res.data;
      if(d.code==0) {
        this.menus.list = d.data;
      }else{
        Ui.Toast(d.msg);
      }
    });
  }

  /* 菜单-显示/隐藏 */
  MenusShow(): void {
    if(this.is_menus){
      this.is_menus = false;
      Storage.setItem('IsMenus', '');
    }else{
      this.is_menus = true;
      Storage.setItem('IsMenus', '1');
    }
  }
  /* 菜单-搜索 */
  MenusSearch(): void {
    const key: string = this.menus.key;
    const reg =new RegExp(key.toLowerCase());
    const list: any = this.menus.list;
    let tmp:any, label: string, en: string, display: boolean;
    let keys: Array<any> = [];
    this.menus.seaList = [];
    // 一级
    for(const k1 in list) {
      // 二级
      if(!list[k1].children) continue;
      for(const k2 in list[k1].children) {
        // 三级
        if(!list[k1].children[k2].children) continue;
        for(const k3 in list[k1].children[k2].children) {
          // 是否显示
          if(key.length>0) {
            tmp = list[k1].children[k2].children[k3];
            label = tmp.label.toLowerCase();
            en = tmp.en.toLowerCase();
            display = reg.test(label) || reg.test(en);
            // 结果
            if(display) {
              keys.push([k1, k2]);
              this.menus.seaList.push({label:tmp.label, icon:tmp.icon, url:tmp.value.url});
            }
          } else {
            display = true;
          }
          // 赋值
          list[k1].children[k2].display = true;
          list[k1].children[k2].children[k3].display = display;
        }
      }
    }
    // 隐藏二级菜单
    if(!key) return;
    for(const k1 in list) {
      if(!list[k1].children) continue;
      for(const k2 in list[k1].children) {
        let is_true: boolean = false;
        for(const i in keys) {
          if(keys[i][0]==k1&&keys[i][1]==k2) {
            is_true = true;
            continue;
          }
        }
        list[k1].children[k2].display = is_true;
      }
    }
  }
  /* 菜单-切换 */
  MenusClick(name: string, url: string, isShow: boolean=false): void {
    // 是加载菜单
    if(this.menus.list.length==0) return;
    // 隐藏菜单
    if(isShow) {
      this.menus.show=false;
      this.uinfo.show = false;
    }
    // 是否首页
    if(url!='/') {
      // 是否存在
      let inArr: Boolean = false;
      const tabs: any = this.tabs.list;
      for (const k in tabs) {
        if(tabs[k].url==url){
          inArr=true; break;
        }
      }
      // 追加、缓存
      if(!inArr) this.tabs.list.push({name: name, url: url});
      Storage.setItem('MenusTabs', JSON.stringify(this.tabs.list));
    }
    // 数据
    const list: any = this.menus.list;
    let tmp: any={}, data: any, action: Array<any> = [];
    for(const k1 in list) {
      if(!list[k1].children) continue;
      for(const k2 in list[k1].children) {
        if(!list[k1].children[k2].children) continue;
        for(const k3 in list[k1].children[k2].children) {
          tmp = list[k1].children[k2].children[k3];
          if(tmp.label==name&&tmp.value.url==url){
            data = {label:tmp.label, icon:tmp.icon, url:tmp.value.url};
            action = tmp.value.action;
            break;
          }
        }
      }
    }
    // 最近访问
    if(data) {
      let menus: any = Storage.getItem('MenusTmp');
      menus = menus?JSON.parse(menus):[];
      for(let i in menus) {
        if(menus[i].url==url || parseInt(i)>=9) menus.splice(i, 1);
      }
      menus.unshift(data);
      this.menus.tmpList = menus;
      Storage.setItem('MenusTmp', JSON.stringify(menus));
    }
    // 动作菜单
    if(action) {
      this.state.menusAction = action;
    }
    // 跳转
    this.$router.push({path: url});
  }
  /* 菜单-关闭 */
  public MenusClose(url: string): void {
    const tabs: any = this.tabs.list;
    for (const k in tabs) {
      if(tabs[k].url==url){
        tabs.splice(k, 1);
        // 跳转
        if(this.tabs.active==url){
          let i: number = parseInt(k)-1;
          if(i<0) this.MenusClick('首页', '/');
          else this.MenusClick(tabs[i.toString()].name, tabs[i.toString()].url);
        }
        break;
      }
    }
    // 缓存
    Storage.setItem('MenusTabs', JSON.stringify(this.tabs.list));
  }

  /* 上传头像 */
  userUpImg(): void {
    // 选择文件
    Files.Select({}, (fileObj:any)=>{
      // 转Base64
      Files.FileToBase64(fileObj, (base64: any)=>{
        // 压缩图片
        Files.ImageCompress(base64, {width:200, height:200, type:fileObj.type}, (imgBase64: any)=>{
          // 请求
          Request.Post('user/upimg', {token: this.state.token, base64:imgBase64}, (res:any)=>{
            const d = res.data;
            if(d.code==0){
              // 更新用户信息
              (this.$refs.Login as any).verifyToken(true);
            }
            return Ui.Toast(d.msg);
          });
        }, (err: string)=>{
          Ui.Toast(err);
        });
      })
    }, (err: string)=>{
      Ui.Toast(err);
    });
  }

  /* 退出登录 */
  logout(): void {
    // 隐藏
    this.uinfo.show = false;
    this.menus.show = false;
    // 清除
    (this.$refs.Login as any).logout();
  }

}