import { Options } from 'vue-class-component';
import Base from '../../service/Base'
/* 组件 */
import wmMain from '@/components/container/main.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmDatePicker from '@/components/datepicker/index.vue'
/* 搜索 */
import wmSearch from '../tools/Search.vue'

/* 系统菜单 */
@Options({
  components: { wmMain, wmSearch, wmInput, wmButton, wmTableForm, wmDatePicker },
})
export default class SysMenus extends Base {

  /* 搜索 */
  sea: any = {show: false, form:{title:''}}

  /* 创建成功 */
  public created(): void {
    
  }

  /* 创建完成 */
  public mounted(): void {
  }
  activated(): void {
    console.log('menus');
  }

}