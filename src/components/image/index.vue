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
  <wm-img-view v-model:show="imgShow" :options="imgData"></wm-img-view>
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

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import wmImgView from '@/components/image/view.vue'
@Options({
  components: { wmImgView },
  props: {
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
  }
})
export default class Image extends Vue {

  // 参数
  img!: string;
  imgTitle!: string;
  width!: string;
  height!: string;
  radius!: string;
  bgColor!: string;
  icoSize!: string;
  icoColor!: string;
  isView!: boolean;
  redNum!: string;
  redBgColor!: string;
  // 变量
  isLoad: boolean = false;
  imgUrl: string = '';
  imgShow: boolean = false;
  imgData: Array<any> = [];

  /* 创建成功 */
  created(): void {
    // 监听
    this.$watch('img', (val:any)=>{
      this.loadImg();
    }, { deep: true });
  }
  /* 创建完成 */
  public mounted(): void {
    this.loadImg();
  }

  /* 加载图片 */
  loadImg(): void {
    const img: any = this.$refs.wmImage;
    img.src = this.img;
    img.onload = ()=>{
      this.isLoad = true;
      this.imgUrl = this.img;
    }
  }

  /* 点击选择 */
  imgClick(img: string): void {
    this.$emit('imgClick', img);
    if(this.isView) {
      this.imgShow = true;
      this.imgData = [{label: this.imgTitle || img, value:img}];
    }
  }

}
</script>