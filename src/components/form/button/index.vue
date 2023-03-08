<template>
  <button class="wm-button" :class="effect+'_'+type" :style="{
    width: icon?height:width,
    height: height,
    lineHeight: 'calc('+height+' - 2px)',
    padding: icon?'0':padding,
    margin: margin,
    borderRadius: radius,
    fontSize: fontSize,
  }" :disabled="disabled">
    <i v-if="icon" :class="icon" />
    <slot></slot>
  </button>
</template>

<style lang="less" scoped>
.wm-button:focus,button:active:focus,button.active:focus,button.focus,button:active.focus,button.active.focus{outline: none; border-color: transparent; box-shadow:none;}
.wm-button{user-select: none; margin: 0 4px; border: transparent 1px solid; background: none; cursor: pointer; font-size: 14px; text-align: center; box-sizing: border-box;}
.wm-button:hover{box-shadow: @Shadow; text-shadow: 0 0 4px rgba(0,0,0,.1);}
.wm-button:disabled{opacity: 0.7; cursor: not-allowed;}
/* default */
.wm-button.dark_default,.plain_default{background-color: #FFF; color: #626468; border-color: #D2D4D8;}
.wm-button.dark_default:hover,.plain_default:hover{background-color: @Minor; color: @Primary; border-color: @Border;}
.wm-button.text_default{color: #626468;}
.wm-button.text_default:hover{box-shadow: none; color: @Primary;}
/* primary */
.wm-button.dark_primary{background-color: @Primary; color: @Minor; border-color: @Primary;}
.wm-button.plain_primary{background-color: @Minor; color: @Primary; border-color: @Border;}
.wm-button.plain_primary:hover{background-color: @Minor;}
.wm-button.text_primary{color: @Primary;}
.wm-button.text_primary:hover{box-shadow: none;}
/* success */
.wm-button.dark_success{background-color: @Success; color: @SuccessBg; border-color: @Success;}
.wm-button.plain_success{background-color: @SuccessBg; color: @Success; border-color: @SuccessBorder;}
.wm-button.plain_success:hover{background-color: @SuccessBg;}
.wm-button.text_success{color: @Success;}
.wm-button.text_success:hover{box-shadow: none;}
/* warning */
.wm-button.dark_warning{background-color: @Warning; color: @WarningBg; border-color: @Warning;}
.wm-button.plain_warning{background-color: @WarningBg; color: @Warning; border-color: @WarningBorder;}
.wm-button.plain_warning:hover{background-color: @WarningBg;}
.wm-button.text_warning{color: @Warning;}
.wm-button.text_warning:hover{box-shadow: none;}
/* danger */
.wm-button.dark_danger{background-color: @Danger; color: @DangerBg; border-color: @Danger;}
.wm-button.plain_danger{background-color: @DangerBg; color: @Danger; border-color: @DangerBorder;}
.wm-button.plain_danger:hover{background-color: @DangerBg;}
.wm-button.text_danger{color: @Danger;}
.wm-button.text_danger:hover{box-shadow: none;}
/* info */
.wm-button.dark_info{background-color: @Info; color: @InfoBg; border-color: @Info;}
.wm-button.plain_info{background-color: @InfoBg; color: @Info; border-color: @InfoBorder;}
.wm-button.plain_info:hover{background-color: @InfoBg;}
.wm-button.text_info{color: @Info;}
.wm-button.text_info:hover{box-shadow: none;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Botton',
  props: {
    effect: {type: String, default: 'dark'},          //样式: plain, dark, text
    type: {type: String, default: 'default'},         //类型: primary, success, warning, danger, info
    width: {type: String, default: 'auto'},           //宽度
    height: {type: String, default: '32px'},          //高度
    padding: {type: String, default: '0 20px'},       //内部间距
    margin: {type: String, default: '0 4px'},         //外部间距
    radius: {type: String, default: '2px'},           //圆角
    fontSize: {type: String, default: '16px'},        //文字大小
    icon: {type: String, default: ''},                //图标
    disabled: {type: Boolean, default: false},        //是否禁用
  },
});
</script>