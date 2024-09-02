import { Options } from 'vue-class-component';
import { useStore } from 'vuex';
import Base from '../../../service/Base'
/* JS组件 */
import Ui from '@/library/ui'
import Request from '@/library/request'
import Time from '@/library/time'
/* 组件 */
import wmMain from '@/components/container/main.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmTable from '@/components/table/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmPage from '@/components/page/index.vue'
import wmDatePicker from '@/components/datepicker/index.vue'
/* 动作、搜索、添加 */
import wmAction from '../../tools/Action.vue'
import wmSearch from '../../tools/Search.vue'
import MenusAdd from './add.vue'

/* 系统菜单 */
@Options({
  components: {
    wmMain, wmAction, wmSearch, wmInput, wmButton, wmTable, wmPage, wmTableForm, wmDatePicker,
    MenusAdd,
  },
})
export default class SysMenus extends Base {

  // 状态
  private store: any = useStore();
  private state: any = this.store.state;
  // 搜索
  sea: any = {
    show: false, key: '', placeholder:'Fid、名称、接口等',
    time: [Time.Date('Y/m/d', Time.StrToTime('-3 year')), Time.Date('Y/m/d')], maxDate: Time.Date('Y/m/d'),
    columns:[],
  }
  // 列表
  total: any = {time: '', list:{}};
  list: any = {columns: [], data: [], num: 0, total: 0, order:''};
  page: any = {total: 0, num:1, limit: 100};
  // 添加
  add: any = {show: false};

  /* 创建成功 */
  public created(): void {
  }

  /* 创建完成 */
  activated(): void {
    // 搜索
    this.sea.columns = [
      {label: '选择日期范围', value: '', slot: 'time'},
      {label: '菜单名称', value: '', name: 'title'},
      {label: '英文名称', value: '', name: 'en'},
      {label: '前端路由', value: '', name: 'url'},
      {label: '接口地址', value: '', name: 'controller'},
    ];
    // 字段
    this.list.columns = [
      {title: 'ID', index: 'id', slot: 'id', order: '', width: '80px', minWidth: '60px', textAlign: 'center'},
      {title: 'FID', index: 'id', slot: 'fid', order: '', width: '80px', minWidth: '60px', textAlign: 'center'},
      {title: '图标', index: 'ico', slot: 'ico', width: '40px'},
      {title: '名称', index: 'title', order: '', width: '160px'},
      {title: '英文', index: 'en', order: '', width: '160px'},
      {title: '权限', index: 'action', slot: 'action', width: '90px', textAlign: 'center'},
      {title: '前端路由', index: 'en', order: '', width: '200px', minWidth: '160px'},
      {title: '接口地址', index: 'controller', order: '', width: '200px', minWidth: '160px'},
      {title: '备注', index: 'remark'},
    ];
    // 加载
    if(this.state.token) this.loadData();
  }

  /* 选中状态 */
  selectState(n:number, t:number): void {
    this.list.num = n;
    this.list.total = t;
  }

  /* 排序 */
  orderBy(val: string): void {
    this.list.order = val;
    this.loadData();
  }

  /* 重置条件 */
  resetData(): void {
    // 时间
    this.sea.time = [Time.Date('Y/m/d', Time.StrToTime('-3 year')), Time.Date('Y/m/d')];
    // 条件
    this.sea.key = '';
    for(let v of this.sea.columns) v.value='';
    // 其它
    this.list.order = '';
    this.page.num = 1;
    // 加载
    this.loadData();
  }

  /* 加载数据 */
  loadData(): void {
    this.sea.show = false;
    // 数据
    const data: any = {
      key: this.sea.key,
      stime: typeof this.sea.time[0]=='string'?this.sea.time[0]:Time.Date('Y/m/d', this.sea.time[0]),
      etime: typeof this.sea.time[1]=='string'?this.sea.time[1]:Time.Date('Y/m/d', this.sea.time[1]),
    };
    // 搜索条件
    for(let v of this.sea.columns) {
      if(v.name) data[v.name] = v.value;
    }
    // 请求
    const load: any = Ui.Loading();
    Request.Post('sys_menus/list', {
      token: this.state.token,
      data: data,
      page: this.page.num,
      limit: this.page.limit,
      order: this.list.order,
    }, (res:any)=>{
      load.clear();
      const d: any = res.data;
      if(d.code==0) {
        this.total.time = d.time;
        this.total.list = d.data.total;
        this.page.total = d.data.total.total;
        this.list.data = d.data.list;
      }else{
        Ui.Toast(d.msg);
      }
    });
  }

  /* 编辑 */
  edit(action: any=''): void {
    const obj:any = this.$refs.tableList;
    const list: any = obj.getData();
    obj.checkboxAll(false);
    console.log('edit', list);
  }
  

}