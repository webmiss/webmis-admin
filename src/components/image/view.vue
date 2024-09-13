<template>
  <div ref="wmImageViewBg" class="wm-image_view" :style="{
    backgroundColor: bgColor,
    visibility:show?'inherit':'hidden',
    opacity:show?'1':'0'
  }">
    <!-- Image -->
    <i v-if="!isLoad" class="ui ui_loading loading" :style="{fontSize: icoSize}"></i>
    <img v-else ref="wmImageView" :src="imgUrl" :style="{visibility:isLoad?'inherit':'hidden'}" />
    <img ref="wmImageLoading" class="loading_img" />
    <!-- Info -->
     <div class="wm-image_view_info" v-if="title">名称: {{title}}&nbsp;&nbsp;页码: {{ index+1 }}/{{ options.length }}</div>
    <!-- Close -->
    <i class="ui ui_close tools close" @click="close()"></i>
    <!-- FullScreen -->
    <i class="ui tools full" :class="isFull?'ui_video_fullscreen_exit':'ui_video_fullscreen'" @click="Fullscreen()"></i>
    <!-- Prev -->
    <div class="prev">
      <i class="ui ui_arrow_left" @click.stop="loadImg(this.index-1)" :style="{
        left: 'calc('+icoSize+' + 16px)',
        width: 'calc('+icoSize+' + 16px)',
        lineHeight: 'calc('+icoSize+' + 16px)',
        fontSize: 'calc('+icoSize+' - 12px)'
      }"></i>
    </div>
    <!-- Next -->
    <div class="next">
      <i class="ui ui_arrow_right" @click.stop="loadImg(this.index+1)" :style="{
        right: 'calc('+icoSize+' + 16px)',
        width: 'calc('+icoSize+' + 16px)',
        lineHeight: 'calc('+icoSize+' + 16px)',
        fontSize: 'calc('+icoSize+' - 12px)'
      }"></i>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wm-image_view{position: fixed; z-index: 99; left: 0; top: 0; width: 100%; height: 100%; transition: @Transition;}
.wm-image_view .loading, .wm-image_view img{position: absolute; z-index: 1; left: 50%; top: 50%; transform: translate(-50%, -50%);}
.wm-image_view .loading{color: @Minor; animation: loading 2s linear 0s infinite;}
.wm-image_view img{transition: @Transition;}
.wm-image_view .loading_img{display: none;}
.wm-image_view_info{position: absolute; z-index: 10; max-width: calc(100% - 120px); left: 50%; bottom: 16px; transform: translateX(-50%); padding: 0 24px; line-height: 48px; background-color: #00000050; color: #FFF; border-radius: 24px;}
/* Tools */
.wm-image_view .tools{cursor: pointer; position: absolute; z-index: 10; width: 48px; line-height: 48px; color: #FFF; background-color: #00000005; text-align: center; border-radius: 50%;}
.wm-image_view .tools:hover{background-color: #00000050; color: @Minor;}
.wm-image_view .close{right: 16px; top: 16px; font-size: 20px;}
.wm-image_view .full{right: 16px; bottom: 16px; font-size: 20px;}
.wm-image_view .prev,.wm-image_view .next{position: absolute; z-index: 9; top: 0; width: 50%; height: 100%;}
.wm-image_view .prev i,.wm-image_view .next i{cursor: pointer; position: absolute; top: 50%; transform: translateY(-50%); opacity: 0.3; color: #FFF; background-color: #00000050; text-align: center; border-radius: 50%;}
.wm-image_view .prev{left: 0;}
.wm-image_view .prev:hover i,.wm-image_view .next:hover i{opacity: 1;}
.wm-image_view .prev i:hover,.wm-image_view .next i:hover{color: @Minor;}
.wm-image_view .next{right: 0;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Ui from '@/library/ui'
@Options({
  components: { },
  props: {
    show: {type: Boolean, default: false},              // 是否显示
    index: {type: Number, default: 0},                  // 默认展示
    options: {type: Array, default: []},                // 图片地址: [{label:'名称', value:''}]
    bgColor: {type: String, default: 'rgba(0,0,0,.8)'}, // 背景颜色
    icoSize: {type: String, default: '32px'},           // 图标大小
  }
})
export default class ImageView extends Vue {

  // 参数
  show!: boolean;
  index!: number;
  options!: Array<any>;
  bgColor!: string;
  icoSize!: string;
  // 变量
  isLoad: boolean = false;
  imgUrl: string = '';
  isFull: boolean = false;
  title: string = '';

  /* 创建成功 */
  created(): void {
    // 监听
    this.$watch('show', (val:any)=>{
      if(val) {
        this.loadImg(this.index);
        // 方向键
        document.addEventListener('keydown', (event: any)=>{
          const keyCode: any = event.keyCode || event.which;
          switch (keyCode) {
            case 37: this.loadImg(this.index-1); break;
            case 39: this.loadImg(this.index+1); break;
          }
        });
      }
    }, { deep: true });
  }
  /* 创建完成 */
  public mounted(): void {
    // 窗口变化
    window.addEventListener('resize', ()=>{
      if(this.show) this.loadImg(this.index);
    });
  }

  /* 加载图片 */
  loadImg(k: number): void {
    // 上一页、下一页
    if(k<0) return Ui.Toast('首页');
    if(k>=this.options.length) return Ui.Toast('末页');
    // 图片
    let imgUrl: string = this.options[k]?this.options[k].value:'';
    if(!imgUrl) return Ui.Toast('无图片地址');
    this.title = this.options[k].label;
    // 加载图片
    const imgLoad: any = this.$refs.wmImageLoading;
    imgLoad.src = imgUrl;
    imgLoad.onload = ()=>{
      const w: number = document.body.clientWidth;
      const h: number = document.body.clientHeight;
      const dst_size: number = w/h;
      const src_size: number = imgLoad.width/imgLoad.height;
      let width: string = 'auto';
      let height: string = 'auto';
      // 是否缩放
      if(imgLoad.width>w || imgLoad.height>h){
        if(src_size > dst_size) width = '100%';
        else height = '100%';
      }
      // 显示
      this.isLoad = true;
      this.imgUrl = imgUrl;
      // 动画
      this.$nextTick(()=>{
        const img: any = this.$refs.wmImageView;
        img.style.opacity = '0';
        img.style.width = '0';
        img.style.height = '0';
        setTimeout(()=>{
          img.style.opacity = '1';
          img.style.width = width;
          img.style.height = height;
        }, 300);
      });
    }
    // 更新索引
    this.$emit('update:index', k);
  }

  /* 全屏 */
  Fullscreen(): void {
    this.isFull = !this.isFull;
    let obj: any = this.$refs.wmImageViewBg;
    if(obj.webkitRequestFullScreen){
      // @ts-ignore Chrome
      if(document.webkitIsFullScreen) document.webkitCancelFullScreen();
      else obj.webkitRequestFullScreen();
    }else if(obj.mozRequestFullScreen){
      // @ts-ignore Firefox
      if(document.mozFullScreen) document.mozCancelFullScreen();
      else obj.mozRequestFullScreen();
    }else if(obj.msRequestFullscreen){
      // @ts-ignore IE11
      if(document.msFullscreenElement) document.msExitFullscreen();
      else obj.msRequestFullscreen();
    }else if(obj.requestFullscreen){
      // @ts-ignore W3C
      if(document.exitFullscreen) document.exitFullscreen();
      else obj.requestFullscreen();
    }
  }

  /* 关闭 */
  close(): void {
    this.$emit('update:show', false);
    if(this.isFull) this.Fullscreen();
  }

}
</script>