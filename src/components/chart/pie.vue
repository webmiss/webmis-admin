<template>
  <div ref="chart" class="wm-chart_pie">
    <div class="wm-chart_pie_html" v-if="html" v-html="html"></div>
  </div>
</template>

<style scoped>
.wm-chart_pie{position: relative; width: 100%; height: 100%;}
.wm-chart_pie_html{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center;}
</style>

<script setup lang="ts">
import { onMounted, watch, getCurrentInstance, nextTick } from 'vue';
import { Chart } from '@antv/g2';

/* 参数 */
const props = defineProps({
  type: String,                                 // 位置: dodge、stack
  value: Array<any>,                            // 数据: [{label: 'n1', value: 0.4}, {label: 'n2', value: 0.6}]
  theme: {type: String, default: 'classic'},    // 主题: classic、academy、classicDark
  height: {type: Number, default: 0},           // 高度
  html: {type: String, default: ''},            // Html
});
const { proxy } = getCurrentInstance() as any ;

/* 监听 */
watch(()=>props, (val: any)=>{
  // 初始化
  init();
},{ deep: true });

/* 创建完成 */
onMounted(()=>{
  init();
});

/* 初始化 */
const init = (): void => {
  nextTick(()=>{
    // 对象
    let obj: any = proxy.$refs.chart;
    const config: any = {
      container: obj,
      autoFit: true,
      forceFit: true,
      theme: props.theme,
    };
    if(props.height) config.height=props.height;
    const chart: any = new Chart(config);
    // 配置
    chart.interval().data(props.value)
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
    .tooltip({
      title: 'label',
      items: [
        { field: 'value', name: '数量' }
      ]
    })
    .legend(false);
    // 显示
    chart.render();
  });
}

</script>
