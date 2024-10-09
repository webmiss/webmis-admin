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
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    show: {type: Boolean, default: false},          // 是否显示
    position: {type: String, default: 'center'},    // 位置: center、left、right、top、bottom
    width: {type: String, default: ''},             // 内容宽度
    height: {type: String, default: ''},            // 内容高度
    opacity: {type: Number, default: 0.4},          // 背景透明度
    bgColor: {type: String, default: ''},           // 内容背景颜色
    radius: {type: String, default: ''},            // 圆角
    bgClose: {type: Boolean, default: true},        // 点击背景关闭
    time: {type: Number, default: 400},             // 动画时间
  }
})
export default class Popup extends Vue {

  // 参数
  show!: boolean;
  position!: string;
  width!: string;
  height!: string;
  opacity!: number;
  bgColor!: string;
  radius!: string;
  bgClose!: boolean;
  time!: number

  /* 创建成功 */
  created(): void {
    // 监听
    this.$watch('$props', (props:any)=>{
      // 动画
      this._animation(props.show);
    }, { deep: true });
  }

  /* 创建完成 */
  mounted(): void {
    this.init();
  }

  /* 初始化 */
  init(): void {
    const bg: any = this.$refs.PopupBG;
    const body: any = this.$refs.PopupBody;
    // 默认值
    bg.style.opacity = 0;
    if(this.position=='left'){
      body.style.height = '30%';
      body.style.left = 0;
      body.style.opacity = 0;
      body.style.transform = 'translate(-30%, 0)';
    }else if(this.position=='right'){
      body.style.height = '100%';
      body.style.right = 0;
      body.style.opacity = 0;
      body.style.transform = 'translate(30%, 0)';
    }else if(this.position=='top'){
      body.style.width = '100%';
      body.style.top = 0;
      body.style.opacity = 1;
      body.style.transform = 'translate(0, -30%)';
    }else if(this.position=='bottom'){
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
  private _showBody(): void {
    const bg: any = this.$refs.PopupBG;
    const body: any = this.$refs.PopupBody;
    // 动画
    bg.style.transitionDuration = this.time+'ms';
    body.style.transitionDuration = this.time+'ms';
    // 属性
    bg.style.opacity = 1;
    body.style.opacity = 1;
    if(this.position=='left'){
      body.style.transform = 'translate(-1px, 0)';
    }else if(this.position=='right'){
      body.style.transform = 'translate(1px, 0)';
    }else if(this.position=='top'){
      body.style.transform = 'translate(0, -1px)';
    }else if(this.position=='bottom'){
      body.style.transform = 'translate(0, 1px)';
    }else{
      body.style.top = '50%';
    }
    // 更新状态
    this.$nextTick(()=>{
      this.$emit('update:show', true);
    });
  }

  /* 隐藏 */
  private _hideBody(): void {
    const bg: any = this.$refs.PopupBG;
    const body: any = this.$refs.PopupBody;
    // 动画
    bg.style.transitionDuration = this.time+'ms';
    body.style.transitionDuration = this.time+'ms';
    // 属性
    bg.style.opacity = 0;
    body.style.opacity = 0;
    if(this.position=='left'){
      body.style.transform = 'translate(-30%, 0)';
    }else if(this.position=='right'){
      body.style.transform = 'translate(30%, 0)';
    }else if(this.position=='top'){
      body.style.transform = 'translate(0, -30%)';
    }else if(this.position=='bottom'){
      body.style.transform = 'translate(0, 30%)';
    }else{
      body.style.top = '30%'
    }
    // 更新状态
    this.$nextTick(()=>{
      this.$emit('update:show', false);
    });
  }

  /* 控制动画 */
  private _animation(show: boolean): void {
    if(show) this._showBody();
    else this._hideBody();
  }

  /* 点击背景 */
  _clickBG(): void {
    if(this.bgClose) this.close();
  }

  /* 关闭 */
  public close(): void {
    this._animation(false);
    this.$emit('close');
  }

}
</script>