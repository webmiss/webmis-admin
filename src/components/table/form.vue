<template>
  <table class="wm-table_form" :style="{width: width, height: height}">
    <slot></slot>
  </table>
</template>

<style lang="less">
.wm-table_form{overflow: hidden;}
.wm-table_form .lable{max-width: 120px; text-align: right; color: @RegularText;}
.wm-table_form td{white-space: nowrap; border-collapse: collapse; line-height: 40px; padding: 4px 8px;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  components: {},
  props: {
    width: {type: String, default: '100%'},     // 宽
    height: {type: String, default: '100%'},    // 高
  }
})
export default class Main extends Vue {

  // 参数
  width!: string;
  height!: string;
  
}
</script>