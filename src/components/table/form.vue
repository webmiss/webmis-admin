<template>
  <table class="wm-table_form" :style="{width: width, height: height}">
    <slot></slot>
  </table>
</template>

<style lang="less">
.wm-table_form{width: 100%; border-collapse: collapse;}
.wm-table_form td{padding: 4px 8px; height: 32px; line-height: 1; white-space: nowrap; border: #FFF 1px solid;}
.wm-table_form .title td{color: @Minor4; font-weight: bold; font-size: 14px; background-color: #F4F6F8;}
.wm-table_form .label{max-width: 120px; width: 80px; text-align: right; color: rgba(0,0,0,.6);}
.wm-table_form .title{font-size: 14px; font-weight: 700; text-indent: 4px; background-color: #f4f4f4;}
.wm-table_form .red_dot{position: relative;}
.wm-table_form .red_dot::after{content: '*'; position: absolute; right: -12px; top: 20%; color: @Danger; font-size: 20px;}
</style>

<script setup lang="ts">

/* 参数 */
const props = defineProps({
  width: {type: String, default: '100%'},     // 宽
  height: {type: String, default: 'auto'},    // 高
});

</script>
