<template>
  <div style="position: relative; width: 100%; height: 100%;" :style="{visibility:show?'inherit':'hidden'}">
    <div ref="PopupBG" class="wm-popup_bg" :style="{backgroundColor:'rgba(0,0,0,'+opacity+')'}" @click="_clickBG"></div>
    <div ref="PopupBody" class="wm-popup_body" :style="{width:width, height:height, backgroundColor:bgColor, borderRadius:radius}">
      <slot></slot>
    </div>
  </div>
</template>
  
<style scoped>
.wm-popup_bg,.wm-popup_body{position: absolute; z-index: 99;}
.wm-popup_bg{width: 100%; height: 100%; top: 0; left: 0; opacity: 0;}
.wm-popup_body{overflow: hidden; opacity: 0;}
</style>
  
<script setup lang="ts">
import { onMounted, watch, getCurrentInstance, nextTick } from 'vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},          // 是否显示
  position: {type: String, default: 'center'},    // 位置: center、left、right、top、bottom
  width: {type: String, default: ''},             // 内容宽度
  height: {type: String, default: ''},            // 内容高度
  opacity: {type: Number, default: 0.4},          // 背景透明度
  bgColor: {type: String, default: ''},           // 内容背景颜色
  radius: {type: String, default: ''},            // 圆角
  bgClose: {type: Boolean, default: true},        // 点击背景关闭
  time: {type: Number, default: 400},             // 动画时间
});
const { proxy } = getCurrentInstance() as any ;
const emit = defineEmits(['update:show', 'close']);

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  // 动画
  _animation(props.show);
},{ deep: true });

/* 创建完成 */
onMounted(()=>{
  init();
});

/* 初始化 */
const init = (): void =>{
  const bg: any = proxy.$refs.PopupBG;
  const body: any = proxy.$refs.PopupBody;
  // 默认值
  bg.style.opacity = 0;
  if(props.position=='left'){
    body.style.height = '30%';
    body.style.left = 0;
    body.style.opacity = 0;
    body.style.transform = 'translate(-30%, 0)';
  }else if(props.position=='right'){
    body.style.height = '100%';
    body.style.right = 0;
    body.style.opacity = 0;
    body.style.transform = 'translate(30%, 0)';
  }else if(props.position=='top'){
    body.style.width = '100%';
    body.style.top = 0;
    body.style.opacity = 1;
    body.style.transform = 'translate(0, -30%)';
  }else if(props.position=='bottom'){
    body.style.width = '100%';
    body.style.left = 0;
    body.style.bottom = 0;
    body.style.opacity = 0;
    body.style.transform = 'translate(0, 30%)';
  }else{
    body.style.left = '50%';
    body.style.top = '50%';
    body.style.opacity = 0;
    body.style.transform = 'translate(-50%, -50%)';
  }
}

/* 显示 */
const _showBody = (): void => {
  const bg: any = proxy.$refs.PopupBG;
  const body: any = proxy.$refs.PopupBody;
  // 动画
  bg.style.transitionDuration = props.time+'ms';
  body.style.transitionDuration = props.time+'ms';
  // 属性
  bg.style.opacity = 1;
  body.style.opacity = 1;
  if(props.position=='left'){
    body.style.transform = 'translate(-1px, 0)';
  }else if(props.position=='right'){
    body.style.transform = 'translate(1px, 0)';
  }else if(props.position=='top'){
    body.style.transform = 'translate(0, -1px)';
  }else if(props.position=='bottom'){
    body.style.transform = 'translate(0, 1px)';
  }else{
    body.style.top = '50%';
  }
  // 更新状态
  nextTick(()=>{
    emit('update:show', true);
  });
}

/* 隐藏 */
const _hideBody = (): void => {
  const bg: any = proxy.$refs.PopupBG;
  const body: any = proxy.$refs.PopupBody;
  // 动画
  bg.style.transitionDuration = props.time+'ms';
  body.style.transitionDuration = props.time+'ms';
  // 属性
  bg.style.opacity = 0;
  body.style.opacity = 0;
  if(props.position=='left'){
    body.style.transform = 'translate(-30%, 0)';
  }else if(props.position=='right'){
    body.style.transform = 'translate(30%, 0)';
  }else if(props.position=='top'){
    body.style.transform = 'translate(0, -30%)';
  }else if(props.position=='bottom'){
    body.style.transform = 'translate(0, 30%)';
  }else{
    body.style.top = '30%'
  }
  // 更新状态
  nextTick(()=>{
    emit('update:show', false);
  });
}

/* 控制动画 */
const _animation = (show: boolean): void => {
  if(show) _showBody();
  else _hideBody();
}

/* 点击背景 */
const _clickBG = (): void => {
  if(props.bgClose) close();
}

/* 关闭 */
const close = (): void => {
  _animation(false);
  emit('close', false);
}

</script>