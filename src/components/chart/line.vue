<template>
  <div ref="chart" class="wm-line_body"></div>
</template>

<style scoped>
.wm-line_body{width: 100%; height: 100%;}
</style>

<script setup lang="ts">
import { ref, onMounted, watch, getCurrentInstance, nextTick } from 'vue';
import { Chart } from '@antv/g2';

/* 参数 */
const props = defineProps({
  value: Array<any>,                             // 数据: [{type: 'n', label: 'n1', value: 0.4}, {type: 'n', label: 'n2', value: 0.6}]
  theme: {type: String, default: 'classic'},     // 主题: classic、academy、classicDark
  color: {type: String, default: 'type'},        // 分组数据
  height: {type: Number, default: 0},            // 高
  unit: {type: String, default: ''},             // 单位
});
/* 公共 */
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
    chart.data(props.value)
    .encode('color', props.color)
    .encode('x', (d: any)=>d.label)
    .encode('y', (d: any)=>d.value)
    chart.line().encode('shape', 'smooth');
    chart.point().encode('shape', 'point').tooltip(false);
    // 显示
    chart.render();
  });
}

</script>