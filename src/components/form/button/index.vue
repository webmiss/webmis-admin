<template>
  <button class="wm-button flex_center" :class="effect+'_'+type"
    :style="{
      width: width,
      height: height,
      lineHeight: height,
      padding: padding,
      margin: margin,
      borderRadius: radius,
      fontSize: fontSize,
    }"
    :disabled="disabled"
  >
    <i v-if="icon" :class="icon" :style="{fontSize: iconSize, lineHeight: 'calc('+height+' - 2px)'}"></i>
    <span><slot></slot></span>
  </button>
</template>

<style lang="less" scoped>
.wm-button:focus,button:active:focus,button.active:focus,button.focus,button:active.focus,button.active.focus{outline: none; border-color: transparent; box-shadow:none;}
.wm-button{user-select: none; white-space: nowrap; margin: 0 4px; border: transparent 1px solid; background: none; cursor: pointer; font-size: 14px; text-align: center; box-sizing: border-box; white-space: normal;}
.wm-button:hover{box-shadow: 0 2px 4px rgba(0,0,0,.2);}
.wm-button:disabled{opacity: 0.5; cursor: not-allowed;}
.wm-button i{width: 24px; text-align: center;}
/* default */
.wm-button.plain_default{background-color: @LighterFill; color: @Text; border-color: @BaseBorder;}
.wm-button.plain_default:hover{background-color: @Primary5; color: @Primary; border-color: @Primary;}
.wm-button.dark_default{background-color: @Primary; color: #FFF; border-color: @Primary1;}
.wm-button.dark_default:hover{background-color: @Primary2; color: #FFF; border-color: @Primary;}
.wm-button.text_default{color: @Text;}
.wm-button.text_default:hover{box-shadow: none; color: @Primary;}
/* primary */
.wm-button.plain_primary{background-color: @Primary6; color: @Primary; border-color:  @Primary;}
.wm-button.plain_primary:hover{ background-color: @Primary5; color: @Primary1; border-color:  @Primary1;}
.wm-button.dark_primary{background-color: @Primary; color: @Primary6; border-color: @Primary1;}
.wm-button.dark_primary:hover{background: linear-gradient(@Primary, @Primary1);}
.wm-button.text_primary{color: @Primary;}
.wm-button.text_primary:hover{box-shadow: none; background-color: @Primary6;}
/* success */
.wm-button.plain_success{background-color: @Success6; color: @Success; border-color: @Success2;}
.wm-button.plain_success:hover{background-color: @Success5; color: @Success1; border-color: @Success1;}
.wm-button.dark_success{background-color: @Success; color: @Success6; border-color: @Success1;}
.wm-button.dark_success:hover{background: linear-gradient(@Success, @Success1);}
.wm-button.text_success{color: @Success;}
.wm-button.text_success:hover{box-shadow: none; color: @Success1; background-color: @Success6;}
/* warning */
.wm-button.plain_warning{background-color: @Warning6; color: @Warning; border-color: @Warning2;}
.wm-button.plain_warning:hover{background-color: @Warning5; color: @Warning1; border-color: @Warning1;}
.wm-button.dark_warning{background-color: @Warning; color: @Warning6; border-color: @Warning1;}
.wm-button.dark_warning:hover{background: linear-gradient(@Warning, @Warning1);}
.wm-button.text_warning{color: @Warning;}
.wm-button.text_warning:hover{box-shadow: none; color: @Warning1; background-color: @Warning6;}
/* danger */
.wm-button.plain_danger{background-color: @Danger6; color: @Danger; border-color: @Danger2;}
.wm-button.plain_danger:hover{background-color: @Danger5; color: @Danger1; border-color: @Danger1;}
.wm-button.dark_danger{background-color: @Danger; color: @Danger6; border-color: @Danger1;}
.wm-button.dark_danger:hover{background: linear-gradient(@Danger, @Danger1);}
.wm-button.text_danger{color: @Danger;}
.wm-button.text_danger:hover{box-shadow: none; color: @Danger1; background-color: @Danger6;}
/* info */
.wm-button.plain_info{background-color: @Info6; color: @Info; border-color: @Info2;}
.wm-button.plain_info:hover{background-color: @Info5; color: @Info1; border-color: @Info1;}
.wm-button.dark_info{background-color: @Info; color: @Info6; border-color: @Info1;}
.wm-button.dark_info:hover{background: linear-gradient(@Info, @Info1);}
.wm-button.text_info{color: @Info;}
.wm-button.text_info:hover{box-shadow: none; color: @Info1; background-color: @Info6;}
</style>

<script setup lang="ts">

/* 参数 */
const props = defineProps({
  effect: {type: String, default: 'plain'},         // 样式: plain, dark, text
  type: {type: String, default: 'default'},         // 类型: primary, success, warning, danger, info
  width: {type: String, default: 'max-content'},    // 宽度
  height: {type: String, default: '32px'},          // 高度
  padding: {type: String, default: '0 16px'},       // 内部间距
  margin: {type: String, default: '0 4px'},         // 外部间距
  radius: {type: String, default: '4px'},           // 圆角
  fontSize: {type: String, default: '14px'},        // 文字大小
  icon: {type: String, default: ''},                // 图标
  iconSize: {type: String, default: '14px'},        // 图标大小
  disabled: {type: Boolean, default: false},        // 是否禁用
});

</script>