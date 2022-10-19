<template>
  <div ref="Tag" class="wm-tag" :class="effect+'_'+type" :style="{
    height: height,
    lineHeight: height,
    padding: padding,
    fontSize: fontSize,
  }">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.wm-tag{display: inline-block; border-radius: 4px; border: transparent 1px solid; background-color: #FFF; box-sizing: border-box;}
/* default */
.wm-button.dark_default,.plain_default{background-color: #FFF; color: #626468; border-color: #D2D4D8;}
.wm-button.dark_default:hover,.plain_default:hover{background-color: @Minor; color: @Primary; border-color: @Primary;}
.wm-button.text_default{color: #626468;}
.wm-button.text_default:hover{box-shadow: none; color: @Primary;}
/* primary */
.wm-button.dark_primary{background-color: @Primary; color: @Minor; border-color: @Primary;}
.wm-button.plain_primary{background-color: @Minor; color: @Primary; border-color: @Primary;}
.wm-button.plain_primary:hover{background-color: @Minor;}
.wm-button.text_primary{color: @Primary;}
.wm-button.text_primary:hover{box-shadow: none;}
/* success */
.wm-button.dark_success{background-color: @Success; color: @SuccessBg; border-color: @Success;}
.wm-button.plain_success{background-color: @SuccessBg; color: @Success; border-color: @Success;}
.wm-button.plain_success:hover{background-color: @SuccessBg;}
.wm-button.text_success{color: @Success;}
.wm-button.text_success:hover{box-shadow: none;}
/* warning */
.wm-button.dark_warning{background-color: @Warning; color: @WarningBg; border-color: @Warning;}
.wm-button.plain_warning{background-color: @WarningBg; color: @Warning; border-color: @Warning;}
.wm-button.plain_warning:hover{background-color: @WarningBg;}
.wm-button.text_warning{color: @Warning;}
.wm-button.text_warning:hover{box-shadow: none;}
/* danger */
.wm-button.dark_danger{background-color: @Danger; color: @DangerBg; border-color: @Danger;}
.wm-button.plain_danger{background-color: @DangerBg; color: @Danger; border-color: @Danger;}
.wm-button.plain_danger:hover{background-color: @DangerBg;}
.wm-button.text_danger{color: @Danger;}
.wm-button.text_danger:hover{box-shadow: none;}
/* info */
.wm-button.dark_info{background-color: @Info; color: @InfoBg; border-color: @Info;}
.wm-button.plain_info{background-color: @InfoBg; color: @Info; border-color: @Info;}
.wm-button.plain_info:hover{background-color: @InfoBg;}
.wm-button.text_info{color: @Info;}
.wm-button.text_info:hover{box-shadow: none;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Tag',
  props: {
    effect: {type: String, default: 'plain'},   //样式: plain, dark, text
    type: {type: String, default: 'default'},   //类型: primary, success, warning, danger, info
    height: {type: String, default: '28px'},    //高度
    padding: {type: String, default: '0 8px'},  //间距
    fontSize: {type: String, default: '12px'},  //字体大小
  },
});
</script>