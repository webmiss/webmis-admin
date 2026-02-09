<template>
  <div class="wm-swipe" ref="swipe" @touchstart.passive="start" @touchmove.passive="move" @touchend.passive="end">
    <div ref="scroll" class="wm-swipe_cen" :class="(direction=='left'||direction=='right')?'wm-swipe_cen_x':'wm-swipe_cen_y'">
      <slot></slot>
    </div>
    <div v-if="isPage" class="wm-swipe_dots" :class="(direction=='left'||direction=='right')?'dotX':'dotY'" :style="{'--dotsMargins--':dotsMargins}">
      <div v-for="n in total" :key="n" :class="(n-1)==page?'active':''" :style="{backgroundColor: (n-1)==page?pageColorActive:pageColor}"></div>
    </div>
  </div>
</template>
  
<style scoped>
.wm-swipe{position: relative; width: 100%; height: 100%;}
.wm-swipe_cen{width: 100%; height: 100%; transition-timing-function: linear;}
.wm-swipe_cen_x{flex-wrap: nowrap; display: flex; justify-content: space-between;}
.wm-swipe_cen_y{flex-wrap: wrap; display: flex; justify-content: space-between;}
.wm-swipe_dots{position: absolute;}
.wm-swipe_dots div{width: 6px; height: 6px; border-radius: 50%; background-color: #FFF;}
.wm-swipe_dots .active{border-radius: 3px;}
.wm-swipe_dots.dotX{bottom: var(--dotsMargins--); left: 50%; transform: translateX(-50%);}
.wm-swipe_dots.dotX div{display: inline-block; margin: 0 4px;}
.wm-swipe_dots.dotX .active{width: 12px;}
.wm-swipe_dots.dotY{right: var(--dotsMargins--); top: 50%; transform: translateY(-50%);}
.wm-swipe_dots.dotY div{margin: 4px 0;}
.wm-swipe_dots.dotY .active{height: 16px;}
</style>
  
<script setup lang="ts">
import { onMounted, onBeforeUnmount, getCurrentInstance } from 'vue';
import { ref } from 'vue';

/* 参数 */
const props = defineProps({
  direction: {type: String, default: 'right'},            // 方向: top、left、down、right
  loop: {type: Boolean, default: true},                   // 是否循环
  autoplay: {type: Boolean, default: true},               // 自动切换
  interval: {type: Number, default: 6000},                // 播放间隔
  speed: {type: Number, default: 300},                    // 动画时长
  isPage: {type: Boolean, default: true},                 // 显示分页
  pageColor: {type: String, default: 'rgba(0,0,0,.2)'},   // 分页颜色
  pageColorActive: {type: String, default: '#ffffff'},    // 激活颜色
  isMove: {type: Boolean, default: true},                 // 是否开启手指触发
  moveDistance: {type: Number, default: 30},              // 手指触发距离
  dotsMargins: {type: String, default: '4px'}             // 点距离边缘的距离
});
const { proxy } = getCurrentInstance() as any;
const emit = defineEmits(['active']);
/* 状态 */
const total: any = ref(0);                  // 轮播图总数量
const page: any = ref(0);                   // 当前位置
var swiper: any = null;                     // 滑动内容
var first: boolean = false;                 // 首次运行
var moveArr: any = [];                     // 移动间隔
var index: any = 0;                         // 初始位置
var pause_time: any = null;                 // 间隔时间
var excess_time: any = null;                // 过度时间
var startPage: any = {x:0, y:0};            // 手指触摸的位置
var movePage: any = {x:0, y:0};             // 手指移动的距离

/* 创建完成 */
onMounted(() => {
  init();
});

/* 页面销毁 */
onBeforeUnmount(() => {
  clearTimeout(pause_time); // 移除定时
  clearTimeout(excess_time); // 移除定时
});

/* 初始化 */
const init = (): void => {
  const swipe = proxy.$refs.swipe
  // 内容数量小于等于一时停止往下
  swiper = proxy.$refs.scroll;
  // 数量
  total.value = swiper.children.length;
  if(total.value <= 1) return;
  // 获取到第一个元素并添加到末尾-禁止循环不执行并将page指定到最后
  if (props.loop) {
    const firstChild = swiper.children[0].cloneNode(true);
    swiper.appendChild(firstChild);
  }
  if(props.direction == 'left' || props.direction == 'down') page.value = total.value - 1;
  // 内容长度
  if(props.direction == 'left' || props.direction == 'right') swiper.style = 'width:' + swiper.children.length*swipe.offsetWidth +'px';
  else swiper.style = 'height:' + swiper.children.length*swipe.offsetHeight+'px';
  // 计算每张图片间隔位置
  const newArr = [{distance: 0}];
  if(props.direction == 'left' || props.direction == 'right') for(let i = 1; i < swiper.children.length+1; i++) newArr.push({distance: i*swipe.offsetWidth});
  else for(let i = 1; i < swiper.children.length+1; i++) newArr.push({distance: i*swipe.offsetHeight});
  moveArr = newArr;
  // 轮播方向left&down是移动到最后一张
  if(props.direction == 'left') {index = total.value-1; swiper.style.transform = `translate(-${moveArr[index].distance}px, 0)`}
  else if(props.direction == 'down') {index = total.value-1; swiper.style.transform = `translate(0, -${moveArr[index].distance}px)`}
  /* 自动 */
  automatic();
  /* 无缝衔接处理-禁止循环不执行 */
  if(props.loop) {
    swiper.addEventListener("webkitTransitionEnd",() => {
      if(props.direction == 'right' && index == total.value) {
        index = 0;
        swiper.style.transitionDuration = '0ms'; 
        swiper.style.transform = 'translate(0px,0)';
      }else if(props.direction == 'left' && index == 0) {
        index = total.value;
        swiper.style.transitionDuration = '0ms'; 
        swiper.style.transform = `translate(-${moveArr[index].distance}px, 0)`;
      }else if(props.direction == 'top' && index == total.value) {
        index = 0;
        swiper.style.transitionDuration = '0ms'; 
        swiper.style.transform = 'translate(0,0)';
      }else if(props.direction == 'down' && index == 0) {
        index = total.value;
        swiper.style.transitionDuration = '0ms'; 
        swiper.style.transform = `translate(0, -${moveArr[index].distance}px)`;
      }
    },false);
  }
}

/* 自动 */
const automatic = (): void => {
  if(!props.autoplay) return
  if(!props.loop) {
    if((props.direction == 'left' || props.direction == 'down') && index < 1) return;
    if((props.direction == 'right' || props.direction == 'top') && index >= total.value - 1) return;
  }
  clearTimeout(pause_time);
  pause_time = setTimeout(() => {
    moveAction();
    clearTimeout(excess_time);
    excess_time = setTimeout(() => {
      if(!first) first = true;
      automatic();
    },first?props.speed:1);
  },props.interval);
}

/* 移动动作 */
const moveAction = (): void => {
  if(!props.isMove || swiper.children.length <= 1) return;
  if(props.direction == 'top'){ // 向上
    if(index < total.value){
      swiper.style.transitionDuration = props.speed+'ms';
      index = index + 1;
    } else {
      index = 0;
      swiper.style.transitionDuration = '0ms';
    }
    swiper.style.transform = `translate(0, -${moveArr[index].distance}px)`;
  }else if(props.direction == 'down'){ // 向下
    if(index > 0){
      swiper.style.transitionDuration = props.speed+'ms';
      index = index - 1;
    } else {
      index = 0;
      swiper.style.transitionDuration = '0ms';
    }
    swiper.style.transform = `translate(0, -${moveArr[index].distance}px)`;
  }else if(props.direction == 'right'){ // 向左
    if(index < total.value){
      swiper.style.transitionDuration = props.speed+'ms';
      index = index + 1;
    } else {
      index = 0;
      swiper.style.transitionDuration = '0ms';
    }
    swiper.style.transform = `translate(-${moveArr[index].distance}px, 0)`;
  }else if(props.direction == 'left'){ // 向右
    if(index > 0){
      swiper.style.transitionDuration = props.speed+'ms';
      index = index - 1;
    } else {
      index = 0;
      swiper.style.transitionDuration = '0ms';
    }
    swiper.style.transform = `translate(-${moveArr[index].distance}px, 0)`;
  }
  page.value = index == total.value?0:index;
  emit('active', index == total.value?0:index);
}

/* 手指按下 */
const start = (e: any): void => {
  if(!props.isMove || swiper.children.length <= 1) return;
  const touch = e.touches?e.touches[0]:e;
  startPage = {x:touch.clientX, y:touch.clientY};
  movePage = {x:0, y:0};
  clearTimeout(pause_time);
}

/* 手指移动 */
const move = (e: any): void => {
  if(!props.isMove || swiper.children.length <= 1) return;
  swiper.style.transitionDuration = '0ms';
  const touch = e.touches?e.touches[0]:e;
  movePage = {x: touch.clientX - startPage.x, y: touch.clientY - startPage.y}
  if(props.direction == 'top' || props.direction == 'down'){ // 竖向
    if(movePage.y > 0){
      if(!props.loop && index < 1) return;
      if(index == 0) index = total.value;
      swiper.style.transform = `translate(0, -${moveArr[index].distance-movePage.y}px)`;
    }else{
      if(!props.loop && index >= total.value - 1) return;
      if(index == total.value) index = 0;
      swiper.style.transform = `translate(0, -${moveArr[index].distance-movePage.y}px)`;
    }
  }else if(props.direction == 'left' || props.direction == 'right'){ // 横向
    if(movePage.x > 0){
      if(!props.loop && index < 1) return;
      if(index == 0) index = total.value;
      swiper.style.transform = `translate(-${moveArr[index].distance-movePage.x}px, 0)`;
    }else{
      if(!props.loop && index >= total.value - 1) return;
      if(index == total.value) index = 0;
      swiper.style.transform = `translate(-${moveArr[index].distance-movePage.x}px, 0)`;
    }
  };
}

/* 手指松开 */
const end = (e: any): void => {
  if(!props.isMove || swiper.children.length <= 1) return;
  // 滑动方向
  const ratio = Math.abs(movePage.x/movePage.y) || 0;
  if(props.direction == 'left' || props.direction == 'right'){
    if(ratio > 0 && movePage.x > props.moveDistance) moveDirection('left');
    else if(ratio > 0 && -movePage.x < props.moveDistance) { // 不满足距离时还原
      swiper.style.transitionDuration = props.speed+'ms';
      swiper.style.transform = 'translate(-'+ moveArr[index].distance+'px,0)';
    }else if(ratio > 0 && movePage.x < -props.moveDistance) moveDirection('right');
  }else{
    if(ratio < 0 && movePage.y>props.moveDistance) moveDirection('down');
    else if(ratio < 0 && -movePage.y < props.moveDistance) { // 不满足距离时还原
      swiper.style.transitionDuration = props.speed+'ms';
      swiper.style.transform = `translate(0, -${moveArr[index].distance}px)`;
    }else if(ratio < 0 && movePage.y <- props.moveDistance) moveDirection('top');
  };
  automatic();
}

/* 移动方向 */
const moveDirection = (direction: string): void => {
  if(!props.isMove || swiper.children.length <= 1) return;
  if(!props.loop) {
    if((direction == 'left' || direction == 'top') && index < 1) return;
    if((direction == 'right' || direction == 'down') && index >= total.value - 1) return;
  }
  if(direction == 'top' || direction == 'down'){ // 向上、向下
    swiper.style.transitionDuration = props.speed+'ms';
    if(direction == 'down'){
      if(index - 1 < 1) index = 0;
      else index = index - 1;
    }else index = index + 1;
    swiper.style.transform = `translate(0, -${moveArr[index].distance}px)`;
  }else if(direction == 'left' || direction == 'right'){ // 向左/向右
    swiper.style.transitionDuration = props.speed+'ms';
    if(direction == 'left'){
      if(index - 1 < 1) index = 0;
      else index = index - 1;
    }else index = index + 1;
    swiper.style.transform = `translate(-${moveArr[index].distance}px, 0)`;
  };
  page.value = index == total.value?0:index;
  emit('active', index == total.value?0:index);
}

/* 上一页 */
const prePage = (): void => {
  if(props.direction == 'top'){ // 向上
    if(index < total.value){
      swiper.style.transitionDuration = props.speed+'ms';
      index = index + 1;
    } else {
      index = 0;
      swiper.style.transitionDuration = '0ms';
    }
    swiper.style.transform = `translate(0, -${moveArr[index].distance}px)`;
  }else if(props.direction == 'right'){ // 向左
    if(index < total.value){
      swiper.style.transitionDuration = props.speed+'ms';
      index = index + 1;
    } else {
      index = 0;
      swiper.style.transitionDuration = '0ms';
    }
    swiper.style.transform = `translate(-${moveArr[index].distance}px, 0)`;
  }
  automatic();
}

/* 下一页 */
const nextPage = (): void => {
  if(props.direction == 'down'){ // 向下
    if(index > 0){
      swiper.style.transitionDuration = props.speed+'ms';
      index = index - 1;
    } else {
      index = 0;
      swiper.style.transitionDuration = '0ms';
    }
    swiper.style.transform = `translate(0, -${moveArr[index].distance}px)`;
  }else if(props.direction == 'left'){ // 向右
    if(index > 0){
      swiper.style.transitionDuration = props.speed+'ms';
      index = index - 1;
    } else {
      index = 0;
      swiper.style.transitionDuration = '0ms';
    }
    swiper.style.transform = `translate(-${moveArr[index].distance}px, 0)`;
  }
  automatic();
}

/* 跳转 */
const goToPage = (index: number, time: number=400): void => {
  index = index;
  swiper.style.transitionDuration = time+'ms';
  if(props.direction == 'left'||props.direction == 'right') swiper.style.transform = `translate(-${moveArr[index].distance}px, 0)`;
  else swiper.style.transform = `translate(0, -${moveArr[index].distance}px)`;
  automatic();
}

/* 外部函数 */
defineExpose({ prePage, nextPage, goToPage });
</script>