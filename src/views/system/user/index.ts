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
import wmTag from '@/components/tag/index.vue'
import wmPage from '@/components/page/index.vue'
import wmDatePicker from '@/components/datepicker/index.vue'
import wmSelect from '@/components/form/select/index.vue'
import wmImg from '@/components/image/index.vue'
/* 统计、动作、搜索、更新、删除、导出 */
import wmTotal from '../../tools/Total.vue'
import wmAction from '../../tools/Action.vue'
import wmSearch from '../../tools/Search.vue'
import actionSave from './save.vue'
import actionDel from './del.vue'
import actionExport from './export.vue'

/* 系统菜单 */
@Options({
  components: {
    wmMain, wmSearch, wmInput, wmButton, wmTable, wmTableForm, wmTag, wmPage, wmDatePicker, wmSelect, wmImg,
    wmTotal, wmAction, actionSave, actionDel, actionExport
  },
})
export default class SysMenus extends Base {

  // 状态
  private store: any = useStore();
  private state: any = this.store.state;
  // 语言
  langs: any = this.state.langs;
  // 搜索
  sea: any = {
    show: false, key: '', placeholder:'Fid、名称、接口等',
    time: [Time.Date('Y/m/d', Time.StrToTime('-3 year')), Time.Date('Y/m/d')], maxDate: Time.Date('Y/m/d'),
    columns:[],
    type: '',
    role: '',
  }
  // 列表
  total: any = {time: '', list: {}};
  list: any = {columns: [], data: [], num: 0, total: 0, order: ''};
  page: any = {total: 0, num:1, limit: 100};
  // 添加&编辑、删除、导出
  save: any = {show: false, title: '添加/编辑', type: '', data: {}};
  del: any = {show: false, title: '删除', data: []};
  exp: any = {show: false, title: '导出', num: 0};
  // 全部分类
  selectAll: any = {type: [], role: [], perm: []};

  /* 创建成功 */
  public created(): void {
    // 搜索
    this.sea.columns = [
      {label: this.langs.select, value: '', slot: 'time'},
      {label: this.langs.sys_user_type, value: '', slot: 'type'},
      {label: this.langs.sys_user_role, value: '', slot: 'role'},
      {label: this.langs.sys_user_uname, value: '', name: 'uname'},
      {label: this.langs.sys_user_nickname, value: '', name: 'nickname'},
      {label: this.langs.sys_user_department, value: '', name: 'department'},
      {label: this.langs.sys_user_position, value: '', name: 'position'},
      {label: this.langs.sys_user_name, value: '', name: 'name'},
      {label: this.langs.remark, value: '', name: 'remark'},
    ];
    // 字段
    this.list.columns = [
      {title: 'UID', index: 'id', slot: 'id', order: '', width: '80px', minWidth: '60px', textAlign: 'center'},
      {title: this.langs.date, index: 'date', slot: 'date', width: '120px', minWidth: '110px', textAlign: 'center'},
      {title: this.langs.sys_user_type, index: 'type', slot: 'type', order: '', width: '80px', minWidth: '80px', textAlign: 'center'},
      {title: this.langs.sys_user_image, index: 'img', slot: 'img', width: '60px', minWidth: '60px', textAlign: 'center'},
      {title: this.langs.sys_user_uname, index: 'uname', slot: 'uname', order: '', width: '120px'},
      {title: this.langs.status, index: 'status', slot: 'status', width: '60px', textAlign: 'center'},
      {title: this.langs.action, index: 'action', slot: 'action', width: '60px', textAlign: 'center'},
      {title: this.langs.sys_user_perm, index: 'perm', slot: 'perm', width: '120px', textAlign: 'center'},
      {title: this.langs.sys_user_nickname, index: 'nickname'},
      {title: this.langs.sys_user_department, index: 'department'},
      {title: this.langs.sys_user_position, index: 'position'},
      {title: this.langs.sys_user_name, index: 'name'},
      {title: this.langs.sys_user_gender, index: 'gender', slot: 'gender', textAlign: 'center'},
      {title: this.langs.sys_user_birthday, index: 'birthday'},
      {title: this.langs.remark, index: 'remark'},
    ];
  }

  /* 创建完成 */
  activated(): void {
    // 加载
    if(this.state.token) {
      this.getSelect();
      this.loadData();
    }
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
    this.sea.type = '';
    this.sea.role = '';
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
    Request.Post('sys_user/list?lang='+this.state.lang, {
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
      type: this.sea.type,
      role: this.sea.role,
    };
    // 搜索条件
    for(let v of this.sea.columns) {
      if(v.name) data[v.name] = v.value;
    }
    return data;
  }

  /* 添加&编辑 */
  saveData(type: string, data?: any): void {
    this.save.show = true;
    this.save.type = type;
    if(type=='add') {
      this.save.title = this.langs.add;
      this.save.data = {};
    } else if(type=='edit') {
      this.save.title = this.langs.edit;
      if(data) {
        this.save.data = data;
      } else {
        const obj:any = this.$refs.tableList;
        const data: Array<any> = obj.getData();
        this.save.data = data[0];
      }
    } else if(type=='copy') {
      this.save.title = this.langs.copy;
      data.id = '';
      data.uname = '';
      data.tel = '';
      data.email = '';
      this.save.data = data;
    }
    // 选项
    this.save.data.selectAll = this.selectAll;
  }
  /* 添加&编辑-回调 */
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
  /* 删除-回调 */
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
  /* 导出-回调 */
  exportSubmit(val: boolean): void {
    if(!val) return;
    this.exp.show = false;
    this.clearSelect();
  }

  /* 选项 */
  getSelect(): void {
    Request.Post('sys_user/get_select?lang='+this.state.lang, {
      token: this.state.token,
    }, (res:any)=>{
      const d: any = res.data;
      if(d.code==0) {
        this.selectAll.type = d.data.type;
        this.selectAll.role = d.data.role;
      }
      else Ui.Toast(d.msg);
    });
  }

}