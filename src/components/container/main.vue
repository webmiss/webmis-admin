<template>
  <div
    class="wm-main"
    :style="{
      width:'calc(100% - '+padding*2+'px)',
      height:'calc(100% - '+padding*2+'px)',
      padding: padding+'px',
      backgroundColor: bgColor+'',
    }"
  >
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.wm-main{position: relative;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  components: {},
  props: {
    padding: {type: Number, default: 16},             //边距
    bgColor: {type: String, default: 'transparent'},  //背景颜色
  }
})
export default class Main extends Vue {
  // 参数
  padding!: number;
  bgColor!: String;
}
</script>