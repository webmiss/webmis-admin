<template>
  <div class="wm-popover_body" :style="{visibility:isShow?'inherit':'hidden'}">
    <wmPopup v-model:show="isShow" :position="position" width="100%" :height="height" @close="close()">
      <div class="wm-popover" :style="{backgroundColor: bgColor}">
        <div class="wm-popover_title">
          <h2>{{ title }}</h2>
          <i class="ui ui_close flex_center" @click="close()"></i>
        </div>
        <div class="wm-popover_content" :style="{height: 'calc(100% - 48px - '+($slots.bottom?bottomHeight:'0px')+')'}">
          <slot></slot>
        </div>
        <div class="wm-popover_bottom" :style="{height: bottomHeight}" v-if="$slots.bottom">
          <slot name="bottom"></slot>
        </div>
      </div>
    </wmPopup>
  </div>
</template>

<style lang="less" scoped>
.wm-popover_body{position: fixed; z-index: 999; top: 0; left: 0; width: 100%; height: 100%;}
.wm-popover{overflow: hidden; width: 100%; height: 100%; border-radius: 10px 10px 0 0;}
.wm-popover_title{position: relative; height: 48px; background-color: #FFF; display: flex; justify-content: center; align-items: center;}
.wm-popover_title h2{font-size: 15px; color: @Text; font-weight: bold;}
.wm-popover_title i{position: absolute; right: 10px; top: 50%; transform: translateY(-50%); width: 32px; height: 32px;}
.wm-popover_title i:active{color: @Primary;}
.wm-popover_content{position: relative; overflow-y: auto;}
.wm-popover_bottom{background-color: #FFF;}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import wmPopup from '../popup/index.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},                  // 是否显示
  title: {type: String, default: '标题'},                 // 高
  height: {type: String, default: 'calc(100% - 90px)'},   // 高
  position: {type: String, default: 'bottom'},            // 位置: let、right、top、bottom
  bgColor: {type: String, default: '#F2F2F2'},            // 背景颜色
  bottomHeight: {type: String, default: '50px'},          // 底部高度
});
const emit = defineEmits(['update:show', 'close']);
// 变量
const isShow = ref(false);

/* 监听 */
watch(()=>props.show, (val:boolean)=>{
  isShow.value = val;
}, { deep: true });

/* 关闭 */
const close = (): void => {
  // 隐藏
  emit('update:show', false);
  emit('close');
}

</script>