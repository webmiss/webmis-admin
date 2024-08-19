<template>
  <div
    class="wm-main_body"
    :style="{
      width:'calc(100% - '+paddingX+' * 2)',
      height:'calc(100% - '+paddingY+' * 2)',
      padding: paddingY+' '+paddingX,
      backgroundColor: bgColor+'',
    }"
  >
    <div class="wm-main_ct scrollbar" :style="{overflowX: overflowX, overflowY: overflowY}">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wm-main_body{position: relative;}
.wm-main_ct{width: 100%; height: 100%;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  components: {},
  props: {
    paddingX: {type: String, default: '16px'},        // x轴边距
    paddingY: {type: String, default: '10px'},        // y轴边距
    bgColor: {type: String, default: 'transparent'},  // 背景颜色
    overflowX: {type: String, default: 'auto'},       // 背景颜色
    overflowY: {type: String, default: 'auto'},       // 背景颜色
  }
})
export default class Main extends Vue {
  // 参数
  paddingX!: String;
  paddingY!: String;
  bgColor!: String;
  overflowX!: any;
  overflowY!: any;
}
</script>