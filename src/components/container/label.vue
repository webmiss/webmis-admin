<template>
  <span class="wm-label_body">
    <span class="wm-label_ct" :style="{
      color: options.color || color,
      backgroundColor: options.bgColor || bgColor,
      fontSize: options.fontSize || fontSize,
      padding: options.padding || padding,
      zoom: options.zoom || zoom,
    }">
      {{ options.content?options.content:content }}
    </span>
    <slot></slot>
  </span>
</template>

<style lang="less" scoped>
.wm-label_body{position: relative;}
.wm-label_ct{position: absolute; line-height: 20px; border-radius: 10px; z-index: 1; left: 96%; top: 0%; transform: translateY(-50%);}
</style>

<script setup lang="ts">

/* 参数 */
const props = defineProps({
  options: {type: Object, default: {}},          // 配置
  content: {type: String, default: ''},          // 内容
  color: {type: String, default: '#FFF'},        // 文本颜色
  bgColor: {type: String, default: '#000'},      // 背景颜色
  fontSize: {type: String, default: '12px'},     // 文本大小
  padding: {type: String, default: '0 6px'},     // 内部间距
  zoom: {type: String, default: '0.8'},          // 缩放
});

</script>