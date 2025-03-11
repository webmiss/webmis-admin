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

<script setup lang="ts">

/* 参数 */
const props = defineProps({
  value: {default: ''},                             // 默认值
  columns: {type: Array<any>, default: []},         // 字段: [{label: '基本信息', value: 'base', slot: 'base'}]
  height: {type: String, default: '40px'},          // 高度
  padding: {type: String, default: '0 8px'},        // 内部间距
  margin: {type: String, default: '0 8px 0 0'},     // 外部间距
  bodyPadding: {type: String, default: '16px 0'},   // 内容间距
  fontSize: {type: String, default: '15px'},        // 文字大小
  clickFlg: {type: Boolean, default: false},        // 禁止点击
});
const emit = defineEmits(['update:value', 'change']);

/* 切换 */
const tabClick = (d: any): void => {
  if(props.clickFlg) return;
  // 事件
  emit('update:value', d.value);
  emit('change', d);
}

</script>