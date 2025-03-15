<template>
  <div id="container" ref="chart" class="wm-interval_body"></div>
</template>

<style scoped>
.wm-interval_body{width: 100%; height: 100%;}
</style>

<script setup lang="ts">
import { ref, onMounted, watch, getCurrentInstance, nextTick } from 'vue';
import { Chart } from '@antv/g2';

/* 参数 */
const props = defineProps({
  type: String,                                  // 类型: dodge、stack
  value: Array<any>,                             // 数据: [{label: 'n1', value: 0.4}, {label: 'n2', value: 0.6}]
  theme: {type: String, default: 'classic'},     // 主题: classic、academy、classicDark
  color: {type: String, default: 'label'},       // 分组数据
  height: {type: Number, default: 0},            // 高
  unit: {type: String, default: ''},             // 单位
});
const { proxy } = getCurrentInstance() as any ;
/* 变量 */
const auto_height = ref(0);

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
    if(!auto_height.value) auto_height.value=obj.offsetHeight;
    const config: any = {
      container: obj,
      autoFit: true,
      forceFit: true,
      theme: props.theme,
    };
    if(props.height) config.height=props.height;
    const chart = new Chart(config);
    // 配置
    chart.interval().data(props.value)
    .encode('color', props.color)
    .encode('x', (d: any)=>d.label)
    .encode('y', (d: any)=>d.value)
    .style('radiusTopLeft', 4)
    .style('radiusTopRight', 4)
    .style('maxWidth', 80);
    // 显示
    chart.render();
  });
}

</script>