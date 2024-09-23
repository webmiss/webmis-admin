<template>
  <div class="wm-dialog_body" :style="{visibility:cfg.show?'inherit':'hidden'}">
    <wm-popup ref="Popup" v-model:show="cfg.show" width="100%" height="100%" position="top" :time="600">
      <div class="wm-dialog_bg" @click="close(isClose)"></div>
      <div class="wm-dialog" :style="{width:width, height:height, borderRadius:borderRadius}">
        <!-- Title -->
        <div class="wm-dialog_title">
          <span>{{ title }}</span>
          <div class="wm-dialog_close" @click="close(true)"></div>
        </div>
        <!-- Content -->
        <div class="wm-dialog_content scrollbar" :style="{overflow: overflow, maxHeight: 'calc('+cfg.height+'px - 46px - 40px - '+bottom+')'}">
          <slot></slot>
        </div>
        <!-- Bottom -->
        <div class="wm-dialog_bottom" v-if="bottom" :style="{height:bottom+'', lineHeight:bottom+''}">
          <slot name="bottom"></slot>
        </div>
      </div>
    </wm-popup>
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
.wm-dialog_content{width: 100%; height: 100%;}
.wm-dialog_bottom{padding: 5px 0 16px; text-align: center;}
</style>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import wmPopup from '@/components/popup/index.vue'

@Options({
  components: { wmPopup },
  props: {
    show: {type: Boolean, default: false},          // 是否显示
    title: {type: String, default: ''},             // 标题
    width: {type: String, default: '360px'},        // 内容宽度
    height: {type: String, default: 'auto'},        // 内容高度
    overflow: {type: String, default: 'hidden'},    // 内容滚动条
    borderRadius: {type: String, default: '4px'},   // 圆角
    bottom: {type: String, default: ''},            // 底部高度
    isClose: {type: Boolean, default: false},       // 点击关闭
  }
})
export default class Dialog extends Vue {
  
  // 参数
  show!: boolean;
  title!: string;
  width!: string;
  height!: string;
  overflow!: string;
  borderRadius!: string;
  bottom!: string;
  isClose!: boolean;
  // 变量
  cfg: any = {show: false, width:0, height:0};

  /* 创建成功 */
  created(): void {
    // 监听
    this.$watch('show', (val:any)=>{
      this.cfg.show = val;
      if(val) {
        this.cfg.width =  window.innerWidth;
        this.cfg.height =  window.innerHeight;
        // 事件
        document.addEventListener('keydown', this.keydownFun);
      }
    }, { deep: true });
  }

  /* 键盘事件 */
  keydownFun(event: any): void {
    const keyCode: any = event.keyCode || event.which;
    switch (keyCode) {
      case 27: this.close(true); break;
    }
  }

  /* 关闭 */
  close(isTrue: Boolean): void {
    // 事件
    if(isTrue) this.$emit('update:show', false);
    this.$emit('close');
    // 移除
    document.removeEventListener('keydown', this.keydownFun);
  }

}
</script>
  