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
/* 动作、搜索、更新、删除 */
import wmAction from '../../tools/Action.vue'
import wmSearch from '../../tools/Search.vue'
import actionSave from './save.vue'
import actionDel from './del.vue'
import actionExport from './export.vue'
import actionPerm from './perm.vue'

/* 系统菜单 */
@Options({
  components: {
    wmMain, wmAction, wmSearch, wmInput, wmButton, wmTable, wmPage, wmTableForm, wmDatePicker,
    actionSave, actionDel, actionExport, actionPerm
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
  total: any = {time: '', list: {}};
  list: any = {columns: [], data: [], num: 0, total: 0, order: ''};
  page: any = {total: 0, num:1, limit: 100};
  // 添加&编辑、删除、导出
  save: any = {show: false, title: '添加/编辑', type: '', data: {}};
  del: any = {show: false, title: '删除', data: []};
  exp: any = {show: false, title: '导出', num: 0};

  /* 创建成功 */
  public created(): void {
    // 搜索
    this.sea.columns = [
      {label: '选择日期范围', value: '', slot: 'time'},
      {label: '帐号', value: '', name: 'uname'},
      {label: '昵称', value: '', name: 'nickname'},
      {label: '部门', value: '', name: 'department'},
      {label: '职位', value: '', name: 'position'},
      {label: '姓名', value: '', name: 'name'},
      {label: '备注', value: '', name: 'remark'},
    ];
    // 字段
    this.list.columns = [
      {title: 'UID', index: 'id', slot: 'id', order: '', width: '80px', minWidth: '60px', textAlign: 'center'},
      {title: '头像', index: 'img', slot: 'img', width: '60px', minWidth: '60px', textAlign: 'center'},
      {title: '帐号', index: 'uname', slot: 'uname', order: '', width: '120px'},
      {title: '状态', index: 'state', slot: 'state', width: '60px', textAlign: 'center'},
      {title: '系统权限', index: 'perm', slot: 'perm', width: '120px', textAlign: 'center'},
      {title: '角色', index: 'type', slot: 'type', order: '', width: '100px', textAlign: 'center'},
      {title: '昵称', index: 'nickname'},
      {title: '部门', index: 'department'},
      {title: '职位', index: 'position'},
      {title: '姓名', index: 'name'},
      {title: '性别', index: 'gender', slot: 'gender', textAlign: 'center'},
      {title: '生日', index: 'birthday'},
      {title: '备注', index: 'remark'},
    ];
  }

  /* 创建完成 */
  activated(): void {
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

  /* 清除勾选 */
  clearSelect(): void {
    const obj:any = this.$refs.tableList;
    obj.checkboxAll(false);
  }

  /* 加载数据 */
  loadData(): void {
    this.sea.show = false;
    // 请求
    const load: any = Ui.Loading();
    Request.Post('sys_user/list', {
      token: this.state.token,
      data: this.getWhere(),
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
        this.clearSelect();
      }else{
        Ui.Toast(d.msg);
      }
    });
  }
  /* 数据 */
  getWhere(): object {
    const data: any = {
      key: this.sea.key,
      stime: typeof this.sea.time[0]=='string'?this.sea.time[0]:Time.Date('Y/m/d', this.sea.time[0]),
      etime: typeof this.sea.time[1]=='string'?this.sea.time[1]:Time.Date('Y/m/d', this.sea.time[1]),
    };
    // 搜索条件
    for(let v of this.sea.columns) {
      if(v.name) data[v.name] = v.value;
    }
    return data;
  }

  /* 添加&编辑 */
  saveData(type: string, val?: any): void {
    this.save.show = true;
    this.save.type = type;
    if(type=='add') {
      this.save.title = '新增';
      this.save.data = {};
    } else if(type=='edit') {
      this.save.title = '编辑';
      if(val) {
        this.save.data = val;
      } else {
        const obj:any = this.$refs.tableList;
        const data: Array<any> = obj.getData();
        this.save.data = data[0];
      }
      
    }
  }
  /* 添加&编辑回调 */
  saveSubmit(val: boolean): void {
    if(!val) return;
    this.save.show = false;
    this.loadData();
  }

  /* 删除 */
  delData(): void {
    this.del.show = true;
    const obj:any = this.$refs.tableList;
    const data: Array<any> = obj.getData();
    let ids: Array<number> = [];
    for(let v of data) ids.push(v.id);
    this.del.data = ids;
  }
  /* 删除回调 */
  delSubmit(val: boolean): void {
    if(!val) return;
    this.del.show = false;
    this.loadData();
  }

  /* 导出 */
  exportData(num: number): void {
    this.exp.show = true;
    this.exp.num = num;
  }
  /* 导出回调 */
  exportSubmit(val: boolean): void {
    if(!val) return;
    this.exp.show = false;
    this.clearSelect();
  }

}