<template>
  <div id="container" ref="chart" class="wm-interval_body"></div>
</template>

<style scoped>
.wm-interval_body{width: 100%; height: 100%;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Chart } from '@antv/g2'

@Options({
  props: {
    type: String,                                  // 类型: dodge、stack
    value: Array<any>,                             // 数据: [{label: 'n1', value: 0.4}, {label: 'n2', value: 0.6}]
    theme: {type: String, default: 'classic'},     // 主题: classic、academy、classicDark
    color: {type: String, default: 'label'},       // 分组数据
    height: {type: Number, default: 0},            // 高
    unit: {type: String, default: ''},             // 单位
  }
})
export default class Interval extends Vue {

  // 参数
  type!: String;
  value!: Array<any>;
  theme!: String;
  color!: String;
  height!: Number;
  unit!: String;

  private auto_height: Number = 0;

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
      if(!this.auto_height) this.auto_height=obj.offsetHeight;
      const config: any = {
        container: obj,
        autoFit: true,
        forceFit: true,
        theme: this.theme,
      };
      if(this.height) config.height=this.height;
      const chart = new Chart(config);
      // 配置
      chart.interval().data(this.value)
      .encode('color', this.color)
      .encode('x', (d: any)=>d.label)
      .encode('y', (d: any)=>d.value)
      .style('radiusTopLeft', 4)
      .style('radiusTopRight', 4)
      .style('maxWidth', 80);
      // 显示
      chart.render();
    });
  }

}
</script>