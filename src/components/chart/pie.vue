<template>
  <div id="container" ref="chart" class="wm-chart_pie">
    <div class="wm-chart_pie_html" v-if="html" v-html="html"></div>
  </div>
</template>

<style scoped>
.wm-chart_pie{position: relative; width: 100%; height: 100%;}
.wm-chart_pie_html{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Chart } from '@antv/g2'

@Options({
  props: {
    type: String,                             // 位置: dodge、stack
    value: Array<any>,                        // 数据: [{label: 'n1', value: 0.4}, {label: 'n2', value: 0.6}]
    height: {type: Number, default: 240},     // 高度
    html: {type: String, default: ''},        // Html
  }
})
export default class Pie extends Vue {
  // 参数
  type!: String;                
  value!: Array<any>;
  height!: Number;
  html!: String;
  // 变量
  private chart: any = null;

  /* 创建成功 */
  created(): void {
    // 监听
    this.$watch('$props', (props:any)=>{
      // 初始化
      this.init();
    }, { deep: true });
  }

  /* 创建完成 */
  mounted(): void {
    // 初始化
    this.init();
  }

  /* 初始化 */
  init(): void {
    const config: any = {container: this.$refs.chart, autoFit: true, height: this.height};
    this.chart = new Chart(config);
    // 显示
    this.chart.interval().data(this.value)
    .theme({
      type: 'classicDark',
      view: { viewFill: 'transparent' }
    })
    .coordinate({
      type: 'theta',
      radius: 0.75,
      innerRadius: 0.45
    })
    .encode('y', 'value')
    .encode('color', 'label')
    .transform({ type: 'stackY' })
    .label({
      text: 'value',
      offset: 14,
      fontWeight: 'bold',
    })
    .label({
      text: 'label',
      position: 'spider',
      connectorDistance: 0,
      fontWeight: 'bold',
      textBaseline: 'bottom',
      textAlign: (d: any) => (['c', 'sass'].includes(d.id) ? 'end' : 'start'),
      dy: -4,
    })
    .style('radius', 4)
    .style('inset', 1)
    .animate('enter', { type: 'waveIn', duration: 1000 })
    .legend(false);
    // 显示
    this.chart.render();
    // 重新计算宽度
    // const e: Event = document.createEvent('Event');
    // e.initEvent('resize', true, true);
    // window.dispatchEvent(e);
  }

}
</script>