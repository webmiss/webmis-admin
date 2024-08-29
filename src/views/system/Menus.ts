import { Options } from 'vue-class-component';
import { useStore } from 'vuex';
import Base from '../../service/Base'
/* 组件 */
import wmMain from '@/components/container/main.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmTable from '@/components/table/index.vue'
import wmPage from '@/components/page/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmDatePicker from '@/components/datepicker/index.vue'
/* 搜索 */
import wmSearch from '../tools/Search.vue'

/* 系统菜单 */
@Options({
  components: { wmMain, wmSearch, wmInput, wmButton, wmTable, wmPage, wmTableForm, wmDatePicker },
})
export default class SysMenus extends Base {

  /* 搜索 */
  sea: any = {show: false, keys:'', form:{title:'', en:'', url:'', controller:''}}
  // 状态
  private store: any = useStore();
  private state: any = this.store.state;
  /* 列表 */
  list: any = {columns: [], data: [], num: 0, total: 0};
  page: any = {total: 0, num:1, limit: 100};

  /* 创建成功 */
  public created(): void {
  }

  /* 创建完成 */
  activated(): void {
    // 字段
    this.list.columns = [
      {title: 'ID', width: '40px', index: 'id', slot: 'id', textAlign: 'center'},
      {title: '名称', width: '120px', index: 'title', slot: 'title', textAlign: 'center', order: ''},
      {title: '备注', index: 'remark'},
    ];
    // // 数据
    // this.list.data = [
    //   {id: 1, title: '系统', remark: ''},
    //   {id: 2, title: '其它', remark: ''},
    // ];
    // // 统计
    // this.page.total = 253;
    if(this.state.token) this.loadData();
  }

  /* 选中状态 */
  selectState(n:number, t:number): void {
    this.list.num = n;
    this.list.total = t;
  }

  /* 重置条件 */
  resetData(): void {
    this.sea.keys = '';
    this.sea.form.title = '';
    this.sea.form.en = '';
    this.sea.form.url = '';
    this.sea.form.controller = '';
    this.page.num = 1;
    this.loadData();
  }

  /* 加载数据 */
  loadData(): void {
    this.sea.show = false;
    console.log('sea', this.sea.keys);
    console.log('loadData', this.page.total, this.page.num, this.page.limit);
  }

  /* 编辑 */
  edit(): void {
    const obj:any = this.$refs.tableList;
    const list: any = obj.getData();
    obj.checkboxAll(false);
    console.log('edit', list);
  }
  

}