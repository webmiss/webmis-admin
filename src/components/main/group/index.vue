<template>
  <div class="wm-group"
    :style="{
      margin: margin,
      padding:padding,
      borderColor:borderColor,
      backgroundColor:backgroundColor,
    }"
  >
    <span class="wm-group_title" :style="{color:color}">{{ label }}</span>
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.wm-group{position: relative; margin: 10px 0; padding: 16px 10px; border: transparent 1px solid; border-radius: 4px;}
.wm-group_title{position: absolute; left: 10px; top: -11px; font-size: 14px; color: @Info;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Row',
  props: {
    label: {type: String, default: '信息'},               //标题
    color: {type: String, default: '#A2A4A8'},            //标题颜色
    margin: {type: String, default: '10px 0'},            //外部间距
    padding: {type: String, default: '16px 10px'},        //内部间距
    borderColor: {type: String, default: '#E2E4E8'},      //边框颜色
    backgroundColor: {type: String, default: '#F2F4F8'},  //背景颜色
  },
});
</script>