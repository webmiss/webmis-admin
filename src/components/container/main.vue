<template>
  <div
    class="wm-main_body"
    :style="{
      width:'calc('+width+' - '+paddingX+' * 2)',
      height:'calc('+height+' - '+paddingY+' * 2)',
      lineHeight: lineHeight,
      backgroundColor: bgColor,
    }"
  >
    <div class="wm-main_ct scrollbar" :style="{
      width: width,
      height: height,
      padding: paddingY+' '+paddingX,
      overflowX: overflowX as any,
      overflowY: overflowY as any,
      textAlign: textAlign as any,
    }">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wm-main_body{position: relative;}
.wm-main_ct{width: 100%; height: 100%; line-height: 24px;}
</style>

<script setup lang="ts">

/* 参数 */
const props = defineProps({
  width: {type: String, default: '100%'},           // 宽
  height: {type: String, default: '100%'},          // 高
  lineHeight: {type: String, default: ''},          // 行高
  paddingX: {type: String, default: '16px'},        // x轴边距
  paddingY: {type: String, default: '16px'},        // y轴边距
  bgColor: {type: String, default: 'transparent'},  // 背景颜色
  overflowX: {type: String, default: ''},           // x轴滚动条
  overflowY: {type: String, default: ''},           // y轴滚动条
  textAlign: {type: String, default: 'left'},       // 文本-对齐方式
});

</script>