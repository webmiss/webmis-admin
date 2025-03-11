<template>
  <div class="wm-alert" :class="effect+'_'+type" v-if="show"
    :style="{
      width: width,
      height: height,
      lineHeight: lineHeight,
      padding: padding,
      margin: margin,
      borderRadius: radius,
      fontSize: fontSize,
    }"
  >
    <i v-if="icon" :class="icon" :style="{fontSize: iconSize, lineHeight: 'calc('+height+' - 2px)'}"></i>
    <slot></slot>
    <div class="wm-alert_close" v-if="closable" v-html="closeText" @click="close()"></div>
  </div>
</template>

<style lang="less" scoped>
.wm-alert{overflow: hidden; position: relative;}
.wm-alert_close{cursor: pointer; position: absolute; top: 50%; right: 0px; transform: translateY(-50%); padding: 8px 10px; color: rgba(160, 160, 160, 0.8);}
.wm-alert_close:hover{color: @Danger;}
/* primary */
.wm-alert.plain_primary{background-color: @Primary6; color: @Primary;}
.wm-alert.dark_primary{background-color: @Primary; color: @Primary6;}
/* success */
.wm-alert.plain_success{background-color: @Success6; color: @Success;}
.wm-alert.dark_success{background-color: @Success; color: @Success6;}
/* warning */
.wm-alert.plain_warning{background-color: @Warning6; color: @Warning;}
.wm-alert.dark_warning{background-color: @Warning; color: @Warning6;}
/* danger */
.wm-alert.plain_danger{background-color: @Danger6; color: @Danger;}
.wm-alert.dark_danger{background-color: @Danger; color: @Danger6;}
/* info */
.wm-alert.plain_info{background-color: @Info6; color: @Info;}
.wm-alert.dark_info{background-color: @Info; color: @Info6;}
</style>

<script setup lang="ts">
import { ref } from 'vue';

/* 参数 */
const props = defineProps({
  effect: {type: String, default: 'plain'},         // 样式: plain, dark
  type: {type: String, default: 'primary'},         // 类型: primary, success, warning, danger, info
  width: {type: String, default: 'auto'},           // 宽度
  maxWidth: {type: String, default: 'auto'},        // 最大宽度
  height: {type: String, default: '24px'},          // 高度
  lineHeight: {type: String, default: '24px'},      // 行度
  padding: {type: String, default: '8px 16px'},     // 内部间距
  margin: {type: String, default: '0 16px'},        // 外部间距
  radius: {type: String, default: '4px'},           // 圆角
  fontSize: {type: String, default: '14px'},        // 文字大小
  icon: {type: String, default: ''},                // 图标
  iconSize: {type: String, default: '14px'},        // 图标大小
  closable: {type: Boolean, default: false},        // 关闭
  closeText: {type: String, default: '<i class="ui ui_close" style="font-size: 14px;"></i>'},
});
const emit = defineEmits(['close']);
// 变量
const show = ref(true);

/* 关闭 */
const close = (): void => {
  show.value = false;
  emit('close');
}

</script>