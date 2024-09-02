<template>
  <table class="wm-table_form" :style="{width: width, height: height}">
    <slot></slot>
  </table>
</template>

<style lang="less">
.wm-table_form{width: 100%; border-collapse: collapse;}
.wm-table_form td{padding: 4px 8px; height: 32px; line-height: 1; white-space: nowrap; border: #FFF 1px solid;}
.wm-table_form .title td{color: @Minor4; font-weight: bold; font-size: 12px; background-color: #F4F6F8;}
.wm-table_form .label{max-width: 120px; text-align: right; color: @BrandText;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  components: {},
  props: {
    width: {type: String, default: '100%'},     // 宽
    height: {type: String, default: 'auto'},    // 高
  }
})
export default class TableForm extends Vue {

  // 参数
  width!: string;
  height!: string;
  
}
</script>