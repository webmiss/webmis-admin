<template>
  <div class="wm-popover">
    <div class="wm-popover_body" :class="position">
      <div class="ct">
        <p>123</p><p>456789</p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.wm-popover{position: relative; display: inline-block;}
.wm-popover_body{position: absolute; z-index: 1;}
.wm-popover_body .ct{position: absolute; z-index: 999; padding: 10px; border-radius: 2px; border: @BaseBorder 1px solid; background-color: #FFF; box-shadow: 0 0 12px rgba(0,0,0,0.2);}
.wm-popover_body.top{top: -8px; left: 50%;}
.wm-popover_body.top .ct{bottom: 0; left: 50%; transform: translateX(-50%);}

</style>

<script setup lang="ts">
import { onMounted, watch } from 'vue';

/* 参数 */
const props = defineProps({
  show: {type: String, default: ''},               // 是否显示
  height: {type: String, default: '40px'},         // 高
  position: {type: String, default: 'top'},        // 位置: let、right、top、bottom
});

/* 监听 */
watch(()=>props.show, (val: string)=>{
  init();
},{ deep: true });

/* 创建完成 */
onMounted(()=>{
  init();
});

/* 初始化 */
const init = (): void => {
  
}

</script>