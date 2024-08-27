import { Options } from 'vue-class-component';
import Base from '../../service/Base'
/* 组件 */
import wmMain from '@/components/container/main.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmTable from '@/components/table/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmDatePicker from '@/components/datepicker/index.vue'
/* 搜索 */
import wmSearch from '../tools/Search.vue'

/* 系统菜单 */
@Options({
  components: { wmMain, wmSearch, wmInput, wmButton, wmTable, wmTableForm, wmDatePicker },
})
export default class SysMenus extends Base {

  /* 搜索 */
  sea: any = {show: false, form:{title:''}}
  /* 列表 */
  list: any = {columns:[], data: [], num: 0, total: 0};

  /* 创建成功 */
  public created(): void {
    
  }

  /* 创建完成 */
  public mounted(): void {
  }
  activated(): void {
    // 字段
    this.list.columns = [
      {title: 'ID', width: '40px', index: 'id', slot: 'id', textAlign: 'center'},
      {title: '名称', width: '120px', index: 'title', slot: 'title', textAlign: 'center', order: ''},
      {title: '备注', index: 'remark'},
    ];
    // 数据
    this.list.data = [
      {id: 1, title: '系统', remark: ''},
      {id: 2, title: '其它', remark: ''},
    ];
    console.log('menus');
  }

  /* 选中状态 */
  selectState(n:number, t:number): void {
    this.list.num = n;
    this.list.total = t;
  }

  /* 编辑 */
  edit(): void {
    const obj:any = this.$refs.tableList;
    const list: any = obj.getData();
    console.log(list);
  }
  

}