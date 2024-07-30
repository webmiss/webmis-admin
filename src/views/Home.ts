import { Options } from 'vue-class-component';
import Base from '../service/Base'
/* UI组件 */
import wmChartPie from '../components/chart/pie.vue'
import wmChartInterval from '../components/chart/interval.vue'

@Options({
  components: {wmChartPie, wmChartInterval},
})
export default class Home extends Base {

  full_screen: boolean = false;
  chart: any = {active: 'c1', pie:[], interval: []};

  /* 创建成功 */
  public created(): void {

  }

  /* 创建完成 */
  public mounted(): void {
    // 图表数据
    this.chart.pie = [
      {label: 'n1', value: 100},
      {label: 'n2', value: 200},
    ];
    this.chickChart('c1');
  }

  /* 图表 */
  public chickChart(name: string): void {
    const data: any = {
      c1: [
        {label: 'n1', value: 100},
        {label: 'n2', value: 200},
        {label: 'n3', value: 150},
      ],
      c2: [
        {label: 'n1', value: 300},
        {label: 'n2', value: 200},
        {label: 'n3', value: 450},
      ],
    };
    this.chart.active = name;
    this.chart.interval = data[name];
  }

}