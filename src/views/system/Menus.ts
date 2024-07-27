import { Options } from 'vue-class-component';
import Base from '../../service/Base'

/* 系统菜单 */
@Options({
  components: {},
})
export default class Menus extends Base {

  /* 创建成功 */
  public created(): void {
    
  }

  /* 创建完成 */
  public mounted(): void {
    this.Print('Menus created');
  }

}