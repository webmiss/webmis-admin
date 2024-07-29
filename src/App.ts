import { Options } from 'vue-class-component';
import { useRoute,useRouter } from 'vue-router'
import { useStore } from 'vuex';
import Base from './service/Base'
import Env from './config/Env';
import Request from './library/request'
import Storage from './library/storage'
import Ui from './library/ui'
/* UI组件 */
import wmPopup from '@/components/popup/index.vue'

@Options({
  components: {wmPopup},
})
export default class App extends Base {

  // private cfg: any = new Env();          // 配置信息
  // private route: any = useRoute();       // 路由信息
  // private router: any = useRouter();     // 路由
  // private store: any = useStore();       // 状态
  // 用户
  public uinfo: any = {'show': false};
  // 菜单
  public tabs: any = {active:'/', list:[]};
  public menus: any = {'show': false};
  public is_menus: Boolean = true;

  /* 创建成功 */
  public created(): void {
    // 监听
    this.$watch('$route', (to: any, from: any)=>{
      this.tabs.active = to.path;
    });
    // 本地缓存
    this.is_menus = Storage.getItem('IsMenus')?true:false;
    const tabs: string|null = Storage.getItem('MenusTabs');
    this.tabs.list = tabs?JSON.parse(tabs):[];
  }

  /* 创建完成 */
  public mounted(): void {
    // 请求
    // this.Print('baseUrl', this.cfg.apiUrl);
    // const load: any = UI.Loading();
    // Request.Post(this.cfg.apiUrl+'', {}, (res:any)=>{
    //   load.clear();
    //   UI.Toast('请求成功!');
    //   this.Print(res.data);
    // });
  }

  /* 菜单-显示/隐藏 */
  public MenusShow(): void {
    if(this.is_menus){
      this.is_menus = false;
      Storage.setItem('IsMenus', '');
    }else{
      this.is_menus = true;
      Storage.setItem('IsMenus', '1');
    }
  }
  /* 菜单-切换 */
  public MenusClick(name: string, url: string, isShow: boolean=false): void {
    // 隐藏菜单
    if(isShow) this.menus.show=false;
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
      // 追加
      if(!inArr){
        this.tabs.list.push({name: name, url: url});
      }
      // 缓存
      Storage.setItem('MenusTabs', JSON.stringify(this.tabs.list));
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

}