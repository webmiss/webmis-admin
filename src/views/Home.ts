import { Options } from 'vue-class-component';
import Base from '../service/Base'

@Options({
  components: {},
})
export default class Home extends Base {

  public full_screen: boolean = false;

  /* 创建成功 */
  public created(): void {

  }

  /* 创建完成 */
  public mounted(): void {

  }

}