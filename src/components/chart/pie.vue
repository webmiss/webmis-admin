<template>
  <div ref="chart" class="wm-chart_pie">
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
    type: String,                                 // 位置: dodge、stack
    value: Array<any>,                            // 数据: [{label: 'n1', value: 0.4}, {label: 'n2', value: 0.6}]
    theme: {type: String, default: 'classic'},    // 主题: classic、academy、classicDark
    height: {type: Number, default: 0},           // 高度
    html: {type: String, default: ''},            // Html
  }
})
export default class Pie extends Vue {

  // 参数
  type!: String;                
  value!: Array<any>;
  theme!: String;
  height!: Number;
  html!: String;

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
    this.$nextTick(()=>{
      // 对象
      let obj: any = this.$refs.chart;
      const config: any = {
        container: obj,
        autoFit: true,
        forceFit: true,
        theme: this.theme,
      };
      if(this.height) config.height=this.height;
      const chart: any = new Chart(config);
      // 配置
      chart.interval().data(this.value)
      .coordinate({
        type: 'theta',
        radius: 0.75,
        innerRadius: 0.45
      })
      .encode('y', 'value')
      .encode('color', 'label')
      .transform({ type: 'stackY' })
      .style('radius', 4)
      .style('inset', 1)
      .animate('enter', { type: 'waveIn', duration: 600 })
      .legend(false);
      // 显示
      chart.render();
    });
  }

}
</script>