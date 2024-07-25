import { Options } from 'vue-class-component';
import { useRoute,useRouter } from 'vue-router'
import { useStore } from 'vuex';
import Base from './service/Base'
import Env from './config/Env';
import Request from './library/request'
import UI from './library/ui'
/* UI组件 */
import wmPopup from '@/components/popup/index.vue'

@Options({
  components: {wmPopup},
})
export default class App extends Base {

  private cfg: any = new Env();          // 配置信息
  private route: any = useRoute();       // 路由信息
  private router: any = useRouter();     // 路由
  private store: any = useStore();       // 状态
  // 菜单
  public menus: any = {'show': false};
  // 测试数据
  public msg: string = '123456';
  private num: number = 0;
  private arr: object = {'name':''};

  /* 创建成功 */
  public created(): void {
    // 监听
    this.$watch('num', (val:number)=>{
      console.log('num', this.num, val);
    });
  }

  /* 创建完成 */
  public mounted(): void {
    // 请求
    this.Print('baseUrl', this.cfg.apiUrl);
    const load: any = UI.Loading();
    Request.Post(this.cfg.apiUrl+'', {}, (res:any)=>{
      load.clear();
      UI.Toast('请求成功!');
      this.Print(res.data);
    });
  }

  /* 测试 */
  public Test(): void {
    this.msg = 'Test'+(this.num++);
    console.log('Test', this.num);
  }

}