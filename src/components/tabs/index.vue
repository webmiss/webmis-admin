<template>
  <ul class="wm-tabs" :style="{height: height, lineHeight: height}">
    <li v-for="(v, k) in columns" :key="k" :class="v.value==value?'active':''" :style="{padding: padding, margin: margin, fontSize: fontSize}" @click="tabClick(v)">{{ v.label }}</li>
  </ul>
  <template v-for="(v, k) in columns" :key="k">
    <div class="wm-tabs_body" v-show="v.value==value" :style="{padding: bodyPadding}">
      <slot v-bind="v" :name="v.slot" :index="k"></slot>
    </div>
  </template>
</template>

<style lang="less" scoped>
.wm-tabs{position: sticky; z-index: 10; top: 0; width: 100%; border-bottom: @LighterBorder 2px solid; background-color: #FFF; box-sizing: border-box;}
.wm-tabs li{user-select: none; cursor: pointer; position: relative; float: left; white-space: nowrap;}
.wm-tabs li:hover{color: @Primary;}
.wm-tabs .active{color: @Primary;}
.wm-tabs .active::after{content: ''; position: absolute; left: 0; bottom: 0; width: 100%; height: 2px; background-color: @Primary; border-radius: 2px;}
.wm-tabs_body{padding: 16px 0;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {},
  props: {
    value: {default: ''},                             // 默认值
    columns: {type: Array, default: []},              // 字段: [{label: '基本信息', value: 'base', slot: 'base'}]
    height: {type: String, default: '40px'},          // 高度
    padding: {type: String, default: '0 8px'},        // 内部间距
    margin: {type: String, default: '0 8px 0 0'},     // 外部间距
    bodyPadding: {type: String, default: '16px 0'},   // 内容间距
    fontSize: {type: String, default: '16px'},        // 文字大小
  }
})
export default class Tabs extends Vue {

  // 参数
  value!: any;
  columns!: Array<any>;
  height!: string;
  padding!: string;
  margin!: string;
  bodyPadding!: string;
  fontSize!: string;

  /* 切换 */
  tabClick(d: any): void {
    // 事件
    this.$emit('update:value', d.value);
    this.$emit('change', d);
  }

}
</script>