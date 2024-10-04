<template>
  <div class="wm-input_body" :style="{width: width, height: height, margin: margin}">
    <!-- Clear -->
    <div class="wm-input_clear_body" v-if="value&&clearable" :style="{width: lineHeight, height: lineHeight}" @click.stop="Clear()">
      <div class="wm-input_clear" :style="{width: 'calc('+lineHeight+' / 2)', height: 'calc('+lineHeight+' / 2)'}"></div>
    </div>
    <!-- Icon -->
    <i class="wm-input_text" v-if="icon" :class="icon"
      :style="{
        width: lineHeight,
        lineHeight: lineHeight,
        fontSize: iconSize,
        left: iconAlign=='left'?'0':'',
        right: iconAlign=='right'?'0':'',
        color: iconColor,
        backgroundColor: iconBgcolor,
        borderRadius: iconRadius,
      }"
      @click="iconClick()"
    ></i>
    <!-- Text -->
    <div class="wm-input_text" v-if="text" v-html="text"
      :style="{
        padding: textPadding,
        lineHeight: lineHeight,
        left: textAlign=='left'?'0':'',
        right: textAlign=='right'?'0':'',
        color: textColor,
        backgroundColor: textBgcolor,
        borderRadius: textRadius,
      }"
      @click="textClick()"
    ></div>
    <!-- Text Length -->
    <div class="wm-input_total" v-if="textLen" :style="{lineHeight:lineHeight}">{{ val_len }}/{{ maxlength || '无限制' }}</div>
    <!-- TextArea -->
    <textarea ref="wmTextarea" class="wm-input" v-if="type=='textarea'"
      :value="value"
      :placeholder="placeholder || state.langs.placeholder"
      :maxlength="maxlength"
      :disabled="disabled"
      :readonly="readonly"
      :style="{
        height: height,
        padding: padding,
        lineHeight: lineHeight,
      }"
      @input="input"
      @focus="inputFocus"
      @blur="inputBlur"
    ></textarea>
    <!-- TextArea End -->
    <!-- Input -->
    <input ref="wmInput" class="wm-input" autocomplete="off" v-else
      :value="value"
      :type="type"
      :placeholder="placeholder || state.langs.placeholder"
      :maxlength="maxlength"
      :disabled="disabled"
      :readonly="readonly"
      :style="{
        height: height,
        padding: padding,
        lineHeight: lineHeight,
      }"
      @input="input"
      @focus="inputFocus"
      @blur="inputBlur"
    />
    <!-- Input End -->
  </div>
</template>

<style lang="less" scoped>
.wm-input_body{position: relative; width: 100%;}
.wm-input{border: none; background: none; appearance: none; outline: none; font: 400 14px Arial; caret-color: @Primary;}
.wm-input{vertical-align: top; width: 100%; box-sizing: border-box; border: @BaseBorder 1px solid; border-radius: 4px; background-color: #FFF;}
.wm-input:hover{box-shadow: 0 0 4px rgba(0,0,0,.1); border-color: @BorderHover;}
.wm-input:focus{outline: none; border-color: @Primary; background-color: @Primary5; border: 1px solid @Primary; box-shadow: none;}
.wm-input:disabled{border-color: @BaseBorder; background-color: @BaseFill;}
.wm-input_text{user-select: none; cursor: pointer; position: absolute;}
.wm-input_text{text-align: center;}
.wm-input_text:hover{opacity: 0.7;}
.wm-input_total{position: absolute; padding: 0 10px; right: 0; bottom: 0;}
.wm-input_clear_body{cursor: pointer; position: absolute; z-index: 1; top: 0; right: 0;}
.wm-input_clear{user-select: none; position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background-color: @Danger; border-radius: 50%;}
.wm-input_clear::after,.wm-input_clear::before{content: ''; position: absolute; width: 50%; height: 0.1rem; background-color: #FFF; left: 50%; top: 50%; transform-origin: center;}
.wm-input_clear::after{transform: translate(-50%, -50%) rotate(45deg);}
.wm-input_clear::before{transform: translate(-50%, -50%) rotate(-45deg);}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
@Options({
  components: {},
  props: {
    value: {default: ''},                               // 值
    type: {type: String, default: 'text'},              // 类型: textarea, text
    width: {type: String, default: '100%'},             // 宽
    height: {type: String, default: '40px'},            // 高
    lineHeight: {type: String, default: '40px'},        // 行高
    placeholder: {type: String, default: ''},           // 提示
    maxlength: {type: String, default: ''},             // 最大长度
    padding: {type: String, default: '0 10px'},         // 内部间距
    margin: {type: String, default: '0'},               // 外部间距
    disabled: {type: Boolean, default: false},          // 是否禁用
    readonly: {type: Boolean, default: false},          // 是否读写
    clearable: {type: Boolean, default: false},         // 一键清空
    icon: {type: String, default: ''},                  // 图标
    iconSize: {type: String, default: '20px'},          // 图标-大小
    iconAlign: {type: String, default: 'left'},         // 图标-对齐方式: left、right
    iconColor: {type: String, default: ''},             // 图标-颜色
    iconBgcolor: {type: String, default: ''},           // 图标-背景颜色
    iconRadius: {type: String, default: '4px 0 0 4px'}, // 图标-圆角
    text: {type: String, default: ''},                  // 文本
    textPadding: {type: String, default: '0 10px'},     // 文本-内部间距
    textAlign: {type: String, default: 'right'},        // 文本-对齐方式: left、right
    textColor: {type: String, default: ''},             // 文本-颜色
    textBgcolor: {type: String, default: ''},           // 文本-背景颜色
    textRadius: {type: String, default: '0 4px 4px 0'}, // 文本-圆角
    textLen: {type: Boolean, default: false},           // 是否统计长度
  }
})
export default class Input extends Vue {

  // 参数
  value!: any;
  type!: string;
  width!: string;
  height!: string;
  lineHeight!: string;
  placeholder!: string;
  maxlength!: string;
  padding!: string;
  margin!: string;
  disabled!: boolean;
  readonly!: boolean;
  clearable!: boolean;
  icon!: string;
  iconSize!: string;
  iconAlign!: string;
  iconColor!: string;
  iconBgcolor!: string;
  iconRadius!: string;
  text!: string;
  textPadding!: string;
  textAlign!: string;
  textColor!: string;
  textBgcolor!: string;
  textRadius!: string;
  textLen!: boolean;
  // 状态
  private store: any = useStore();
  state: any = this.store.state;
  // 变量
  val_len: any = 0;

  /* 创建成功 */
  created(): void {
    // 监听
    this.$watch('$props', (props:any)=>{
      this.val_len = props.value.length;
    }, { deep: true });
  }

  /* 事件-变化 */
  input($event: any): void {
    this.$emit('update:value', $event.target.value);
  }
  /* 事件-激活 */
  inputFocus($event: any): void {
    this.$emit('update:focus', $event.target.value);
  }
  /* 事件-失焦 */
  inputBlur($event: any): void {
    this.$emit('update:blur', $event.target.value);
  }

  /* 图标事件 */
  iconClick(): void {
    this.$emit('iconClick');
  }

  /* 文本事件 */
  textClick(): void {
    this.$emit('textClick');
  }

  /* 清空 */
  Clear(): void {
    this.$emit('Clear');
    this.$emit('update:value', '');
    if(this.type=='textarea') {
      (this.$refs.wmTextarea as any).focus();
    }else{
      (this.$refs.wmInput as any).focus();
    }
  }

}
</script>