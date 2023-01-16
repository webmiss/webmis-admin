<template>
  <span class="wm-label">
    <span class="wm-label_text" v-html="content" :style="{left:left, top:top, zoom:zoom, padding:padding, lineHeight: lineHeight, color:color, backgroundColor:bgColor, fontSize:fontSize, borderRadius:radius}"></span>
    <slot></slot>
  </span>
</template>

<style scoped>
.wm-label{position: relative;}
.wm-label_text{position: absolute; left: 100%; top: -50%; z-index: 10; white-space: nowrap; border-radius: 10px;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Main',
  props: {
    content: {type: String, default: ''},         //内容
    left: {type: String, default: '100%'},        //左
    top: {type: String, default: '-50%'},         //顶
    zoom: {type: String, default: '0.8'},         //缩放
    padding: {type: String, default: '0 8px'},    //内部间距
    color: {type: String, default: '#FFF'},       //文本颜色
    bgColor: {type: String, default: '#606266'},  //背景颜色
    fontSize: {type: String, default: '12px'},    //字体大小
    lineHeight: {type: String, default: '20px'},  //行高
    radius: {type: String, default: '10px'},      //圆角
  },
});
</script>