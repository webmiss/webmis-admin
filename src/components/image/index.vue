<template>
  <div class="wm-image" :style="{
    width: width,
    height: height,
    lineHeight: 'calc('+height+' + 4px)',
    borderRadius: radius,
    backgroundColor: bgColor,
  }">
    <span v-if="redNum!=''" class="rednum" :style="{backgroundColor: redBgColor}">{{ redNum }}</span>
    <img ref="wmImage" />
    <i v-if="!img" class="ui ui_image" :style="{fontSize: icoSize, color: icoColor}"></i>
    <i v-else-if="!isLoad" class="ui ui_loading loading" :style="{fontSize: icoSize}"></i>
    <div v-else class="img" :style="{backgroundImage: imgUrl?'url('+img+')':'', borderRadius: radius}" @click="imgClick(img)"></div>
  </div>
  <wmImgView v-model:show="imgShow" :options="imgData"></wmImgView>
</template>

<style lang="less" scoped>
.wm-image{cursor: pointer; position: relative; text-align: center; margin: 0 auto;}
.wm-image img{display: none;}
.wm-image .img{width: 100%; height: 100%; background-size: cover; background-repeat: no-repeat; background-position: center center;}
.wm-image .img:hover{background-size: 200%;}
.wm-image i{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}
.wm-image .loading{color: @Minor; animation: loading 2s linear 0s infinite;}
.wm-image .rednum{position: absolute; z-index: 1; right: -5px; top: -5px; zoom: 0.9; padding: 0 4px; line-height: 16px; border-radius: 8px; font-size: 12px; color: #FFF;}
</style>

<script setup lang="ts">
import { ref, onMounted, watch, getCurrentInstance } from 'vue';
import wmImgView from './view.vue';

/* 参数 */
const props = defineProps({
  img: {type: String, default: ''},                 // 图片地址
  imgTitle: {type: String, default: ''},            // 图片名称
  width: {type: String, default: '32px'},           // 宽
  height: {type: String, default: '32px'},          // 高
  radius: {type: String, default: '50%'},           // 圆角
  bgColor: {type: String, default: '#00000010'},    // 背景颜色
  icoSize: {type: String, default: '18px'},         // 图标大小
  icoColor: {type: String, default: '#00000050'},   // 图标颜色
  isView: {type: Boolean, default: true},           // 图片预览
  redNum: {type: String, default: ''},              // 红点
  redBgColor: {type: String, default: '#FF3300'},   // 红点颜色
});
const { proxy } = getCurrentInstance() as any ;
const emit = defineEmits(['imgClick']);
// 变量
const isLoad = ref(false);
const imgUrl = ref('');
const imgShow = ref(false);
const imgData = ref(<any>[]);

/* 监听 */
watch(()=>props.img, (val: any)=>{
  loadImg();
},{ deep: true });

/* 创建完成 */
onMounted(()=>{
  loadImg();
});

/* 加载图片 */
const loadImg = (): void => {
  const img: any = proxy.$refs.wmImage;
  img.src = props.img;
  img.onload = ()=>{
    isLoad.value = true;
    imgUrl.value = props.img;
  }
}

/* 点击选择 */
const imgClick = (img: string): void => {
  emit('imgClick', img);
  if(props.isView) {
    imgShow.value = true;
    imgData.value = [{label: props.imgTitle || img, value:img}];
  }
}

</script>