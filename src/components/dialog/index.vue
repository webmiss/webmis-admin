<template>
  <div class="wm-dialog_body" :style="{visibility:cfg.show?'inherit':'hidden'}">
    <wmPopup ref="Popup" v-model:show="cfg.show" width="100%" height="100%" position="top" :time="600">
      <div class="wm-dialog_bg" @click="close(bgClose?true:false)"></div>
      <div class="wm-dialog" :style="{width:width, maxWidth:maxWidth, height:height, borderRadius:borderRadius}">
        <!-- Title -->
        <div class="wm-dialog_title">
          <span>{{ title }}</span>
          <div class="wm-dialog_close" @click="close(bgClose?true:false)"></div>
        </div>
        <!-- Top -->
        <div class="wm-dialog_top" v-if="top" :style="{height:top+'', lineHeight:top+''}">
          <slot name="top"></slot>
        </div>
        <!-- Content -->
        <div class="wm-dialog_content scrollbar" :style="{overflow: overflow, maxHeight: 'calc('+cfg.height+'px - 46px - 40px - '+top+' - '+bottom+')'}">
          <slot></slot>
        </div>
        <!-- Bottom -->
        <div class="wm-dialog_bottom flex_center" v-if="bottom" :style="{height:bottom+'', lineHeight:bottom+''}">
          <slot name="bottom"></slot>
        </div>
      </div>
    </wmPopup>
  </div>
</template>
  
<style lang="less" scoped>
.wm-dialog_body{position: fixed; z-index: 999; width: calc(100% + 1px); height: calc(100% + 1px); left: 0; top: 0;}
.wm-dialog_bg{position: absolute; width: 100%; height: 100%;}
.wm-dialog{position: absolute; z-index: 1; max-width: calc(100% - 20px); max-height: calc(100% - 20px); left: 50%; top: 50%; transform: translate(-50%, -50%); background-color: #FFF;}
.wm-dialog_title{position: relative; padding: 4px 0; height: 32px; line-height: 32px; text-align: center; font-size: 15px; font-weight: bold;}
.wm-dialog_title:hover i{color: @Primary;}
.wm-dialog_close{position: absolute; cursor: pointer; top: 4px; right: 4px; width: 32px; height: 32px; line-height: 32px; text-align: center;}
.wm-dialog_close:hover::after,.wm-dialog_close:hover::before{background-color: @Primary;}
.wm-dialog_close::after,.wm-dialog_close::before{content: ''; position: absolute; width: 12px; height: 1.6px; background-color: #666; left: 50%; top: 50%; transform-origin: center;}
.wm-dialog_close::after{transform: rotate(45deg); margin-left: -16%;}
.wm-dialog_close::before{transform: rotate(-45deg); margin-left: -16%;}
.wm-dialog_top{position: relative; overflow: hidden;}
.wm-dialog_content{width: 100%; height: 100%;}
.wm-dialog_bottom{position: relative; padding: 16px 0; text-align: center;}
</style>
  
<script setup lang="ts">
import { ref, watch } from 'vue';
import wmPopup from '../../components/popup/index.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},          // 是否显示
  title: {type: String, default: ''},             // 标题
  width: {type: String, default: '360px'},        // 内容宽度
  maxWidth: {type: String, default: '1920px'},    // 最大宽度
  height: {type: String, default: 'auto'},        // 内容高度
  overflow: {type: String, default: 'inherit'},   // 内容滚动条
  borderRadius: {type: String, default: '4px'},   // 圆角
  top: {type: String, default: '0px'},            // 顶部高度
  bottom: {type: String, default: ''},            // 底部高度
  bgClose: {type: Boolean, default: true},        // 点击关闭
});
const emit = defineEmits(['update:show', 'close']);
// 变量
const cfg = ref({show: false, width:0, height:0});

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  cfg.value.show = val;
  if(val) {
    cfg.value.width =  window.innerWidth;
    cfg.value.height =  window.innerHeight;
    // 事件
    document.addEventListener('keydown', keydownFun);
  }
},{ deep: true });

/* 键盘事件 */
const keydownFun = (event: any): void => {
  const keyCode: any = event.keyCode || event.which;
  switch (keyCode) {
    case 27: close(true); break;
  }
}

/* 关闭 */
const close = (isTrue: Boolean): void => {
  // 事件
  if(isTrue) emit('update:show', false);
  emit('close', false);
  // 移除
  document.removeEventListener('keydown', keydownFun);
}

</script>
