import { Options } from 'vue-class-component';
import Base from '../service/Base'
/* UI组件 */
import wmChartPie from '../components/chart/pie.vue'

@Options({
  components: {wmChartPie},
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