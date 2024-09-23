import { Options } from 'vue-class-component';
import Base from '../service/Base'
/* UI组件 */
import wmChartPie from '../components/chart/pie.vue'
import wmChartInterval from '../components/chart/interval.vue'

@Options({
  components: {wmChartPie, wmChartInterval},
})
export default class Home extends Base {

  // 全屏
  full_screen: boolean = false;
  // 图表
  chart: any = {active:'c1', pie:[], interval: []};

  /* 创建成功 */
  created(): void {

  }

  /* 创建完成 */
  mounted(): void {
  }
  activated(): void {
    this.chickChart('c2');
    this.loadData();
  }

  /* 加载数据 */
  loadData(): void {
    // 图表数据
    this.chart.pie = [
      {label: 'n1', value: 90},
      {label: 'n2', value: 200},
      {label: 'n3', value: 120},
    ];
    this.chickChart(this.chart.active);
  }

  /* 图表 */
  chickChart(name: string): void {
    const data: any = {
      c1: [
        {label: 'n1', value: 100},
        {label: 'n2', value: 50},
        {label: 'n3', value: 110},
        {label: 'n4', value: 360},
        {label: 'n5', value: 240},
        {label: 'n6', value: 120},
      ],
      c2: [
        {label: 'n1', value: 300},
        {label: 'n2', value: 200},
        {label: 'n3', value: 450},
      ],
      c3: [
        {label: 'n1', value: 100},
        {label: 'n2', value: 200},
        {label: 'n3', value: 150},
        {label: 'n4', value: 280},
        {label: 'n5', value: 120},
        {label: 'n6', value: 80},
      ],
      c4: [
        {label: 'n1', value: 60},
        {label: 'n2', value: 30},
        {label: 'n3', value: 180},
        {label: 'n4', value: 260},
        {label: 'n5', value: 210},
      ],
      c5: [
        {label: 'n1', value: 80},
        {label: 'n2', value: 210},
        {label: 'n3', value: 110},
      ],
    };
    this.chart.active = name;
    this.chart.interval = data[name];
  }

}