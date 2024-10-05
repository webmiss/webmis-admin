<template>
  <div class="wm-tag" :class="effect+'_'+type"
    :style="{lineHeight: height, padding: padding, borderRadius: radius, fontSize: fontSize}
  ">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.wm-tag{position: relative; display: inline-block; border: transparent 1px solid;}
/* default */
.wm-tag.plain_default{background-color: @LighterFill; color: @Text; border-color: @BaseBorder;}
.wm-tag.plain_default:hover{background-color: @Primary5; color: @Primary; border-color: @Primary;}
.wm-tag.dark_default{background-color: @Primary; color: #FFF; border-color: @Primary1;}
.wm-tag.dark_default:hover{background-color: @Primary2; color: #FFF; border-color: @Primary;}
.wm-tag.text_default{color: @Text;}
.wm-tag.text_default:hover{box-shadow: none; color: @Primary;}
/* primary */
.wm-tag.plain_primary{background-color: @Primary6; color: @Primary; border-color:  @Primary;}
.wm-tag.plain_primary:hover{ background-color: @Primary5; color: @Primary1; border-color:  @Primary1;}
.wm-tag.dark_primary{background-color: @Primary; color: @Primary6; border-color: @Primary1;}
.wm-tag.dark_primary:hover{background: linear-gradient(@Primary, @Primary1);}
.wm-tag.text_primary{color: @Primary;}
.wm-tag.text_primary:hover{box-shadow: none; background-color: @Primary6;}
/* success */
.wm-tag.plain_success{background-color: @Success6; color: @Success; border-color: @Success2;}
.wm-tag.plain_success:hover{background-color: @Success5; color: @Success1; border-color: @Success1;}
.wm-tag.dark_success{background-color: @Success; color: @Success6; border-color: @Success1;}
.wm-tag.dark_success:hover{background: linear-gradient(@Success, @Success1);}
.wm-tag.text_success{color: @Success;}
.wm-tag.text_success:hover{box-shadow: none; color: @Success1; background-color: @Success6;}
/* warning */
.wm-tag.plain_warning{background-color: @Warning6; color: @Warning; border-color: @Warning2;}
.wm-tag.plain_warning:hover{background-color: @Warning5; color: @Warning1; border-color: @Warning1;}
.wm-tag.dark_warning{background-color: @Warning; color: @Warning6; border-color: @Warning1;}
.wm-tag.dark_warning:hover{background: linear-gradient(@Warning, @Warning1);}
.wm-tag.text_warning{color: @Warning;}
.wm-tag.text_warning:hover{box-shadow: none; color: @Warning1; background-color: @Warning6;}
/* danger */
.wm-tag.plain_danger{background-color: @Danger6; color: @Danger; border-color: @Danger2;}
.wm-tag.plain_danger:hover{background-color: @Danger5; color: @Danger1; border-color: @Danger1;}
.wm-tag.dark_danger{background-color: @Danger; color: @Danger6; border-color: @Danger1;}
.wm-tag.dark_danger:hover{background: linear-gradient(@Danger, @Danger1);}
.wm-tag.text_danger{color: @Danger;}
.wm-tag.text_danger:hover{box-shadow: none; color: @Danger1; background-color: @Danger6;}
/* info */
.wm-tag.plain_info{background-color: @Info6; color: @Info; border-color: @Info2;}
.wm-tag.plain_info:hover{background-color: @Info5; color: @Info1; border-color: @Info1;}
.wm-tag.dark_info{background-color: @Info; color: @Info6; border-color: @Info1;}
.wm-tag.dark_info:hover{background: linear-gradient(@Info, @Info1);}
.wm-tag.text_info{color: @Info;}
.wm-tag.text_info:hover{box-shadow: none; color: @Info1; background-color: @Info6;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import wmInput from '@/components/form/input/index.vue'
@Options({
  components: { wmInput },
  props: {
    show: {type: String, default: ''},                // 是否显示
    height: {type: String, default: '24px'},          // 高
    padding: {type: String, default: '0 8px'},        // 内部间距
    effect: {type: String, default: 'plain'},         // 样式: plain, dark, text
    type: {type: String, default: 'default'},         // 类型: primary, success, warning, danger, info
    radius: {type: String, default: '4px'},           // 圆角
    fontSize: {type: String, default: '12px'},        // 字体大小
  }
})
export default class Tag extends Vue {

  // 参数
  show!: any;
  height!: string;
  padding!: string;
  effect!: string;
  type!: string;
  radius!: string;
  fontSize!: string;

}
</script>