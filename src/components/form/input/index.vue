<template>
  <div class="wm-input_body" :style="{width: width, maxWidth: maxWidth}">
    <!-- Clear -->
    <div class="wm-input_clear_body" v-if="value&&clearable">
      <span class="wm-input_clear" @click.stop="$emit('update:value', '')"></span>
    </div>
    <!-- botton -->
    <div class="wm-input_botton" v-if="bottonText" @click.stop="$emit('update:bottom', true)">{{ bottonText }}</div>
    <!-- textarea -->
    <textarea v-if="type=='textarea'"
      class="wm-input"
      :value="value"
      :maxlength="maxlength"
      :minlength="minlength"
      :placeholder="placeholder"
      :style="{
        height: height,
        lineHeight: 'calc('+lineHeight+' - 2px)',
        padding: padding,
        textAlign: align,
        borderRadius: borderRadius,
        backgroundColor: bgColor,
        fontSize: fontSize,
      }"
      :disabled="disabled"
      :readonly="readonly"
      @input="$emit('update:value', $event.target.value)"
    ></textarea>
    <!-- Input -->
    <input v-else
      class="wm-input"
      :value="value"
      :type="type"
      :maxlength="maxlength"
      :minlength="minlength"
      :placeholder="placeholder"
      :style="{
        height: height,
        lineHeight: 'calc('+lineHeight+' - 2px)',
        padding: padding,
        textAlign: align,
        borderRadius: borderRadius,
        backgroundColor: bgColor,
        fontSize: fontSize,
      }"
      :disabled="disabled"
      :readonly="readonly"
      @input="$emit('update:value', $event.target.value)"
    />
  </div>
</template>

<style lang="less" scoped>
.wm-input_body{position: relative; width: 100%;}

.wm-input_clear_body{display: none; position: absolute; z-index: 1; width: 30px; height: 80%; top: 10%; right: 1px; text-align: center;}
.wm-input_clear{position: absolute; cursor: pointer; top: 50%; right: 6px; transform: translateY(-50%); width: 16px; height: 16px; background-color: @Danger; border-radius: 50%; opacity: .5;}
.wm-input_clear:hover{opacity: 1;}
.wm-input_clear::after,.wm-input_clear::before{content: ''; position: absolute; width: 50%; height: 0.1rem; background-color: @Minor; left: 50%; top: 50%; transform-origin: center;}
.wm-input_clear::after{transform: translate(-50%, -50%) rotate(45deg);}
.wm-input_clear::before{transform: translate(-50%, -50%) rotate(-45deg);}
.wm-input_body:hover .wm-input_clear_body{display: block;}

.wm-input_botton{user-select: none; cursor: pointer; padding: 0 10px; position: absolute; z-index: 1; top: 50%; right: 1px; transform: translateY(-50%); color: @Info;}
.wm-input_botton:hover{color: @Primary;}

.wm-input{border: none; background: none; appearance: none; outline: none; font: 400 14px Arial; caret-color: @Primary;}
.wm-input{width: 100%; box-sizing: border-box; border-radius: 4px; border: @BorderColor 1px solid; background-color: #FFF;}
.wm-input:hover{box-shadow: 0 0 4px rgba(0,0,0,.1); border-color: @BorderHover;}
.wm-input:focus{outline: none; border-color: @Primary; background-color: @Minor;}
.wm-input:disabled{border-color: #DCDFE6; background-color: #F4F4F4;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Input',
  props: {
    value: {default: ''},                             //值
    type: {type: String, default: 'text'},            //类型: textarea、text
    maxlength: {type: String, default: ''},           //最大长度: 默认
    minlength: {type: String, default: ''},           //最小长度: 默认
    placeholder: {type: String, default: '请输入'},   //提示: 无
    width: {type: String, default: '100%'},           //宽度: '100%'
    maxWidth: {type: String, default: 'auto'},        //宽度: '100%'
    height: {type: String, default: '32px'},          //高度: '32px'
    lineHeight: {type: String, default: '20px'},      //行高: '20px'
    padding: {type: String, default: '10px 10px'},    //间距: '10px 10px'
    align: {type: String, default: ''},               //文本对齐方式: 'left'
    borderRadius: {type: String, default: '4px'},     //边框圆角: '4px'
    bgColor: {type: String, default: ''},             //背景颜色: ''
    fontSize: {type: String, default: '14px'},        //文本大小: '14px'
    disabled: {type: Boolean, default: false},        //是否禁用
    readonly: {type: Boolean, default: false},        //是否读写
    clearable: {type: Boolean, default: false},       //一键清空
    bottonText: {type: String, default: ''},          //右侧按钮
  },
  mounted(){
  },
  methods:{
  }
});
</script>